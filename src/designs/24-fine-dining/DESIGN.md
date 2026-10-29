# 24 Fine Dining

**Philosophy and fit.** Build anticipation through pacing, seasonality, and precise hospitality. Suitable for restaurants, tasting experiences, wine bars, and small culinary venues.

**Visual grammar.** The menu provides the main compositional rhythm: course titles, descriptions, and prices arranged as a carefully typeset sequence. A narrow navigation offers menu, visit, and reservations. Deep oxblood, ivory, and muted brass support editorial food photography, a characterful serif, and generous vertical intervals. Rules and small botanical details replace repeated boxes.

**Composition.** The restaurant opens on a complete typeset menu sheet, with course headings, descriptions, prices and a vegetarian control. A narrow hospitality rail carries hours and reservations; botanical linework and a small photographic interlude establish atmosphere beside the menu.

**Specimen and flow.** _Ember & Orchard_ presents a seasonal restaurant. Read the current menu, inspect dietary information, and choose a date and party size in a local reservation demonstration. Supporting views include private dining and a clear unavailable-time state with nearby alternatives. The final confirmation is visibly a sample reservation.

**Responsive and inclusive behaviour.** A compact hours/reservation strip precedes the menu. Dish titles, prices and dietary information remain aligned; the food photograph follows the practical menu. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Identity rules.** Preserve the menu’s reading rhythm and practical visit information. Avoid autoplay ambience, illegible gold text, and hiding prices behind photographs. **Effort: medium.**

## Implemented sample

Ember & Orchard is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Course-led typographic rhythm
- Prices and dietary information visible
- Atmosphere beside practical hospitality

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Libre Baskerville. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #321d23; surface #432c30; text #f4ebdc; accent #dec192. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/24-fine-dining/start
- Reservation demonstration: /preview/24-fine-dining/reserve
- Private dining & visiting: /preview/24-fine-dining/visit

## Neighbours and adaptation

- [28 Grand Hotel](../28-grand-hotel/DESIGN.md) uses arrival photographs with an accompanying booking rail and comparable rooms and stay, explore, and explicit availability. This reference keeps seasonal menu sequence with generous intervals and a compact reservation rail and menu, visiting details, and sample reservations.
- [22 Specimen Shop](../22-specimen-shop/DESIGN.md) uses large object plate with precise caption and a restrained purchase rail and numbered object index. This reference keeps seasonal menu sequence with generous intervals and a compact reservation rail and menu, visiting details, and sample reservations.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Libre Baskerville, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/24/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.

## Distinctive composition

The restaurant opens on a complete typeset menu sheet, with course headings, descriptions, prices and a vegetarian control. A narrow hospitality rail carries hours and reservations; botanical linework and a small photographic interlude establish atmosphere beside the menu.
