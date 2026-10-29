# 97 Curtain Bureau

**Idea.** A website can be read through entrances, acts and the space behind a performance.

**Composition.** The browser opens inside a full-height theatre curtain. The title is printed as a stacked theatrical bill on the fabric; a round rope-pull opens the stage, while a small angled ticket leads to the programme. The performance replaces the page shell.

**Navigation and complete example.** Open a fictional theatre, move through three short acts, read the three corresponding backstage notes, then reserve a sample programme locally.

**Responsive and inclusive behaviour.** The phone preserves the curtain, bill and reachable pull without squeezing stage controls. Act selectors and backstage notes remain available below; no content requires animation to finish. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

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
