// tests/oversight.spec.js
// Playwright test for https://nicklasfangerfisk.github.io/oversight/

const { test, expect } = require('@playwright/test');

test.describe('Oversight homepage', () => {
  test('should load the page and header contains Waynes World', async ({ page }) => {
    await page.goto('https://nicklasfangerfisk.github.io/oversight/');
    // Check that the page loaded
    expect(await page.title()).toBeTruthy();
    // Check that a header contains 'Waynes World'
    const headerText = await page.locator('h1').innerText();
    expect(headerText).toMatch(/Waynes World/i);
  });
});
