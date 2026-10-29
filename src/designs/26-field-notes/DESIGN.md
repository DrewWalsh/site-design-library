# 26 Field Notes

**Philosophy and fit.** Organise discovery around observation, place, and practical preparation. Fits outdoor guides, conservation groups, travel journals, and field-based education.

**Visual grammar.** Use notebook-like entries with location, season, conditions, and annotated photographs. A modest section index gives access to routes, observations, and equipment. Moss green, sand, and charcoal accompany a readable serif, compact sans labels, and restrained line illustrations. Texture stays behind content and never carries information.

**Composition.** An actual field entry opens the journal: report number, recorded conditions, distance and duration beside a tipped-in observation photograph. Ruled paper, a restrained annotation and practical route details establish a working notebook; there is no scenic marketing preface.

**Specimen and flow.** _Ridge Journal_ documents fictional walking routes. Filter routes by terrain, read a route’s field report, and add required equipment to a local packing checklist. Supporting views include an observation detail and a saved-routes list with an empty state. Distances and conditions are explicitly sample data.

**Responsive and inclusive behaviour.** Route conditions and preparation appear before the photograph on phones. The image becomes a clearly captioned notebook plate, followed by the terrain-filtered route index. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Identity rules.** Preserve the relationship between observation and practical detail. Avoid turning the design into a generic green wellness site or making essential information resemble faint handwriting. **Effort: medium.**

## Implemented sample

Ridge Journal is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Observation paired with practical data
- Notebook-like entry metadata
- Preparation stays close to the route

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Libre Baskerville. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #eeeadd; surface #ffffff; text #384331; accent #5b6f43. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/26-field-notes/start
- Ridge field report: /preview/26-field-notes/report
- Saved routes: /preview/26-field-notes/saved

## Neighbours and adaptation

- [16 Field Atlas](../16-field-atlas/DESIGN.md) uses large illustrated district map linked to a compact trail list and equivalent map and list selection. This reference keeps field report with observation labels, annotated landscape, and preparation notes and terrain filters, route reports, and a packing checklist.
- [08 Documentary Story](../08-documentary-story/DESIGN.md) uses linear documentary chapters with evidence plates and substantial text and chapter index plus continuous reading. This reference keeps field report with observation labels, annotated landscape, and preparation notes and terrain filters, route reports, and a packing checklist.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Libre Baskerville, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/26/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.

## Distinctive composition

An actual field entry opens the journal: report number, recorded conditions, distance and duration beside a tipped-in observation photograph. Ruled paper, a restrained annotation and practical route details establish a working notebook; there is no scenic marketing preface.
