# 38 Pixel Arcade

**Philosophy and fit.** Make browsing feel like selecting a game from a cabinet. Suitable for game clubs, indie releases, playful events, and compact entertainment directories.

**Visual grammar.** A framed screen contains a prominent selection list, a preview window, and a narrow status strip. Use pixel display lettering for short titles, ordinary readable type for descriptions, a dark background, sharply separated saturated colours, and deliberately stepped borders. Navigation uses visible buttons and links; directional keys can be an optional enhancement.

**Specimen and flow.** _Quarter Club_ is a fictional local games collective. Browse event cartridges, open a tournament’s details, and reserve a sample attendance slot locally. Supporting states are a filtered event selection and an explicit demo reservation confirmation. Rankings and attendance figures come from labelled fixtures.

**Mobile and motion.** Replace the cabinet frame with a compact selector above the preview. Controls remain finger sized. Disable flashes and looping attract sequences; sound starts only through a deliberate user action.

**Identity and effort.** Preserve discrete screen composition and game menu hierarchy; avoid neon decoration over standard SaaS cards. **Effort: medium.**

## Implemented sample

Quarter Club is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Discrete game-menu hierarchy
- Stepped borders and concise pixel titles
- Ordinary accessible reservation controls

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: Press Start 2P. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #171b30; surface #28314b; text #e8e8d9; accent #f1c568. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/38-pixel-arcade/start
- Tournament detail: /preview/38-pixel-arcade/event
- Sample attendance reservation: /preview/38-pixel-arcade/reserved

## Neighbours and adaptation

- [40 Desktop 1995](../40-desktop-1995/DESIGN.md) uses desktop tools with bevelled windows and an explicit task strip and named application launchers and window controls. This reference keeps arcade selection list beside a framed preview window and visible cartridge buttons and event details.
- [42 Teletext Bulletin](../42-teletext-bulletin/DESIGN.md) uses numbered broadcast bulletin with colour bands and compact text rows and page numbers supplemented by ordinary visible links. This reference keeps arcade selection list beside a framed preview window and visible cartridge buttons and event details.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: Press Start 2P, DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/38/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
