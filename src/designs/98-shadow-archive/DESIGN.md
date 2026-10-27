# 98 Shadow Archive

**Idea.** Changing the light can change which part of an object becomes readable.

**Composition.** Small original geometric objects cast enormous lavender silhouettes across an ochre field. Directional light controls transform the composition and the captions attached to it.

**Navigation and complete example.** Choose one of four light directions, inspect six object studies through their labelled shadows and compare how each projection supports a different reading.

**Responsive and inclusive behaviour.** Each shadow is clipped within its own generous field, while labels remain untransformed and controls retain a fixed position. All controls are native buttons or labelled inputs. Movement is discretionary, no sound starts automatically, reduced-motion preferences remove transitions, and a direct index exposes the same content.

**Adaptation.** Keep projected shapes secondary to clear labels and focus targets. Light should reveal an authored interpretation, not merely animate an ornamental shadow. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Rafaël Rozendaal — Internet works](https://www.newrafael.com/internet?filter=website). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Light-direction navigation
- Projected silhouettes
- Alternate readings

## Routes

- Entry: /preview/98-shadow-archive/start
- Object and projection: /preview/98-shadow-archive/object
- Complete shadow index: /preview/98-shadow-archive/index

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
