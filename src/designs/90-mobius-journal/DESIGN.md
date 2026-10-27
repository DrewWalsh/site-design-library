# 90 Mobius Journal

**Idea.** A finished account and its discarded drafts belong to the same surface.

**Composition.** A cobalt ribbon folds across a cream field, with numbered seams, reversed faces and long horizontal passages. Flipping exposes process writing on the back.

**Navigation and complete example.** Follow six stations of an imagined river walk, flip between polished prose and field notes and read a station’s two versions together.

**Responsive and inclusive behaviour.** The ribbon becomes a vertically folded strip with discrete seam controls. Flipping is a button action, never a motion or orientation requirement. All controls are native buttons or labelled inputs. Movement is discretionary, no sound starts automatically, reduced-motion preferences remove transitions, and a direct index exposes the same content.

**Adaptation.** Use the two faces for a meaningful editorial relation such as account/evidence or finished/draft. Keep a finite index and stable location labels. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Conditional Design manifesto](https://conditionaldesign.org/manifesto/); [Aaron Koblin — The Wilderness Downtown](https://www.aaronkoblin.com/project/the-wilderness-downtown/). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Two-sided reading
- Ribbon navigation
- Draft comparison

## Routes

- Entry: /preview/90-mobius-journal/start
- A station in two versions: /preview/90-mobius-journal/station
- All six seams: /preview/90-mobius-journal/index

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
