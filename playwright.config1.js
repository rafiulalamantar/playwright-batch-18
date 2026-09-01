// @ts-check

const { defineConfig, devices } = require('@playwright/test');
require('dotenv').config();

/**
 * @see https://playwright.dev/docs/test-configuration
 */
const config = defineConfig({
  testDir: './tests',
  workers: 2,
  retries:1,

  timeout: 50 * 1000,

  expect: {
    timeout: 5000,
  },

  reporter: 'html',

  projects: [
    {
      name: 'Safari',
      use: {
        browserName: 'webkit',
        headless: false,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        screenshot: "only-on-failure",
        trace: "on",
        ...devices['iPhone 11 Pro Max'],
      },
    },

    {
      name: 'Chrome',
      use: {
        browserName: 'chromium',
        headless: false,
        actionTimeout: 10 * 1000,
        navigationTimeout: 30 * 1000,
        screenshot: "only-on-failure",
        trace: "on",
        // ...devices['Pixel 10'],
        ignoreHTTPSErrors:true,
        permissions:['geolocation'],

      },
    },
  ],
});

module.exports = config;