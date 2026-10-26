# 33 Playroom

**Philosophy and fit.** Teach an interaction through visible, manipulable objects. Suitable for learning tools, creative configurators, simple games, and approachable planning experiences.

**Visual grammar.** A bounded tabletop contains chunky objects, recessed slots, tactile buttons, and a compact tool shelf. Rounded type, warm cream, tomato red, sky blue, and soft material shadows make the interface approachable. A clear instruction line sits outside the play area, and object labels remain ordinary readable text.

**Specimen and flow.** _Little Machine Lab_ uses a small fixed set of parts and slots with deterministic responses, without a general physics engine. Select parts, place them in slots, and run the demonstration. Supporting views include a parts library and a saved-construction view with an incomplete-machine state. Keyboard selection and explicit move controls provide every action available through dragging.

**Responsive behaviour.** The tabletop changes to a vertical sequence of slots rather than shrinking a desktop canvas. Optional spring motion becomes immediate state changes under reduced motion.

**Identity rules.** Preserve understandable cause and effect and tangible controls. Avoid ornamental toy shapes around conventional forms, mandatory sound, or physics effects that make precise actions unreliable. **Effort: high.**

## Implemented sample

Little Machine Lab is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Objects express cause and effect
- Button alternatives for every placement
- A bounded machine with readable feedback

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Space Grotesk. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f7ecd4; surface #fff8e8; text #3b3e37; accent #a83d2a. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/33-playroom/start
- Parts library: /preview/33-playroom/library
- Saved construction: /preview/33-playroom/saved

## Neighbours and adaptation

- [32 Pop Memphis](../32-pop-memphis/DESIGN.md) uses offset patterned collection blocks anchored by a solid navigation strip and kit selection and an ordinary bundle builder. This reference keeps tactile tabletop with visible parts, slots, and a deterministic result and parts library, explicit placement, and saved construction.
- [49 Parametric Studio](../49-parametric-studio/DESIGN.md) uses large svg specimen stage beside labelled numeric controls and preset strip and presets, direct parameter edits, and comparison. This reference keeps tactile tabletop with visible parts, slots, and a deterministic result and parts library, explicit placement, and saved construction.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Space Grotesk, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/33/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
