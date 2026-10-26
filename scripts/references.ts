import fs from 'node:fs';
import path from 'node:path';
import { localReference, sha256, sourceRevision } from './reference-utils';

const origin = 'https://drew-site-design-library.t3.tigrisfiles.io';
const action = process.argv[2];
const wanted = process.env.DESIGN_IDS?.split(',');
const records = fs
  .readdirSync('src/designs')
  .sort()
  .map((dir) => {
    const source = `src/designs/${dir}`;
    return { source, meta: JSON.parse(fs.readFileSync(`${source}/design.json`, 'utf8')) };
  })
  .filter(({ meta }) => !wanted || wanted.includes(meta.id));
const entries = records.flatMap(({ source, meta }) =>
  meta.referenceImages.map((ref: any) => {
    if (!/^[a-f0-9]{64}$/.test(ref.sha256) || ref.sourceRevision !== sourceRevision(source))
      throw new Error(`Capture ${meta.id} is stale or has no checksum. Run pnpm capture first.`);
    const key = `references/${meta.id}/${ref.sha256.slice(0, 16)}-${path.basename(ref.file)}`;
    return { meta, ref, local: localReference(ref.file), key, url: `${origin}/${key}` };
  }),
);

async function download(entry: (typeof entries)[number], url: string) {
  const response = await fetch(url, { signal: AbortSignal.timeout(30000) });
  if (!response.ok) throw new Error(`${response.status} ${url}`);
  const bytes = new Uint8Array(await response.arrayBuffer());
  if (sha256(bytes) !== entry.ref.sha256) throw new Error(`Image checksum mismatch: ${url}`);
  return bytes;
}

if (action === 'stage') {
  fs.mkdirSync('.work', {recursive:true});
  fs.writeFileSync('.work/tigris-upload.json', JSON.stringify({bucket:'drew-site-design-library',objects:entries.map(entry=>({file:entry.local,key:entry.key,sha256:entry.ref.sha256}))},null,2)+'\n');
  for (const entry of entries) {
    const bytes = fs.readFileSync(entry.local);
    if (sha256(bytes) !== entry.ref.sha256) throw new Error(`Local image mismatch: ${entry.local}`);
    const dest = `.work/reference-upload/${entry.key}`;
    fs.mkdirSync(path.dirname(dest), { recursive: true });
    fs.writeFileSync(dest, bytes);
  }
  console.log(
    `Staged ${entries.length} content-addressed images and .work/tigris-upload.json. Use the codex-utility-scripts manifest uploader, then run pnpm refs:publish.`,
  );
} else if (action === 'publish' || action === 'fetch') {
  let next = 0;
  await Promise.all(
    Array.from({ length: 6 }, async () => {
      while (next < entries.length) {
        const entry = entries[next++];
        const url = action === 'publish' ? entry.url : entry.ref.url;
        if (!url.startsWith(`${origin}/references/`))
          throw new Error('Only this project’s published Tigris references can be downloaded.');
        const bytes = await download(entry, url);
        if (action === 'fetch') {
          fs.mkdirSync(path.dirname(entry.local), { recursive: true });
          fs.writeFileSync(entry.local, bytes);
        }
      }
    }),
  );
  if (action === 'publish') {
    for (const entry of entries) entry.ref.url = entry.url;
    for (const { source, meta } of records) {
      fs.writeFileSync(`${source}/design.json`, JSON.stringify(meta, null, 2) + '\n');
      const file = `public/previews/${meta.id}/capture.json`;
      const capture = JSON.parse(fs.readFileSync(file, 'utf8'));
      capture.captures = meta.referenceImages;
      fs.writeFileSync(file, JSON.stringify(capture, null, 2) + '\n');
    }
  }
  console.log(
    `${action === 'publish' ? 'Verified and linked' : 'Downloaded and verified'} ${entries.length} reference images.`,
  );
} else throw new Error('Usage: tsx scripts/references.ts stage|publish|fetch');
