(function () {
  "use strict";

  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.getElementById("main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
    nav.addEventListener("click", function (event) {
      if (event.target.tagName === "A") {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }
  function initFooterYear() {
    var el = document.getElementById("current-year");
    if (el) el.textContent = String(new Date().getFullYear());
  }
  // Fade + translate-up reveals, staggered ~100ms per sibling, once each.
  function initReveals() {
    var els = document.querySelectorAll(".reveal");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-revealed"); });
      return;
    }
    els.forEach(function (el) {
      var i = 0, sib = el;
      while ((sib = sib.previousElementSibling)) {
        if (sib.classList.contains("reveal")) i++;
      }
      el.style.setProperty("--reveal-delay", i * 100 + "ms");
    });
    var io = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-revealed");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    els.forEach(function (el) { io.observe(el); });
  }
  // Idle SVG loops only run while their wrapper is on screen.
  function initAnimToggles() {
    var els = document.querySelectorAll(".env-anim");
    if (!els.length || !("IntersectionObserver" in window)) return;
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
      });
    }, { threshold: 0.1 });
    els.forEach(function (el) { io.observe(el); });
  }

  // Scroll hint fades out permanently after the first scroll.
  function initScrollHint() {
    if (!document.querySelector(".hero__scroll-hint")) return;
    window.addEventListener("scroll", function () {
      document.body.classList.add("has-scrolled");
    }, { once: true, passive: true });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initFooterYear();
    initReveals();
    initAnimToggles();
    initScrollHint();
  });
})();
