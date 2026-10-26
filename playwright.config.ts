import { defineConfig } from '@playwright/test';
export default defineConfig({
  testDir: './tests',
  timeout: 45000,
  expect: { timeout: 5000 },
  workers: 2,
  fullyParallel: true,
  reporter: [['list'], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    headless: true,
    channel: process.env.CI ? undefined : 'msedge',
    reducedMotion: 'reduce',
  },
  webServer: {
    command: 'pnpm preview',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 20000,
  },
});
