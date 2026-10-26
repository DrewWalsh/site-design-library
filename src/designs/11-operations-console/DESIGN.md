# 11 Operations Console

**Philosophy and fit.** Help experienced users recognise exceptions and complete repetitive work quickly. Suitable for inventory, fulfilment, support queues, administration, and internal operational tools.

**Visual grammar.** A compact application bar and narrow functional sidebar frame a dense, well-aligned table. Use a readable UI sans, tabular numerals, cool white surfaces, slate text, and restrained amber or red for labelled exceptions. Row detail opens in a side panel; filtering and batch actions sit close to the affected records. Counts support the work rather than forming a decorative dashboard.

**Specimen and flow.** _Dispatch Board_ models fictional outbound shipments. Users filter delayed shipments, inspect one, and locally update its handling status. Supporting states show a batch action confirmation and an empty filtered result with a reset action.

**Adaptation and identity.** Mobile shows the essential shipment fields in a list, with full detail on a separate view. Preserve data density, predictable selection, and efficient keyboard navigation; avoid oversized cards, ambiguous icon-only actions, and indiscriminate compression. **Effort: medium.**

## Implemented sample

Dispatch Board is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Labelled operational exceptions
- Batch actions next to records
- Tabular alignment and visible selection

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: DM Sans. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f4f6f8; surface #fff; text #263241; accent #265f4d. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/11-operations-console/start
- Shipment details: /preview/11-operations-console/detail
- Empty results: /preview/11-operations-console/empty

## Neighbours and adaptation

- [10 Evidence Ledger](../10-evidence-ledger/DESIGN.md) uses faceted records table and an assertion/source comparison and record index with explicit evidence links. This reference keeps dense shipment table, narrow functional sidebar, and contextual detail and persistent application sidebar and row selection.
- [13 Project Workbench](../13-project-workbench/DESIGN.md) uses three-pane project tree, central scene, and contextual inspector and hierarchical object selection and named mobile views. This reference keeps dense shipment table, narrow functional sidebar, and contextual detail and persistent application sidebar and row selection.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/11/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
