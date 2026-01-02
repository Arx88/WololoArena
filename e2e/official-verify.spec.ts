import { test, expect } from '@playwright/test';

test('Official API Search Verification', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  const searchInput = page.locator('input[placeholder*="Search by Player Name"]');
  await expect(searchInput).toBeVisible({ timeout: 15000 });

  console.log('Searching for official data...');
  await searchInput.fill('TheViper');
  
  // Esperar específicamente a que la respuesta de nuestra API llegue
  const responsePromise = page.waitForResponse(response => 
    response.url().includes('/api/aoe2/search') && response.status() === 200
  );
  
  await page.click('button:has-text("Identify")');
  await responsePromise;

  // Esperamos a que el resultado se renderice
  const result = page.locator('button:has-text("TheViper")').first();
  await expect(result).toBeVisible({ timeout: 30000 });
  
  const eloText = await result.locator('p.font-mono').innerText();
  console.log('OFFICIAL_ELO_FOUND:', eloText);
  
  // El ELO de TheViper siempre es > 2000
  expect(eloText).toMatch(/ELO: \d{4}/);
});
