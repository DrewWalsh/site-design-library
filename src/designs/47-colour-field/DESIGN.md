# 47 Colour Field

**Philosophy and fit.** Make a site’s chapters legible through large fields of colour and simple spatial relationships. Suitable for cultural institutions, compact brand narratives, exhibitions, and design-led service portfolios.

**Visual grammar.** Compose substantial flat-colour planes with sharp boundaries, sparse geometric markers, large headings, and deliberately limited image use. A chapter rail crosses these planes with a consistent navigation position. Typography stays restrained so the relationship between colour, proportion, and whitespace provides the identity. Each field includes a visible section label; colour never carries its meaning alone.

**Specimen and flow.** _Intervals_ is a fictional exhibition space. Move between programme, visiting information, and membership chapters, then open an exhibition’s details. Supporting views are the complete exhibition index and a membership comparison laid out as aligned text columns.

**Mobile and motion.** Turn side-by-side planes into an orderly vertical sequence. Keep ordinary scrolling and explicit anchor links; any transition simply fades between static compositions and can be disabled.

**Identity and effort.** Preserve large-scale colour composition; avoid shrinking the concept into many pastel cards or requiring full-screen snapping. **Effort: medium.**

## Implemented sample

Intervals is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Colour fields define chapters
- Sparse geometric markers
- Proportion and whitespace over decoration

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Space Grotesk. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #eee6d7; surface #ffffff; text #2c3031; accent #4a60a2. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/47-colour-field/start
- Exhibition detail: /preview/47-colour-field/exhibition
- Membership comparison: /preview/47-colour-field/membership

## Neighbours and adaptation

- [46 Kinetic Type](../46-kinetic-type/DESIGN.md) uses oversized typographic performance with a stable programme spine and persistent motion toggle, schedule, and static reading mode. This reference keeps large flat colour planes with a consistent chapter rail and explicit chapter anchors and aligned membership columns.
- [45 Raw Manifesto](../45-raw-manifesto/DESIGN.md) uses forceful large text followed by direct document-like programme rows and plain underlined destinations and chronological archive. This reference keeps large flat colour planes with a consistent chapter rail and explicit chapter anchors and aligned membership columns.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Space Grotesk, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/47/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
