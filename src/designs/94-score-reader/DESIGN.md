# 94 Score Reader

**Idea.** A reading can be arranged across time and simultaneous voices.

**Composition.** Oversized measure numbers and four staves span a cream score. Coloured note blocks contain phrases; a playhead and voice controls make the score a working table of contents.

**Navigation and complete example.** Explore six measures across four authored voices, optionally advance the score at a calm pace, read each movement and arrange a local reading order. Optional tones are triggered only by an explicit sound control.

**Responsive and inclusive behaviour.** The score scrolls within a labelled bounded region, with measure buttons and a full transcript as alternatives. No content requires timed interaction. All controls are native buttons or labelled inputs. Movement is discretionary, no sound starts automatically, reduced-motion preferences remove transitions, and a direct index exposes the same content.

**Adaptation.** Use timing and polyphony to organise the writing. Keep sound optional, volume modest and every spoken or musical idea available as text. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Typatone](https://typatone.com/); [Conditional Design manifesto](https://conditionaldesign.org/manifesto/). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Score navigation
- Simultaneous voices
- Reading arrangement

## Routes

- Entry: /preview/94-score-reader/start
- Movement transcript: /preview/94-score-reader/movement
- Your reading score: /preview/94-score-reader/arrangement

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
