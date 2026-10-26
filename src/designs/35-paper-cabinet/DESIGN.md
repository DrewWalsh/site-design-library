# 35 Paper Cabinet

**Philosophy and fit.** Make a collection feel organised, discoverable, and worth returning to. Appropriate for archives, recipe libraries, reading collections, and curated research materials.

**Visual grammar.** Tabbed drawers introduce categories; index cards present consistent metadata; a detail sheet holds the full record. Use buff paper, dark brown text, muted olive tabs, fine rules, and a modest serif paired with monospaced accession labels. Physical cues clarify organisation without requiring a simulated filing cabinet.

**Specimen and flow.** _The Commonplace Cabinet_ collects fictional historical recipes. Choose a drawer, filter cards by ingredient or period, and open a recipe record. Supporting views include saved selections and a record with missing provenance clearly marked. Users can add a private note stored locally and return to the same filtered list.

**Responsive behaviour.** Drawer tabs become a labelled category selector. Cards stack in a single readable column; record sheets open as ordinary pages rather than floating paper windows.

**Identity rules.** Preserve stable metadata, tactile hierarchy, and the index-to-record relationship. Avoid ornamental desk clutter, unreadable ageing effects, or hiding navigation inside decorative objects. **Effort: medium.**

## Implemented sample

The Commonplace Cabinet is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Stable archival metadata
- Index-to-record relationship
- Private local annotations

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Libre Baskerville. Reading: IBM Plex Mono. Local WOFF2 fonts with system fallbacks. Page #e8dfc9; surface #f7efdc; text #493f2f; accent #6c6d46. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/35-paper-cabinet/start
- Recipe record and private note: /preview/35-paper-cabinet/record
- Saved selections: /preview/35-paper-cabinet/saved

## Neighbours and adaptation

- [34 Hand Drawn Desk](../34-hand-drawn-desk/DESIGN.md) uses numbered illustrated steps with attached callouts and a practice question and step index, diagram labels, and answer feedback. This reference keeps tabbed category drawers, consistent index cards, and full record sheets and drawer tabs, ingredient search, and accession links.
- [18 Knowledge Garden](../18-knowledge-garden/DESIGN.md) uses readable central note between topic tree and backlinks and contextual links, topic hierarchy, and a local search. This reference keeps tabbed category drawers, consistent index cards, and full record sheets and drawer tabs, ingredient search, and accession links.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Libre Baskerville, IBM Plex Mono.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/35/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
