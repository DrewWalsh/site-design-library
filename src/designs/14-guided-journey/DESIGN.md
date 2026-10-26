# 14 Guided Journey

**Philosophy and fit.** Reduce a complicated decision into understandable, reversible steps. Suitable for onboarding, applications, configuration, booking preparation, and structured self-assessment.

**Visual grammar.** Use a calm single-column stage, a compact progress indicator, a clear current question, and a persistent summary of collected choices. A warm sans, generous control spacing, pale stone background, dark plum text, and a restrained violet action colour support focus. Group related questions together; introduce explanatory text before unfamiliar choices rather than hiding it behind tooltips.

**Specimen and flow.** _Workshop Finder_ guides visitors through choosing an interest, available day, and preferred format before recommending fixture workshops. Supporting states show an incomplete required answer with inline guidance and a review screen where any answer can be edited.

**Adaptation and identity.** Mobile keeps the current question and navigation actions in a stable order, without obscuring content behind fixed controls. Preserve reversibility, visible progress, and informative summaries; avoid one-click-per-word pacing, false urgency, and unexplained branching. Motion can be disabled entirely. **Effort: medium.**

## Implemented sample

Workshop Finder is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Visible progress
- Grouped clear choices
- Answers remain easy to revise

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: DM Sans. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f4f0ea; surface #ffffff; text #392d44; accent #6d4d8c. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/14-guided-journey/start
- Review your choices: /preview/14-guided-journey/review
- Required answer guidance: /preview/14-guided-journey/incomplete

## Neighbours and adaptation

- [01 Civic Service](../01-civic-service/DESIGN.md) uses single-column service guidance with a prerequisite rail and breadcrumbs and explicit back links. This reference keeps calm single-column question stage with a persistent answer summary and reversible steps and an editable review.
- [29 Calm Sanctuary](../29-calm-sanctuary/DESIGN.md) uses one narrow, low-stimulation column with voluntary pacing and a few activities, back links, and an ordinary exit. This reference keeps calm single-column question stage with a persistent answer summary and reversible steps and an editable review.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/14/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
