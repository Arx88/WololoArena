import { test, expect } from '@playwright/test';

test('Debug Player Search Data Flow', async ({ page }) => {
  const apiLogs: any[] = [];
  
  // Capturar respuestas de la API
  page.on('response', async response => {
    if (response.url().includes('/api/aoe2/')) {
      const status = response.status();
      const url = response.url();
      let data = {};
      try {
        data = await response.json();
      } catch (e) {}
      apiLogs.push({ url, status, data });
      console.log(`[API RESPONSE] ${url} | Status: ${status}`);
    }
  });

  await page.goto('http://localhost:3000/');
  
  // 1. Abrir buscador
  const searchBtn = page.getByText('PLAYER SEARCH');
  await expect(searchBtn).toBeVisible({ timeout: 15000 });
  await searchBtn.click();

  // 2. Buscar
  const input = page.getByPlaceholder('IDENTIFY PLAYER...');
  await input.fill('TheViper');
  
  // Esperar resultados de búsqueda
  await page.waitForResponse(r => r.url().includes('/api/aoe2/search'));
  const result = page.locator('button:has-text("TheViper")').first();
  await expect(result).toBeVisible({ timeout: 20000 });

  // 3. Ver perfil (Dashboard)
  await result.click();
  
  // Esperar a que cargue el perfil completo
  await page.waitForResponse(r => r.url().includes('/api/aoe2/profile/'));
  
  // Capturar el estado de los datos en consola
  console.log('--- DATA DIAGNOSTIC ---');
  for (const log of apiLogs) {
    if (log.url.includes('/profile/')) {
      const modes = log.data.modes || {};
      console.log(`Player: ${log.data.name}`);
      for (const mode of Object.keys(modes)) {
        const m = modes[mode];
        console.log(`Mode ${mode}: ELO=${m.rating}, Peak=${m.maxRating}, Civs=${m.topCivs?.length}, Maps=${m.topMaps?.length}`);
      }
    }
  }
  
  // Tomar captura de pantalla del dashboard abierto
  await page.screenshot({ path: 'e2e/dashboard-diagnostic.png', fullPage: true });
});
