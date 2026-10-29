# 42 Teletext Bulletin

**Philosophy and fit.** Deliver compact, regularly structured information through explicit sections and numbered pages. Suitable for event bulletins, community updates, sports summaries, and small informational directories.

**Visual grammar.** Use a broadcast-style title strip, visible page identifier, tightly organised text rows, block colour bands, and a footer of section links. Monospaced display text and rectangular graphics create the character. Keep a deliberately limited palette, while choosing text and background combinations that remain readable. Unlike a terminal, the page resembles an edited bulletin, without prompts or command history.

**Composition.** An edited broadcast index begins with page entry, town conditions, numbered event rows and a week-ahead column. Dense monospace information, strong coloured bands and page codes establish teletext; a large greeting no longer delays the bulletin.

**Specimen and flow.** _TownText_ is a fictional community notice service. Choose What’s On, open a numbered event page, and follow its booking information. Supporting views are the subject index and a saved-pages list stored locally. Dates are labelled sample content.

**Responsive and inclusive behaviour.** The page number and first three event rows fit near the top of the phone view. Secondary weekly notices follow in the same broadcast vocabulary. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Identity and effort.** Preserve editorial compression and numbered navigation; avoid mandatory memorised codes, flashing text, and pixel-game decoration. **Effort: low.**

## Implemented sample

TownText is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Edited information density
- Numbered page hierarchy
- Rectangular broadcast colour bands

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: IBM Plex Mono. Reading: IBM Plex Mono. Local WOFF2 fonts with system fallbacks. Page #101514; surface #1c302e; text #f1f0dc; accent #f1d95e. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/42-teletext-bulletin/start
- Numbered event page: /preview/42-teletext-bulletin/event
- Saved pages: /preview/42-teletext-bulletin/saved

## Neighbours and adaptation

- [41 Terminal Manual](../41-terminal-manual/DESIGN.md) uses text-first command manual with a narrow index and full-width code examples and searchable command links and ordinary section navigation. This reference keeps numbered broadcast bulletin with colour bands and compact text rows and page numbers supplemented by ordinary visible links.
- [38 Pixel Arcade](../38-pixel-arcade/DESIGN.md) uses arcade selection list beside a framed preview window and visible cartridge buttons and event details. This reference keeps numbered broadcast bulletin with colour bands and compact text rows and page numbers supplemented by ordinary visible links.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: IBM Plex Mono.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/42/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
