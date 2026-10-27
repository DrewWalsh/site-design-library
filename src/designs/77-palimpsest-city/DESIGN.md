# 77 Palimpsest City

**Idea.** A place is several histories occupying the same coordinates.

**Composition.** Translucent blue, rust and charcoal plans overlap on parchment. Street names, contour marks and marginal testimony form a full-page atlas.

**Navigation and complete example.** Explore four fictional periods of the Silt railway district, select one of six addresses, compare its uses and read the resident accounts associated with it.

**Responsive and inclusive behaviour.** The plan retains a square aspect ratio, with large numbered location controls and a text key underneath. All controls are native buttons or labelled inputs. Movement is discretionary, no sound starts automatically, reduced-motion preferences remove transitions, and a direct index exposes the same content.

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
