# 85 Redaction Office

**Idea.** Revealing a line should change the meaning of what surrounds it.

**Composition.** Huge black redaction bands cut across pale lavender paper. Numbered evidence margins and stark oversized headings turn disclosure into the page architecture.

**Navigation and complete example.** Reveal six passages in a fictional correspondence about a closed public garden, inspect two conflicting annotations and arrange the documented events chronologically.

**Responsive and inclusive behaviour.** Redaction controls wrap as full-width bands, with reveal labels always visible and the evidence margin moved above each passage. All controls are native buttons or labelled inputs. Movement is discretionary, no sound starts automatically, reduced-motion preferences remove transitions, and a direct index exposes the same content.

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
