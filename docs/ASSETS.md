# Asset sources

Checked 26 October 2026. Assets are bundled locally, so specimens do not need a third-party font or image request. These images illustrate fictional design demonstrations; the photographers, subjects, buildings, and objects are not represented as clients or work made by the fictional brands.

## Fonts

The Latin WOFF2 files were downloaded from Google Fonts' official delivery endpoint. Exact source URLs, supported weights, and styles are recorded in `public/fonts/manifest.json`. Each family has its own CSS file; import only the families needed by a specimen. No shared gallery typography should be imported into the preview entry.

| Family and local CSS | Owner / authors | Bundled weight and style | Suggested use | License file |
| --- | --- | --- | --- | --- |
| DM Sans — `/fonts/dm-sans.css` | The DM Sans Project Authors | 400–700, normal | Services, readable UI, gallery | `public/fonts/dmsans-OFL.txt` |
| Libre Baskerville — `/fonts/libre-baskerville.css` | The Libre Baskerville Project Authors | 400–700, normal and italic | Essays, folios, captions, quiet display | `public/fonts/librebaskerville-OFL.txt` |
| Space Grotesk — `/fonts/space-grotesk.css` | The Space Grotesk Project Authors | 400–700, normal | Technical studios, Swiss composition, geometric type | `public/fonts/spacegrotesk-OFL.txt` |
| Archivo Black — `/fonts/archivo-black.css` | The Archivo Black Project Authors / Omnibus-Type | 400, normal | Heavy headlines, boards, expressive typography | `public/fonts/archivoblack-OFL.txt` |
| IBM Plex Mono — `/fonts/ibm-plex-mono.css` | IBM Corp. | 400, normal | Terminal manuals, part codes, drawing labels | `public/fonts/ibmplexmono-OFL.txt` |
| Bebas Neue — `/fonts/bebas-neue.css` | Dharma Type | 400, normal | Condensed festival and zine headlines | `public/fonts/bebasneue-OFL.txt` |
| Caveat — `/fonts/caveat.css` | The Caveat Project Authors | 400–700, normal | Short secondary handwritten annotations | `public/fonts/caveat-OFL.txt` |
| Press Start 2P — `/fonts/press-start-2p.css` | The Press Start 2P Project Authors | 400, normal | Short arcade labels; use an ordinary face for body text | `public/fonts/pressstart2p-OFL.txt` |

All eight families use SIL Open Font License 1.1. Original copyright notices and the complete license are included unmodified. The licenses were retrieved from the corresponding family folders in the [official Google Fonts repository](https://github.com/google/fonts/tree/main/ofl). Keep those license files when redistributing the bundled fonts. The fonts themselves are unchanged WOFF2 files supplied by Google Fonts.

Recommended fallbacks: DM Sans and Space Grotesk → `Arial, sans-serif`; Libre Baskerville → `Georgia, serif`; IBM Plex Mono → `Consolas, monospace`; Archivo Black and Bebas Neue → `Impact, sans-serif`; Caveat → `cursive`; Press Start 2P → `monospace`. The font manifest's weight ranges are deliberate; avoid relying on synthetic display weights outside them.

## Photography and visual imagery

Every listed asset was opened and visually inspected after download. Source descriptions can differ from what a crop shows; the descriptions below identify the local image accurately. The compact WebP derivatives were requested from Unsplash's image delivery service. No AI generation or local image transformation was used.

| Local asset | Description and useful context | Photographer / creator | Source |
| --- | --- | --- | --- |
| `/art/interior.webp` | Mustard armchair, light wall, floor lamp, and wood floor. The creator tags this as a digital interior render. Use for material-led interiors and the quiet atelier. | Kam Idris | [Modern minimalist home design](https://unsplash.com/photos/brown-wooden-framed-yellow-padded-chair-_HqHX3LBN18) |
| `/art/ceramics.webp` | Two stacked, speckled white ceramic bowls against a dark background. Use for numbered object plates and material study. | Tom Crew | [Sketches in clay](https://unsplash.com/photos/white-ceramic-vase-on-white-table-uDF1mW7EUwM) |
| `/art/lake.webp` | Vertical wooded alpine landscape reflected in still lake water. Use for nature features and atmospheric hospitality scenes. | Brian Cornelius | [Lake surrounded by mountains and trees](https://unsplash.com/photos/a-lake-surrounded-by-mountains-and-trees-GQKElQRnoIg) |
| `/art/fashion.webp` | Side profile of a woman in a burgundy coat in a wooded setting. Use as a credited visual culture image; do not invent a real biography or endorsement for the pictured person. | Emile Guillemot | [Woman wearing red coat](https://unsplash.com/photos/woman-wearing-red-coat-zNPtpMgdmQs) |
| `/art/concert.webp` | Monochrome audience and bright concert stage, with hands raised. Use for cultural programmes and the music journal. | Jonathan Ikemura | [The Rock Show](https://unsplash.com/photos/crowd-with-hands-up-at-a-bright-concert-stage-z0R4XB25ozI) |
| `/art/food.webp` | Close view of shrimp held above a bowl of sauce, with green salad below. Use for menu imagery and food detail. | Eiliv Aceron | [Food photograph](https://unsplash.com/photos/white-ceramic-plate-with-green-vegetable-and-white-cream-zZUCwzCxkFM) |
| `/art/architecture.webp` | Abstract geometric concrete façade beneath a clear blue sky. Use for architectural rhythm, detail plates, and visual studies. | Pierre Châtel-Innocenti | [Concrete Architecture 2/5](https://unsplash.com/photos/gray-concrete-building-o250-zxlElQ) |

All seven source pages identify their images as free under the [Unsplash License](https://unsplash.com/license). It permits downloading, copying, modification, distribution, and commercial or noncommercial use. Attribution is appreciated but not required; retain the credits here and use visible credits in editorial specimen contexts. The license excludes selling unmodified images and compiling a competing image service. These files support designed demonstration pages, not a stock-photo collection.

Exact delivery URLs, local dimensions, byte sizes, and SHA-256 checksums are recorded in `public/art/manifest.json`. Use `width` and `height` from that manifest to reserve image space. Use `object-fit` at the component level where needed, keeping an image's caption separate from essential interface text. Do not load all photographs at gallery startup; gallery thumbnails should use the captured specimen images.

## Original diagrams and graphics

Maps, drawing sheets, plots, mechanisms, geometric graphics, and fixture illustrations authored in specimen source are original project assets. The relevant design brief should identify the data as fictional or synthetic and give a text equivalent for information conveyed by a graphic. They do not depend on third-party imagery.
