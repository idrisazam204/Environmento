# Environmento

A community education website about climate issues in Howard County, Maryland — flooding, extreme heat, and stormwater/water quality — built on real data from Howard County Climate Forward, the Howard County Open Data / GIS portal, and the Maryland iMAP GIS Data Catalog.

Plain HTML, CSS, and vanilla JavaScript. No build step, no framework. The interactive map uses [Leaflet.js](https://leafletjs.com/) via CDN with OpenStreetMap tiles.

## Running it locally

Because the site uses `fetch()` to load `data/hotspots.json`, opening `index.html` directly from disk (`file://`) will fail in most browsers due to CORS restrictions on local file access. Serve it over a local HTTP server instead:

```bash
cd Environmento
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser. Any static file server works (`npx serve`, VS Code's Live Server extension, etc.) — this one just requires no installation on most systems.

## File structure

```
index.html          Homepage — intro, three issue teasers, link to Hotspots
pages/
  issues.html        Longer explainers per issue + "what residents can do"
  hotspots.html      The centerpiece: interactive map + synced accessible table
  data.html          Annotated links to the three data sources
  about.html         Mission, methodology, last-updated date, contact
css/
  styles.css         Whole site's design system (single stylesheet, no preprocessor)
js/
  main.js            Shared behavior: mobile nav toggle, footer year
  map.js             Leaflet map setup, marker rendering, filters, table sync
data/
  hotspots.json       All hotspot content — edit this to update the map/list
assets/images/
  environmento-logo.png       Site logo
  *.svg                        Placeholder graphics (see IMAGE_SOURCES.md to replace with real photos)
  IMAGE_SOURCES.md              Where to legally source real Howard County photos
```

## Updating the hotspots map

All hotspot content lives in `data/hotspots.json` — nothing about a hotspot is hardcoded in `hotspots.html` or `map.js`. To add, remove, or edit a hotspot, edit this file only.

Each entry looks like:

```json
{
  "id": "unique-slug-no-spaces",
  "name": "Display name shown in popup, table, and map",
  "lat": 39.2673,
  "lng": -76.7983,
  "issue": "flood",
  "severity": "high",
  "description": "2-3 sentence description of the hotspot.",
  "whatsBeingDone": "1 sentence on the county or community response.",
  "source": {
    "label": "Human-readable source name",
    "url": "https://example.gov/"
  }
}
```

Notes:

- `issue` must be exactly one of `"flood"`, `"heat"`, or `"water"` — these three values drive marker color, filter chips, and table filtering. Adding a fourth issue type requires also adding a filter chip in `hotspots.html` and a color/label entry in `map.js` (`ISSUE_COLORS`, `ISSUE_LABELS`).
- `severity` must be `"high"` or `"elevated"` — these drive the badge style (`.badge--high` / `.badge--elevated` in `styles.css`) and marker size.
- `lat`/`lng` are decimal degrees. Howard County spans roughly 39.10–39.37 N, -76.65 to -77.19 W — sanity-check new coordinates fall in that range.
- Update the top-level `"lastUpdated"` field (`YYYY-MM-DD`) whenever you touch this file; it displays in the hotspot table caption on the Hotspots page.
- No build step is needed — save the file and reload the page.

## Content policy

Every statistic and hotspot on this site should trace back to one of exactly three sources: Howard County Climate Forward, the Howard County Open Data/GIS portal, or Maryland iMAP + FEMA flood maps. If you add a new claim, add its citation to the footnote list at the bottom of the relevant page too.

## Before publishing

- Replace the SVG placeholders in `assets/images/` with real photographs — see `assets/images/IMAGE_SOURCES.md` for where to legally source Howard County imagery.
- Fill in the contact placeholder on `pages/about.html`.
- Double check all three external source links still resolve (county sites occasionally reorganize URLs).
