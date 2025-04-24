import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
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
    video: "retain-on-failure",
  },

  projects: [
    {
      name: "UI Tests",
      testDir: "./tests/UI",
      use: {
        baseURL: "https://www.saucedemo.com/",
        ...devices["Desktop Chrome"], // Optional but recommended for UI
      },
    },
    {
      name: "API Tests",
      testDir: "./tests/API",
      use: {
        baseURL: "https://reqres.in/",
      },
    },
  ],
});
