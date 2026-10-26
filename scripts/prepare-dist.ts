import fs from 'node:fs';
import { localReference } from './reference-utils';
const catalogue = JSON.parse(fs.readFileSync('catalogue.json', 'utf8'));
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
