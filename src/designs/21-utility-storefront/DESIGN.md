# 21 Utility Storefront

**Philosophy and fit.** Make a purchase easy to evaluate. Suitable for hardware, supplies, specialist equipment, and stores where specifications, availability, and compatibility matter more than a campaign image.

**Visual grammar.** A category tree and breadcrumbs lead into a dense purchasable SKU matrix. Each compact row has a part code, compatibility, stock, quantity input, and add action; thumbnails remain small. Use a utilitarian condensed sans for category labels, monospaced part codes, graphite text, white surfaces, blue links, and amber availability notices. Subtle row bands and rules organise information.

**Specimen and flow.** _Bench Supply_ sells workshop tools. Choose a battery platform, configure compatible tool and battery quantities directly in the matrix, and review a local basket. Supporting views include a compatibility detail and a basket with an unavailable-item state. A bulk-entry control accepts known fixture part codes.

**Responsive behaviour.** The category tree becomes a disclosure; each SKU becomes a compact labelled block retaining quantity and add controls. The shopping flow remains usable by keyboard and does not depend on hover.

**Identity rules.** Preserve visible specifications and restrained merchandising. Avoid oversized lifestyle heroes, hidden pricing, and arbitrary card heights. **Effort: medium.**

## Implemented sample

Bench Supply is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Quantity controls in the matrix
- Compatibility before merchandising
- Clear availability and part codes

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Bebas Neue. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f5f6f4; surface #ffffff; text #26333d; accent #285f9a. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/21-utility-storefront/start
- Local basket: /preview/21-utility-storefront/basket
- Battery compatibility: /preview/21-utility-storefront/compatibility

## Neighbours and adaptation

- [20 The Directory](../20-the-directory/DESIGN.md) uses stable facet rail and comparable horizontal venue listings and facets, detail pages, and a short comparison tray. This reference keeps compact purchasable sku matrix with a category tree and compatibility filters, part codes, and a local basket.
- [22 Specimen Shop](../22-specimen-shop/DESIGN.md) uses large object plate with precise caption and a restrained purchase rail and numbered object index. This reference keeps compact purchasable sku matrix with a category tree and compatibility filters, part codes, and a local basket.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Bebas Neue, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/21/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
