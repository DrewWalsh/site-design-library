# 99 Exquisite Assembly

**Idea.** Independent contributions can meet in a composition nobody authored alone.

**Composition.** Three full-width illustrated bands form a strange continuous landscape. Separate sky, figure and ground selectors expose the seams and the credits behind each combination.

**Navigation and complete example.** Combine three skies, three figures and three grounds from original SVG artwork, read the three contributors’ notes and save a numbered local edition with explicit credits.

**Responsive and inclusive behaviour.** Each band keeps a wide illustration crop with controls below it. Previous and next buttons replace any reliance on swiping. All controls are native buttons or labelled inputs. Movement is discretionary, no sound starts automatically, reduced-motion preferences remove transitions, and a direct index exposes the same content.

**Adaptation.** Make the seams and authorship visible. Every combination should remain intentionally composed, and assets must be original or correctly licensed. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Moniker — Neuhaus](https://studiomoniker.com/projects/neuhaus); [Conditional Design manifesto](https://conditionaldesign.org/manifesto/). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Independent collage bands
- Combinatorial authorship
- Edition credits

## Routes

- Entry: /preview/99-exquisite-assembly/start
- Contributor story: /preview/99-exquisite-assembly/contributor
- Assembled edition: /preview/99-exquisite-assembly/edition

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
