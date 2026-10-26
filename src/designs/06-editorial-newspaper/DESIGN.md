# 06 Editorial Newspaper

**Philosophy and fit.** Communicate editorial judgement across many stories at once. Suitable for newsrooms, city publications, trade journals, and frequently updated magazines.

**Visual grammar.** A strong masthead, date line, section navigation, lead story, secondary columns, and compact briefs create an unmistakable front page. Use assertive serif headlines, readable body text, small sans metadata, warm white, near-black ink, thin dividing rules, and restrained red alerts. Image scale indicates editorial priority. Stories share a typographic system without being enclosed in repetitive cards.

**Specimen and flow.** _The Northbank Record_ offers fictional local reporting. Visitors browse the front page, switch section, and open a feature with related coverage. Supporting states include a search results page and a saved-reading list with a clear empty state.

**Adaptation and identity.** Mobile keeps the lead hierarchy and orders secondary stories explicitly rather than stacking desktop columns blindly. Preserve visible editorial ranking, meaningful sections, and useful metadata; avoid infinite feeds, identical story weights, and a hero that consumes the whole opening screen. **Effort: medium.**

## Implemented sample

The Northbank Record is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Visible editorial ranking
- Unequal image and headline scales
- Rules instead of story cards

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Libre Baskerville. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f8f6ee; surface #ffffff; text #232825; accent #9b302f. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/06-editorial-newspaper/start
- The river path returns: /preview/06-editorial-newspaper/article
- Saved reading: /preview/06-editorial-newspaper/saved

## Neighbours and adaptation

- [09 Glossy Fashion](../09-glossy-fashion/DESIGN.md) uses photographic cover with large display type and alternating editorial spreads and issue chapters and contributor credits. This reference keeps newspaper masthead, ranked lead story, secondary columns, and compact briefs and section links and article reading.
- [07 Literary Review](../07-literary-review/DESIGN.md) uses literary issue with a large lead essay and a spare contents list and issue, essay, and author links. This reference keeps newspaper masthead, ranked lead story, secondary columns, and compact briefs and section links and article reading.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Libre Baskerville, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/06/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
