import { test, expect } from '@playwright/test';

test('Frontend Player Search Integration Test', async ({ page }) => {
  // 1. Ir a la home
  await page.goto('http://localhost:3000');
  
  // 2. Abrir el Player Search Widget
  const searchTrigger = page.getByText('Player Search');
  await expect(searchTrigger).toBeVisible({ timeout: 15000 });
  await searchTrigger.click();

  // 3. Localizar el buscador dentro del widget
  const searchInput = page.getByPlaceholder('Search player...');
  await expect(searchInput).toBeVisible();

  // 4. Buscar a TheViper
  console.log('Filling player search with "TheViper"...');
  await searchInput.fill('TheViper');
  
  const searchPromise = page.waitForResponse(r => r.url().includes('/api/aoe2/search'));
  await searchPromise;

  // 5. Esperar a que el resultado aparezca en la lista lateral
  const resultItem = page.locator('button:has-text("TheViper")').first();
  await expect(resultItem).toBeVisible({ timeout: 30000 });
  
  // 6. Seleccionar para ver el dashboard táctico
  await resultItem.click();
  
  // Verificar que el dashboard se cargue (Título grande)
  const dashboardName = page.locator('h2', { hasText: 'TheViper' }).first();
  await expect(dashboardName).toBeVisible();
  
  // Verificar presencia de gráficos/stats
  await expect(page.getByText('Performance')).toBeVisible();
  await expect(page.getByText('Victories')).toBeVisible();
  
  console.log('SUCCESS: Player Search Dashboard verified with Real Data');
});
