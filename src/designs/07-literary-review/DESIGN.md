# 07 Literary Review

**Philosophy and fit.** Treat sustained reading as the main event. Suitable for essays, criticism, literary magazines, personal publications, and thoughtful cultural commentary.

**Visual grammar.** An understated masthead opens into a current issue with one lead essay and a sparse textual contents list. Article pages use a generous book serif, a measured line length, clear paragraph rhythm, restrained drop capitals, and ample separation around section changes. Use ivory, charcoal, and muted forest accents. Navigation follows issues, authors, and subjects; small illustrations may punctuate reading without becoming the interface.

**Specimen and flow.** _The Long Afternoon_ lets visitors browse an issue, open an essay, and continue to the next essay through a deliberate end-of-article link. Supporting views include an author page and a reader preference panel for text size and line spacing.

**Adaptation and identity.** Mobile protects reading width and keeps preferences simple. Preserve the cadence of essays and the identity of each issue; avoid scholarly annotation rails, news urgency, autoplay media, and constant related-content interruptions. **Effort: low.**

## Implemented sample

The Long Afternoon is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Measured serif reading
- Issue-level identity
- Deliberate end-of-essay continuation

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Libre Baskerville. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #f5f1e7; surface #ffffff; text #29372e; accent #405d47. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/07-literary-review/start
- The art of staying: /preview/07-literary-review/essay
- About the contributor: /preview/07-literary-review/author

## Neighbours and adaptation

- [05 Scholarly Folio](../05-scholarly-folio/DESIGN.md) uses book-like reading column between chapter index and annotation margin and chapters, numbered annotations, and bibliography. This reference keeps literary issue with a large lead essay and a spare contents list and issue, essay, and author links.
- [06 Editorial Newspaper](../06-editorial-newspaper/DESIGN.md) uses newspaper masthead, ranked lead story, secondary columns, and compact briefs and section links and article reading. This reference keeps literary issue with a large lead essay and a spare contents list and issue, essay, and author links.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Libre Baskerville, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/07/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.

## Distinctive composition

Literary italic captions replace the collection’s repeated monospaced label treatment. The review’s editorial composition is retained.
