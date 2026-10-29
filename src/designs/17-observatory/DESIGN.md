# 17 Observatory

**Philosophy and fit.** Help users detect patterns, compare measures, and inspect uncertainty within a coherent instrument panel. Suitable for analytics, monitoring, scientific demonstrations, and resource tracking.

**Visual grammar.** Use a dark, quiet plotting surface with a persistent control strip and aligned charts sharing meaningful time axes. A technical sans, monospace readouts, muted grid lines, and restrained cyan, amber, and violet series colours support inspection. Keep charts large enough to read; choose panels because their measures relate, not because a grid needs filling.

**Composition.** The observatory starts with station and interval controls followed immediately by the measured plot. A restrained readout band sits below the chart, so an actual analytical relationship leads the page instead of a slogan and a row of dashboard tiles.

**Specimen and flow.** _Watershed Observatory_ displays clearly labelled synthetic river measurements. Users change a date interval, compare two stations, and inspect a selected reading. Supporting states provide a data table and a missing-data interval with its cause explained in fixture text.

**Adaptation and identity.** Mobile presents plots in a meaningful sequence and replaces small hover targets with selectable readings. Preserve scales, units, labels, and distinctions between missing and zero values; avoid animated counters, fake live activity, and ornamental gauges. **Effort: high.**

## Implemented sample

Watershed Observatory is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Shared chart axes and units
- Missing data distinct from zero
- Selectable readings without hover

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Space Grotesk. Reading: IBM Plex Mono. Local WOFF2 fonts with system fallbacks. Page #101d24; surface #192a33; text #d8e7e8; accent #6ad0ce. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/17-observatory/start
- Measurement table: /preview/17-observatory/table
- Missing data interval: /preview/17-observatory/missing

## Neighbours and adaptation

- [11 Operations Console](../11-operations-console/DESIGN.md) uses dense shipment table, narrow functional sidebar, and contextual detail and persistent application sidebar and row selection. This reference keeps aligned analytical plots on a dark instrument surface and persistent station/interval controls and an equivalent data table.
- [49 Parametric Studio](../49-parametric-studio/DESIGN.md) uses large svg specimen stage beside labelled numeric controls and preset strip and presets, direct parameter edits, and comparison. This reference keeps aligned analytical plots on a dark instrument surface and persistent station/interval controls and an equivalent data table.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Space Grotesk, IBM Plex Mono.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/17/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
