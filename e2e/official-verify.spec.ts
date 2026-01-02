import { test, expect } from '@playwright/test';

test('Official API Search Verification', async ({ page }) => {
  await page.goto('http://localhost:3000');
  
  // Abrir widget
  await page.click('text=PLAYER SEARCH');
  
  const searchInput = page.getByPlaceholder('IDENTIFY PLAYER...');
  await expect(searchInput).toBeVisible();

  console.log('Searching for official data...');
  await searchInput.fill('TheViper');
  
  // Esperar respuesta de API (debounce)
  const responsePromise = page.waitForResponse(response => 
    response.url().includes('/api/aoe2/search') && response.status() === 200
  );
  await responsePromise;

  // Esperamos a que el resultado aparezca en la lista
  const result = page.locator('button:has-text("TheViper")').first();
  await expect(result).toBeVisible({ timeout: 30000 });
  
  const eloText = await result.innerText();
  console.log('OFFICIAL_ELO_FOUND:', eloText);
  
  // El ELO de TheViper siempre es > 2000
  expect(eloText).toMatch(/\d{3,4}/);
});
