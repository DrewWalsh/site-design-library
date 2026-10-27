# 100 Powers of Scale

**Idea.** Changing scale should change the question, not only the magnification.

**Composition.** The opening screen is an extreme close-up of a woven thread. Discrete semantic zooms replace it with cloth, garment, workshop and town, with scale rulers embedded in each full-page illustration.

**Navigation and complete example.** Move through fibre, cloth, garment, workshop and town in an original illustrated material journey. Each zoom changes the content and units, and the complete account links all five scales.

**Responsive and inclusive behaviour.** The scene uses responsive vector art with a persistent scale selector. Zoom is discrete and button-controlled, so pinch gestures, motion and precise pointing are unnecessary. All controls are native buttons or labelled inputs. Movement is discretionary, no sound starts automatically, reduced-motion preferences remove transitions, and a direct index exposes the same content.

**Adaptation.** Give each scale a different level of explanation. Preserve a stable material identity across transitions and provide a complete linear account. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Neal Agarwal — The Deep Sea](https://neal.fun/deep-sea/); [Rafaël Rozendaal — Internet works](https://www.newrafael.com/internet?filter=website). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Semantic zoom
- Scale-dependent stories
- Material journey

## Routes

- Entry: /preview/100-powers-of-scale/start
- Story at this scale: /preview/100-powers-of-scale/story
- The complete material journey: /preview/100-powers-of-scale/journey

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
