import { test, expect } from '@playwright/test';

test.describe('Total Site Audit', () => {
  
  test.beforeEach(async ({ page }) => {
    // Standard Demo Login
    await page.goto('/auth/login');
    await page.fill('#email', 'admin');
    await page.fill('#password', 'admin');
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/\/(tournaments|profile|team-builder|lobby)/, { timeout: 15000 });
  });

  test('Navigation and Core Pages', async ({ page }) => {
    // 1. Home
    await page.goto('/');
    await expect(page.locator('nav')).toContainText(/WOLOLO/i);
    await expect(page.locator('nav')).toContainText(/ARENA/i);

    // 2. Tournaments Hub
    await page.goto('/tournaments');
    await expect(page.locator('body')).toContainText(/Tournament|Torneo/i);

    // 3. Team Builder
    await page.goto('/team-builder');
    await expect(page.locator('body')).toContainText(/Builder/i);
    // Select civs by text in buttons
    const aztecsBtn = page.locator('button:has-text("Aztecs")').first();
    await aztecsBtn.scrollIntoViewIfNeeded();
    await aztecsBtn.click();

    const lithuaniansBtn = page.locator('button:has-text("Lithuanians")').first();
    await lithuaniansBtn.scrollIntoViewIfNeeded();
    await lithuaniansBtn.click();
    await expect(page.locator('body')).toContainText('%');

    // 4. Tutorial
    await page.goto('/tutorial');
    await expect(page.locator('body')).toContainText(/Tutorial/i);

    // 5. Profile
    await page.goto('/profile');
    await expect(page.locator('main')).toContainText(/Admin/i);
  });

  test('Lobby Creation Flow', async ({ page }) => {
    await page.goto('/lobby');
    // Ensure we are on Create tab
    await expect(page.getByText(/Create a Lobby|Crear un Lobby|Create Lobby|Crear Sala/i).first()).toBeVisible();
    
    // Step 1: Participar is default.
    await page.getByText(/NEXT PHASE/i).click();

    // Step 2: Logistics
    await expect(page.getByText(/Draft Rules/i).first()).toBeVisible();
    await page.getByText(/NEXT PHASE/i).click();

    // Step 3: Battlefield (Map Mode)
    await expect(page.getByText(/Map Mode/i).first()).toBeVisible();
    await page.getByText(/NEXT PHASE/i).click();

    // Step 4: Map Pool
    await expect(page.getByText(/Map Pool/i).first()).toBeVisible();
    await page.getByText(/NEXT PHASE/i).click();

    // Step 5: Final Protocol
    await expect(page.getByText(/Final Protocol/i).first()).toBeVisible();
    // Check Coin Flip is on by default
    const coinFlipSwitch = page.locator('button[role="switch"]').last();
    await expect(coinFlipSwitch).toBeChecked();

    // Create Lobby
    await page.screenshot({ path: 'e2e/debug-site-audit-lobby-step5.png' });
    await page.getByText(/START ARENA/i).click();
    await expect(page).toHaveURL(/\/lobby\?id=demo-/, { timeout: 15000 });
  });

});