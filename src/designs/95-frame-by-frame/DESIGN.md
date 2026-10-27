# 95 Frame by Frame

**Idea.** A film’s timeline can become the publication’s reading surface.

**Composition.** Black film stock, sprocket holes and an unbroken horizontal contact strip carry original night-window illustrations. Huge frame numbers locate annotations precisely in time.

**Navigation and complete example.** Scrub an original 72-frame vector vignette, select one of six annotated moments, compare the storyboard with the finished scene and read its production notes.

**Responsive and inclusive behaviour.** The film strip is a contained horizontal scroller. A labelled range, previous/next frame buttons and six chapter links provide complete navigation. All controls are native buttons or labelled inputs. Movement is discretionary, no sound starts automatically, reduced-motion preferences remove transitions, and a direct index exposes the same content.

**Adaptation.** Attach information to meaningful temporal moments. Use a finite timeline and make motion pausable; do not require playback to access annotations. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Aaron Koblin — The Wilderness Downtown](https://www.aaronkoblin.com/project/the-wilderness-downtown/). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Frame scrubbing
- Temporal annotations
- Storyboard comparison

## Routes

- Entry: /preview/95-frame-by-frame/start
- Frame annotation: /preview/95-frame-by-frame/annotation
- Production notebook: /preview/95-frame-by-frame/production

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
