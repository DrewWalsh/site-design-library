# 10 Evidence Ledger

**Philosophy and fit.** Make claims inspectable and provenance visible. Suitable for institutional research, public record collections, policy trackers, and structured investigative resources.

**Visual grammar.** Use a sober index with compact search, a faceted records table, and a persistent evidence summary. Record pages distinguish the statement, its supporting material, the applicable dates, and interpretation. A humanist sans, tabular numerals, thin rules, white surfaces, navy text, and restrained ochre status marks produce a documentary character. Status labels always include text.

**Composition.** The ledger starts with a compact record count, evidence-status controls, search and the actual records table. Claim, organisation, value and evidence remain directly comparable; the explanatory method follows the records. The assertion and source comparison remain its distinctive secondary composition.

**Specimen and flow.** _Public Works Ledger_ contains explicitly fictional contracts and organisations. Visitors filter records, inspect a single assertion, and open its source excerpt beside the assertion. Supporting states show conflicting fixture evidence and a record whose source is unavailable.

**Adaptation and identity.** Mobile turns rows into labelled records and places source material after its associated claim. Preserve provenance, date context, and the distinction between evidence and interpretation; avoid unsupported score badges, dashboard ornament, and graphs that imply unrecorded relationships. Motion is unnecessary. **Effort: medium.**

## Implemented sample

Public Works Ledger is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Provenance beside claims
- Dates and status in every record
- Evidence separated from interpretation

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: DM Sans. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f6f7f5; surface #ffffff; text #23374a; accent #80611d. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/10-evidence-ledger/start
- Assertion and source: /preview/10-evidence-ledger/record
- Unavailable source: /preview/10-evidence-ledger/unavailable

## Neighbours and adaptation

- [11 Operations Console](../11-operations-console/DESIGN.md) uses dense shipment table, narrow functional sidebar, and contextual detail and persistent application sidebar and row selection. This reference keeps faceted records table and an assertion/source comparison and record index with explicit evidence links.
- [18 Knowledge Garden](../18-knowledge-garden/DESIGN.md) uses readable central note between topic tree and backlinks and contextual links, topic hierarchy, and a local search. This reference keeps faceted records table and an assertion/source comparison and record index with explicit evidence links.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/10/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
