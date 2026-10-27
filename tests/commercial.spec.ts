import { test, expect } from '@playwright/test';

test('Conversation guide recommendations follow the answers and direct browse choice', async ({
  page,
}) => {
  await page.goto('/preview/19-conversation-desk/start');
  await page.getByRole('button', { name: 'A team session →', exact: true }).click();
  await page.getByRole('button', { name: 'A few hours →', exact: true }).click();
  await page.getByRole('button', { name: 'Somewhere quiet →', exact: true }).click();
  await expect(page.locator('.recommendation h2')).toHaveText('The Workshop');
  await expect(page.locator('.recommendation')).toContainText('Three-hour access: £45');
  await page.getByRole('button', { name: 'See every workspace →' }).click();
  await page
    .locator('.space')
    .filter({ has: page.getByRole('heading', { name: 'The Long Table' }) })
    .getByRole('button')
    .click();
  await expect(page.locator('.recommendation h2')).toHaveText('The Long Table');
});

test('Business discovery finds industries, combined needs and shareable facets', async ({
  page,
}) => {
  await page.goto('/');
  const search = page.getByRole('textbox', { name: 'Search designs' });
  for (const [query, design] of [
    ['storage', 'Unit Finder'],
    ['storage', 'Local Trades'],
    ['dentist', 'Clinical Practice'],
    ['accountant', 'Casebook Authority'],
    ['appointment-based local business', 'Appointment Studio'],
    ['one-page brochure', 'One-Page Business Card'],
    ['enquiry-driven B2B', 'Industrial Capability'],
  ]) {
    await search.fill(query);
    await expect(page.getByRole('link', { name: 'Inspect ' + design, exact: true })).toBeVisible();
  }
  await search.fill('');
  await page.getByLabel('Industry', { exact: true }).selectOption('Accountant');
  await page
    .getByLabel('Conversion action', { exact: true })
    .selectOption('Request a consultation');
  await page.getByLabel('Interaction type', { exact: true }).selectOption('Structured intake');
  await expect(page.locator('.g-card')).toHaveCount(1);
  await page.reload();
  await expect(page.locator('.g-card')).toHaveCount(1);
  await expect(page.getByLabel('Industry', { exact: true })).toHaveValue('Accountant');
  await page.getByRole('button', { name: 'Reset', exact: true }).click();
  await expect(page.locator('.g-card')).toHaveCount(75);
});

test('Staff booking resets unavailable selections and vehicle estimate follows vehicle type', async ({
  page,
}) => {
  await page.goto('/preview/53-appointment-studio/book');
  await page.getByRole('radio', { name: /Robin/ }).check();
  await page.getByRole('radio', { name: '13:00', exact: true }).check();
  await page.getByLabel('03 / Day').selectOption('Friday 13 Nov');
  await expect(page.getByRole('radio', { name: '13:00', exact: true })).not.toBeChecked();
  await page.getByLabel('Your name', { exact: true }).fill('Sample Person');
  await page.getByLabel('Email', { exact: true }).fill('person@example.com');
  await page.getByRole('button', { name: /Review sample booking/ }).click();
  await expect(page.getByRole('alert')).toContainText('Choose an available time');
  await page.getByRole('radio', { name: '13:00', exact: true }).check();
  await page.getByRole('button', { name: /Review sample booking/ }).click();
  await expect(page.getByRole('status')).toContainText('with Robin');
  await expect(page.getByRole('status')).toContainText('Friday 13 Nov · 13:00');
  await page.goto('/preview/58-service-bay/estimate');
  await page.getByLabel('Vehicle type').selectOption('SUV / van');
  await page.getByLabel('Requested service').selectOption('1');
  await expect(page.locator('.estimate-ticket .total')).toContainText('$65');
});

test('Storage calculator explains capacity, full units, and reservation alternatives', async ({
  page,
}) => {
  await page.goto('/preview/59-unit-finder/size');
  await expect(page.locator('.recommendation h2')).toHaveText('Small');
  await page.getByRole('spinbutton', { name: 'Sofas', exact: true }).fill('-1');
  await expect(page.getByRole('alert')).toContainText('whole number');
  await expect(page.locator('.recommendation h2')).toHaveCount(0);
  await page.getByRole('spinbutton', { name: 'Sofas', exact: true }).fill('2');
  await expect(page.locator('.recommendation h2')).toHaveText('Medium');
  await expect(page.locator('.capacity')).toContainText('7.8 m³');
  await expect(page.getByRole('button', { name: 'This size is currently full' })).toBeDisabled();
  await page.getByRole('button', { name: 'Consider the next available size →' }).click();
  await expect(page.getByLabel('Unit size')).toHaveValue('3');
  await page.getByLabel('Name', { exact: true }).fill('Sample Person');
  await page.getByLabel('Email', { exact: true }).fill('person@example.com');
  await page.getByRole('checkbox').check();
  await page.getByRole('button', { name: 'Review unit reservation' }).click();
  await expect(page.getByRole('status')).toContainText('Large');
  await expect(page.getByRole('status')).toContainText('$175');
});

test('Venue capacity and recurring-service coverage prevent incompatible requests', async ({
  page,
}) => {
  await page.goto('/preview/63-venue-floorplan/enquiry');
  await page.getByRole('button', { name: 'Workshop', exact: true }).click();
  await expect(page.getByRole('alert')).toContainText('exceeds');
  await page.getByLabel('Your name').fill('Sample Person');
  await page.getByLabel('Email', { exact: true }).fill('person@example.com');
  await page.getByRole('button', { name: 'Review event enquiry' }).click();
  await expect(page.getByRole('heading', { name: 'A gathering taking shape.' })).toHaveCount(0);
  await page.getByLabel('Expected guests').fill('30');
  await page.getByRole('button', { name: 'Review event enquiry' }).click();
  await expect(page.locator('.confirmation')).toContainText('30 guests · Workshop');
  await page.goto('/preview/64-service-plans/booking');
  await page.getByLabel('Postcode', { exact: true }).fill('ZZ9');
  await page.getByRole('button', { name: 'Check sample coverage' }).click();
  await expect(page.getByRole('alert')).toContainText('outside');
  await expect(page.getByRole('button', { name: 'Review sample recurring booking' })).toHaveCount(
    0,
  );
  await page.getByLabel('Postcode', { exact: true }).fill('nb1 2ab');
  await page.getByRole('button', { name: 'Check sample coverage' }).click();
  await page.getByRole('combobox', { name: 'Frequency', exact: true }).selectOption('Weekly');
  await expect(page.locator('.tidy-summary')).toContainText('$85.50');
  await page.getByLabel('Name', { exact: true }).fill('Sample Person');
  await page.getByLabel('Email', { exact: true }).fill('person@example.com');
  await page.getByRole('button', { name: 'Review sample recurring booking' }).click();
  await expect(page.locator('.confirmation')).toContainText('Weekly');
});

test('Branch selection retains the right service and custom materials change the brief', async ({
  page,
}) => {
  await page.goto('/preview/65-branch-network/start');
  await page.getByLabel('What does your bike need?').selectOption('Cargo bikes');
  await expect(page.locator('.branch-card')).toHaveCount(2);
  await page.locator('.branch-card').filter({ hasText: 'Riverside' }).click();
  await page.getByRole('button', { name: 'Book at this branch →' }).click();
  await expect(page.getByRole('combobox', { name: 'Service', exact: true })).toHaveValue(
    'Cargo bikes',
  );
  await expect(page.getByRole('heading', { level: 1 })).toHaveText('Book at Riverside');
  await page.getByLabel('Your name').fill('Sample Person');
  await page.getByLabel('Email', { exact: true }).fill('person@example.com');
  await page.getByRole('button', { name: 'Review branch booking' }).click();
  await expect(page.getByRole('status')).toContainText('4 Towpath Yard');
  await page.getByRole('button', { name: '← All three branches' }).click();
  await page.getByRole('button', { name: 'Open Maple Street branch', exact: true }).click();
  await page.getByRole('button', { name: 'Book at this branch →' }).click();
  await expect(page.getByRole('combobox', { name: 'Service', exact: true })).toHaveValue(
    'Everyday service',
  );
  await page.goto('/preview/66-commission-studio/configure');
  await page.getByRole('radio', { name: 'Walnut', exact: true }).check();
  await page.getByRole('slider', { name: '02 / Length in centimetres' }).fill('200');
  await expect(page.locator('.estimate')).toContainText('$2,580');
  await page.getByRole('button', { name: 'Continue with this direction →' }).click();
  await expect(page.locator('svg')).toHaveAttribute('aria-label', /Walnut table, 200/);
});

test('Collection baskets preserve quantities and calculate useful totals', async ({ page }) => {
  await page.goto('/preview/52-corner-shop/start');
  await page.getByRole('button', { name: 'Reserve A very good notebook' }).click();
  await page.getByRole('button', { name: /Your collection/ }).click();
  await page.getByRole('spinbutton', { name: 'A very good notebook quantity' }).fill('3');
  await expect(page.getByText('Total at collection:')).toContainText('$36');
  await page.getByRole('button', { name: 'Choose a collection time →' }).click();
  await page.getByLabel('Name', { exact: true }).fill('Sample Person');
  await page.getByLabel('Email', { exact: true }).fill('person@example.com');
  await page.getByRole('button', { name: 'Reserve sample collection' }).click();
  await expect(page.getByRole('status')).toContainText('3 items · $36');
  await page.goto('/preview/67-everyday-eatery/menu');
  await page
    .getByRole('button', { name: 'Add The Margherita', exact: true })
    .click({ clickCount: 2 });
  await page.getByRole('button', { name: 'Sides', exact: true }).click();
  await page.getByRole('button', { name: 'Add Garlic knots', exact: true }).click();
  await expect(page.locator('.basket-total')).toContainText('$34');
  await page.getByRole('button', { name: 'Remove one The Margherita' }).click();
  await expect(page.locator('.basket-total')).toContainText('$20');
  await page.getByRole('button', { name: 'Choose collection time →' }).click();
  await page.getByLabel('Name for collection').fill('Sample Person');
  await page.getByLabel('Email', { exact: true }).fill('person@example.com');
  await page.getByRole('button', { name: 'Review sample order' }).click();
  await expect(page.locator('.confirmation')).toContainText('2 items · $20');
});

test('Urgent repair requests require coverage before contact intake', async ({ page }) => {
  await page.goto('/preview/68-rapid-response/start');
  await page.getByRole('button', { name: /I need help soon/ }).click();
  await page.getByLabel('Area or postcode').fill('Outside town');
  await page.getByRole('button', { name: 'Check sample coverage' }).click();
  await expect(page.getByRole('alert')).toContainText('outside');
  await page.getByLabel('Area or postcode').fill('Northbank');
  await page.getByRole('button', { name: 'Check sample coverage' }).click();
  await page.getByRole('button', { name: 'Continue with urgent request →' }).click();
  await page.getByLabel('Your name').fill('Sample Person');
  await page.getByLabel('Callback number').fill('202 555 0100');
  await page.getByRole('button', { name: 'Review callback request' }).click();
  await expect(page.locator('.confirmation')).toContainText('Urgent · Locked out · Northbank');
});

test('Forum replies, moderation and documentation versions behave as presented', async ({
  page,
}) => {
  await page.goto('/preview/73-community-forum/start');
  await page
    .getByRole('button', { name: 'A workbench that fits a small room', exact: true })
    .click();
  await page
    .getByRole('textbox', { name: 'Add to the conversation' })
    .fill('A temporary layout would help test the reach to each tool.');
  await page.getByRole('button', { name: 'Post sample reply' }).click();
  await expect(page.locator('.new-reply')).toContainText('temporary layout');
  await page.getByRole('button', { name: '← Discussions', exact: true }).click();
  await page.getByRole('button', { name: 'November workshop guidelines', exact: true }).click();
  await expect(page.getByRole('textbox', { name: 'Replies are closed' })).toBeDisabled();
  await expect(page.getByRole('button', { name: 'Post sample reply' })).toBeDisabled();
  const search = page.getByRole('textbox', { name: 'Search discussions' });
  await search.pressSequentially('workbench');
  await expect(search).toBeFocused();
  await expect(search).toHaveValue('workbench');
  await expect(
    page.getByRole('button', { name: 'A workbench that fits a small room', exact: true }),
  ).toBeVisible();
  await page.goto('/preview/74-modern-docs-portal/quickstart');
  await page.getByRole('button', { name: 'Show local sample response' }).click();
  await expect(page.locator('.response-code')).toContainText('metadata');
  await page.getByRole('combobox', { name: 'Version', exact: true }).selectOption('v1');
  await expect(page.locator('.code-panel pre')).toContainText('/v1/notes');
  await page.getByRole('button', { name: 'Show local sample response' }).click();
  await expect(page.locator('.response-code')).not.toContainText('metadata');
  await page.getByRole('combobox', { name: 'Example language', exact: true }).selectOption('cURL');
  await expect(page.locator('.code-panel pre')).toContainText('curl -X POST');
});

test('Contribution allocation, programme comparisons and report totals remain consistent', async ({
  page,
}) => {
  await page.goto('/preview/69-impact-nonprofit/contribute');
  await page.getByRole('radio', { name: '$100', exact: true }).check();
  await expect(page.locator('.allocation dl')).toContainText('$60.00');
  await expect(page.locator('.allocation dl')).toContainText('$25.00');
  await expect(page.locator('.allocation dl')).toContainText('$15.00');
  await page.goto('/preview/71-learning-prospectus/start');
  await page.getByRole('checkbox', { name: 'Compare Writing for public life' }).check();
  await expect(page.locator('.comparison-band table')).toContainText('Writing for public life');
  await expect(page.locator('.comparison-band table')).not.toContainText(
    'Digital design foundations',
  );
  await page.goto('/preview/75-annual-report/finances');
  await expect(page.locator('tfoot')).toContainText('$800,000');
  await page.getByRole('button', { name: 'Spending', exact: true }).click();
  await expect(page.locator('tfoot')).toContainText('$760,000');
  const shares = await page.locator('.finance-bars b').allTextContents();
  expect(shares).toEqual(['59.2%', '27.6%', '13.2%']);
});
