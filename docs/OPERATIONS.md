# Operations

## Project locations

- Source: `https://github.com/DrewWalsh/site-design-library`, production branch `master`.
- Local workspace: `C:\Users\Drew\Documents\ChatGPT\Design Library`.
- Netlify site: `drew-site-design-library`, ID `f1b17143-ef7d-48e1-a1e8-b8e7650e2288`.
- Public URL: `https://drew-site-design-library.netlify.app`.
- Tigris bucket: `drew-site-design-library`, reference objects under `references/`.
- Public image origin: `https://drew-site-design-library.t3.tigrisfiles.io`.
- Static Vue 3/Vite app. No backend service, database, Hetzner volume, or runtime secrets.

## Build and release

```sh
pnpm install --frozen-lockfile
pnpm build
pnpm test
```

The build generates metadata and public reference packages, checks TypeScript, and builds both gallery and isolated specimen entry points. References hosted in Tigris are omitted from the Netlify artifact to avoid duplicate image storage. Netlify rewrites `/preview/*` to `preview.html`, before the gallery fallback.

Deploy through the existing authenticated Netlify CLI. `.netlify/state.json` is a local link and is ignored by Git.

```sh
pnpm --package=netlify-cli dlx netlify link --id f1b17143-ef7d-48e1-a1e8-b8e7650e2288
node C:/Codex/tools/codex-utility-scripts/bin/codex-utils.mjs netlify-preflight --root . --site-id f1b17143-ef7d-48e1-a1e8-b8e7650e2288 --output dist --out .codex-utils/netlify.json
pnpm --package=netlify-cli dlx netlify deploy --prod --no-build --dir dist --site f1b17143-ef7d-48e1-a1e8-b8e7650e2288
```

The initial release uses a verified local static build and explicit CLI deployment. Git pushes do not themselves publish the frontend. Commit and push changes to `master`, then deploy the checked artifact. Fix a bad release in source and deploy the correction.

After a release, open the gallery, a design inspector, a direct specimen deep link, and a comparison. Check `/catalogue.json`, a public source package, one font, and a Tigris reference image. Verify actual browser behavior as well as HTTP responses; there is no backend health endpoint to probe.

## Refresh reference images

Run `pnpm dev` in one terminal. Captures use fresh contexts, reduced motion, fixed viewports, a fixed locale/timezone, and deterministic fixtures. The capture command leaves readiness unchanged except that previously ready designs become `needs-review`.

```powershell
$env:DESIGN_IDS = '27'
pnpm capture
Remove-Item Env:DESIGN_IDS
```

Omit `DESIGN_IDS` to capture all 50. `PREVIEW_URL` can point to the production preview server instead of port 5173. Windows uses installed Edge by default; other platforms use Playwright Chromium. `BROWSER_CHANNEL` can override the channel. Four JPEGs per package are written locally and ignored by Git; provenance JSON is tracked.

Inspect the changed images and run the relevant tests. Once satisfactory, set the design's status to `ready`. Source hashes include the component, tokens, preview shell, routing/storage helper, and asset manifests; line endings are normalized. Shared changes invalidate every affected capture. A ready design with stale metadata fails the build.

## Publish images to Tigris

```sh
pnpm refs:stage
node C:/Codex/tools/codex-utility-scripts/node/tigris-upload.mjs --root . --manifest .work/tigris-upload.json --upload --concurrency 6 --cli C:/Users/Drew/.bun/bin/tigris.exe --cache-control "public, max-age=31536000, immutable"
pnpm refs:publish
pnpm catalogue
```

Only the fictional reference images are public. Object names include the image checksum; changed images get new URLs. `refs:publish` downloads and checks every selected remote image before updating metadata. Use `DESIGN_IDS` for a targeted refresh. The bucket is accessed through the existing CLI login; never put credentials in this repository.

The manifest uploader is in [codex-utility-scripts](https://github.com/DrewWalsh/codex-utility-scripts). On another computer, adjust the utility and CLI paths. Avoid recursive uploads with Tigris CLI 3.12.0 on Windows: they duplicate the source directory and preserve backslashes in object keys. Public reads use the dedicated public-content domain above; the S3 API domain requires authenticated requests.

`pnpm refs:fetch` restores local copies from published URLs and verifies their SHA-256 checksums. It does not require write credentials. Keep old referenced objects while deployed releases still use them; no automatic deletion task is configured.

## Assets

See `ASSETS.md`, `public/fonts/manifest.json`, and `public/art/manifest.json`. The manifests contain provenance and checksums; font licenses are bundled. Keep the published references and the actual rendered assets consistent.
