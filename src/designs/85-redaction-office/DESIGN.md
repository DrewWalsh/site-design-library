# 85 Redaction Office

**Idea.** Revealing a line should change the meaning of what surrounds it.

**Composition.** A released dossier lies at an angle on a grey desk. A large numbered stamp, uneven black redaction bands and marginal exhibit labels form the opening; the navigation sits outside the paper. Reveals change the shape and density of the actual document.

**Navigation and complete example.** Reveal six passages in a fictional correspondence about a closed public garden, inspect two conflicting annotations and arrange the documented events chronologically.

**Responsive and inclusive behaviour.** The paper becomes one readable column on phones. Redaction bands keep irregular indents without squeezing their revealed text; the stamp and controls remain separate from the reading area. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Adaptation.** Keep hidden text fictional or authorised for disclosure. Reveals should add context, and a full-dossier action must offer the same information without a puzzle. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Moniker — Click Click Click](https://studiomoniker.com/projects/click-click-click); [Conditional Design manifesto](https://conditionaldesign.org/manifesto/). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Progressive disclosure
- Conflicting annotations
- Evidence timeline

## Routes

- Entry: /preview/85-redaction-office/start
- A contested annotation: /preview/85-redaction-office/annotation
- Reconstructed timeline: /preview/85-redaction-office/timeline

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
