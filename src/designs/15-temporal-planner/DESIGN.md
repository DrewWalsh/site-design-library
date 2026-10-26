# 15 Temporal Planner

**Philosophy and fit.** Make time, duration, overlap, and availability immediately legible. Suitable for schedules, personal planning, project calendars, event programmes, and resource booking.

**Visual grammar.** Use a time-based grid with explicit day and hour labels, a narrow agenda rail, and a compact toolbar for period and view changes. A friendly UI sans, clean white ground, dark blue-grey ink, and a small palette of labelled activity categories organise the page. Current selection, unavailable periods, and overlapping items have visibly different treatments.

**Specimen and flow.** _Weekcraft_ contains a fictional workshop schedule. Users select a session, move it through an explicit date-and-time form, and inspect the updated week. Supporting states show a scheduling conflict and an agenda view containing the same appointments.

**Adaptation and identity.** Mobile defaults to the agenda or a single-day view; horizontal swiping is optional. Preserve the time structure and text labels; avoid drag-only editing, colour-only categories, and compressing a whole week into unreadable columns. Motion simply confirms a change. **Effort: medium.**

## Implemented sample

Weekcraft is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Readable duration and overlap
- Labelled activity categories
- Non-drag scheduling controls

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: DM Sans. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f7f8fa; surface #ffffff; text #2c3d51; accent #356d9c. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/15-temporal-planner/start
- Move a session: /preview/15-temporal-planner/edit
- Agenda view: /preview/15-temporal-planner/agenda

## Neighbours and adaptation

- [11 Operations Console](../11-operations-console/DESIGN.md) uses dense shipment table, narrow functional sidebar, and contextual detail and persistent application sidebar and row selection. This reference keeps time-based week grid paired with an agenda rail and week, agenda, and explicit rescheduling form.
- [14 Guided Journey](../14-guided-journey/DESIGN.md) uses calm single-column question stage with a persistent answer summary and reversible steps and an editable review. This reference keeps time-based week grid paired with an agenda rail and week, agenda, and explicit rescheduling form.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/15/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
