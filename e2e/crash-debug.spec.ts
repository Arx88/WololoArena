import { test, expect } from '@playwright/test';

test('Capture console errors on load', async ({ page }) => {
  page.on('console', msg => console.log(`BROWSER CONS: ${msg.type()}: ${msg.text()}`));
  page.on('pageerror', err => console.log(`BROWSER ERR: ${err.message}`));

  await page.goto('http://localhost:3000');
  
  // Wait a bit to catch hydration errors
  await page.waitForTimeout(3000);
});
