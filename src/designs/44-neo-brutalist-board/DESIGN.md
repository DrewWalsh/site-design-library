# 44 Neo Brutalist Board

**Philosophy and fit.** Make participation and choice conspicuous through bold, tangible objects. Suitable for maker communities, workshop listings, independent shops, and energetic small product sites.

**Visual grammar.** Use thick dark outlines, solid offset shadows, large utilitarian type, and a small palette of flat, vivid colours. Organise the page as a board of labelled notices in clearly separated horizontal zones. Filters and actions have the same physical vocabulary as the notices. A strong alignment system prevents the apparent roughness from becoming arbitrary.

**Composition.** The entry is a workshop noticeboard, with a fixed discipline rack beside full-width dated notices. Oversized day numbers, horizontal colour zones and heavy dividing rules replace the common slogan-and-card-grid arrangement. Each notice is a complete destination.

**Specimen and flow.** _Open Bench_ lists fictional maker workshops. Filter notices by discipline, open a workshop, and book a sample place locally. Supporting views are a full workshop detail sheet and the no-spaces-available state with alternative dates.

**Responsive and inclusive behaviour.** A compact wrapping filter rack leads directly into dated notice rows. Day numbers remain beside workshop titles instead of taking a separate introductory screen. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Identity and effort.** Preserve outlined objects and decisive hierarchy; avoid confusing this with raw HTML or covering every content fragment in a separate box. **Effort: low.**

## Implemented sample

Open Bench is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Thick outlines and solid offset shadows
- Conspicuous actions
- Strong alignment beneath rough surfaces

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Space Grotesk. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f0efb1; surface #fffde9; text #222921; accent #c5e14e. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/44-neo-brutalist-board/start
- Workshop notice: /preview/44-neo-brutalist-board/workshop
- No places available: /preview/44-neo-brutalist-board/full

## Neighbours and adaptation

- [45 Raw Manifesto](../45-raw-manifesto/DESIGN.md) uses forceful large text followed by direct document-like programme rows and plain underlined destinations and chronological archive. This reference keeps bold outlined workshop notices in separated horizontal board zones and discipline filters and full notice sheets.
- [32 Pop Memphis](../32-pop-memphis/DESIGN.md) uses offset patterned collection blocks anchored by a solid navigation strip and kit selection and an ordinary bundle builder. This reference keeps bold outlined workshop notices in separated horizontal board zones and discipline filters and full notice sheets.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Space Grotesk, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/44/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
