# 23 Market Bazaar

**Philosophy and fit.** Make the individuality of many sellers part of the browsing experience. Useful for craft marketplaces, community markets, independent food halls, and local maker directories.

**Visual grammar.** Organise the page into recognisable stalls rather than a uniform product wall. Each vendor receives a coloured sign, short introduction, and horizontal shelf of items. Warm cream supports paprika, cobalt, and mustard accents. Rounded display lettering identifies stalls; straightforward body type handles prices, ingredients, and collection information.

**Composition.** A striped market awning, actual date and collection hours lead immediately into individual vendor stalls. Coloured signs and product shelves carry the identity. Vendor detail sheets retain the same seller colour and sign-like title rather than reverting to a generic article.

**Specimen and flow.** _Saturday Market_ contains fictional bakers, potters, and growers. Choose a market date, browse stalls, and assemble a local collection basket. Supporting views include a vendor profile and a basket grouped by collection location. An empty date state explains when the next market occurs.

**Responsive and inclusive behaviour.** The date selector sits beside short practical market details. Each coloured vendor sign introduces its product shelf, with ordinary labelled purchase controls. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Identity rules.** Preserve vendor personality within predictable buying controls. Avoid making every stall a different application or replacing useful categories with decorative chaos. **Effort: medium.**

## Implemented sample

Saturday Market is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Stall-level personalities
- Products grouped by maker
- Collection basket grouped by location

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Space Grotesk. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #fff6df; surface #ffffff; text #3f3429; accent #b3482d. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/23-market-bazaar/start
- Meet the maker: /preview/23-market-bazaar/vendor
- Collection basket: /preview/23-market-bazaar/basket

## Neighbours and adaptation

- [22 Specimen Shop](../22-specimen-shop/DESIGN.md) uses large object plate with precise caption and a restrained purchase rail and numbered object index. This reference keeps distinct vendor stalls with coloured signs and horizontal product shelves and market date and vendor anchors.
- [32 Pop Memphis](../32-pop-memphis/DESIGN.md) uses offset patterned collection blocks anchored by a solid navigation strip and kit selection and an ordinary bundle builder. This reference keeps distinct vendor stalls with coloured signs and horizontal product shelves and market date and vendor anchors.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Space Grotesk, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/23/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
