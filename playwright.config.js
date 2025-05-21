// playwright.config.js
// Basic Playwright config for running tests

/** @type {import('@playwright/test').PlaywrightTestConfig} */
const config = {
  use: {
    baseURL: undefined,
    headless: true,
    browserName: 'chromium',
  }
};

module.exports = config;
