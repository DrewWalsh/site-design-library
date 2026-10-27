# 19 Conversation Desk

**Philosophy and fit.** Make a bounded information exchange feel direct and responsive. Suitable for product guidance, structured support, intake, and interactive learning with a clearly defined decision tree.

**Visual grammar.** A compact conversation window with guide and visitor bubbles sits beside a live summary of resolved answers. Use humanist sans text, warm white, dark ink, restrained blue response emphasis, and subtle dividers between exchanges. Present suggested replies as explicit controls and longer explanations as readable paragraphs. A small persistent navigation offers restart, review, and a direct browse alternative.

**Specimen and flow.** _Desk Guide_ helps a fictional coworking visitor choose a workspace. Visitors answer a finite set of scripted questions, receive a fixture recommendation, and revise an earlier answer. Supporting states show an unsupported free-text response with suggested choices and a complete answer summary.

**Adaptation and identity.** Mobile keeps the active exchange and summary easy to reach without trapping the viewport. Preserve conversational continuity and editable answers; avoid fake typing delays, claims of intelligence, and mandatory chat for information available directly. **Effort: medium.**

## Implemented sample

Desk Guide is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Visible conversational continuity
- Editable collected answers
- A complete non-chat alternative

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: DM Sans. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #fbf8f1; surface #ffffff; text #2e3940; accent #386b89. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/19-conversation-desk/start
- Answer summary: /preview/19-conversation-desk/summary
- Browse workspaces: /preview/19-conversation-desk/browse

## Neighbours and adaptation

- [14 Guided Journey](../14-guided-journey/DESIGN.md) uses calm single-column question stage with a persistent answer summary and reversible steps and an editable review. This reference keeps compact scripted conversation beside a live answer summary and suggested replies, review, restart, and direct browse.
- [20 The Directory](../20-the-directory/DESIGN.md) uses stable facet rail and comparable horizontal venue listings and facets, detail pages, and a short comparison tray. This reference keeps compact scripted conversation beside a live answer summary and suggested replies, review, restart, and direct browse.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/19/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.

## Distinctive composition

A compact conversation window shows guide bubbles, user replies, reply chips, and an adjacent summary sheet. The entry reads as a bounded conversation immediately, separating it from the centred Guided Journey wizard.
