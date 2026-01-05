
import { test, expect } from '@playwright/test';

test('Lobby Integrity Check', async ({ page }) => {
  console.log("Accessing /lobby...");
  await page.goto('http://localhost:3000/lobby');
  await page.waitForLoadState('networkidle');
  
  const content = await page.evaluate(() => document.body.innerText);
  console.log("Lobby Content Length:", content.length);
  
  const hasTabs = await page.isVisible('button:has-text("Create")');
  console.log("Has Tabs:", hasTabs);
  
  expect(content.length).toBeGreaterThan(100);
});
