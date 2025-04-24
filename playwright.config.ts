import { defineConfig } from "@playwright/test";
/**
 * Playwright configuration file
 */
export default defineConfig({
  tsconfig: "./tsconfig.json",  // Reference the tsconfig file
  testDir: "./tests",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: "html",
  use: {
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure"
  },

  projects: [
    {
      name: "UI Tests",
      testDir: "./tests/UI", // Path to your UI tests
      use: {
        baseURL: "https://www.saucedemo.com/", // UI base URL
      },
    },
    {
      name: "API Tests",
      testDir: "./tests/API", // Path to your API tests
      use: {
        baseURL: "https://reqres.in/", // API base URL
        // Additional API-specific configurations can be added here (e.g., headers)
      },
    },
  ],
});
