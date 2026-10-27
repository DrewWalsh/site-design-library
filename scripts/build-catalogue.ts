import fs from 'node:fs';
import { sourceRevision, localReference, sha256 } from './reference-utils';

const directories = fs.readdirSync('src/designs').sort();
const ids = new Set<string>(),
  slugs = new Set<string>();
const catalogue = directories.map((dir) => {
  const base = `src/designs/${dir}`;
  const record = JSON.parse(fs.readFileSync(`${base}/design.json`, 'utf8'));
  for (const key of [
    'id',
    'name',
    'slug',
    'family',
    'status',
    'thesis',
    'suitableFor',
    'traits',
    'definingFeatures',
    'entryRoute',
    'sourcePath',
    'brief',
  ]) {
    if (!record[key]) throw new Error(`${dir}: missing ${key}`);
  }
  if (
    !/^\d{2}$/.test(record.id) ||
    !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(record.slug) ||
    dir !== `${record.id}-${record.slug}`
  )
    throw new Error(`${dir}: ID, slug, and folder must agree`);
  if (ids.has(record.id) || slugs.has(record.slug)) throw new Error(`Duplicate: ${dir}`);
  ids.add(record.id);
  slugs.add(record.slug);
  if (record.sourcePath !== base || record.entryRoute !== `/preview/${dir}/start`)
    throw new Error(`${dir}: invalid source or entry route`);
  for (const file of ['DESIGN.md', 'tokens.css', 'Demo.vue']) {
    if (!fs.existsSync(`${base}/${file}`)) throw new Error(`${dir}: missing ${file}`);
  }
  for (const key of [
    'composition',
    'navigation',
    'typography',
    'density',
    'imagery',
    'surface',
    'motion',
  ]) {
    if (!record.traits[key]) throw new Error(`${dir}: missing trait ${key}`);
  }
  if (!['planned', 'prototype', 'ready', 'needs-review'].includes(record.status))
    throw new Error(`${dir}: invalid status`);
  for (const key of [
    'industries',
    'visitorGoals',
    'conversionActions',
    'interactionTypes',
    'keywords',
  ]) {
    const values = record.discovery?.[key];
    if (
      !Array.isArray(values) ||
      !values.length ||
      values.some((value: unknown) => typeof value !== 'string' || !value.trim())
    )
      throw new Error(`${dir}: missing or invalid discovery.${key}`);
  }
  if (!record.discovery?.siteSize || !Array.isArray(record.patterns) || !record.patterns.length)
    throw new Error(`${dir}: missing site structure or reference patterns`);
  if (!Array.isArray(record.states) || record.states.length < 2)
    throw new Error(`${dir}: missing supporting states`);
  const routes = new Set([record.entryRoute]);
  for (const state of record.states) {
    if (
      !/^[a-z0-9-]+$/.test(state.key) ||
      !state.label ||
      state.route !== `/preview/${dir}/${state.key}` ||
      routes.has(state.route)
    )
      throw new Error(`${dir}: invalid or duplicate state`);
    routes.add(state.route);
  }
  const revision = sourceRevision(base);
  for (const ref of record.referenceImages) {
    localReference(ref.file);
    if (
      !routes.has(ref.route) ||
      !ref.sourceRevision ||
      !ref.viewport?.width ||
      !ref.viewport?.height ||
      !ref.url
    )
      throw new Error(`${dir}: incomplete reference`);
    if (record.status === 'ready') {
      if (ref.sourceRevision !== revision)
        throw new Error(`${dir}: stale capture; recapture and review the modified design`);
      if (!/^[a-f0-9]{64}$/.test(ref.sha256)) throw new Error(`${dir}: missing image checksum`);
      const local = localReference(ref.file);
      if (fs.existsSync(local) && sha256(fs.readFileSync(local)) !== ref.sha256)
        throw new Error(`${dir}: local capture bytes do not match metadata`);
      if (!fs.existsSync(local) && !ref.url.startsWith('https://'))
        throw new Error(`${dir}: reference unavailable locally or remotely`);
    }
  }
  if (record.status === 'ready') {
    if (record.referenceImages.length < 4)
      throw new Error(`${dir}: ready requires desktop, mobile, state, and full-page captures`);
    const manifest = JSON.parse(
      fs.readFileSync(`public/previews/${record.id}/capture.json`, 'utf8'),
    );
    if (
      manifest.sourceRevision !== revision ||
      JSON.stringify(manifest.captures) !== JSON.stringify(record.referenceImages)
    )
      throw new Error(`${dir}: capture manifest disagrees with design.json`);
  }
  return record;
});
if (catalogue.length !== 75) throw new Error(`Expected 75 designs; found ${catalogue.length}`);
for (const design of catalogue)
  for (const id of design.neighbours)
    if (!ids.has(id) || id === design.id) throw new Error(`${design.id}: invalid neighbour ${id}`);
const json = JSON.stringify(catalogue, null, 2) + '\n';
fs.writeFileSync('catalogue.json', json);
fs.mkdirSync('public', { recursive: true });
fs.writeFileSync('public/catalogue.json', json);
for (const design of catalogue) {
  const destination = `public/references/${design.id}-${design.slug}`;
  fs.mkdirSync(destination, { recursive: true });
  for (const file of ['DESIGN.md', 'design.json', 'tokens.css', 'Demo.vue']) {
    fs.copyFileSync(`${design.sourcePath}/${file}`, `${destination}/${file}`);
  }
}
fs.copyFileSync('docs/AGENT_WORKFLOW.md', 'public/AGENT_WORKFLOW.md');
fs.mkdirSync('public/docs', { recursive: true });
for (const file of ['ASSETS.md', 'COMMERCIAL_ASSETS.md'])
  fs.copyFileSync(`docs/${file}`, `public/docs/${file}`);
console.log(
  `Validated ${catalogue.length} unique design packages (${catalogue.filter((d) => d.status === 'ready').length} ready).`,
);
