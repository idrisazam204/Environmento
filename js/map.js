// Environmento: Hotspots map
// Renders a Leaflet map of documented climate hotspots in Howard County,
// synced with an accessible filterable table below it.
(function () {
  "use strict";

  var ISSUE_COLORS = {
    flood: "#b5542d",
    heat: "#b8842e",
    water: "#3f6f6d"
  };

  var ISSUE_LABELS = {
    flood: "Flooding",
    heat: "Extreme heat",
    water: "Water quality"
  };

  var SEVERITY_LABELS = {
    high: "High severity",
    elevated: "Elevated severity"
  };

  var DATA_URL = "../data/hotspots.json";

  var map;
  var markerById = {};
  var activeFilters = { flood: true, heat: true, water: true };
  var hotspots = [];

  function escapeHtml(str) {
    var div = document.createElement("div");
    div.textContent = str;
    return div.innerHTML;
  }

  function buildPopupHtml(spot) {
    return (
      '<div class="popup">' +
        '<span class="badge badge--' + spot.severity + '">' + SEVERITY_LABELS[spot.severity] + "</span>" +
        "<h3>" + escapeHtml(spot.name) + "</h3>" +
        "<p>" + escapeHtml(spot.description) + "</p>" +
        '<p class="popup__done"><strong>What&rsquo;s being done:</strong> ' + escapeHtml(spot.whatsBeingDone) + "</p>" +
        '<p class="popup__source">Source: <a href="' + spot.source.url + '" target="_blank" rel="noopener">' + escapeHtml(spot.source.label) + "</a></p>" +
      "</div>"
    );
  }

  function markerVisible(spot) {
    return activeFilters[spot.issue];
  }

  function applyFilters() {
    hotspots.forEach(function (spot) {
      var marker = markerById[spot.id];
      var visible = markerVisible(spot);
      var row = document.querySelector('tr[data-id="' + spot.id + '"]');

      if (marker) {
        if (visible && !map.hasLayer(marker)) marker.addTo(map);
        if (!visible && map.hasLayer(marker)) map.removeLayer(marker);
      }
      if (row) {
        row.hidden = !visible;
      }
    });
  }

  function focusHotspot(spot, opts) {
    opts = opts || {};
    var marker = markerById[spot.id];
    if (!marker) return;
    if (!map.hasLayer(marker)) return;

    map.flyTo([spot.lat, spot.lng], 14, { duration: 0.6 });
    marker.openPopup();

    document.querySelectorAll(".hotspot-table tbody tr").forEach(function (tr) {
      tr.classList.remove("is-active");
    });
    var row = document.querySelector('tr[data-id="' + spot.id + '"]');
    if (row) {
      row.classList.add("is-active");
      if (opts.scrollToRow) {
        row.scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
  }

  function renderMarkers() {
    hotspots.forEach(function (spot) {
      var marker = L.circleMarker([spot.lat, spot.lng], {
        radius: spot.severity === "high" ? 11 : 8,
        color: "#faf7f0",
        weight: 2,
        fillColor: ISSUE_COLORS[spot.issue],
        fillOpacity: 0.9
      });
      marker.bindPopup(buildPopupHtml(spot), { maxWidth: 280 });
      marker.on("click", function () {
        focusHotspot(spot, { scrollToRow: true });
      });
      marker.addTo(map);
      markerById[spot.id] = marker;
    });
  }

  function renderTableRows(tbody) {
    var rowsHtml = hotspots.map(function (spot) {
      return (
        "<tr data-id=\"" + spot.id + "\" tabindex=\"0\">" +
          "<td>" + escapeHtml(spot.name) + "</td>" +
          "<td>" + ISSUE_LABELS[spot.issue] + "</td>" +
          '<td><span class="badge badge--' + spot.severity + '">' + SEVERITY_LABELS[spot.severity] + "</span></td>" +
          "<td>" + escapeHtml(spot.description) + "</td>" +
          "<td><button type=\"button\" class=\"row-link\" data-id=\"" + spot.id + "\">Show on map</button></td>" +
        "</tr>"
      );
    }).join("");
    tbody.innerHTML = rowsHtml;

    tbody.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-id]");
      if (!trigger) return;
      var spot = hotspots.find(function (s) { return s.id === trigger.dataset.id; });
      if (spot) focusHotspot(spot);
    });

    tbody.addEventListener("keydown", function (event) {
      if (event.key !== "Enter" && event.key !== " ") return;
      var row = event.target.closest("tr[data-id]");
      if (!row || event.target.tagName === "BUTTON") return;
      event.preventDefault();
      var spot = hotspots.find(function (s) { return s.id === row.dataset.id; });
      if (spot) focusHotspot(spot);
    });
  }

  function initFilterChips() {
    var chips = document.querySelectorAll(".filter-chip");
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        var issue = chip.dataset.issue;
        var pressed = chip.getAttribute("aria-pressed") === "true";
        activeFilters[issue] = !pressed;
        chip.setAttribute("aria-pressed", String(!pressed));
        applyFilters();
      });
    });
  }

  function initMap() {
    map = L.map("map", {
      scrollWheelZoom: false
    }).setView([39.25, -76.93], 11);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 18,
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on("focus", function () { map.scrollWheelZoom.enable(); });
    map.on("blur", function () { map.scrollWheelZoom.disable(); });
    map.getContainer().addEventListener("click", function () {
      map.scrollWheelZoom.enable();
    });
  }

  function loadData() {
    var mapEl = document.getElementById("map");
    var tbody = document.querySelector(".hotspot-table tbody");

    fetch(DATA_URL)
      .then(function (response) {
        if (!response.ok) throw new Error("Network response was not ok: " + response.status);
        return response.json();
      })
      .then(function (data) {
        hotspots = data.hotspots || [];
        renderMarkers();
        if (tbody) renderTableRows(tbody);
        initFilterChips();
        applyFilters();

        var updated = document.getElementById("data-last-updated");
        if (updated && data.lastUpdated) updated.textContent = data.lastUpdated;
      })
      .catch(function (err) {
        console.error("Environmento: failed to load hotspot data", err);
        if (mapEl) {
          var msg = document.createElement("p");
          msg.className = "map-note";
          msg.textContent = "Hotspot data could not be loaded right now. Please try reloading the page.";
          mapEl.parentNode.insertBefore(msg, mapEl.nextSibling);
        }
      });
  }

  document.addEventListener("DOMContentLoaded", function () {
    if (!document.getElementById("map")) return;
    initMap();
    loadData();
  });
})();
