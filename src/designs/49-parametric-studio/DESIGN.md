# 49 Parametric Studio

**Philosophy and fit.** Explain a design system by letting visitors change its rules and observe the result. Suitable for generative design portfolios, configurable products, educational tools, and typography or fabrication experiments.

**Visual grammar.** Pair a large specimen stage with an explicitly labelled control column, a short explanation, and a compact preset strip. Use fine measurement rules, neutral surfaces, technical typography, and colour that identifies adjustable properties. Render suitable geometry with SVG or CSS so the demonstration remains crisp and inspectable.

**Specimen and flow.** _Pattern Works_ demonstrates a fictional modular screen system. Choose a preset, adjust spacing and angle, and inspect the resulting pattern and parameter summary. Supporting states are a side-by-side preset comparison and a restored-default configuration. Values can persist in the URL for direct sharing.

**Mobile and motion.** Stack the specimen above controls and provide numeric inputs alongside sliders. Changes update directly, with no perpetual animation or pointer-only controls. A static preset remains available if an enhancement fails.

**Identity and effort.** Preserve visible relationships between controls and outcomes; avoid random decorative generators without a meaningful design question. **Effort: medium.**

## Implemented sample

Pattern Works is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Controls visibly change the geometry
- Numeric inputs accompany sliders
- Reproducible URL parameters

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Space Grotesk. Reading: IBM Plex Mono. Local WOFF2 fonts with system fallbacks. Page #ecece5; surface #f7f8ef; text #293b39; accent #3f756a. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/49-parametric-studio/start
- Preset comparison: /preview/49-parametric-studio/compare
- Restored default configuration: /preview/49-parametric-studio/defaults

## Neighbours and adaptation

- [27 Blueprint Studio](../27-blueprint-studio/DESIGN.md) uses indexed drawing sheets with title blocks and paired plan/result plates and project rail, drawing views, and construction notes. This reference keeps large svg specimen stage beside labelled numeric controls and preset strip and presets, direct parameter edits, and comparison.
- [17 Observatory](../17-observatory/DESIGN.md) uses aligned analytical plots on a dark instrument surface and persistent station/interval controls and an equivalent data table. This reference keeps large svg specimen stage beside labelled numeric controls and preset strip and presets, direct parameter edits, and comparison.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Space Grotesk, IBM Plex Mono.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/49/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
