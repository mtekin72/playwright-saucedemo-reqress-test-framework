import { defineConfig } from '@playwright/test';

export default defineConfig({
  // TypeScript config path
  tsconfig: './tsconfig.json',

  // Directory containing your tests
  testDir: './tests',

  // Run tests in parallel
  fullyParallel: true,

  // Forbid 'test.only' in CI
  forbidOnly: !!process.env.CI,

  // Retry tests on CI if they fail
  retries: process.env.CI ? 2 : 0,

  // Limit to 1 worker on CI
  workers: process.env.CI ? 1 : undefined,

  // Generate HTML report
  reporter: 'html',

  // Shared configuration
  use: {
    headless: true,
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },

  // Define named projects
  projects: [
    {
      name: 'UI Tests',
      testDir: './tests/UI',
      use: {
        baseURL: 'https://www.saucedemo.com/',
      },
    },
    {
      name: 'API Tests',
      testDir: './tests/API',
      use: {
        baseURL: 'https://reqres.in/',
        // You can add additional headers or setup here if needed
        // extraHTTPHeaders: { Authorization: 'Bearer YOUR_TOKEN' }
      },
    },
  ],

  // Optional: Start your web app before tests (if testing a local app)
  // webServer: {
  //   command: 'npm run start',
  //   url: 'http://127.0.0.1:3000',
  //   reuseExistingServer: !process.env.CI,
  // },
});


  // Optional: Uncomment to run local dev server for UI tests
  // webServer: {
  //   command: "npm run start",
  //   url: "http://localhost:3000",
  //   reuseExistingServer: !process.env.CI,
  // },



// import { defineConfig } from "@playwright/test";
// /**
//  * See https://playwright.dev/docs/test-configuration.
//  */
// export default defineConfig({
//   tsconfig: "./tsconfig.json",
//   testDir: "./tests",
//   /* Run tests in files in parallel */
//   fullyParallel: true,
//   /* Fail the build on CI if you accidentally left test.only in the source code. */
//   forbidOnly: !!process.env.CI,
//   /* Retry on CI only */
//   retries: process.env.CI ? 2 : 0,
//   /* Opt out of parallel tests on CI. */
//   workers: process.env.CI ? 1 : undefined,
//   /* Reporter to use. See https://playwright.dev/docs/test-reporters */
//   reporter: "html",
//   /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
//   use: {
//     /* Base URL to use in actions like `await page.goto('/')`. */
//     // baseURL: 'http://127.0.0.1:3000',
//     //baseURL: 'https://gorest.co.in/public/v2/',
//     headless: true,
//     /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
//     trace: "on-first-retry",
//     screenshot: "only-on-failure",
//     video: "retain-on-failure"
//   },

//   /* Configure projects for major browsers */
//   projects: [
//     {
//       name: "UI Tests",
//       testDir: "./tests/UI", // Path to your UI tests
//       use: {
//         baseURL: "https://www.saucedemo.com/", // UI base URL
//       },
//     },
//     {
//       name: "API Tests",
//       testDir: "./tests/API", // Path to your API tests
//       use: {
//         baseURL: "https://reqres.in/", // API base URL
//         // Set up additional API-specific configurations here (like headers)
//       },
//     },
//   ],

//   /* Run your local dev server before starting the tests */
//   // webServer: {
//   //   command: 'npm run start',
//   //   url: 'http://127.0.0.1:3000',
//   //   reuseExistingServer: !process.env.CI,
//   // },
// });
