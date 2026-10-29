# 16 Field Atlas

**Philosophy and fit.** Use location as the primary route into information. Suitable for local guides, public amenities, heritage trails, travel research, and geographically organised collections.

**Visual grammar.** Pair a large, deliberately styled map with a compact searchable place list and a filter bar. Use an earthy cream ground, dark green labels, blue waterways, and distinct labelled place markers. A practical sans and small cartographic labels reinforce the atlas character. The selected place remains obvious in both map and list.

**Composition.** The atlas opens directly on its district map. A compact search and route drawer floats on the map edge; numbered native buttons occupy the actual route positions and respond to the same surface filter as the list. There is no introductory hero between navigation and geography.

**Specimen and flow.** _Northbank Footpaths_ uses an original SVG map of a fictional district. Visitors filter trails by surface, select a route, and inspect its stops and access notes. Supporting states show a route detail and a list-only search result.

**Adaptation and identity.** Mobile uses a clear map/list switch while preserving filters and selection. All places remain reachable through ordinary links; the reference needs no geolocation or external map service. Preserve geographic relationships and readable labels; avoid decorative maps disconnected from results or essential hover interactions. **Effort: medium.**

## Implemented sample

Northbank Footpaths is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Geography is the entry point
- Matching list and map state
- Access notes beside route details

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: DM Sans. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f0f0e4; surface #ffffff; text #2b4439; accent #35694c. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/16-field-atlas/start
- Riverside loop: /preview/16-field-atlas/detail
- List-only results: /preview/16-field-atlas/list

## Neighbours and adaptation

- [26 Field Notes](../26-field-notes/DESIGN.md) uses field report with observation labels, annotated landscape, and preparation notes and terrain filters, route reports, and a packing checklist. This reference keeps large illustrated district map linked to a compact trail list and equivalent map and list selection.
- [20 The Directory](../20-the-directory/DESIGN.md) uses stable facet rail and comparable horizontal venue listings and facets, detail pages, and a short comparison tray. This reference keeps large illustrated district map linked to a compact trail list and equivalent map and list selection.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/16/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
