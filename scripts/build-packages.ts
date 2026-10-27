import fs from 'node:fs';
import path from 'node:path';
import { zipSync } from 'fflate';
import { createDeterministicZip } from './lib/zip-archive.mjs';
import { sha256 } from './reference-utils';

const catalogue = JSON.parse(fs.readFileSync('catalogue.json', 'utf8'));
const packageInfo = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const fontRecords = JSON.parse(fs.readFileSync('public/fonts/manifest.json', 'utf8'));
const artRecords = JSON.parse(fs.readFileSync('public/art/manifest.json', 'utf8')).assets;
const commercialRecords = JSON.parse(
  fs.readFileSync('public/art/commercial-manifest.json', 'utf8'),
).assets;
const cache = new Map<string, Promise<Uint8Array>>();
const site = 'https://drew-site-design-library.netlify.app';
fs.mkdirSync('dist/downloads', { recursive: true });
fs.mkdirSync('.work/download-assets', { recursive: true });

function verified(local: string, url: string | undefined, checksum: string): Promise<Uint8Array> {
  if (!/^[a-f0-9]{64}$/.test(checksum)) throw new Error('Asset checksum is required');
  if (cache.has(checksum)) return cache.get(checksum)!;
  const pending = (async () => {
    const cached = `.work/download-assets/${checksum}`;
    let bytes: Uint8Array;
    if (fs.existsSync(local)) bytes = fs.readFileSync(local);
    else if (fs.existsSync(cached)) bytes = fs.readFileSync(cached);
    else {
      if (!url?.startsWith('https://drew-site-design-library.t3.tigrisfiles.io/'))
        throw new Error(`Missing bundled asset ${local}`);
      const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
      if (!response.ok) throw new Error(`Asset fetch failed: ${response.status} ${url}`);
      bytes = new Uint8Array(await response.arrayBuffer());
    }
    if (sha256(bytes) !== checksum) throw new Error(`Asset checksum mismatch: ${local}`);
    if (!fs.existsSync(local) && !fs.existsSync(cached)) fs.writeFileSync(cached, bytes);
    return bytes;
  })();
  cache.set(checksum, pending);
  return pending;
}

const downloads: {
  id: string;
  name: string;
  url: string;
  bytes: number;
  sha256: string;
  sourceRevision: string;
}[] = [];
for (const d of catalogue) {
  if (d.status !== 'ready') continue;
  const directory = `${d.id}-${d.slug}`;
  const source = `src/designs/${directory}`;
  const rootName = `design-${directory}`;
  const files = new Map<string, string | Uint8Array>();
  const add = (name: string, data: string | Uint8Array) => {
    if (files.has(name)) throw new Error(`Duplicate bundle file ${name}`);
    files.set(name, data);
  };
  const read = (name: string) => fs.readFileSync(name, 'utf8');
  const original = read(`${source}/Demo.vue`);
  let runnable = original;
  const assets: any[] = [];
  const localAssets = new Set(
    [
      ...`${original}\n${read(`${source}/tokens.css`)}`.matchAll(
        /\/(?:fonts|art)\/[a-zA-Z0-9._/-]+\.(?:woff2|webp|jpg|png|svg|css)/g,
      ),
    ].map((m) => m[0]),
  );
  for (const assetPath of localAssets) {
    if (assetPath.includes('..')) throw new Error('Unexpected asset traversal');
    if (assetPath.endsWith('.css')) {
      const css = read('public' + assetPath);
      add('public' + assetPath, css);
      for (const match of css.matchAll(/\/fonts\/[a-zA-Z0-9._-]+\.woff2/g))
        localAssets.add(match[0]);
      continue;
    }
    const record = [...fontRecords, ...artRecords].find((a: any) => a.file === assetPath);
    if (!record) throw new Error(`Unrecorded asset in ${directory}: ${assetPath}`);
    add('public' + assetPath, await verified('public' + assetPath, undefined, record.sha256));
    assets.push({ ...record, bundledFile: 'public' + assetPath });
  }
  for (const record of commercialRecords.filter((a: any) => original.includes(a.url))) {
    const localPath = '/art/commercial/' + path.posix.basename(record.key);
    add(
      'public' + localPath,
      await verified(`.work/commercial-assets/${record.id}.webp`, record.url, record.sha256),
    );
    runnable = runnable.replaceAll(record.url, localPath);
    assets.push({
      ...record,
      license: record.kind === 'generated' ? 'MIT (to the extent rights exist)' : record.license,
      bundledFile: 'public' + localPath,
    });
  }
  if (/https:\/\/drew-site-design-library\.t3\.tigrisfiles\.io\//.test(runnable))
    throw new Error(`Unbundled hosted asset in ${directory}`);
  for (const record of d.referenceImages) {
    add(
      'screenshots/' + path.posix.basename(record.file),
      await verified('public' + record.file, record.url, record.sha256),
    );
  }
  for (const name of fs.readdirSync('public/fonts').filter((name) => name.endsWith('-OFL.txt')))
    add('public/fonts/' + name, read('public/fonts/' + name));
  for (const name of ['LICENSE', 'THIRD_PARTY.md']) add(name, read(name));
  add('assets.json', JSON.stringify({ designId: d.id, assets }, null, 2) + '\n');
  for (const name of ['DESIGN.md', 'design.json', 'tokens.css', 'Demo.vue'])
    add('reference/' + name, read(`${source}/${name}`));
  add('reference/capture.json', read(`public/previews/${d.id}/capture.json`));
  add('docs/ASSETS.md', read('docs/ASSETS.md'));
  add('docs/COMMERCIAL_ASSETS.md', read('docs/COMMERCIAL_ASSETS.md'));
  if (Number(d.id) >= 76)
    add('docs/EXPERIMENTAL_RESEARCH.md', read('docs/EXPERIMENTAL_RESEARCH.md'));
  add(
    'DESIGN.md',
    read(`${source}/DESIGN.md`)
      .replaceAll('../../../docs/', 'docs/')
      .replace(/\]\(\.\.\/([^/]+)\/DESIGN\.md\)/g, `](${site}/references/$1/DESIGN.md)`),
  );
  add(`${source}/Demo.vue`, runnable);
  add(`${source}/tokens.css`, read(`${source}/tokens.css`));
  add('src/shared/useSpecimen.ts', read('src/shared/useSpecimen.ts'));
  add(
    'src/main.ts',
    `import { createApp } from 'vue';\nimport Demo from './designs/${directory}/Demo.vue';\nif (location.pathname === '/' || location.pathname === '/index.html') history.replaceState({}, '', '${d.entryRoute}');\ncreateApp(Demo).mount('#specimen');\n`,
  );
  add(
    'index.html',
    read('preview.html')
      .replace(
        '<title>Design specimen</title>',
        `<title>${d.id} ${d.name.replaceAll('&', '&amp;')}</title>`,
      )
      .replace('/src/preview/main.ts', '/src/main.ts'),
  );
  add(
    'vite.config.ts',
    `import { defineConfig } from 'vite';\nimport vue from '@vitejs/plugin-vue';\nexport default defineConfig({ plugins: [vue()], server: { host: '127.0.0.1' }, preview: { host: '127.0.0.1' } });\n`,
  );
  add(
    'tsconfig.json',
    JSON.stringify(
      {
        compilerOptions: {
          target: 'ES2022',
          module: 'ESNext',
          moduleResolution: 'Bundler',
          strict: true,
          lib: ['ES2022', 'DOM', 'DOM.Iterable'],
          skipLibCheck: true,
          noEmit: true,
          types: ['vite/client'],
        },
        include: ['src/**/*.ts', 'src/**/*.vue', 'vite.config.ts'],
      },
      null,
      2,
    ),
  );
  add(
    'package.json',
    JSON.stringify(
      {
        name: `design-${directory}`,
        version: '1.0.0',
        private: true,
        license: 'MIT',
        type: 'module',
        engines: { node: '>=24' },
        packageManager: packageInfo.packageManager,
        scripts: { dev: 'vite', build: 'vue-tsc --noEmit && vite build', preview: 'vite preview' },
        dependencies: { vue: packageInfo.dependencies.vue },
        devDependencies: Object.fromEntries(
          ['@vitejs/plugin-vue', 'typescript', 'vite', 'vue-tsc'].map((name) => [
            name,
            packageInfo.devDependencies[name],
          ]),
        ),
      },
      null,
      2,
    ) + '\n',
  );
  add('.gitignore', 'node_modules/\ndist/\n.env*\n');
  add('public/_redirects', '/* /index.html 200\n');
  add(
    'AGENTS.md',
    `# Working with reference ${d.id}: ${d.name}\n\nRead README.md, DESIGN.md and CODEX_PROMPT.md before adapting this example. Study the screenshots and source. Preserve the design’s composition and interaction character while following the destination project’s architecture and the user’s actual request. All sample business data is fictional. Do not send bookings, messages or payments from these demonstrations. Keep LICENSE and applicable third-party asset notices with redistributed work.\n`,
  );
  add(
    'CODEX_PROMPT.md',
    `Use Site Design Library ${d.id}, ${d.name}, as the visual direction for the project described in my request.\n\nRead DESIGN.md and reference/design.json. Inspect screenshots/desktop.jpg, mobile.jpg, detail.jpg and full-page.jpg, then study ${source}/Demo.vue and tokens.css. Preserve ${d.definingFeatures.join('; ')}.\n\nAdapt the design to my project’s real content, routes and framework; Vue is supplied as an executable reference, not a requirement for the destination. Preserve keyboard access, narrow layouts and reduced-motion behaviour. Replace fictional names, prices, claims and sample data. Read THIRD_PARTY.md before reusing imagery. Use local assets from public/; no image-service account or API key is needed.\n\nLive reference: ${site}${d.entryRoute}\nPublic repository: https://github.com/DrewWalsh/site-design-library\n`,
  );
  add(
    'README.md',
    `# ${d.id} ${d.name}\n\nA complete, self-contained Site Design Library reference for Codex or another coding model.\n\n## Start here\n\n1. Give the extracted folder and CODEX_PROMPT.md to your coding model, together with the project you want to build or change.\n2. Read DESIGN.md and inspect the four images in screenshots/.\n3. Study the runnable Vue source in ${source}/. The exact published source and capture provenance are preserved in reference/. Only hosted image URLs are replaced with equivalent local files in the runnable copy; their bytes are verified against the asset manifest.\n\n## Run the example\n\nUse Node 24 and pnpm (${packageInfo.packageManager}). From this extracted folder:\n\n\`\`\`sh\npnpm install\npnpm dev\n\`\`\`\n\nOpen the local URL printed by Vite. Installation requires internet access to the npm registry. After installation the sample, its fonts, images and reference captures work without external asset requests. Do not open index.html directly as a file.\n\nBuild with \`pnpm build\`; inspect the build with \`pnpm preview\`. Static hosting needs an SPA fallback to index.html; a Netlify _redirects file is included.\n\n## Supporting states\n\n${[...d.states].map((s: any) => `- ${s.label}: ${s.route}`).join('\n')}\n\n## What is included\n\nDesign specifications, metadata, tokens, editable source, shared route/storage helper, four screenshots and their provenance, required image/font files, asset credits and licenses, starter configuration and an adaptation prompt. No account, API key, backend or private repository access is required.\n\nOriginal code, specifications and artwork use MIT. Photographs and fonts retain their own licenses; see THIRD_PARTY.md and assets.json. Sample interactions stay local.\n`,
  );
  add(
    'bundle.json',
    JSON.stringify(
      {
        schemaVersion: 1,
        designId: d.id,
        name: d.name,
        sourceRevision: d.referenceImages[0].sourceRevision,
        runnableSource: `${source}/Demo.vue`,
        originalSource: 'reference/Demo.vue',
        files: [...files].map(([file, data]) => ({
          file,
          sha256: sha256(typeof data === 'string' ? new TextEncoder().encode(data) : data),
        })),
      },
      null,
      2,
    ) + '\n',
  );
  const bytes = createDeterministicZip(
    [...files].map(([file, data]) => ({ path: `${rootName}/${file}`, data })),
    zipSync,
  );
  const url = `/downloads/${directory}.zip`;
  fs.writeFileSync('dist' + url, bytes);
  downloads.push({
    id: d.id,
    name: d.name,
    url,
    bytes: bytes.length,
    sha256: sha256(bytes),
    sourceRevision: d.referenceImages[0].sourceRevision,
  });
}
fs.writeFileSync('dist/downloads/index.json', JSON.stringify(downloads, null, 2) + '\n');
console.log(
  `Built ${downloads.length} self-contained ZIPs (${(downloads.reduce((sum, d) => sum + d.bytes, 0) / 1024 / 1024).toFixed(1)} MiB), with verified local assets and screenshots.`,
);
