import { test, expect } from '@playwright/test';

test('Frontend Player Search Integration Test', async ({ page }) => {
  // 1. Ir a la home
  await page.goto('http://localhost:3000');
  
  // 2. Localizar el buscador (Spotlight)
  const searchInput = page.getByPlaceholder('Search Champion');
  await expect(searchInput).toBeVisible({ timeout: 15000 });

  // 3. Buscar a TheViper
  console.log('Filling search input with "TheViper"...');
  await searchInput.click(); // Focus first
  await searchInput.fill('TheViper');
  
  // Spotlight busca automáticamente con debounce (no hay botón Identify)
  const searchPromise = page.waitForResponse(r => r.url().includes('/api/aoe2/search'));
  await searchPromise;

  // 4. Esperar a que los resultados de la API lleguen al Command List
  console.log('Waiting for API response to render...');
  // CMDK items usually have role="option" or specific classes
  const resultItem = page.getByRole('option', { name: /TheViper/i }).first();
  await expect(resultItem).toBeVisible({ timeout: 30000 });
  
  // 5. Verificar ELO en la lista (ahora es visible en el item)
  const eloText = await resultItem.innerText();
  console.log(`FOUND_PLAYER_ITEM: ${eloText}`);
  expect(eloText).toMatch(/\d{3,4}/);
  
  // 6. Seleccionar y ver ficha HUD (esto NO dispara profile fetch en Spotlight v1, muestra datos directo del search result)
  // Pero si implementamos el "Selected Player Card", aparecerá abajo.
  await resultItem.click();
  
  const cardName = page.getByText('TheViper', { exact: true }).first(); // En el título h3
  await expect(cardName).toBeVisible();
  
  // Verificar stats en la tarjeta
  await expect(page.getByText('Rating', { exact: true })).toBeVisible();
  await expect(page.getByText('Win Rate', { exact: true })).toBeVisible();
  
  console.log('SUCCESS: Real-time data displayed in Spotlight');
});
