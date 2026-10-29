import { test, expect, type Page } from '@playwright/test';
import catalogue from '../catalogue.json' with { type: 'json' };

const journeys: [string, string, (page: Page) => Promise<void>][] = [
  [
    '76',
    'unfold and keep a reading',
    async (p) => {
      await p.getByRole('button', { name: 'Unfold all' }).click();
      await expect(p.locator('.crease[aria-expanded="true"]')).toHaveCount(6);
      await p.getByRole('button', { name: 'Open the spread' }).nth(3).click();
      await expect(p.getByRole('heading', { level: 1 })).toHaveText('Six hands, one sentence');
      await p.getByRole('button', { name: 'Add this reading' }).click();
      await p.getByRole('button', { name: /My itinerary/ }).click();
      await expect(p.locator('.itinerary li')).toHaveCount(1);
      await p.reload();
      await expect(p.locator('.itinerary')).toContainText('Six hands, one sentence');
    },
  ],
  [
    '77',
    'peel maps and compare an address',
    async (p) => {
      await p.getByRole('checkbox', { name: /1890/ }).uncheck();
      await p.getByRole('button', { name: 'Explore Number 18' }).click();
      await expect(p.locator('.then')).toContainText('lamp oil');
      await expect(p.locator('.now')).toContainText('shared kitchen');
      await p.getByRole('button', { name: 'The voices' }).click();
      await expect(p.locator('.accounts article')).toHaveCount(3);
    },
  ],
  [
    '78',
    'move the aperture and keep an exposure',
    async (p) => {
      await p.getByRole('button', { name: 'Next exposure' }).click();
      await expect(p.locator('.aperture-note h2')).toHaveText('Corner window');
      await p.getByRole('button', { name: 'Enter exposure' }).click();
      await p.getByRole('button', { name: 'Keep this exposure' }).click();
      await p.getByRole('button', { name: 'Expose the collection' }).click();
      await expect(p.locator('.contact-strip button').nth(3)).toContainText('KEPT');
    },
  ],
  [
    '79',
    'tune and build a listening sequence',
    async (p) => {
      await p.getByRole('button', { name: '101.0', exact: true }).click();
      await expect(p.getByRole('heading', { level: 1 })).toHaveText('Distant machinery');
      await p.getByRole('button', { name: 'Enter the transmission' }).click();
      await p.getByRole('button', { name: 'Add to listening sequence' }).click();
      await p.getByRole('button', { name: /Your sequence/ }).click();
      await expect(p.locator('.sequence li')).toContainText('Distant machinery');
    },
  ],
  [
    '80',
    'switch narrators at a shared crossing',
    async (p) => {
      await p.getByRole('button', { name: 'The rain arrives' }).click();
      await p.getByRole('button', { name: 'Nell / gardener', exact: true }).click();
      await expect(p.locator('blockquote')).toContainText('small brown river');
      await p.getByRole('button', { name: 'Follow the other voice' }).click();
      await expect(p.locator('blockquote')).toContainText('windscreen');
    },
  ],
  [
    '81',
    'adjust the reading seam and inspect a pair',
    async (p) => {
      await p.getByRole('button', { name: 'More of A' }).click();
      const widths = await p
        .locator('.duet')
        .first()
        .evaluate((el) => [...el.children].map((e) => e.getBoundingClientRect().width));
      expect(widths[0]).toBeGreaterThan(widths[1]);
      await p.getByRole('button', { name: 'Read this exchange' }).nth(2).click();
      await expect(p.getByRole('heading', { level: 1 })).toHaveText('The material');
      await expect(p.locator('blockquote')).toHaveCount(2);
    },
  ],
  [
    '82',
    'collect a finding in its depth context',
    async (p) => {
      await p.getByRole('button', { name: /EXCAVATE \/ A clay rim/ }).click();
      await expect(p.getByRole('heading', { level: 1 })).toHaveText('A clay rim');
      await p.getByRole('button', { name: 'Keep this finding' }).click();
      await p.getByRole('button', { name: /My cross-section/ }).click();
      await expect(p.locator('.collection article')).toContainText('4.1 m');
    },
  ],
  [
    '83',
    'reach an ending and undo a branch',
    async (p) => {
      await p.getByRole('button', { name: 'a window facing yesterday' }).click();
      await p.getByRole('button', { name: 'leave the window open' }).click();
      await p.getByRole('button', { name: 'closed the book' }).click();
      await expect(p.locator('.ending')).toContainText('END 3 OF 3');
      await p.getByRole('button', { name: 'Revisit the last choice' }).click();
      await expect(p.getByRole('heading', { level: 1 })).toHaveText('An interval');
      await p.reload();
      await expect(p.getByRole('heading', { level: 1 })).toHaveText('An interval');
    },
  ],
  [
    '84',
    'follow a bottleneck through two runs',
    async (p) => {
      await p.getByRole('button', { name: 'Keep this run' }).click();
      await p.getByRole('button', { name: 'Return to the levers' }).click();
      await p.getByLabel('Sorting staff').fill('3');
      await expect(p.getByRole('status')).toContainText('delivery routes');
      await p.getByLabel('Delivery routes').fill('4');
      await expect(p.getByRole('status')).toContainText('0 waiting');
      await p.getByRole('button', { name: 'Keep this run' }).click();
      await expect(p.locator('.difference')).toContainText('20 more parcels');
    },
  ],
  [
    '85',
    'reveal a dossier and reconstruct chronology',
    async (p) => {
      await p.getByRole('button', { name: 'Reveal the complete dossier' }).click();
      await expect(p.locator('.redaction[aria-expanded="true"]')).toHaveCount(6);
      await p.getByRole('button', { name: 'Read the disputed annotation' }).nth(1).click();
      await expect(p.locator('.notes')).toContainText('wrong office');
      await p.getByRole('button', { name: 'Reconstruct the sequence' }).click();
      await p.getByRole('button', { name: 'Arrange chronologically' }).click();
      await expect(p.locator('.timeline time')).toHaveText([
        '12 March',
        '28 March',
        '17 April',
        '04 June',
        '19 July',
        '02 September',
      ]);
    },
  ],
  [
    '86',
    'align ink plates and prepare a proof',
    async (p) => {
      await p.getByRole('checkbox', { name: 'Cyan plate' }).uncheck();
      await expect(p.locator('.ink.cyan')).toHaveCount(0);
      await p.getByRole('button', { name: 'Snap registration' }).click();
      await expect(p.getByRole('status')).toContainText('Registered');
      await p.getByRole('button', { name: 'Prepare an edition' }).click();
      await expect(p.locator('.edition')).toContainText('Offset 0 mm');
      await p.evaluate(() => {
        window.print = () => {
          document.body.dataset.printed = 'yes';
        };
      });
      await p.getByRole('button', { name: 'Print this edition' }).click();
      await expect(p.locator('body')).toHaveAttribute('data-printed', 'yes');
    },
  ],
  [
    '87',
    'navigate a component and complete inspection',
    async (p) => {
      await p.getByRole('button', { name: 'Assemble the camera' }).click();
      await expect(p.locator('.camera')).toHaveClass(/assembled/);
      await p.getByRole('button', { name: '03 / Lens barrel', exact: true }).click();
      await expect(p.locator('.lead')).toContainText('engraved scale');
      await p.getByRole('button', { name: 'Inspection sequence' }).click();
      for (let i = 0; i < 5; i++)
        await p.getByRole('button', { name: 'Record observation and continue' }).click();
      await p.getByRole('button', { name: 'Finish sample inspection' }).click();
      await expect(p.getByRole('status')).toContainText('All six');
    },
  ],
  [
    '88',
    'descend and return through containment',
    async (p) => {
      await p.locator('.wings>button').nth(1).click();
      await expect(p.getByRole('heading', { level: 1 })).toHaveText('Things that measure');
      await p.locator('.rooms>button').first().click();
      await expect(p.getByRole('heading', { level: 1 })).toHaveText('The short ruler');
      await p.getByRole('button', { name: 'Keep in your cabinet' }).click();
      await p.getByRole('button', { name: /Cabinet \(/ }).click();
      await expect(p.locator('.cabinet-objects')).toContainText('The short ruler');
    },
  ],
  [
    '89',
    'reverse figure-ground and enforce a three-work show',
    async (p) => {
      await p.getByRole('button', { name: 'Reverse figure / ground' }).click();
      await expect(p.locator('main')).toHaveClass(/inverted/);
      await p.getByRole('button', { name: 'Enter the work' }).first().click();
      for (let i = 0; i < 3; i++) {
        await p.getByRole('button', { name: 'Add to your three-work show' }).click();
        await p.getByRole('button', { name: 'Next absence' }).click();
      }
      await p.getByRole('button', { name: 'Add to your three-work show' }).click();
      await expect(p.getByRole('status')).toContainText('three spaces are full');
      await p.getByRole('button', { name: /Your exhibition/ }).click();
      await expect(p.locator('.show-wall article')).toHaveCount(3);
    },
  ],
  [
    '90',
    'flip a ribbon into its draft',
    async (p) => {
      await p.getByRole('button', { name: 'Turn to the field notes' }).click();
      await expect(p.locator('.ribbon article p')).toContainText('Counted seven arches');
      await p.getByRole('button', { name: 'Read both versions' }).click();
      await expect(p.locator('.front')).toContainText('river borrowed');
      await expect(p.locator('.back')).toContainText('echo');
    },
  ],
  [
    '91',
    'connect two sockets and keep their essay',
    async (p) => {
      await p.getByRole('button', { name: 'Memory', exact: true }).click();
      await p.getByRole('button', { name: 'Repair', exact: true }).click();
      await expect(p.locator('.connection h2')).toHaveText('Mending an account');
      await p.getByRole('button', { name: 'Enter this connection' }).click();
      await p.getByRole('button', { name: 'Keep this connection' }).click();
      await p.getByRole('button', { name: /Patch sheet/ }).click();
      await expect(p.locator('.patches li')).toContainText('Memory ↝ Repair');
    },
  ],
  [
    '92',
    'record only explicit actions and undo them',
    async (p) => {
      await p.locator('.primary-action').click();
      await p.getByRole('button', { name: 'Hesitate', exact: true }).click();
      await expect(p.getByRole('status')).toContainText('pause');
      await p.getByRole('button', { name: 'Undo last action' }).click();
      await p.getByRole('button', { name: /Read the trace/ }).click();
      await expect(p.locator('.transcript li')).toHaveCount(1);
      await p.reload();
      await expect(p.locator('.transcript li')).toHaveCount(0);
    },
  ],
  [
    '93',
    'retrieve by form and keep a constellation',
    async (p) => {
      await p.getByRole('button', { name: 'Branch', exact: true }).click();
      await expect(p.locator('.matches>button')).toHaveCount(2);
      await p.locator('.matches>button').first().click();
      await expect(p.getByRole('heading', { level: 1 })).toHaveText('A meeting of streams');
      await p.getByRole('button', { name: 'Keep this form' }).click();
      await p.getByRole('button', { name: /Your constellation/ }).click();
      await expect(p.locator('.kept button')).toHaveCount(1);
    },
  ],
  [
    '94',
    'select a measure and arrange a reading score',
    async (p) => {
      await p.locator('.measure-head button').nth(3).click();
      await p.getByRole('button', { name: 'Add this measure' }).click();
      await p.getByRole('button', { name: /Your arrangement/ }).click();
      await expect(p.locator('.arrangement li')).toContainText('Held breath');
      await p.locator('.arrangement li button').first().click();
      await expect(p.locator('.voice-lines section')).toHaveCount(4);
    },
  ],
  [
    '95',
    'jog film and compare storyboard',
    async (p) => {
      await p.getByRole('button', { name: 'One frame →', exact: true }).click();
      await expect(p.locator('.frame-number')).toHaveText('026');
      await p.getByRole('button', { name: 'Show storyboard' }).click();
      await expect(p.locator('.screen')).toHaveClass(/sketch/);
      await p.locator('.filmstrip>button').last().click();
      await expect(p.locator('.frame-number')).toHaveText('061');
      await p.getByRole('button', { name: 'Read this moment' }).click();
      await expect(p.getByRole('heading', { level: 1 })).toHaveText('Morning at the sill');
    },
  ],
  [
    '96',
    'change a curatorial movement rule',
    async (p) => {
      await expect(p.locator('.board>button').first()).toBeDisabled();
      await p.getByLabel('The current rule').selectOption('diagonal');
      await expect(p.locator('.board>button').first()).toBeEnabled();
      await p.locator('.board>button').first().click();
      await p.getByRole('button', { name: /Your route/ }).click();
      await expect(p.locator('.route li')).toHaveCount(2);
      await expect(p.locator('.route li').last()).toContainText('A narrow permission');
    },
  ],
  [
    '97',
    'open an act and reserve a sample programme',
    async (p) => {
      await p.getByRole('button', { name: 'Open the curtain' }).click();
      await expect(p.locator('.stage-copy')).toContainText('The visitor');
      await p.getByRole('button', { name: '02 / The room answers' }).click();
      await expect(p.locator('.stage-copy')).toContainText('boundary has become');
      await p.getByRole('button', { name: 'The programme' }).click();
      await p.getByRole('button', { name: 'Reserve sample programme' }).click();
      await expect(p.getByRole('alert')).toBeVisible();
      await p.getByLabel('Name on your sample programme').fill('Robin');
      await p.getByRole('button', { name: 'Reserve sample programme' }).click();
      await expect(p.getByRole('status')).toContainText('Reserved for Robin');
    },
  ],
  [
    '98',
    'change a projection without losing the object',
    async (p) => {
      const shadow = p.locator('.field .shadow').first();
      const before = await shadow.getAttribute('style');
      await p.getByRole('button', { name: 'West →', exact: true }).click();
      expect(await shadow.getAttribute('style')).not.toBe(before);
      await p.locator('.field>button').nth(1).click();
      await expect(p.getByRole('heading', { level: 1 })).toHaveText('An open ring');
      await p.getByRole('button', { name: 'North', exact: true }).click();
      await expect(p.locator('.projection>span')).toContainText('NORTH');
    },
  ],
  [
    '99',
    'assemble and restore a credited edition',
    async (p) => {
      await p.getByRole('button', { name: 'Next sky', exact: true }).click();
      await p.getByRole('button', { name: 'Next figure', exact: true }).click();
      await p.getByRole('button', { name: /Keep composition/ }).click();
      await expect(p.locator('.edition-number')).toHaveText('24');
      await p.reload();
      await expect(p.locator('.edition dd')).toHaveText([
        'Weather arriving',
        'A keeper of circles',
        'The folded road',
      ]);
      await p.getByRole('button', { name: 'Open this composition' }).click();
      await expect(p.locator('.composition-number')).toHaveText('EDITION 24 / 27');
    },
  ],
  [
    '100',
    'zoom between levels of explanation',
    async (p) => {
      await p.getByRole('button', { name: 'Zoom out one scale' }).click();
      await expect(p.getByRole('heading', { level: 1 })).toHaveText(
        'A crossing becomes a surface.',
      );
      await p.locator('.scale-index button').last().click();
      await expect(p.locator('.ruler')).toContainText('1 km');
      await p.getByRole('button', { name: 'Read at this scale' }).click();
      await expect(p.locator('.lead')).toContainText('suppliers');
      await p.getByRole('button', { name: 'The whole journey' }).click();
      await expect(p.locator('.journey li')).toHaveCount(5);
    },
  ],
];

for (const [id, name, run] of journeys)
  test(`${id} experimental journey: ${name}`, async ({ page }) => {
    const errors: string[] = [];
    page.on('pageerror', (e) => errors.push(e.message));
    await page.goto(catalogue.find((d) => d.id === id)!.entryRoute);
    await run(page);
    expect(errors).toEqual([]);
  });

test('Gesture drawing and timed experiences have direct, controllable alternatives', async ({
  page,
}) => {
  await page.goto('/preview/93-gesture-index/start');
  const pad = (await page.locator('.drawing-pad svg').boundingBox())!;
  await page.mouse.move(pad.x + pad.width * 0.5 + 100, pad.y + pad.height * 0.5);
  await page.mouse.down();
  for (let i = 0; i <= 16; i++) {
    const angle = (i / 16) * Math.PI * 2;
    await page.mouse.move(
      pad.x + pad.width * 0.5 + Math.cos(angle) * 100,
      pad.y + pad.height * 0.5 + Math.sin(angle) * 90,
    );
  }
  await page.mouse.up();
  await expect(page.getByRole('status')).toContainText('Loop');
  await page.goto('/preview/94-score-reader/start');
  await expect(page.getByRole('checkbox', { name: 'Optional quiet tones' })).not.toBeChecked();
  await page.getByRole('button', { name: 'Perform the sequence' }).click();
  await expect(page.getByRole('button', { name: 'Pause reading' })).toBeVisible();
  await page.getByRole('button', { name: 'Pause reading' }).click();
  await page.goto('/preview/95-frame-by-frame/start');
  await page.getByRole('button', { name: 'Play film' }).click();
  await expect(page.locator('.frame-number')).not.toHaveText('025');
  await page.getByRole('button', { name: 'Pause film' }).click();
});
