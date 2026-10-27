# 96 Rulewalk

**Idea.** A simple movement rule can become a curatorial point of view.

**Composition.** A saturated field of large numbered stepping stones fills the page. Arrows, a single rule and a visible route make the exhibition read like a graphic board rather than a gallery wall.

**Navigation and complete example.** Traverse nine original exhibition studies using adjacent or diagonal moves, inspect the work reached and review a route that exposes what the chosen rule omitted.

**Responsive and inclusive behaviour.** The board remains three columns with large numbered buttons; full work names and the current rule are repeated below it. A direct index reaches every work. All controls are native buttons or labelled inputs. Movement is discretionary, no sound starts automatically, reduced-motion preferences remove transitions, and a direct index exposes the same content.

**Adaptation.** Keep the movement rule explicit and use it to change the order of a real collection. Avoid scores, streaks or penalties that distract from reading. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Conditional Design manifesto](https://conditionaldesign.org/manifesto/); [Nicky Case — The Wisdom and/or Madness of Crowds](https://ncase.me/crowds/). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Rule-based traversal
- Visible route
- Curatorial constraints

## Routes

- Entry: /preview/96-rulewalk/start
- Work encountered: /preview/96-rulewalk/work
- Your exhibition route: /preview/96-rulewalk/route

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
