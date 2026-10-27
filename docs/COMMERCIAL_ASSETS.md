# Commercial image references

The expansion adds **19 WebP assets (5.35 MiB)**: twelve credited photographs and seven generated illustrations. The [machine-readable manifest](https://drew-site-design-library.netlify.app/art/commercial-manifest.json) records public URLs, dimensions, SHA-256 checksums, alt text, suggested crops and provenance. Files are hosted in the existing public Tigris bucket under `assets/commercial/`; filenames include a checksum prefix. All 19 public downloads were checked against their local bytes on 2026-10-26.

## Photographs

The source pages identify these images as free under the [Unsplash License](https://unsplash.com/license), checked on 2026-10-26. None use the Unsplash+ license. The photos illustrate the design directions; the photographed people and places do not represent the library’s fictional businesses.

| Asset | Photographer and original source | Intended use |
| --- | --- | --- |
| barber-work | [Salah Regouane](https://unsplash.com/photos/a-close-up-of-a-person-cutting-another-persons-hair-MRCdF3qUbp0) | A barber shapes a client’s hair in a working salon. |
| clinic | [Kari Bjorn Photography](https://unsplash.com/photos/a-dental-room-with-a-desk-and-chairs-Fdku_oMrDvk) | An orderly dental treatment room with a chair, equipment and daylight. |
| craft | [qyy qyyy](https://unsplash.com/photos/carpenter-working-with-wood-in-a-workshop-oW4mPEcgdEc) | A craftsperson working with wood at a workshop bench. |
| eatery | [Vlad Savan](https://unsplash.com/photos/a-pizza-sitting-on-top-of-a-wooden-table-b6m0TXVOYKk) | A freshly baked pizza with tomato and basil on a wooden table. |
| gym | [TSquared Lab](https://unsplash.com/photos/woman-performs-exercise-with-trainer-at-gym-cCJQzTPkoFg) | A trainer supervises a person using a weighted sled in a gym. |
| hotel-exterior | [T (@tanyabarrow)](https://unsplash.com/photos/an-old-stone-manor-house-with-chimneys-under-bare-branches-5VvuO4OqzVA) | A stone country house with chimneys and a green lawn beneath bare branches. |
| hotel-room | [Marie Dehayes](https://unsplash.com/photos/hotel-bedroom-with-stone-wall-JQPdhYRLR24) | A hotel bedroom with a stone wall, round mirror and a bed dressed in white linen. |
| mechanic | [Jimmy Nilsson Masth](https://unsplash.com/photos/a-man-working-on-a-car-in-a-garage-jL9zfzTVSwY) | A mechanic changes oil beneath a raised car in a workshop. |
| property-exterior | [Jamie Hagan](https://unsplash.com/photos/a-house-with-a-stone-pathway-leading-to-the-front-door-sRG-fo7BYt8) | A bungalow with a covered porch and planted stone approach. |
| property-interior | [Elias Storm](https://unsplash.com/photos/a-modern-living-room-with-white-chairs-and-a-sofa-yrdhQzbNOcg) | A staged residential living room with a sofa and two armchairs. |
| shop | [T (@tanyabarrow)](https://unsplash.com/photos/a-flower-shop-display-with-baskets-of-plants-and-gifts-kQvpvuEqZVw) | A neighbourhood shop display with baskets of plants and gifts. |
| venue | [Lukas](https://unsplash.com/photos/a-large-room-with-tables-set-for-a-wedding-eSUXY2puRx0) | Long reception tables arranged inside a rustic event hall. |

## Generated illustrations

These were created using the built-in image generation tool. Their exact prompts are retained in the manifest’s `prompt` fields. The seven optimized files are also saved locally at `.work/commercial-assets/<id>.webp`; source PNGs are retained in that same ignored working directory. No image-generation CLI or external API key was used.

- **barber-portrait-1** — Illustrative portrait of a fictional barber wearing a navy shirt and brown work apron.
- **barber-portrait-2** — Illustrative portrait of a fictional barber with curly hair wearing a charcoal apron.
- **classroom** — Illustrative preschool classroom with low wooden tables, book shelves and a garden outlook.
- **practitioner** — Illustrative portrait of a fictional dental practitioner in sage scrubs.
- **renovation-after** — The same empty living room with pale oak flooring, linen curtains and renewed finishes after an illustrative renovation.
- **renovation-before** — An empty living room with worn brown carpet and dated finishes before an illustrative renovation.
- **teacher** — Illustrative portrait of a fictional early-years educator in a green cardigan.

The renovation after view was edited directly from the generated before image, preserving the camera, window, door and room geometry. Both have the same 3:2 dimensions. Use identical sizing and object positioning in the comparison, and caption the pair as an **AI-generated renovation illustration**, never as a documented client outcome.

Staff portraits and the preschool room are fictional illustrations. Visible captions should identify them as illustrative. The property exterior and interior are independent stock images, not photographs of one verified listing. The hotel exterior and bedroom are also independent stock photographs, used to illustrate arrival and room presentation rather than claim a single real property.

## Composition guidance

Keep photography connected to the visitor’s decision: show equipment and hands at the mechanic or workshop; readable room layouts for property and venue examples; staff faces at equal scale for appointment booking; and a close food image beside the eatery’s scannable prices. Use the manifest’s per-image crop guidance. Keep important information in HTML rather than on photographs.

The original `public/art/manifest.json` and its seven assets remain unchanged, so this separate collection does not invalidate the original 50 specimen captures.
