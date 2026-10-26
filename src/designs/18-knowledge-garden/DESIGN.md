# 18 Knowledge Garden

**Philosophy and fit.** Encourage exploration through connected ideas while showing where each piece belongs. Suitable for personal knowledge bases, wikis, research notes, and living project documentation.

**Visual grammar.** Use a readable central note, a compact topic tree, and a contextual rail for backlinks and related concepts. Soft grey-green surfaces, dark green-black text, a modest serif title, and a clear sans body create a cultivated, practical tone. The interface distinguishes a note's hierarchy from its cross-links; a small trail records the current route through the collection.

**Specimen and flow.** _The Small Systems Garden_ contains fictional notes on everyday design. Visitors open a concept, follow a contextual link, and inspect notes that link back to it. Supporting views show a topic overview and a local search result with matched passages.

**Adaptation and identity.** Mobile moves the tree and backlinks into clearly labelled sections. Preserve readable notes, meaningful connections, and stable URLs; avoid graph visualisations as compulsory navigation, unexplained tags, and decorative pseudo-botanical clutter. **Effort: medium.**

## Implemented sample

The Small Systems Garden is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Textual connections carry meaning
- Hierarchy separate from backlinks
- Stable note URLs

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Libre Baskerville. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f4f5ee; surface #ffffff; text #344237; accent #4b6b4d. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/18-knowledge-garden/start
- A connected concept: /preview/18-knowledge-garden/note
- Matched passages: /preview/18-knowledge-garden/search

## Neighbours and adaptation

- [12 Canvas Workspace](../12-canvas-workspace/DESIGN.md) uses bounded spatial research board with note clusters and an equivalent outline and canvas/outline switch and explicit note controls. This reference keeps readable central note between topic tree and backlinks and contextual links, topic hierarchy, and a local search.
- [05 Scholarly Folio](../05-scholarly-folio/DESIGN.md) uses book-like reading column between chapter index and annotation margin and chapters, numbered annotations, and bibliography. This reference keeps readable central note between topic tree and backlinks and contextual links, topic hierarchy, and a local search.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Libre Baskerville, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/18/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
