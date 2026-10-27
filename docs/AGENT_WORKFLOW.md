# Using a design with a coding model

1. Browse the gallery and select one primary design. Compare close alternatives before combining influences.
2. Open the live specimen. Inspect its main page, phone layout, supporting state, and full-page capture. A first-screen thumbnail alone does not describe the whole design.
3. Read `DESIGN.md`, `design.json`, and `tokens.css` in the selected package. Study `Demo.vue` to understand the hierarchy and behavior. Capture URLs and source checksums are recorded in the metadata.
4. Use the inspector's **Use this design** tab to name the destination scope and copy a reference prompt. The primary design should control the composition. Borrow a secondary influence only for a specific detail or interaction.
5. Adapt to the destination's content, framework, accessibility needs, and existing working tasks. Do not copy fictional organisations, unverified business claims, prices, or synthetic datasets into a real product.
6. Implement one representative route and its narrow layout, compare with the chosen reference, then apply the direction to the rest of the requested scope.

## Getting the evidence

The live host serves `/references/ID-slug/DESIGN.md`, `tokens.css`, `Demo.vue`, and `design.json`. These are build-generated copies of the individual reference packages, so a model does not require private-repository access to read the selected example. `/catalogue.json` lists all 75 designs. The source repository remains private.

Each package includes desktop (1440 × 1000 viewport), phone (390 × 844), a supporting state, and a full-page desktop image. The full-page image can be taller than its recorded viewport. Image URLs use content hashes, and image metadata names the source hash, capture time, route, fixture, and viewport.

For a local clone, `pnpm refs:fetch` downloads verified reference-image copies. A development server can display these locally by setting `VITE_LOCAL_REFERENCES=1` before `pnpm dev`. Runtime fonts and the original seven images are bundled. The commercial examples use nineteen additional images hosted in Tigris; their URLs, provenance and checksums are in `/art/commercial-manifest.json`. Public asset notes are available at `/docs/ASSETS.md` and `/docs/COMMERCIAL_ASSETS.md`.

## Find a commercial direction

Search by the business and its visitor’s decision, not only the design name. “Storage” finds both the general service reference and Unit Finder; “appointment-based local business” finds staff-led booking; “enquiry-driven B2B” finds technical quotation patterns. Industry, visitor goal, conversion action, site structure, and interaction filters can be combined and shared through the gallery URL.

Every metadata record includes a `discovery` object and a `patterns` array. Preserve the useful business pattern when adapting the visual system: staff-first availability, capacity recommendations, coverage checks, before/after evidence, branch-specific services, material-led commissions, or order collection. Do not apply every commercial pattern to every business.

## Scope of the examples

The pages demonstrate visual direction through realistic content and a small interaction vocabulary. Save/reset, search/filter, selection, review, validation, and local persistence are deliberately bounded. There are no real accounts, payments, uploads, email sends, external bookings, or production datasets. Content links within an example are part of that example's fixture, not a promise of a complete business product.

`ready` means the sample has been implemented, visually reviewed, captured, and checked in the project's browser suite. Automated accessibility checks cannot establish full WCAG conformance. No field-performance data is claimed.
