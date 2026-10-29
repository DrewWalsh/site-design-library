# 77 Palimpsest City

**Idea.** A place is several histories occupying the same coordinates.

**Composition.** The atlas occupies the entire opening viewport. A compact catalogue label floats over its upper-left margin, independent layer switches occupy the opposite corner, and irregular numbered tags sit directly in the map. There is no introductory banner.

**Navigation and complete example.** Explore four fictional periods of the Silt railway district, select one of six addresses, compare its uses and read the resident accounts associated with it.

**Responsive and inclusive behaviour.** The map remains the first surface on phones. Two small overlay controls leave the centre available, with a text address key below and large location buttons. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Adaptation.** Use independently legible evidence layers and honest source labels; preserve spatial relationships when simplifying the map. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Rafaël Rozendaal — Internet works](https://www.newrafael.com/internet?filter=website); [Aaron Koblin — The Wilderness Downtown](https://www.aaronkoblin.com/project/the-wilderness-downtown/). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Layer visibility
- Spatial evidence
- Address comparison

## Routes

- Entry: /preview/77-palimpsest-city/start
- One address across time: /preview/77-palimpsest-city/address
- Resident accounts: /preview/77-palimpsest-city/accounts

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
