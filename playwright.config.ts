// playwright.config.ts
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests', // Make sure this is the correct folder where your tests are
  timeout: 30 * 1000,
  retries: 0,
  use: {
    baseURL: 'https://www.saucedemo.com',
    headless: true,
    viewport: { width: 1280, height: 720 },
    actionTimeout: 0,
    ignoreHTTPSErrors: true,
    video: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },

  projects: [
    {
      name: 'UI Tests',
      testMatch: /.*\.ui\.spec\.ts/,
    },
    {
      name: 'API Tests',
      testMatch: /.*\.api\.spec\.ts/,
    },
  ],

  reporter: [['html', { outputFolder: 'playwright-report', open: 'never' }]],
});
