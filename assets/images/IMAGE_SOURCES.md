# Image sources

This site ships with SVG placeholder graphics in this folder, not real photographs. Each `<img>` tag already has descriptive `alt` text for the intended photo. Before publishing, replace the placeholders below with real, legally-usable images of Howard County. Do not hotlink or copy images directly from news sites, Google Images, or other copyrighted sources.

## Where to find real, legally-usable Howard County photos

### 1. Wikimedia Commons
Search [commons.wikimedia.org](https://commons.wikimedia.org) — most uploads are CC-BY, CC-BY-SA, or public domain, and Commons shows the exact license and required attribution on every file page.

- Search "Ellicott City flood" — there is a well-documented set of 2016 and 2018 flash flood photos from Main Street, some from Maryland National Guard and NOAA uploads.
- Search "Patapsco Valley State Park" for river, gorge, and tree canopy shots along the Patapsco.
- Search "Columbia Maryland lakefront" or "Wilde Lake" for Columbia village-center and lake imagery.

Always click through to the file page and copy the attribution text exactly as Commons specifies (photographer name, license type, and a link back to the source page).

### 2. Howard County Government official channels
Howard County Government publishes press and event photography intended for public and media use:

- Howard County Government Flickr account — search for county-published albums covering Ellicott City recovery, county parks, and community events.
- Howard County Government press releases and newsroom pages (howardcountymd.gov) often include downloadable press photos tied to specific announcements (e.g., Safe and Sound Ellicott City progress updates).

Check the specific usage terms on each album or release before use; government-produced photos are often public domain or usable with attribution, but confirm per source.

### 3. NOAA / USGS public domain imagery
Works produced by U.S. federal agencies are generally public domain:

- NOAA's National Weather Service Baltimore/Washington office has published flood documentation photos from the 2016 and 2018 Ellicott City events.
- USGS maintains streamgage and flood-documentation photography for the Patapsco River watershed, searchable through the USGS Water Resources site and USGS multimedia gallery.

## Replacing a placeholder

Each placeholder is a plain SVG with a text label describing the intended photo (e.g., `ellicott-city-flood-main-street.svg`). To swap in a real photo:

1. Download the real image and save it into this folder with a matching descriptive filename (e.g., `ellicott-city-flood-main-street.jpg`).
2. Update the `src` attribute on the corresponding `<img>` tag in `/pages/issues.html` (or wherever it's used) to point to the new file.
3. Keep the existing `alt` text, or refine it to describe the actual photo more precisely.
4. Apply the same visual treatment used elsewhere on the site — the `.issue-block__figure img` CSS rule already applies a slight desaturation so mixed photo sources look cohesive; no extra editing is required unless the source photo is very high-contrast.
5. Note the source and license/attribution for the new image somewhere near this file (e.g., append a line to this document) so the credit isn't lost later.
