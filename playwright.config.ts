import { defineConfig } from "@playwright/test";

/**
 * ✅ Playwright configuration
 * - tsconfig.json is referenced
 * - UI and API projects are defined with separate test directories
 * - CI-friendly settings for retries, parallelism, and reporting
 */
export default defineConfig({
  tsconfig: "./tsconfig.json",       // TypeScript config reference
  testDir: "./tests",                // Base directory for all tests
  fullyParallel: true,               // Run all tests in parallel
  forbidOnly: !!process.env.CI,      // Prevent accidental .only in CI
  retries: process.env.CI ? 2 : 0,   // Retry tests on CI
  workers: process.env.CI ? 1 : undefined, // Use 1 worker in CI to avoid concurrency issues
  reporter: "html",                  // Use built-in HTML reporter

  use: {
    headless: true,                      // Run headless by default
    trace: "on-first-retry",            // Capture traces only when retrying
    screenshot: "only-on-failure",      // Take screenshots on failure
    video: "retain-on-failure",         // Keep videos only on failure
  },

  projects: [
    {
      name: "UI Tests",
      testDir: "./tests/UI",             // Folder with UI tests
      use: {
        baseURL: "https://www.saucedemo.com/", // Base URL for UI
      },
    },
    {
      name: "API Tests",
      testDir: "./tests/API",            // Folder with API tests
      use: {
        baseURL: "https://reqres.in/",   // Base URL for API testing
        // Add headers, auth, etc. here if needed
      },
    },
  ],
});
