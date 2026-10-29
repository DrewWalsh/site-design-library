# 50 Infinite Index

**Philosophy and fit.** Make a finite collection feel explorable at several scales without surrendering orientation. Suitable for visual archives, design references, photography collections, and substantial creative portfolios.

**Visual grammar.** Use a dense, edge-to-edge index with an anchored search strip, visible result count, clear grouping labels, and selectable overview, medium, and detail densities. Thumbnails and short captions carry the page; typography and chrome recede. Density changes alter how much context is visible, rather than simply enlarging cards inside a conventional landing page.

**Composition.** The visual archive starts immediately at the density and search strip, followed by twenty-four different graphic compositions. Overview shows all 24 studies at once; medium and detail modes paginate smaller selections, so density changes the amount of visible context rather than simply card size.

**Specimen and flow.** _The Reference Room_ holds a finite set of fictional graphic studies. Filter by medium, change the overview density, open a specimen, and return to the same position. Supporting views are a text list of results and an explicit empty-result state. Pagination, deep links, and the current page remain visible.

**Responsive and inclusive behaviour.** Phones retain three-column overview, two-column medium and single-column detail modes, with compact captions and explicit pagination. Text-list and detail routes retain the selected filters. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Identity and effort.** Preserve overview-to-detail exploration; avoid an endless feed, hidden destinations, or costly unbounded rendering. **Effort: medium.**

## Implemented sample

The Reference Room is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Density changes the amount of visible context
- Explicit finite pagination
- Text-list alternative with stable result restoration

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: DM Sans. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #eeeee8; surface #ffffff; text #30382f; accent #445f3d. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/50-infinite-index/start
- Graphic study detail: /preview/50-infinite-index/detail
- Text list of results: /preview/50-infinite-index/list

## Neighbours and adaptation

- [20 The Directory](../20-the-directory/DESIGN.md) uses stable facet rail and comparable horizontal venue listings and facets, detail pages, and a short comparison tray. This reference keeps dense finite visual index with discrete overview, medium, and detail densities and anchored search, medium filters, pagination, and return-to-results.
- [48 Spatial Gallery](../48-spatial-gallery/DESIGN.md) uses shallow architectural stage with a permanent destination list and ordinary object details and equivalent exhibit buttons and a complete collection list. This reference keeps dense finite visual index with discrete overview, medium, and detail densities and anchored search, medium filters, pagination, and return-to-results.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/50/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
