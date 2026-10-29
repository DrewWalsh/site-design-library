# 40 Desktop 1995

**Philosophy and fit.** Present a small collection as familiar, named tools and folders. Suitable for portfolios, digital exhibitions, personal project collections, and compact creative utilities.

**Visual grammar.** A desktop, icon labels, bevelled window frames, title bars, and a task strip organise content into discrete applications. Use a neutral grey interface, one selected-state colour, compact system-like typography, and restrained bitmap accents. Windows have explicit open, close, minimise, and maximise controls; their content uses semantic document structure.

**Composition.** The desktop opens a genuine file browser: an address bar, file name/type/year rows and a selected project preview. The personal introduction lives in About, while identities, publications and websites use different preview treatments.

**Specimen and flow.** _Parcel OS_ is a fictional designer’s portfolio with only Projects, Contact, and Help windows. Open Projects, select a case study, then open its contact form. Supporting states are an application switcher and a help view explaining the controls. Window positioning is optional; a general desktop framework is outside the specimen's scope.

**Responsive and inclusive behaviour.** On phones the compact file rows remain above the selected preview, keeping application navigation and the selected file together. Native buttons, visible focus, a direct return path and reduced-motion support preserve access to the same content.

**Identity and effort.** Preserve the desktop’s task model; avoid decorative windows that obscure navigation or pretend to access the visitor’s filesystem. **Effort: high.**

## Implemented sample

Parcel OS is an expansive, bounded design reference. All organisations, events, prices, statistics and research claims are fictional fixtures. The page includes a complete primary composition and two local supporting routes that show its interaction and content hierarchy.

## Defining features

- Three named tools with actual states
- Window focus follows activation
- A mobile application list

## Adaptable choices

Brand, subject, accent and equivalent licensed typefaces can change. Preserve composition and navigation. Do not turn the hierarchy into a uniform collection of cards.

## Tokens and typography

Heading: DM Sans. Reading: DM Sans. Local WOFF2 fonts with system fallbacks. Page #3e7573; surface #e5e5df; text #19232a; accent #253b80. Base tokens define an eight-pixel spacing unit, 65ch reading measure and 1240px content width; the composition-specific rules in Demo.vue override these where the canvas, type or information density requires it. See tokens.css for role values and Demo.vue for composition. Palette and type match the working specimen.

## States

- Entry: /preview/40-desktop-1995/start
- Contact application: /preview/40-desktop-1995/contact
- Help application: /preview/40-desktop-1995/help

## Neighbours and adaptation

- [38 Pixel Arcade](../38-pixel-arcade/DESIGN.md) uses arcade selection list beside a framed preview window and visible cartridge buttons and event details. This reference keeps desktop tools with bevelled windows and an explicit task strip and named application launchers and window controls.
- [41 Terminal Manual](../41-terminal-manual/DESIGN.md) uses text-first command manual with a narrow index and full-width code examples and searchable command links and ordinary section navigation. This reference keeps desktop tools with bevelled windows and an explicit task strip and named application launchers and window controls.

## Assets

See [asset record](../../../docs/ASSETS.md). All vector diagrams and sample writing are original to this repository. Photos are illustrative, not evidence of the fictional brands. Font faces: DM Sans.

## Verification

Reviewed working sample. Browser checks cover entry-page reflow at 320, 390, 768, and 1440 pixels, keyboard entry, direct routes, and automated accessibility; both supporting routes are checked at 390 pixels. Capture metadata is stored in public/previews/40/capture.json and names the source content hash. Accessibility scans are supplementary; no formal WCAG certification or field-performance claim is made.
