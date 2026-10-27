# 28 Grand Hotel

**Philosophy and fit.** Let visitors imagine an arrival, then make the booking choices concrete. Fits destination hotels, lodges, retreats, and travel accommodations.

**Visual grammar.** A sequence of wide photographic scenes introduces arrival, rooms, surroundings, and daily life. A compact booking rail accompanies the story. Use restrained serif display type, warm white surfaces, deep forest text, and terracotta accents. Navigation separates staying, exploring, and planning; room information uses consistent comparisons beneath the narrative.

**Specimen and flow.** _Alder House_ is a fictional lakeside hotel. Select dates, compare rooms, and review a sample booking summary. Supporting views include a room detail and an availability result with no matching rooms. Amenities, occupancy, and cancellation examples appear beside the decision they affect.

**Responsive behaviour.** The booking rail becomes an accessible expandable section with a persistent summary. Photographic scenes retain ordinary scrolling; essential room details load before optional imagery.

**Identity rules.** Preserve the arrival narrative and explicit booking information. Avoid scroll hijacking, looping video as a requirement, and identical full-screen photographs with no useful content. **Effort: medium.**

## Implemented sample

Alder House is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- An arrival narrative
- Room details at the point of choice
- Practical booking information

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Libre Baskerville. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f5f1e8; surface #ffffff; text #304535; accent #8a503a. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/28-grand-hotel/start
- Sample availability: /preview/28-grand-hotel/rooms
- Booking summary: /preview/28-grand-hotel/summary

## Neighbours and adaptation

- [08 Documentary Story](../08-documentary-story/DESIGN.md) uses linear documentary chapters with evidence plates and substantial text and chapter index plus continuous reading. This reference keeps arrival photographs with an accompanying booking rail and comparable rooms and stay, explore, and explicit availability.
- [24 Fine Dining](../24-fine-dining/DESIGN.md) uses seasonal menu sequence with generous intervals and a compact reservation rail and menu, visiting details, and sample reservations. This reference keeps arrival photographs with an accompanying booking rail and comparable rooms and stay, explore, and explicit availability.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Libre Baskerville, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/28/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.

## Distinctive composition

Hospitality has a centred house masthead, a separate welcome and booking rail, and staggered arrival/bedroom photographs. Dedicated exterior and bedroom images establish arrival and rest, distinct from Documentary Story’s landscape narrative and Quiet Atelier’s object study.
