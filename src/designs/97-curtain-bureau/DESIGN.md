# 97 Curtain Bureau

**Idea.** A website can be read through entrances, acts and the space behind a performance.

**Composition.** A vermilion proscenium fills the browser. Folded curtains, deep black wings, a small illuminated stage and original paper performers create a theatrical reading space.

**Navigation and complete example.** Open a fictional theatre, move through three short acts, read the three corresponding backstage notes, then reserve a sample programme locally.

**Responsive and inclusive behaviour.** The stage remains a contained composition. Native act selectors, curtain control and backstage links sit outside moving scenery. All controls are native buttons or labelled inputs. Movement is discretionary, no sound starts automatically, reduced-motion preferences remove transitions, and a direct index exposes the same content.

**Adaptation.** Let theatrical depth organise the story, with controls always available. Avoid gating essential content behind animation or timed entrances. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Aaron Koblin — The Wilderness Downtown](https://www.aaronkoblin.com/project/the-wilderness-downtown/); [Rafaël Rozendaal — Internet works](https://www.newrafael.com/internet?filter=website). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Stage navigation
- Frontstage and backstage
- Programme reservation

## Routes

- Entry: /preview/97-curtain-bureau/start
- Curtain open / first act: /preview/97-curtain-bureau/performance
- Backstage notes: /preview/97-curtain-bureau/backstage
- Performance programme: /preview/97-curtain-bureau/programme

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
