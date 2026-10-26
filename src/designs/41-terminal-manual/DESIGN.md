# 41 Terminal Manual

**Philosophy and fit.** Make technical information feel immediate, inspectable, and economical. Suitable for developer documentation, command reference guides, release logs, and technical portfolios.

**Visual grammar.** Build a text-first document with a narrow command index, full-width examples, prompt markers, and terse status labels. Use a monospace family with comfortable line spacing, near-black surfaces, warm pale text, and limited green or amber accents. Heading hierarchy and ordinary underlined links carry the structure; colour alone never identifies a command’s status.

**Specimen and flow.** _Relay CLI_ documents a fictional file synchronisation utility. Select a command, inspect its arguments, edit a harmless example’s options, and copy the resulting sample command. Supporting states are search with no matching command and an expanded examples section. Nothing executes in a shell.

**Mobile and motion.** Move the index into an accessible disclosure and let long code blocks scroll within their own bounds. Text appears immediately; simulated typing is optional and off by default.

**Identity and effort.** Preserve text density and documentation logic; avoid demanding typed commands to navigate or decorating every page with fake hacker output. **Effort: low.**

## Implemented sample

Relay CLI is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Documentation hierarchy carries the identity
- Inspectable examples with clear options
- No typing required to navigate

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: IBM Plex Mono. Reading: IBM Plex Mono. Local WOFF2 fonts with system fallbacks. Page #18201e; surface #242e28; text #e2dfce; accent #a9c39c. Eight-pixel base spacing; reading measure 65ch; width 1240px. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/41-terminal-manual/start
- Expanded examples: /preview/41-terminal-manual/examples
- Command search: /preview/41-terminal-manual/search

## Neighbours and adaptation

- [42 Teletext Bulletin](../42-teletext-bulletin/DESIGN.md) uses numbered broadcast bulletin with colour bands and compact text rows and page numbers supplemented by ordinary visible links. This reference keeps text-first command manual with a narrow index and full-width code examples and searchable command links and ordinary section navigation.
- [13 Project Workbench](../13-project-workbench/DESIGN.md) uses three-pane project tree, central scene, and contextual inspector and hierarchical object selection and named mobile views. This reference keeps text-first command manual with a narrow index and full-width code examples and searchable command links and ordinary section navigation.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: IBM Plex Mono.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/41/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
