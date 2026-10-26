# 03 Swiss Grid

**Philosophy and fit.** Build hierarchy through alignment, scale, and disciplined contrast. Suitable for conferences, studios, exhibitions, and editorial brands that want typography to carry their identity.

**Visual grammar.** Use a visibly rigorous grid, left-aligned oversized headings, numbered sections, generous outer margins, and restrained image crops. Small labels align with large type rather than floating in pills. A neutral sans works across a severe size range. An off-white ground, near-black text, and one vermilion accent organise the composition. Navigation is a short indexed list; rules and whitespace divide material instead of card backgrounds.

**Specimen and flow.** _Form Conference_ lets visitors inspect the programme, filter sessions by day, and open a speaker profile. Supporting screens provide a programme detail with venue information and a saved-session list held locally.

**Adaptation and identity.** On mobile, preserve alignment relationships while reducing the number of columns; the oversized heading must wrap deliberately. Preserve the grid and typographic hierarchy; avoid symmetric feature tiles, decorative shapes, and unrelated typefaces. Motion is limited to quiet state changes. **Effort: low.**

## Implemented sample

Form Conference is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Aligned large and small type
- Programme as strong ruled rows
- Oversized left-aligned titles

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Space Grotesk. Reading: Space Grotesk. Local WOFF2 fonts with system fallbacks. Page #f4f2eb; surface #ffffff; text #181a18; accent #c6321e. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/03-swiss-grid/start
- Speaker profile: /preview/03-swiss-grid/speaker
- Saved sessions: /preview/03-swiss-grid/saved

## Neighbours and adaptation

- [31 Bauhaus Workshop](../31-bauhaus-workshop/DESIGN.md) uses rectilinear programme grid with geometric category markers and geometric programme index and syllabus. This reference keeps rigorous typographic grid with indexed programme rows and numbered sections and day filters.
- [30 Festival Poster](../30-festival-poster/DESIGN.md) uses oversized festival announcement above a usable programme timetable and day and venue filters with a saved itinerary. This reference keeps rigorous typographic grid with indexed programme rows and numbered sections and day filters.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Space Grotesk.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/03/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
