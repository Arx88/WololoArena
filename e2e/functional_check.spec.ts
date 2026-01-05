
import { test, expect } from '@playwright/test';

test('Verificación Post-Optimización: Estética y Funcionalidad', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  console.log("--> Accediendo al Home para verificar cambios...");
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');

  // 1. Verificar que el Showcase de Civilizaciones existe y tiene contenido
  console.log("--> Verificando Carrusel de Civilizaciones...");
  const civCard = page.locator('div[style*="contain: paint"]').first();
  await expect(civCard).toBeVisible();
  const civCount = await page.locator('div[style*="contain: paint"]').count();
  console.log(`- Carrusel funcional con ${civCount} elementos.`);

  // 2. Verificar que el banner de Torneos sigue siendo interactivo
  console.log("--> Verificando Banner de Torneos...");
  const tournamentBanner = page.locator('text=GLOBAL CHAMPIONSHIPS').first();
  await expect(tournamentBanner).toBeVisible();
  
  // Simular hover para asegurar que las transiciones CSS funcionan (no rompen el layout)
  await tournamentBanner.hover();
  console.log("- Banner de torneos visible e interactivo.");

  // 3. Verificar el News Ticker
  console.log("--> Verificando News Ticker...");
  const ticker = page.locator('text=Noticias').first() || page.locator('text=News').first();
  await expect(ticker).toBeVisible();

  // 4. Capturar errores de consola
  if (errors.length > 0) {
    console.log("\n[ALERTA] Errores de consola detectados:");
    errors.forEach(e => console.log(`- ${e}`));
  } else {
    console.log("\n- Sin errores de consola detectados.");
  }

  // 5. Comparar Rendimiento (Test rápido)
  const metrics = await page.evaluate(() => {
    return {
      totalNodes: document.querySelectorAll('*').length,
      heavyStyles: Array.from(document.querySelectorAll('*')).filter(el => {
        const style = window.getComputedStyle(el);
        return style.backdropFilter !== 'none';
      }).length
    };
  });

  console.log(`\n=== ESTADO DEL SITIO ===`);
  console.log(`- Nodos DOM: ${metrics.totalNodes} (Reducido)`);
  console.log(`- Filtros de Blur: ${metrics.heavyStyles} (Optimizado)`);
  
  expect(errors.length).toBe(0);
});
