import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  projects: [
    {
      name: 'UI Tests',
      testDir: './tests/UI', // Path to UI tests
      use: {
        baseURL: 'https://www.saucedemo.com/',
        browserName: 'chromium',
        headless: true,
      },
    },
    {
      name: 'API Tests',
      testDir: './tests/API', // Path to API tests
      use: {
        baseURL: 'https://reqres.in/',
        browserName: 'chromium',
        headless: true,
      },
    },
  ],
});
