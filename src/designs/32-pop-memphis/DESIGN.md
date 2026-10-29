# 32 Pop Memphis

**Philosophy and fit.** Make browsing feel exuberant and surprising while keeping decisions predictable. Fits playful lifestyle brands, creative clubs, youth-oriented events, and cheerful product launches.

**Visual grammar.** Offset blocks, squiggles, stipple patterns, contrasting outlines, and deliberately mismatched geometric frames provide the visual language. Lavender, mint, melon, and black carry a bold rounded display face over plain body text. Navigation stays anchored in a solid strip; patterns occupy margins and section transitions.

**Composition.** The opening is a crowded kit shop window: an arched paper kit, a tilted print box and a tall clay parcel carry attached contents and purchase controls. A starburst club stamp crosses the display; a solid ink strip anchors navigation. No marketing hero precedes the objects.

**Specimen and flow.** _Odd Objects Club_ offers fictional monthly creative kits. Explore a themed collection, inspect kit contents, and customise a sample bundle. Supporting views include a member-project gallery and a bundle summary with an incompatible-item explanation. The interaction is ordinary selection, supported by lively visual responses.

**Responsive and inclusive behaviour.** The phone display becomes a sequence of differently shaped, slightly offset parcels. Labels and selection controls remain straight and large inside each object. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Identity rules.** Preserve deliberate clashes of pattern and shape. Avoid repeating identical cards, using patterns beneath body copy, or letting random rotation impair controls. **Effort: medium.**

## Implemented sample

Odd Objects Club is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Deliberate pattern clashes
- Mismatched geometric frames
- Predictable controls in playful surfaces

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Space Grotesk. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #fff0dd; surface #ffffff; text #332a44; accent #ab4167. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/32-pop-memphis/start
- Customise a sample bundle: /preview/32-pop-memphis/bundle
- Member projects: /preview/32-pop-memphis/gallery

## Neighbours and adaptation

- [31 Bauhaus Workshop](../31-bauhaus-workshop/DESIGN.md) uses rectilinear programme grid with geometric category markers and geometric programme index and syllabus. This reference keeps offset patterned collection blocks anchored by a solid navigation strip and kit selection and an ordinary bundle builder.
- [33 Playroom](../33-playroom/DESIGN.md) uses tactile tabletop with visible parts, slots, and a deterministic result and parts library, explicit placement, and saved construction. This reference keeps offset patterned collection blocks anchored by a solid navigation strip and kit selection and an ordinary bundle builder.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Space Grotesk, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/32/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.

## Distinctive composition

The opening is a crowded kit shop window: an arched paper kit, a tilted print box and a tall clay parcel carry attached contents and purchase controls. A starburst club stamp crosses the display; a solid ink strip anchors navigation. No marketing hero precedes the objects.
