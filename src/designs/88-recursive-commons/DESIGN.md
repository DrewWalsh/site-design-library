# 88 Recursive Commons

**Idea.** Enter a collection by changing the composition of the entire page.

**Composition.** The entire opening is a nested museum plan made from unequal, heavily framed colour regions. Each region is a real entrance; the first region contains further frame geometry and sibling regions occupy the remainder. A small ancestry label floats over the plan instead of forming a page header.

**Navigation and complete example.** Enter three wings of a fictional museum, subdivide their rooms, read six object records and keep a personal cabinet. An ancestry trail and full index provide direct access.

**Responsive and inclusive behaviour.** On phones the large nested regions unfold vertically, preserving heavy parent frames and distinct sibling colours. The ancestry control stays compact and every room has a direct labelled entrance. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Adaptation.** Make each level change the whole composition while retaining a clear parent path. Avoid an endless zoom with no readable destination. Retain the relationship between navigation and content. Do not reduce the reference to a generic hero followed by interchangeable cards.

**Research.** [Rafaël Rozendaal — Internet works](https://www.newrafael.com/internet?filter=website); [Bruno Simon — HTML version](https://bruno-simon.com/html/). These are conceptual precedents, not copied artwork, source code, branding or text. All diagrams and sample writing in this specimen are original, fictional material.

## Defining patterns

- Recursive navigation
- Planar containment
- Persistent ancestry

## Routes

- Entry: /preview/88-recursive-commons/start
- Object record: /preview/88-recursive-commons/object
- Saved cabinet: /preview/88-recursive-commons/collection

## Implementation and assets

The independent Vue component owns its layout and interaction. Only history navigation and optional local storage come from useSpecimen.ts. The ZIP contains the helper, runnable project, fonts, original source, all captures and their checksums. Local font files retain their OFL notices. CSS/SVG artwork is MIT; any photographs retain the notices in assets.json and THIRD_PARTY.md.
