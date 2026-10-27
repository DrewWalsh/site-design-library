# 01 Civic Service

**Philosophy and fit.** Make a necessary task easy to understand and finish. Suitable for municipal services, public guidance, support centres, and practical organisations whose visitors arrive with a specific question.

**Visual grammar.** A compact wordmark bar leads into breadcrumbs, a plain page title, an explanatory summary, and one dominant reading column. A secondary contents rail appears only on long guidance pages. Use a humanist sans, strong headings, square controls, white backgrounds, dark navy text, and restrained green action emphasis. Show eligibility and required documents before the action.

**Specimen and flow.** _Northbank Council_ demonstrates finding a bulky waste collection service, checking requirements, and choosing a collection slot from local fixtures. Supporting states show an unavailable address and a confirmation page containing a reference and next steps.

**Adaptation and identity.** Mobile retains the same reading order and puts the contents list above the article. Preserve explicit labels, plain language, and task hierarchy; avoid decorative hero photography, ornamental cards, and surprise navigation. Motion is unnecessary. **Effort: low.**

## Implemented sample

Northbank Council is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Task-first headings
- Requirements before action
- Plain review and confirmation

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: DM Sans. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #fff; surface #ffffff; text #182d3d; accent #166347. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/01-civic-service/start
- Choose a collection: /preview/01-civic-service/book
- Booking confirmation: /preview/01-civic-service/confirmation

## Neighbours and adaptation

- [14 Guided Journey](../14-guided-journey/DESIGN.md) uses calm single-column question stage with a persistent answer summary and reversible steps and an editable review. This reference keeps single-column service guidance with a prerequisite rail and breadcrumbs and explicit back links.
- [25 Local Trades](../25-local-trades/DESIGN.md) uses plain service answers, visible coverage, and a practical price table and service selection and a short enquiry form. This reference keeps single-column service guidance with a prerequisite rail and breadcrumbs and explicit back links.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/01/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.

## Distinctive composition

Plain humanist service labels replace monospaced editorial captions. The existing task-first service composition remains.
