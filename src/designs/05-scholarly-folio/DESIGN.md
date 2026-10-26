# 05 Scholarly Folio

**Philosophy and fit.** Support close reading while keeping commentary and sources within reach. Suitable for annotated texts, research essays, translations, archival editions, and educational publications.

**Visual grammar.** A book-like serif reading column sits between a narrow chapter index and a wider annotation margin. Use parchment-white, dark brown-black text, restrained burgundy links, paragraph numbers, and precise footnote markers. The title treatment resembles a scholarly title page. Notes are connected to passages through labels and alignment rather than colour alone; the navigation distinguishes chapters, annotations, and bibliography.

**Specimen and flow.** _The Commonplace Edition_ contains an original fictional essay with author commentary. Selecting an annotation highlights its passage and reveals the note. Supporting views show the bibliography with source metadata and a reading-only mode that suppresses secondary material.

**Adaptation and identity.** Mobile brings each opened note into the reading flow with a clear return control. Preserve the relationship between text, notes, and sources; avoid magazine teasers, decorative manuscript imitation, and hover-only notes. Motion is unnecessary. **Effort: medium.**

## Implemented sample

The Commonplace Edition is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Passage-level notes
- Stable scholarly reading measure
- Sources separated from interpretation

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Libre Baskerville. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f7f4eb; surface #ffffff; text #3c332b; accent #7b3542. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/05-scholarly-folio/start
- Reading-only mode: /preview/05-scholarly-folio/reading
- Bibliography: /preview/05-scholarly-folio/sources

## Neighbours and adaptation

- [07 Literary Review](../07-literary-review/DESIGN.md) uses literary issue with a large lead essay and a spare contents list and issue, essay, and author links. This reference keeps book-like reading column between chapter index and annotation margin and chapters, numbered annotations, and bibliography.
- [34 Hand Drawn Desk](../34-hand-drawn-desk/DESIGN.md) uses numbered illustrated steps with attached callouts and a practice question and step index, diagram labels, and answer feedback. This reference keeps book-like reading column between chapter index and annotation margin and chapters, numbered annotations, and bibliography.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Libre Baskerville, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/05/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
