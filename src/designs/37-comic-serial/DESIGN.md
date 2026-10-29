# 37 Comic Serial

**Philosophy and fit.** Explain through sequence, juxtaposition, and a recognisable narrator. Suitable for illustrated journalism, educational stories, episodic fiction, and playful product explanations.

**Visual grammar.** Arrange scenes as panels with purposeful changes in scale: an establishing image, close detail, and explanatory beat. Chapter navigation sits above the story; a persistent progress label identifies the current scene. Use rounded display lettering for short dialogue, a readable sans serif for explanation, heavy ink boundaries, and a restrained illustration palette. Speech balloons never contain essential text solely inside an image.

**Composition.** An illustrated comic cover is the entry: the story title lives in the sky of the establishing panel, followed by a close character portrait, a wide evening pause and a shared scene. Dialogue and captions pace the page; chapter controls occupy the book’s gutter.

**Specimen and flow.** _Neighbourhood Mythologies_ presents fictional local history stories. Choose a chapter, move through its panels, then open the next episode. Supporting views are the illustrated chapter index and a complete text transcript with image descriptions.

**Responsive and inclusive behaviour.** Panels become an authored vertical strip. The first panel retains an illustrated cover, while close and wide shots remain visibly different and captions stay selectable. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Identity and effort.** Preserve narrative pacing and panel relationships; avoid rendering an ordinary landing page inside comic borders. **Effort: medium**, with a separate illustration workload.

## Implemented sample

Neighbourhood Mythologies is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Panel relationships create pacing
- Dialogue remains selectable text
- Complete descriptive transcript

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Space Grotesk. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f6e8cd; surface #ffffff; text #293d3b; accent #a74434. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/37-comic-serial/start
- Full text transcript: /preview/37-comic-serial/transcript
- Chapter index: /preview/37-comic-serial/chapters

## Neighbours and adaptation

- [36 Punk Zine](../36-punk-zine/DESIGN.md) uses irregular editorial collage with a plain contents strip and issue contents and chronological archive. This reference keeps authored narrative panels with establishing shots, close beats, and live dialogue and chapters, next episode, and a full text transcript.
- [34 Hand Drawn Desk](../34-hand-drawn-desk/DESIGN.md) uses numbered illustrated steps with attached callouts and a practice question and step index, diagram labels, and answer feedback. This reference keeps authored narrative panels with establishing shots, close beats, and live dialogue and chapters, next episode, and a full text transcript.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Space Grotesk, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/37/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
