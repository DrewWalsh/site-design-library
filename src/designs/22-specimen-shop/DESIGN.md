# 22 Specimen Shop

**Philosophy and fit.** Present a small collection as objects worth studying. Appropriate for ceramics, independent furniture, collectible editions, and carefully made products with material stories.

**Visual grammar.** Each object occupies a large photographic plate, followed by a caption, dimensions, material swatches, and a restrained purchase rail. Use asymmetric whitespace, a compact index navigation, an elegant serif for object names, and a precise sans for specifications. Bone backgrounds, near-black text, and one mineral accent keep attention on surface and shape.

**Specimen and flow.** _Form Number_ offers a fictional ceramics collection. Browse an object index, open a numbered vessel, change its glaze, and add it to a local bag. Supporting views include a material-study page and a bag with quantity and sold-out states. A visible detail photograph supports inspection without requiring zoom gestures.

**Responsive behaviour.** Plates stack above specifications; the purchase rail becomes an ordinary in-flow block. Image changes are immediate under reduced motion.

**Identity rules.** Preserve the object-and-caption relationship. Avoid luxury-site vagueness, tiny essential text, and compulsory cinematic transitions. **Effort: medium.**

## Implemented sample

Form Number is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Object-and-caption relationship
- Visible material and dimension details
- Asymmetric photographic whitespace

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Libre Baskerville. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f3f0e9; surface #ffffff; text #302f29; accent #62594b. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/22-specimen-shop/start
- Vessel 03 / material detail: /preview/22-specimen-shop/detail
- Your sample bag: /preview/22-specimen-shop/bag

## Neighbours and adaptation

- [04 Quiet Atelier](../04-quiet-atelier/DESIGN.md) uses spacious introduction and staggered image-caption project sequence and modest text navigation and project index. This reference keeps large object plate with precise caption and a restrained purchase rail and numbered object index.
- [21 Utility Storefront](../21-utility-storefront/DESIGN.md) uses compact purchasable sku matrix with a category tree and compatibility filters, part codes, and a local basket. This reference keeps large object plate with precise caption and a restrained purchase rail and numbered object index.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Libre Baskerville, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/22/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
