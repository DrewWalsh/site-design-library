# 80 Braided Voices

**Idea.** Follow a life through the points where it crosses another.

**Composition.** Four coloured text strands travel down a warm page, crossing at shared moments. Quotes, times and connecting curves become the navigation.

**Navigation and complete example.** Follow four neighbours through six moments in one day, switch voices at a crossing and compare their accounts in a complete transcript.

**Responsive and inclusive behaviour.** Narrator controls remain explicit; each chronological crossing becomes a compact two-column weave, then a readable stacked transcript on very narrow screens. All controls are native buttons or labelled inputs. Movement is discretionary, no sound starts automatically, reduced-motion preferences remove transitions, and a direct index exposes the same content.

**Adaptation.** Maintain different voices with common coordinates. Give readers a way to see who is speaking without relying on strand colour. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Aaron Koblin — The Wilderness Downtown](https://www.aaronkoblin.com/project/the-wilderness-downtown/); [Conditional Design manifesto](https://conditionaldesign.org/manifesto/). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Braided narration
- Shared moments
- Parallel transcripts

## Routes

- Entry: /preview/80-braided-voices/start
- A shared moment: /preview/80-braided-voices/crossing
- Complete transcript: /preview/80-braided-voices/transcript

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
