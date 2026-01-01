import { test, expect } from '@playwright/test';

test('Battle Simulator opens without crashing', async ({ page }) => {
  // Capture console errors
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
      console.log(`PAGE ERROR: ${msg.text()}`);
    }
  });

  page.on('pageerror', exception => {
    consoleErrors.push(exception.message);
    console.log(`UNCAUGHT EXCEPTION: ${exception.message}`);
  });

  // Navigate to home
  await page.goto('http://localhost:3000');

  // Wait for the Battle Simulator trigger (it's inside the Unique Units section)
  // The trigger has "Battle Simulator" text
  const trigger = page.getByText('Battle Simulator').first();
  await expect(trigger).toBeVisible({ timeout: 10000 });
  
  // Click to open dialog
  await trigger.click();

  // Wait for dialog content to appear
  const dialog = page.getByRole('dialog');
  await expect(dialog).toBeVisible();

  // Check if "Battle Lab" title is visible (this is in the new header)
  await expect(page.getByText('Battle Lab')).toBeVisible();

  // Check for the FIGHT button
  const fightButton = page.getByRole('button', { name: /FIGHT/i });
  await expect(fightButton).toBeVisible();

  if (consoleErrors.length > 0) {
    throw new Error(`Found ${consoleErrors.length} console errors: 
${consoleErrors.join('
')}`);
  }
});
