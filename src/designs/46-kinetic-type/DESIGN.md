# 46 Kinetic Type

**Philosophy and fit.** Let typography embody a subject’s rhythm while preserving a complete readable argument. Suitable for cultural festivals, creative studios, short campaigns, and expressive editorial introductions.

**Visual grammar.** Use a small number of oversized text compositions, strong negative space, and a restrained palette. Letter spacing, position, weight, or cropping may change as an enhancement. A conventional contents control and a stable text column provide the structural spine. Motion reinforces section boundaries or emphasis; it does not manufacture the only route through the content.

**Composition.** The programme itself is a typographic performance: three session titles use sharply different scale, alignment, tracking and directional stress, with time and performer names held on a stable spine. The composition remains expressive in a still capture; optional motion only changes the first title’s slant.

**Specimen and flow.** _Voice Assembly_ is a fictional spoken-word festival. Read its animated introduction, browse the programme, and inspect a performer’s session. Supporting views are the schedule and an entirely static reading mode containing identical information.

**Responsive and inclusive behaviour.** Each performance becomes a large readable typographic panel with a stable time and performer caption. Motion can be disabled without changing content or navigation. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Identity and effort.** Preserve typographic performance and disciplined pacing; avoid scroll hijacking, endlessly moving navigation, or illegible letter tricks. **Effort: high.**

## Implemented sample

Voice Assembly is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Type embodies rhythm
- Complete static equivalent
- Normal scrolling and stable controls

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Bebas Neue. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #24232a; surface #36353b; text #f1eee3; accent #dce57b. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/46-kinetic-type/start
- Festival schedule: /preview/46-kinetic-type/schedule
- Static reading mode: /preview/46-kinetic-type/reading

## Neighbours and adaptation

- [30 Festival Poster](../30-festival-poster/DESIGN.md) uses oversized festival announcement above a usable programme timetable and day and venue filters with a saved itinerary. This reference keeps oversized typographic performance with a stable programme spine and persistent motion toggle, schedule, and static reading mode.
- [47 Colour Field](../47-colour-field/DESIGN.md) uses large flat colour planes with a consistent chapter rail and explicit chapter anchors and aligned membership columns. This reference keeps oversized typographic performance with a stable programme spine and persistent motion toggle, schedule, and static reading mode.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Bebas Neue, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/46/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
