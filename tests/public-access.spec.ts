import { test, expect } from '@playwright/test';
import { unzipSync, strFromU8 } from 'fflate';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import catalogue from '../catalogue.json' with { type: 'json' };

const hash = (bytes: Uint8Array) => createHash('sha256').update(bytes).digest('hex');

test('Every ready design ZIP contains verified source, assets, captures and a runnable starter', async () => {
  test.setTimeout(60000);
  const downloads = JSON.parse(fs.readFileSync('dist/downloads/index.json', 'utf8'));
  expect(downloads.map((d: { id: string }) => d.id)).toEqual(
    catalogue.filter((d) => d.status === 'ready').map((d) => d.id),
  );
  for (const item of downloads) {
    const design = catalogue.find((d) => d.id === item.id)!;
    const bytes = fs.readFileSync('dist' + item.url);
    expect(bytes.length).toBe(item.bytes);
    expect(hash(bytes)).toBe(item.sha256);
    const files = unzipSync(bytes),
      root = `design-${design.id}-${design.slug}/`;
    const read = (file: string) => strFromU8(files[root + file]);
    for (const name of Object.keys(files)) {
      expect(name.startsWith(root)).toBe(true);
      expect(name).not.toMatch(/(?:^|\/)(?:\.env(?:\.|$)|\.git\/|\.netlify\/|\.aws\/)|\.\.|\\/);
    }
    for (const file of [
      'README.md',
      'AGENTS.md',
      'CODEX_PROMPT.md',
      'DESIGN.md',
      'LICENSE',
      'THIRD_PARTY.md',
      'assets.json',
      'package.json',
      'vite.config.ts',
      'tsconfig.json',
      'src/main.ts',
      'src/shared/useSpecimen.ts',
      'public/_redirects',
      'reference/capture.json',
    ])
      expect(files[root + file], `${item.id}: ${file}`).toBeTruthy();
    const bundle = JSON.parse(read('bundle.json'));
    expect(Object.keys(files).length).toBe(bundle.files.length + 1);
    expect(bundle.sourceRevision).toBe(item.sourceRevision);
    for (const entry of bundle.files)
      expect(hash(files[root + entry.file]), `${item.id}: ${entry.file}`).toBe(entry.sha256);
    expect(read('reference/Demo.vue')).toBe(
      fs.readFileSync(design.sourcePath + '/Demo.vue', 'utf8'),
    );
    const runnable = read(bundle.runnableSource);
    expect(runnable).not.toContain('https://drew-site-design-library.t3.tigrisfiles.io/');
    for (const asset of JSON.parse(read('assets.json')).assets)
      expect(hash(files[root + asset.bundledFile])).toBe(asset.sha256);
    for (const capture of design.referenceImages)
      expect(hash(files[root + 'screenshots/' + capture.file.split('/').at(-1)])).toBe(
        capture.sha256,
      );
    const starter = JSON.parse(read('package.json'));
    expect(starter.scripts.build).toContain('vue-tsc');
    expect(read('CODEX_PROMPT.md')).toContain(design.name);
  }
});

test('Gallery and specifications are readable without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('100');
  await expect(page.locator('.g-agent-grid article')).toHaveCount(100);
  for (const id of ['01', '59', '100']) {
    const d = catalogue.find((d) => d.id === id)!;
    await page.goto(`/designs/${d.id}-${d.slug}/`);
    await expect(page.getByRole('heading', { level: 1 })).toHaveText(d.name);
    await expect(page.getByRole('heading', { name: 'Design specification' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Download design ZIP' })).toHaveAttribute(
      'href',
      `/downloads/${d.id}-${d.slug}.zip`,
    );
    await expect(page.getByRole('link', { name: 'Demo.vue', exact: true })).toBeVisible();
    await expect(page.locator('meta[name="robots"]')).toHaveCount(0);
    await page.setViewportSize({ width: 390, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      392,
    );
  }
  await context.close();
});

test('Inspector starts a real ZIP download, and crawler indexes expose the whole collection', async ({
  page,
  request,
}) => {
  await page.goto('/designs/59-unit-finder');
  for (const width of [390, 320]) {
    await page.setViewportSize({ width, height: 844 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(
      width + 2,
    );
    await expect(
      page.getByRole('link', { name: 'Download design ZIP', exact: false }).first(),
    ).toBeVisible();
  }
  const downloaded = page.waitForEvent('download');
  await page.getByRole('link', { name: 'Download design ZIP', exact: false }).first().click();
  const download = await downloaded;
  expect(download.suggestedFilename()).toBe('59-unit-finder.zip');
  expect(await download.failure()).toBeNull();
  const bytes = fs.readFileSync((await download.path())!);
  expect(Object.keys(unzipSync(bytes))).toContain('design-59-unit-finder/CODEX_PROMPT.md');
  for (const [url, expected] of [
    ['/robots.txt', 'Allow: /'],
    ['/sitemap.xml', '100-powers-of-scale'],
    ['/llms.txt', '100 Powers of Scale'],
    ['/llms-full.txt', 'Changing scale should change the question'],
    ['/LICENSE', 'MIT License'],
  ]) {
    const response = await request.get(url);
    expect(response.status()).toBe(200);
    expect(await response.text()).toContain(expected);
  }
  await page.goto('/');
  await expect(page.locator('.g-card').last()).toContainText('Powers of Scale');
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.getByText('Visual direction & effort', { exact: true }).click();
  await page.getByLabel('Character', { exact: true }).selectOption('Experimental');
  await expect(page.locator('.g-card')).toHaveCount(25);
});
