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
    await expect(page.locator('nav')).toContainText(/Wololo Arena/i);

    // 2. Tournaments Hub
    await page.goto('/tournaments');
    await expect(page.locator('body')).toContainText(/Tournament|Torneo/i);
    // Check for Create button
    await expect(page.locator('button:has-text("Create"), button:has-text("Crear")').first()).toBeVisible();

    // 3. Team Builder
    await page.goto('/team-builder');
    await expect(page.locator('body')).toContainText(/Builder/i);
    // Select civs by text in buttons
    await page.locator('button:has-text("Aztecs")').first().click();
    await page.locator('button:has-text("Lithuanians")').first().click();
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
    await expect(page.getByText(/Create New Lobby|Crear Nuevo Lobby/i)).toBeVisible();
    
    // Check Coin Flip option in Advanced Settings
    await page.getByRole('button', { name: /Advanced Settings|Configuración Avanzada/i }).click();
    const coinFlipSwitch = page.getByRole('switch').last(); // The one we added
    await expect(coinFlipSwitch).toBeChecked();

    // Create Lobby
    await page.locator('button[type="submit"]').click();
    await expect(page).toHaveURL(/\/lobby\?id=demo-/, { timeout: 15000 });
  });

});