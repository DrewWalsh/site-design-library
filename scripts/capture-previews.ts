import { chromium } from '@playwright/test';
import fs from 'node:fs';
import { sourceRevision as revisionFor, sha256 } from './reference-utils';
const base = process.env.PREVIEW_URL || 'http://127.0.0.1:5173';
const wanted = process.env.DESIGN_IDS?.split(',');
const browser = await chromium.launch({
  channel: process.env.BROWSER_CHANNEL || (process.platform === 'win32' ? 'msedge' : undefined),
  headless: true,
});
try {
  for (const dir of fs.readdirSync('src/designs').sort()) {
    const source = `src/designs/${dir}`,
      meta = JSON.parse(fs.readFileSync(`${source}/design.json`, 'utf8'));
    if (wanted && !wanted.includes(meta.id)) continue;
    const sourceRevision = revisionFor(source);
    const dest = `public/previews/${meta.id}`;
    fs.mkdirSync(dest, { recursive: true });
    const captures = [];
    for (const [state, viewport, file] of [
      ['start', { width: 1440, height: 1000 }, 'desktop'],
      ['start', { width: 390, height: 844 }, 'mobile'],
      [meta.states[0].key, { width: 1440, height: 1000 }, 'detail'],
      ['start', { width: 1440, height: 1000 }, 'full-page'],
    ] as const) {
      const context = await browser.newContext({
        viewport,
        reducedMotion: 'reduce',
        locale: 'en-GB',
        timezoneId: 'Europe/London',
      });
      const page = await context.newPage();
      const errors: string[] = [];
      page.on('pageerror', (error) => errors.push(error.message));
      page.on('response', (response) => {
        if (response.status() >= 400) errors.push(`${response.status()} ${response.url()}`);
      });
      await page.goto(`${base}/preview/${dir}/${state}`, { waitUntil: 'networkidle' });
      await page.evaluate(async () => {
        await document.fonts.ready;
        await Promise.all(
          [...document.images].map((i) => {
            i.loading = 'eager';
            if (i.complete) {
              if (!i.naturalWidth) throw new Error(`Image failed: ${i.src}`);
              return Promise.resolve();
            }
            return new Promise<void>((resolve, reject) => {
              const timeout = setTimeout(
                () => reject(new Error(`Image timed out: ${i.src}`)),
                15000,
              );
              i.onload = () => {
                clearTimeout(timeout);
                resolve();
              };
              i.onerror = () => {
                clearTimeout(timeout);
                reject(new Error(`Image failed: ${i.src}`));
              };
            });
          }),
        );
      });
      const relative = `/previews/${meta.id}/${file}.jpg`;
      const bytes = await page.screenshot({
        path: 'public' + relative,
        type: 'jpeg',
        quality: 83,
        animations: 'disabled',
        fullPage: file === 'full-page',
      });
      if (errors.length) throw new Error(`${dir}/${state}: ${errors.join('; ')}`);
      captures.push({
        file: relative,
        url: relative,
        route: `/preview/${dir}/${state}`,
        viewport,
        state,
        fixture: 'deterministic-2026-11-v1',
        sourceRevision,
        sha256: sha256(bytes),
        fullPage: file === 'full-page',
      });
      await context.close();
    }
    fs.writeFileSync(
      `${dest}/capture.json`,
      JSON.stringify(
        {
          designId: meta.id,
          sourceRevision,
          capturedAt: new Date().toISOString(),
          browser: browser.version(),
          captures,
        },
        null,
        2,
      ) + '\n',
    );
    meta.referenceImages = captures;
    if (meta.status === 'ready') meta.status = 'needs-review';
    fs.writeFileSync(`${source}/design.json`, JSON.stringify(meta, null, 2) + '\n');
    console.log(`Captured ${meta.id}: desktop, mobile, ${meta.states[0].key}, full page`);
  }
} finally {
  await browser.close();
}
