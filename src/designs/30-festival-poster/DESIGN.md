# 30 Festival Poster

**Philosophy and fit.** Turn a programme into a memorable public announcement. Suitable for festivals, theatre seasons, screenings, exhibitions, and music events.

**Visual grammar.** Oversized condensed type, date stamps, alternating colour fields, and overlapping poster blocks establish the hierarchy. Cobalt, hot coral, and off-white form the base palette. The navigation remains a clear strip for programme, venues, and tickets; the event schedule uses clean rows beneath the expressive masthead.

**Specimen and flow.** _Night Signal_ presents a fictional arts weekend. Filter the programme by day and venue, inspect an event, and save it to a local itinerary. Supporting views include a venue guide and an itinerary conflict state when events overlap. Ticket buttons open a clearly labelled sample ticket panel.

**Responsive behaviour.** Poster typography resizes without clipping event names. Schedule rows become stacked records; overlapping decorative elements separate before they crowd information. Motion is optional and never required to read dates.

**Identity rules.** Preserve the collision of bold announcement and usable timetable. Avoid turning every event into an identical rounded card or placing essential text inside raster posters. **Effort: medium.**

## Implemented sample

Night Signal is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Poster-scale condensed type
- Clear programme rows under expressive fields
- Visible event conflicts

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Bebas Neue. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #edece5; surface #ffffff; text #111e50; accent #ee5c49. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/30-festival-poster/start
- Event and sample ticket: /preview/30-festival-poster/event
- Saved itinerary: /preview/30-festival-poster/itinerary

## Neighbours and adaptation

- [03 Swiss Grid](../03-swiss-grid/DESIGN.md) uses rigorous typographic grid with indexed programme rows and numbered sections and day filters. This reference keeps oversized festival announcement above a usable programme timetable and day and venue filters with a saved itinerary.
- [46 Kinetic Type](../46-kinetic-type/DESIGN.md) uses oversized typographic performance with a stable programme spine and persistent motion toggle, schedule, and static reading mode. This reference keeps oversized festival announcement above a usable programme timetable and day and venue filters with a saved itinerary.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Bebas Neue, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/30/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
