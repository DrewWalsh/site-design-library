import fs from 'node:fs';
import { createHash } from 'node:crypto';

export function sourceRevision(source: string) {
  const hash = createHash('sha256');
  for (const file of [
    `${source}/Demo.vue`,
    `${source}/tokens.css`,
    'preview.html',
    'src/preview/main.ts',
    'src/shared/useSpecimen.ts',
    'public/fonts/manifest.json',
    'public/art/manifest.json',
  ]) {
    hash.update(file + '\n' + fs.readFileSync(file, 'utf8').replaceAll('\r\n', '\n') + '\n');
  }
  return 'sha256:' + hash.digest('hex');
}

export function sha256(bytes: Uint8Array) {
  return createHash('sha256').update(bytes).digest('hex');
}

export function localReference(file: string) {
  if (!/^\/previews\/(?:\d{2}|100)\/(desktop|mobile|detail|full-page)\.jpg$/.test(file)) {
    throw new Error(`Invalid reference path: ${file}`);
  }
  return 'public' + file;
}
