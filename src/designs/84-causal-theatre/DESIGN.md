# 84 Causal Theatre

**Idea.** A visitor should be able to change the argument and see why it changes.

**Composition.** An illustrated parcel machine is the page: a tilted arrival hopper, rounded sorting tower and wheeled dispatch block sit on one heavy conveyor. Each control is physically attached to its machine and the output is a printed verdict slip. There is no promotional introduction.

**Navigation and complete example.** Change incoming parcels, sorting capacity and route frequency in a deterministic parcel-system model. Inspect the bottleneck and save two outcomes for comparison.

**Responsive and inclusive behaviour.** On phones the same mechanism becomes a vertical conveyor, with each machine and its control kept together. All model inputs and explanations remain native, explicit controls. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Adaptation.** Expose the model’s assumptions and connect each control to a visible consequence. Do not present a toy model as a real operational forecast. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Nicky Case — The Wisdom and/or Madness of Crowds](https://ncase.me/crowds/); [Conditional Design manifesto](https://conditionaldesign.org/manifesto/). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Causal controls
- Narrative simulation
- Outcome comparison

## Routes

- Entry: /preview/84-causal-theatre/start
- Why the queue changed: /preview/84-causal-theatre/explanation
- Compare two runs: /preview/84-causal-theatre/compare

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
