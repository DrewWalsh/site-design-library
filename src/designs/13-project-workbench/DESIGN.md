# 13 Project Workbench

**Philosophy and fit.** Keep a project's structure, current object, and relevant properties available together. Suitable for content editors, asset managers, authoring tools, and technical project interfaces.

**Visual grammar.** Use a three-pane composition: a hierarchical navigator, a central document or object view, and a contextual inspector. A restrained app header holds global actions. Neutral sans text, monospace identifiers, graphite surfaces, bright readable text, and a single teal selection accent establish a workmanlike environment. Pane boundaries and selected states should be clear without elaborate chrome.

**Specimen and flow.** _Scene Workshop_ contains a fictional collection of game scenes. Users select a scene, edit its descriptive metadata, and preview the resulting scene card. Supporting states show unsaved changes with a discard action and a search result that opens the matching object.

**Adaptation and identity.** Mobile converts panes into labelled views while preserving selection and edits. Preserve hierarchical context and the relationship between object and inspector; avoid turning the centre into a metrics dashboard or building a full code editor. **Effort: medium.**

## Implemented sample

Scene Workshop is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Visible project context
- Object and properties stay connected
- Clear unsaved and discard states

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: DM Sans. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #20262c; surface #2b343c; text #e5ecec; accent #8ed2ba. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/13-project-workbench/start
- Unsaved scene edits: /preview/13-project-workbench/edit
- Scene preview: /preview/13-project-workbench/preview

## Neighbours and adaptation

- [11 Operations Console](../11-operations-console/DESIGN.md) uses dense shipment table, narrow functional sidebar, and contextual detail and persistent application sidebar and row selection. This reference keeps three-pane project tree, central scene, and contextual inspector and hierarchical object selection and named mobile views.
- [12 Canvas Workspace](../12-canvas-workspace/DESIGN.md) uses bounded spatial research board with note clusters and an equivalent outline and canvas/outline switch and explicit note controls. This reference keeps three-pane project tree, central scene, and contextual inspector and hierarchical object selection and named mobile views.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/13/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
