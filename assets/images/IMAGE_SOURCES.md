# Image sources

All three editorial photos on this site are real, CC-licensed photographs sourced from Wikimedia Commons, resized for web use. Do not hotlink or copy images directly from news sites, Google Images, or other copyrighted sources — everything below has been checked for license and attributed accordingly.

## Photos currently in use

| File | Subject | Photographer | License | Source |
|---|---|---|---|---|
| `ellicott-city-flood-main-street.jpg` | Main Street, Ellicott City, during recovery from the July 2016 flash flood | Joe Haupt | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Main_Street_Ellicott_City,_Maryland_--_Two_Months_After_The_Flood_Of_July_30,_2016_(29438072114).jpg) |
| `wilde-lake-village-center-summer.jpg` | Wilde Lake, Columbia, shoreline view | Andrew Bossi | [CC BY-SA 2.5](https://creativecommons.org/licenses/by-sa/2.5/) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:2008_04_23_-_Columbia_-_Wilde_Lake.jpg) |
| `patapsco-river-tree-canopy.jpg` | Forest canopy, McKeldin Area, Patapsco Valley State Park | Andrew Parlette | [CC BY 2.0](https://creativecommons.org/licenses/by/2.0/) | [Wikimedia Commons](https://commons.wikimedia.org/wiki/File:Patapsco_Valley_Forest_in_Autumn_(52455510256).jpg) |

Attribution for each photo is displayed directly in its `<figcaption>` on `pages/issues.html` (photographer name + license link), which satisfies the "give appropriate credit" requirement of both licenses. Each image was resized/recompressed from the original for web performance — both CC BY and CC BY-SA permit this ("indicate if changes were made"), which the captions also note.

**Important note on `wilde-lake-village-center-summer.jpg`'s license (CC BY-SA):** the "ShareAlike" clause only applies if you distribute a *modified/derivative* version of the image itself (e.g., publish an edited crop separately). Resizing for display on this site and simply showing it with attribution does not trigger ShareAlike obligations for the rest of the site's code or content — only a redistributed derivative of that specific image would need to carry the same license. If you ever build something (a print, a poster, a separate download) that reuses this specific photo in modified form, that derivative would need to be CC BY-SA 2.5 too.

## If you need to swap or add photos later

### Where to find real, legally-usable Howard County photos

1. **Wikimedia Commons** ([commons.wikimedia.org](https://commons.wikimedia.org)) — search by subject (e.g. "Ellicott City flood," "Patapsco Valley State Park," "Wilde Lake Columbia"). Every file page states its exact license and required attribution — always use the file page's own wording, licenses vary (CC BY vs. CC BY-SA carry different obligations, see note above).
2. **Howard County Government official channels** — the county's Flickr account and newsroom pages (howardcountymd.gov) occasionally publish press photography intended for public/media use. Check the specific usage terms per album; not all are open-licensed.
3. **NOAA / USGS public domain imagery** — works produced by U.S. federal employees in the course of their duties are public domain (no attribution legally required, though it's good practice). NOAA's National Weather Service and USGS Water Resources both publish flood-documentation imagery for the Patapsco watershed.

### Steps to swap a photo

1. Verify the license on the source's file page and note the required attribution text.
2. Download the image, resize for web (this site's photos are ~900px wide, JPEG quality ~70 — `sips -s format jpeg -s formatOptions 70 --resampleWidth 900 input.jpg --out output.jpg` on macOS).
3. Save into this folder with a descriptive filename, update the `src` in the relevant `<img>` tag, and write accurate `alt` text describing what the photo *actually* shows (not an idealized/invented scene — alt text should be verifiably true, both for accessibility and to avoid misrepresenting sourced content).
4. Add the attribution to the image's `<figcaption>` (photographer name + link to the license), and update the table above so the credit isn't lost later.
