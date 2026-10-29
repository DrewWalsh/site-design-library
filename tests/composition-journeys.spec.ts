import { test, expect } from '@playwright/test';

test('Floating labels and vertical navigation leave phone destinations clickable', async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/preview/31-bauhaus-workshop/start');
  await page.getByRole('link', { name: 'Programme', exact: true }).click();
  await expect(page).toHaveURL(/#programme$/);
  await page.getByRole('button', { name: 'Try an exercise', exact: true }).click();
  await expect(page).toHaveURL(/\/exercise$/);
  await page.goto('/preview/77-palimpsest-city/start');
  await page.getByRole('button', { name: 'Explore Workers’ bridge', exact: true }).click();
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Workers’ bridge');
  await page.goto('/preview/80-braided-voices/start');
  await page.getByRole('button', { name: 'Follow the threads', exact: true }).click();
  await page.getByRole('button', { name: 'Full transcript', exact: true }).click();
  await expect(page).toHaveURL(/\/transcript$/);
  await page.goto('/preview/98-shadow-archive/start');
  await page.getByRole('button', { name: 'Complete index ↗', exact: true }).click();
  await expect(page).toHaveURL(/\/index$/);
});

test('Entry decisions carry the selected appointment, unit and room arrangement forward', async ({
  page,
}) => {
  await page.goto('/preview/53-appointment-studio/start');
  await page.getByRole('button', { name: 'Book Robin at 13:00' }).click();
  await expect(page.getByRole('radio', { name: /Robin/ })).toBeChecked();
  await expect(page.getByRole('radio', { name: '13:00', exact: true })).toBeChecked();
  await page.goto('/preview/59-unit-finder/start');
  await page.getByRole('spinbutton', { name: 'Sofas', exact: true }).fill('2');
  await expect(page.locator('.recommendation h2')).toHaveText('Medium');
  await page.getByRole('button', { name: 'Consider the next available size →' }).click();
  await expect(page.getByLabel('Unit size')).toHaveValue('3');
  await page.goto('/preview/63-venue-floorplan/start');
  await page.getByRole('button', { name: 'Theatre', exact: true }).click();
  await page.getByLabel('Expected guests').fill('100');
  await page.getByRole('button', { name: 'Enquire with this layout →' }).click();
  await expect(page.getByRole('button', { name: 'Theatre', exact: true })).toHaveAttribute(
    'aria-pressed',
    'true',
  );
  await expect(page.getByLabel('Expected guests')).toHaveValue('100');
});

test('Graphic index density preserves finite pagination and filtered results', async ({ page }) => {
  await page.goto('/preview/50-infinite-index/start');
  await expect(page.locator('.index-grid > button')).toHaveCount(24);
  await expect(page.getByRole('button', { name: 'Next →', exact: true })).toBeDisabled();
  await page.getByRole('button', { name: 'Detail', exact: true }).click();
  await expect(page.locator('.index-grid > button')).toHaveCount(6);
  await page.getByRole('button', { name: 'Next →', exact: true }).click();
  await expect(page.locator('.pagination')).toContainText('PAGE 2 OF 4');
  await page.getByRole('combobox', { name: 'Medium', exact: true }).selectOption('Print');
  await expect(page.locator('.pagination')).toContainText('PAGE 1 OF 2 / 8 STUDIES');
  await page.getByRole('button', { name: 'Overview', exact: true }).click();
  await expect(page.locator('.index-grid > button')).toHaveCount(8);
  await page.locator('.index-grid > button').first().click();
  await page.getByRole('button', { name: '← Return to the same results' }).click();
  await expect(page.getByRole('combobox', { name: 'Medium', exact: true })).toHaveValue('Print');
  await expect(page.locator('.index-grid > button')).toHaveCount(8);
});
