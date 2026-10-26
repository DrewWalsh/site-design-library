import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import catalogue from '../catalogue.json' with { type: 'json' };
import fs from 'node:fs';
for (const d of catalogue) {
  test(`${d.id} ${d.name}: routes, reflow, keyboard, accessibility`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    page.on('response', (r) => {
      if (r.status() >= 400 && r.url().includes('127.0.0.1'))
        errors.push(`${r.status()} ${r.url()}`);
    });
    for (const viewport of [
      { width: 1440, height: 1000 },
      { width: 768, height: 1000 },
      { width: 390, height: 844 },
      { width: 320, height: 844 },
    ]) {
      await page.setViewportSize(viewport);
      await page.goto(d.entryRoute);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1').first()).not.toBeEmpty();
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => ({
        width: innerWidth,
        content: document.documentElement.scrollWidth,
        offenders: [...document.querySelectorAll<HTMLElement>('body *')]
          .filter((e) => {
            const r = e.getBoundingClientRect();
            return (
              r.width > 0 &&
              (r.right > innerWidth + 2 || r.left < -2) &&
              getComputedStyle(e).position !== 'absolute' &&
              !e.closest(
                'svg, .scroll, .graphic, .geometry, .kit-art, .scene-image, .pixel-scene, .disc-art',
              )
            );
          })
          .slice(0, 8)
          .map((e) => e.tagName + '.' + e.className),
      }));
      expect(overflow.content, JSON.stringify(overflow)).toBeLessThanOrEqual(viewport.width + 2);
    }
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');
    await expect(page).toHaveURL(/#content$/);
    await page.setViewportSize({ width: 1440, height: 1000 });
    const scan = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
      .analyze();
    const violations = scan.violations.map((v) => ({
      id: v.id,
      impact: v.impact,
      nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })).slice(0, 8),
    }));
    fs.mkdirSync('test-results/accessibility', { recursive: true });
    fs.writeFileSync(
      `test-results/accessibility/${d.id}.json`,
      JSON.stringify(violations, null, 2),
    );
    expect(violations, JSON.stringify(violations)).toEqual([]);
    for (const state of d.states) {
      await page.goto(state.route);
      await expect(page.locator('main')).toBeVisible();
      await expect(page.locator('h1').first()).not.toBeEmpty();
    }
    expect(errors).toEqual([]);
  });
}
test('Gallery search, URL restoration, inspector prompt, comparison and isolation', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.locator('.g-card')).toHaveCount(50);
  const thumbnailSize = await page.locator('.g-card-image img').first().boundingBox();
  expect(thumbnailSize!.height / thumbnailSize!.width).toBeCloseTo(1000 / 1440, 1);
  await page.getByRole('textbox', { name: 'Search designs' }).fill('Blueprint');
  await expect(page.locator('.g-card')).toHaveCount(1);
  await expect(page).toHaveURL(/q=Blueprint/);
  await page.reload();
  await expect(page.locator('.g-card')).toHaveCount(1);
  await page.getByRole('link', { name: 'Inspect Blueprint Studio' }).click();
  await page.getByRole('button', { name: 'Use this design', exact: true }).click();
  await expect(page.locator('#prompt')).toHaveValue(/27, Blueprint Studio/);
  await page.getByRole('button', { name: 'Live preview', exact: true }).click();
  const frame = page.frameLocator('iframe');
  await expect(frame.getByRole('heading', { name: 'The courtyard room' })).toBeVisible();
  expect(await frame.locator('body').evaluate((e) => getComputedStyle(e).fontFamily)).not.toContain(
    'DM Sans',
  );
  await page.goto('/compare?ids=01,27');
  await expect(page.locator('.g-comparison article')).toHaveCount(2);
  await page.getByRole('button', { name: 'Phone', exact: true }).click();
  await expect(page.locator('.g-compare-image.phone')).toHaveCount(2);
  await page.setViewportSize({ width: 390, height: 844 });
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(392);
  await page.goto('/?q=absolutelynomatch');
  await expect(page.getByRole('heading', { name: 'A little too specific?' })).toBeVisible();
  await page.getByRole('button', { name: 'Reset all filters' }).click();
  await expect(page.locator('.g-card')).toHaveCount(50);
  const a11y = await new AxeBuilder({ page })
    .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
    .analyze();
  expect(a11y.violations.map((v) => ({ id: v.id, nodes: v.nodes.map((n) => n.target) }))).toEqual(
    [],
  );
});
test('Core journeys: service, operations, wizard, planner, shop, machine and parameters', async ({
  page,
}) => {
  await page.goto('/preview/01-civic-service/start');
  await page.getByRole('button', { name: 'Start your booking' }).click();
  await page.getByRole('button', { name: 'Confirm sample collection' }).click();
  await expect(page.getByRole('alert')).toContainText('Enter your Northbank address');
  await page.getByLabel('Your address').fill('14 Alder Lane');
  await page.getByRole('button', { name: 'Confirm sample collection' }).click();
  await expect(page.getByRole('heading', { name: 'Collection booked' })).toBeVisible();
  await page.goto('/preview/11-operations-console/start');
  await page.getByRole('checkbox', { name: 'Select SHP-2048' }).check();
  await page.getByRole('button', { name: 'Mark ready', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('1 shipments');
  await page.reload();
  await expect(page.locator('tr').filter({ hasText: 'SHP-2048' })).toContainText('Ready');
  await page.goto('/preview/14-guided-journey/start');
  await page.getByRole('button', { name: 'Continue' }).click();
  await expect(page.getByRole('alert')).toBeVisible();
  await page.getByRole('radio', { name: 'Clay & ceramics' }).check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('radio', { name: 'Saturday' }).check();
  await page.getByRole('button', { name: 'Continue' }).click();
  await page.getByRole('radio', { name: 'Small group' }).check();
  await page.getByRole('button', { name: 'Review my choices' }).click();
  await expect(page.locator('.answer').first()).toContainText('Clay & ceramics');
  await page.goto('/preview/15-temporal-planner/edit');
  await page.getByRole('combobox', { name: /^Day/ }).selectOption('1');
  await page.getByLabel('Start hour').fill('11');
  await page.getByRole('button', { name: 'Move session', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('overlaps');
  await page.getByLabel('Start hour').fill('14');
  await page.getByRole('button', { name: 'Move session', exact: true }).click();
  await expect(page.getByRole('status')).toContainText('moved');
  await page.goto('/preview/22-specimen-shop/detail');
  await page.getByLabel('Glaze').selectOption('Fern — sold out');
  await expect(page.getByRole('button', { name: 'Add to sample bag' })).toBeDisabled();
  await page.getByLabel('Glaze').selectOption('Chalk');
  await page.getByRole('button', { name: 'Add to sample bag' }).click();
  await page.getByRole('button', { name: 'View bag' }).click();
  await expect(page.getByLabel('Quantity')).toHaveValue('1');
  await page.goto('/preview/33-playroom/start');
  await page.getByRole('button', { name: 'Run the machine' }).click();
  await expect(page.getByRole('status')).toContainText('Not quite');
  for (const [i, part] of ['Power', 'Switch', 'Lamp'].entries()) {
    await page.locator('.slot').nth(i).click();
    await page.locator('.tool-shelf button').filter({ hasText: part }).click();
  }
  await page.getByRole('button', { name: 'Run the machine' }).click();
  await expect(page.getByRole('status')).toContainText('It lights up');
  await page.goto('/preview/49-parametric-studio/start?spacing=40&angle=-15');
  await expect(page.getByRole('spinbutton', { name: 'Spacing in units' })).toHaveValue('40');
  await expect(page.getByRole('spinbutton', { name: 'Angle in degrees' })).toHaveValue('-15');
  await page.getByRole('spinbutton', { name: 'Spacing in units' }).fill('22');
  await page.getByRole('spinbutton', { name: 'Angle in degrees' }).click();
  await expect(page).toHaveURL(/spacing=22/);
});
