import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import catalogue from '../catalogue.json' with { type: 'json' };
import fs from 'node:fs';

for (const design of catalogue) {
  test(`${design.id} supporting states on a phone`, async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    const findings = [];
    for (const state of design.states) {
      await page.goto(state.route);
      await expect(page.locator('main')).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      const width = await page.evaluate(() => document.documentElement.scrollWidth);
      if (width > 392) findings.push({ state: state.key, overflow: width });
      const scan = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa', 'wcag22aa'])
        .analyze();
      findings.push(
        ...scan.violations.map((v) => ({
          state: state.key,
          id: v.id,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
      );
    }
    fs.mkdirSync('test-results/supporting', { recursive: true });
    fs.writeFileSync(
      `test-results/supporting/${design.id}.json`,
      JSON.stringify(findings, null, 2),
    );
    expect(findings, JSON.stringify(findings)).toEqual([]);
  });
}

test('Search retains typing focus and diagram data stays consistent', async ({ page }) => {
  for (const [id, name, query] of [
    ['18-knowledge-garden', 'Search notes', 'maintenance'],
    ['41-terminal-manual', 'Find a command', 'restore'],
  ]) {
    await page.goto(`/preview/${id}/start`);
    const input = page.getByRole('textbox', { name });
    await input.pressSequentially(query);
    await expect(input).toBeFocused();
    await expect(input).toHaveValue(query);
    await expect(page).toHaveURL(/\/search$/);
  }
  await page.goto('/preview/17-observatory/start');
  await page.getByRole('combobox', { name: /^Interval/ }).selectOption('14 days');
  await page.getByRole('button', { name: 'Missing-data example' }).click();
  await expect(page.locator('.readouts')).toContainText('12 / 14');
  await page.getByRole('combobox', { name: /^Station/ }).selectOption('Northbank bridge');
  await expect(page.locator('.readouts').locator('strong').first()).toContainText('2.0');
});
