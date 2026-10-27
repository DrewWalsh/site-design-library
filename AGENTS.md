# Working on this library

- Use and push `master`. Preserve each design's stable ID, slug, and source directory.
- At the beginning of web work, consult `C:\Codex\tools\codex-utility-scripts\README.md` when available. Its Vue and Netlify checks are useful here.
- Keep the gallery and specimen entry points separate. Never import gallery CSS into a specimen. Shared helpers may handle routing and storage; they must not impose a universal page composition.
- Every one of the 100 examples is an expansive sample page with supporting states. Do not replace examples with colour variants of one template, empty placeholders, or screenshots masquerading as live pages.
- Read the target package's `DESIGN.md`, metadata, tokens, and captures before editing. Keep local fixtures deterministic and namespaced. No credentials or business backend belong in a specimen.
- Run proportionate checks. `pnpm build` validates metadata, source hashes, types and the static build. `pnpm test` covers all references; use `--grep` for a focused correction. Inspect captures after visual changes.
- A ready package with changed source must be recaptured and reviewed. Capture does not grant readiness. Keep the capture manifest and design metadata in sync; use `pnpm catalogue` to regenerate the catalogue.
- Store reference image collections in the existing Tigris bucket. Preserve asset licenses. See `docs/OPERATIONS.md` for exact deployment and storage commands.
- Keep source packages human-readable with `pnpm format`. Vue inline handlers containing multiple statements require semicolons; preserve the Prettier configuration.
