import { test } from '@playwright/test';
import fs from 'fs';

test('Extracción de Datos de Usuario - Goths', async ({ page }) => {
  // 1. Navegar
  await page.goto('http://localhost:3000/techtree');
  await page.waitForLoadState('networkidle');

  // 2. Abrir selector y elegir Goths
  await page.locator('button').filter({ hasText: /Civilización|Civilization/i }).first().click();
  await page.waitForTimeout(500);
  
  // Capturar estado visual del botón Goths antes de clickear
  const gothsBtn = page.locator('button').filter({ hasText: 'Goths' }).last();
  const gothsImgSrc = await gothsBtn.locator('img').getAttribute('src');
  
  await gothsBtn.click();
  await page.waitForTimeout(500);

  // 3. Extraer Datos del Sidebar
  // Buscamos el párrafo que dice "Team Bonus" y tomamos el siguiente párrafo
  const teamBonusText = await page.locator('p:has-text("Team Bonus") + p').textContent();
  
  // Extraer bonos (buscando elementos que contengan texto en la lista)
  const bonuses = await page.locator('div.space-y-3 >> div.flex.gap-4 span').allTextContents();

  // 4. Buscar Unidad Única (Huskarl)
  // ID del Huskarl es 41 (Castle)
  const huskarlNode = page.locator('img[src*="Unit_41.png"]').first();
  const huskarlVisible = await huskarlNode.isVisible();
  
  let tooltipData = {};
  if (huskarlVisible) {
      await huskarlNode.hover();
      await page.waitForTimeout(1000);
      
      // Extraer texto visible del tooltip
      const tooltipContainer = page.locator('div[class*="z-[200]"]');
      if (await tooltipContainer.isVisible()) {
          tooltipData = {
              name: await tooltipContainer.locator('h3').textContent(),
              stats: await tooltipContainer.locator('div.grid-cols-3').innerText() // Texto crudo de stats
          };
      }
  }

  // 5. Guardar Reporte
  const report = {
      timestamp: new Date().toISOString(),
      civilization: 'Goths',
      selectorImage: gothsImgSrc,
      sidebarData: {
          teamBonus: teamBonusText,
          bonuses: bonuses,
      },
      uniqueUnit: {
          visible: huskarlVisible,
          tooltip: tooltipData
      }
  };

  fs.writeFileSync('audit_data.json', JSON.stringify(report, null, 2));
});
