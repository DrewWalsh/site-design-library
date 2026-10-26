# 08 Documentary Story

**Philosophy and fit.** Build understanding through a deliberate sequence of evidence, place, and explanation. Suitable for investigative features, historical accounts, project retrospectives, and visual explainers.

**Visual grammar.** Use a linear chapter structure with substantial text, full-width documentary images, maps or diagrams where useful, and short transitional passages. A small chapter index provides orientation. A sober sans heading and readable serif body sit on alternating ink and paper sections, with an ochre accent for annotations. Sticky imagery may accompany a passage, but all content remains meaningful in normal document order.

**Specimen and flow.** _The River Works_ explains a fictional town's abandoned water system. Readers progress through five chapters, inspect a labelled mechanism diagram, and open evidence captions. Supporting states provide a chapter overview and a plain continuous-reading version.

**Adaptation and identity.** Mobile replaces sticky side-by-side scenes with image-and-text sequences. Reduced motion removes animated transitions. Preserve the explanatory progression and substantial writing; avoid scroll hijacking, text revealed too slowly to read, and spectacle unsupported by content. **Effort: medium.**

## Implemented sample

The River Works is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Explanatory progression
- Large evidence images with captions
- Plain reading alternative

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: DM Sans. Reading: Libre Baskerville. Local WOFF2 fonts with system fallbacks. Page #eae7dc; surface #ffffff; text #232e2d; accent #b08a37. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/08-documentary-story/start
- Chapter overview: /preview/08-documentary-story/chapters
- Continuous reading: /preview/08-documentary-story/reading

## Neighbours and adaptation

- [28 Grand Hotel](../28-grand-hotel/DESIGN.md) uses arrival photographs with an accompanying booking rail and comparable rooms and stay, explore, and explicit availability. This reference keeps linear documentary chapters with evidence plates and substantial text and chapter index plus continuous reading.
- [26 Field Notes](../26-field-notes/DESIGN.md) uses field report with observation labels, annotated landscape, and preparation notes and terrain filters, route reports, and a packing checklist. This reference keeps linear documentary chapters with evidence plates and substantial text and chapter index plus continuous reading.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: DM Sans, Libre Baskerville.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/08/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
