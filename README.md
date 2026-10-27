# Site Design Library

100 distinct, working sample sites for choosing a visual direction and giving a coding model a concrete reference. Every design has a substantial main page, two supporting routes, an independent visual system, readable Vue source, tokens, a design brief, and captured references.

**Live library:** https://drew-site-design-library.netlify.app  
**Source:** https://github.com/DrewWalsh/site-design-library (public, MIT licensed)

The gallery supports search by industry, visitor goal, conversion action, site structure, and interaction type, alongside visual filters. Search phrases such as “appointment-based local business”, “storage”, or “one-page brochure” find relevant references. Filters persist in the URL. Grid/list views, side-by-side comparison, isolated desktop/phone/resizable previews, and an adaptation prompt help turn a reference into a new project. All brands and business data are fictional. Forms, bookings, bags, messages, and saved items operate locally; the examples have no business backend.

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

Choose a design, inspect its live page and full-page image, then select **Download design ZIP**. Give the extracted folder and its `CODEX_PROMPT.md` to Codex or another coding model with your project request. The ZIP includes a runnable Vue starter, specifications, exact original source, local images/fonts, four screenshots and provenance, and license notices. No account or API key is needed. Alternatively, use **Use this design** to copy a URL-based adaptation prompt. Read [the coding-model workflow](docs/AGENT_WORKFLOW.md) before copying components. The intent is to preserve composition, hierarchy, typography, navigation, and interaction character while adapting content and framework.

```text
src/designs/27-blueprint-studio/
  DESIGN.md      philosophy, visual rules, states and adaptation notes
  design.json    searchable metadata and reference-image URLs
  tokens.css     palette, type and spacing roles
  Demo.vue       complete independent sample
public/previews/27/capture.json   image checksums and source provenance
```

`catalogue.json` and `public/catalogue.json` are generated from the 100 metadata files. Public reference packages are generated under `/references/ID-slug/` at build time. Large reference images live in the dedicated Tigris bucket. Seven original illustrative images and eight licensed font families are bundled locally; nineteen additional commercial images are hosted in Tigris. See [asset credits](docs/ASSETS.md) and [commercial imagery](docs/COMMERCIAL_ASSETS.md), also published under `/docs/` for reference-package readers.

## Public access and reuse

Original code, specifications and original artwork are [MIT licensed](LICENSE), including commercial adaptation. Keep the license notice. Photos and fonts retain their individual terms in [THIRD_PARTY.md](THIRD_PARTY.md) and the bundled asset manifests. Fictional examples are visual references, not real business claims or production backends.

Agents can read the gallery and every inspector without JavaScript. `/llms.txt`, `/llms-full.txt`, `/catalogue.json`, `/sitemap.xml` and `/references/` provide direct discovery and source access. `/downloads/index.json` lists every ZIP with its SHA-256 and byte size. ZIPs are built from an explicit file list and contain no repository credentials or environment files.

Designs 76–100 explore folds, layers, apertures, tuning, braided narration, opposing accounts, depth, branching prose, causal systems, redactions, printing, object navigation, recursive containment, negative space, reversible ribbons, patch cables, interface performance, drawing, scores, film, rules, theatre, shadows, collage and semantic zoom. See the [primary research and implementation map](docs/EXPERIMENTAL_RESEARCH.md).

## Maintain

Change the individual package, run the relevant browser tests, refresh its captures, review them, and mark it ready only when it is complete. The catalogue build rejects stale captures on ready designs. See [operations](docs/OPERATIONS.md) for captures, Tigris publishing, Netlify deployment, and the exact project identifiers.

The supplied design document is retained as [the product specification](docs/DESIGN.md). This implementation follows the clarified scope: all 100 are complete visual samples with representative interactions, rather than production business applications.
