# 86 Registration Press

**Idea.** Alignment is an editorial act: the layers only make sense together.

**Composition.** Overscale cyan and magenta letterforms bleed across an entire press bed. Registration rings, crop marks and a small edition docket are part of the physical sheet; a separate control bar operates the ink plates at its lower edge.

**Navigation and complete example.** Align two ink plates for a fictional print exhibition, inspect six workshop notes and prepare a local print sheet containing the selected registration state.

**Responsive and inclusive behaviour.** The phone sheet uses a deliberate oversized crop while leaving the registration rings and edition action visible. Ink, offset and snap controls stay readable immediately below it. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Adaptation.** Use overprinting for large display layers while keeping reading text single-colour. The registration state should expose a meaningful compositional relationship. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Moniker — Conditional Design Workbook](https://studiomoniker.com/projects/conditional-design-workbook); [Conditional Design manifesto](https://conditionaldesign.org/manifesto/). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Ink plate controls
- Registration alignment
- Local print edition

## Routes

- Entry: /preview/86-registration-press/start
- The registration essay: /preview/86-registration-press/essay
- Print edition: /preview/86-registration-press/edition

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
