# Site Design Library

50 distinct, working sample sites for choosing a visual direction and giving a coding model a concrete reference. Every design has a substantial main page, two supporting routes, an independent visual system, readable Vue source, tokens, a design brief, and captured references.

**Live library:** https://drew-site-design-library.netlify.app  
**Source:** https://github.com/DrewWalsh/site-design-library (private repository; use your authenticated GitHub account)

The gallery supports search, URL-persisted filters, grid/list views, side-by-side comparison, isolated desktop/phone/resizable previews, and a reference prompt with a primary design and optional secondary influence. All brands and business data are fictional. Forms, bookings, bags, messages, and saved items operate locally; the examples have no business backend.

## Run

Use Node 24 and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open http://127.0.0.1:5173. Each specimen lives at `/preview/ID-slug/start`; its detail page is `/designs/ID-slug`. Try `/preview/27-blueprint-studio/start` or `/compare?ids=01,27`.

```sh
pnpm build
pnpm test
```

Tests use installed Microsoft Edge on Windows and Playwright Chromium in CI. Elsewhere run `pnpm exec playwright install chromium` first. Automated checks cover all entry and supporting routes, reflow at 320/390/768/1440 pixels, keyboard skip links, axe accessibility checks, gallery behavior, and representative stateful journeys. They supplement visual review; they are not a formal accessibility certification or field-performance measurement.

## Use a reference

Choose a design, inspect its live page and full-page image, then use **Use this design** to copy an adaptation prompt. Read [the coding-model workflow](docs/AGENT_WORKFLOW.md) before copying components. The intent is to preserve composition, hierarchy, typography, navigation, and interaction character while adapting content and framework.

```text
src/designs/27-blueprint-studio/
  DESIGN.md      philosophy, visual rules, states and adaptation notes
  design.json    searchable metadata and reference-image URLs
  tokens.css     palette, type and spacing roles
  Demo.vue       complete independent sample
public/previews/27/capture.json   image checksums and source provenance
```

`catalogue.json` and `public/catalogue.json` are generated from the 50 metadata files. Public reference packages are generated under `/references/ID-slug/` at build time. Large reference images live in the dedicated Tigris bucket; the seven illustrative images and licensed fonts used by the pages are bundled locally. See [asset credits](docs/ASSETS.md).

## Maintain

Change the individual package, run the relevant browser tests, refresh its captures, review them, and mark it ready only when it is complete. The catalogue build rejects stale captures on ready designs. See [operations](docs/OPERATIONS.md) for captures, Tigris publishing, Netlify deployment, and the exact project identifiers.

The supplied design document is retained as [the product specification](docs/DESIGN.md). This implementation follows the clarified scope: all 50 are complete visual samples with representative interactions, rather than production business applications.
