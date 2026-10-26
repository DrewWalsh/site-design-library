# 09 Glossy Fashion

**Philosophy and fit.** Use art direction and image sequencing to establish a strong editorial world. Suitable for fashion publications, visual culture platforms, photography features, and campaign-led brands.

**Visual grammar.** Compose a full-bleed cover image with an assertive display serif, tightly edited cover lines, and a discreet issue navigation. Interior pages alternate large photographic spreads, intentional white space, cropped details, and short interviews. Use black, paper white, and a single seasonal acid accent. Keep body copy on stable, readable surfaces even when headlines intersect images.

**Specimen and flow.** _Contour Quarterly_ presents a fictional visual culture issue. Visitors enter a cover story, move through its image-led chapters, and explore the contributors. Supporting screens provide an issue archive and an image detail view with caption and credit.

**Adaptation and identity.** Mobile uses dedicated portrait crops and restores headings to predictable positions. Preserve editorial image scale and deliberate sequencing; avoid retail product grids, anonymous stock imagery, illegible type overlays, and page-turn gimmicks. Motion remains optional. **Effort: medium.**

## Implemented sample

Contour Quarterly is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Deliberate image scale
- Portrait-aware mobile composition
- A distinct issue identity

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Libre Baskerville. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f3f2eb; surface #ffffff; text #191b18; accent #d8e34a. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/09-glossy-fashion/start
- The quiet edge: /preview/09-glossy-fashion/story
- Issue archive: /preview/09-glossy-fashion/archive

## Neighbours and adaptation

- [06 Editorial Newspaper](../06-editorial-newspaper/DESIGN.md) uses newspaper masthead, ranked lead story, secondary columns, and compact briefs and section links and article reading. This reference keeps photographic cover with large display type and alternating editorial spreads and issue chapters and contributor credits.
- [36 Punk Zine](../36-punk-zine/DESIGN.md) uses irregular editorial collage with a plain contents strip and issue contents and chronological archive. This reference keeps photographic cover with large display type and alternating editorial spreads and issue chapters and contributor credits.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Libre Baskerville, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/09/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
