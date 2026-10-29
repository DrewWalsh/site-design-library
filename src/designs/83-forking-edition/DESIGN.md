# 83 Forking Edition

**Idea.** The sentence itself can be a doorway into another reading.

**Composition.** The visitor enters directly into large branching prose, led by a drop cap. The chapter title is a small running label; a narrow vertical path trace marks the page edge. Underlined phrases, rather than a hero or menu, provide the central navigation.

**Navigation and complete example.** Read a complete miniature branching novella: three opening choices lead through six passages to three distinct endings. Undo a choice or review the route without losing your place.

**Responsive and inclusive behaviour.** Phone typography retains generous literary prose and inline choices. The running path moves below the passage, with an explicit undo control. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Adaptation.** Write choices as part of the voice, and make every branch pay off in content. Avoid turning the story into a survey or a card-based wizard. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Typatone](https://typatone.com/); [Conditional Design manifesto](https://conditionaldesign.org/manifesto/). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Inline branching prose
- Reversible reading path
- Three endings

## Routes

- Entry: /preview/83-forking-edition/start
- An opened passage: /preview/83-forking-edition/passage
- Your reading path: /preview/83-forking-edition/path

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
