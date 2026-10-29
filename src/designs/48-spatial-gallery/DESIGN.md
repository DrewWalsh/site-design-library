# 48 Spatial Gallery

**Philosophy and fit.** Let spatial arrangement communicate relationships between a deliberately small collection of objects. Suitable for digital exhibitions, architecture showcases, art collections, and immersive portfolios.

**Visual grammar.** Present a shallow spatial stage in CSS or SVG, with clearly labelled exhibits and a permanent destination list. A three-dimensional renderer is optional only if it adds necessary spatial meaning. Use quiet architectural surfaces, neutral framing, restrained type, and object-specific imagery. Distance and grouping convey curatorial relationships. A standard detail panel holds all substantive text.

**Composition.** The room is the opening surface. A small museum plaque hangs on its back wall; chair, vessel and lamp act as labelled entrances, with a complete object list along the floor edge. The surrounding webpage no longer frames the room beneath a marketing introduction.

**Specimen and flow.** _Small Museum_ exhibits fictional design objects. Choose an exhibit from the scene or its equivalent list, inspect its description, and move to a related object. Supporting views are the complete collection list and an object detail page with a stable URL.

**Responsive and inclusive behaviour.** A bounded two-dimensional room retains all three objects and explicit labels on phones. The complete text collection follows directly below the floor, and every object has a readable detail route. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Identity and effort.** Preserve meaningful spatial grouping; avoid mandatory free movement, heavy introductory sequences, or essential text embedded in a canvas. **Effort: high.**

## Implemented sample

Small Museum is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Spatial grouping has curatorial meaning
- All exhibits reachable from text
- Substantive text outside the scene

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Libre Baskerville. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f0eee7; surface #fffdf5; text #3c413e; accent #697b68. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/48-spatial-gallery/start
- Object detail: /preview/48-spatial-gallery/object
- Complete collection list: /preview/48-spatial-gallery/collection

## Neighbours and adaptation

- [27 Blueprint Studio](../27-blueprint-studio/DESIGN.md) uses indexed drawing sheets with title blocks and paired plan/result plates and project rail, drawing views, and construction notes. This reference keeps shallow architectural stage with a permanent destination list and ordinary object details and equivalent exhibit buttons and a complete collection list.
- [50 Infinite Index](../50-infinite-index/DESIGN.md) uses dense finite visual index with discrete overview, medium, and detail densities and anchored search, medium filters, pagination, and return-to-results. This reference keeps shallow architectural stage with a permanent destination list and ordinary object details and equivalent exhibit buttons and a complete collection list.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Libre Baskerville, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/48/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
