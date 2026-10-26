# 12 Canvas Workspace

**Philosophy and fit.** Make spatial arrangement part of thinking and organising. Suitable for planning boards, visual research, moodboards, and early concept development.

**Visual grammar.** Place an open working surface beneath a compact toolbar, with a collapsible item library and a small context inspector. Use a light dot grid, warm neutral notes, dark text, and distinct labelled item types. The canvas is the main composition; the surrounding interface stays visually quiet. Spatial groups, connections, and relative position carry meaning.

**Specimen and flow.** _Common Ground_ provides a bounded fictional research board. Users add a source note, reposition it, and place it into a named group. Supporting states show a selected item's editable detail and a structured outline containing the same content.

**Adaptation and identity.** Mobile defaults to the outline, with an optional canvas inspection mode. Every placement action also has keyboard and explicit-button controls. Preserve spatial relationships and a usable non-spatial view; avoid implementing an infinite rendering engine, requiring drag gestures, or hiding essential content off-screen. **Effort: high.**

## Implemented sample

Common Ground is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Spatial grouping carries meaning
- Editable note inspector
- Keyboard alternatives to movement

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: DM Sans. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f5f4ee; surface #ffffff; text #343b35; accent #5c654d. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/12-canvas-workspace/start
- Selected note inspector: /preview/12-canvas-workspace/detail
- Structured outline: /preview/12-canvas-workspace/outline

## Neighbours and adaptation

- [18 Knowledge Garden](../18-knowledge-garden/DESIGN.md) uses readable central note between topic tree and backlinks and contextual links, topic hierarchy, and a local search. This reference keeps bounded spatial research board with note clusters and an equivalent outline and canvas/outline switch and explicit note controls.
- [13 Project Workbench](../13-project-workbench/DESIGN.md) uses three-pane project tree, central scene, and contextual inspector and hierarchical object selection and named mobile views. This reference keeps bounded spatial research board with note clusters and an equivalent outline and canvas/outline switch and explicit note controls.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/12/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
