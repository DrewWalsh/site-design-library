# 27 Blueprint Studio

**Philosophy and fit.** Explain how a project is organised and constructed. Suitable for architecture, fabrication, engineering portfolios, and technically minded creative studios.

**Visual grammar.** Arrange projects as indexed drawing sheets with title blocks, section markers, disciplined grids, and paired plan-and-photograph views. Use midnight blue, chalk white, and a restrained cyan annotation colour. A technical sans pairs with monospaced drawing labels. Thin lines establish measured relationships without implying that the interface itself is a technical drawing.

**Specimen and flow.** _Section Works_ presents fictional small buildings. Select a project, switch between plan, section, and built result, then open the relevant construction note. Supporting views include the project index and a material detail sheet. A compare control allows paired views without requiring a draggable divider.

**Responsive behaviour.** Drawing sheets become stacked plates with a persistent view selector. Captions remain readable outside the drawings, and technical labels receive a text equivalent.

**Identity rules.** Preserve indexed sheets, aligned annotations, and evidence of construction. Avoid decorative measurement marks, microscopic specifications, and animated drafting effects around every element. **Effort: medium.**

## Implemented sample

Section Works is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Numbered project rail
- Aligned technical annotations
- Plan, section, and built-result relationship

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Space Grotesk. Reading: IBM Plex Mono. Local WOFF2 fonts with system fallbacks. Page #152f4b; surface #1c3b59; text #e2edf1; accent #8fd4de. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/27-blueprint-studio/start
- Construction note: /preview/27-blueprint-studio/material
- Project index: /preview/27-blueprint-studio/index

## Neighbours and adaptation

- [04 Quiet Atelier](../04-quiet-atelier/DESIGN.md) uses spacious introduction and staggered image-caption project sequence and modest text navigation and project index. This reference keeps indexed drawing sheets with title blocks and paired plan/result plates and project rail, drawing views, and construction notes.
- [49 Parametric Studio](../49-parametric-studio/DESIGN.md) uses large svg specimen stage beside labelled numeric controls and preset strip and presets, direct parameter edits, and comparison. This reference keeps indexed drawing sheets with title blocks and paired plan/result plates and project rail, drawing views, and construction notes.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Space Grotesk, IBM Plex Mono.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/27/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
