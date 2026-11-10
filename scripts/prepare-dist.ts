import fs from 'node:fs';
import { localReference } from './reference-utils';
const catalogue = JSON.parse(fs.readFileSync('catalogue.json', 'utf8'));
const published = JSON.parse(fs.readFileSync('published-downloads.json', 'utf8'));
const ready = new Set(
  catalogue
    .filter((design: { status: string }) => design.status === 'ready')
    .map((design: { id: string }) => design.id),
);
const downloads = published.filter((item: { id: string }) => ready.has(item.id));
fs.mkdirSync('dist/downloads', { recursive: true });
fs.writeFileSync('dist/downloads/index.json', JSON.stringify(downloads, null, 2) + '\n');
fs.writeFileSync(
  'dist/_redirects',
  downloads
    .map((item: { path: string; url: string }) => item.path + ' ' + item.url + ' 301')
    .join('\n') + '\n',
);
let count = 0;
for (const design of catalogue)
  for (const ref of design.referenceImages) {
    if (!ref.url.startsWith('https://drew-site-design-library.t3.tigrisfiles.io/references/'))
      continue;
    const file = localReference(ref.file).replace(/^public\//, 'dist/');
    if (fs.existsSync(file)) {
      fs.unlinkSync(file);
      count++;
    }
  }
console.log(
  `Static output ready. ${count} local capture copies omitted; published references use Tigris.`,
);
