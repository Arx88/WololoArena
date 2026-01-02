import { test, expect } from '@playwright/test';

test('Frontend Player Search Integration Test', async ({ page }) => {
  // 1. Ir a la home
  await page.goto('http://localhost:3000');
  
  // 2. Localizar el buscador
  const searchInput = page.locator('input[placeholder*="Search by Player Name"]');
  await expect(searchInput).toBeVisible({ timeout: 15000 });

  // 3. Buscar a TheViper (Jugador real con datos constantes)
  console.log('Filling search input with "TheViper"...');
  await searchInput.fill('TheViper');
  
  const searchPromise = page.waitForResponse(r => r.url().includes('/api/aoe2/search'));
  await page.click('button:has-text("Identify")');
  await searchPromise;

  // 4. Esperar a que los resultados de la API lleguen al Frontend
  console.log('Waiting for API response to render...');
  const resultItem = page.locator('button:has-text("TheViper")').first();
  await expect(resultItem).toBeVisible({ timeout: 30000 });
  
  // 5. Verificar que el ELO sea un número real (no 0 o vacío)
  const eloText = await resultItem.locator('p.font-mono').innerText();
  console.log(`FOUND_PLAYER: TheViper | ${eloText}`);
  expect(eloText).not.toContain('ELO: 0');
  
  // 6. Seleccionar y ver ficha HUD (esto dispara el fetch de profile)
  const profilePromise = page.waitForResponse(r => r.url().includes('/api/aoe2/profile/'));
  await resultItem.click();
  await profilePromise;

  const hudName = page.locator('h3', { hasText: 'TheViper' }).first();
  await expect(hudName).toBeVisible();
  
  // Verificar que hay civilizaciones (maestría)
  const civItem = page.locator('p', { hasText: 'Matches' }).first();
  await expect(civItem).toBeVisible();
  
  console.log('SUCCESS: Real-time data and profile mastery verified from AoE2 APIs');
});
