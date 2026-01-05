
import { test, expect } from '@playwright/test';

test('Verificación de Páginas Críticas', async ({ page }) => {
  const errors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') errors.push(msg.text());
  });

  console.log("--> Probando Home...");
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  console.log(`- Home cargado. Nodos: ${await page.evaluate(() => document.querySelectorAll('*').length)}`);

  console.log("--> Probando Tech Tree...");
  await page.goto('http://localhost:3000/techtree');
  await page.waitForLoadState('networkidle');
  console.log(`- Tech Tree cargado. Nodos: ${await page.evaluate(() => document.querySelectorAll('*').length)}`);

  console.log("--> Probando Torneos...");
  await page.goto('http://localhost:3000/tournaments');
  await page.waitForLoadState('networkidle');
  console.log(`- Torneos cargado. Nodos: ${await page.evaluate(() => document.querySelectorAll('*').length)}`);

  if (errors.length > 0) {
    console.log("\n[!] Errores de consola encontrados:");
    errors.forEach(e => console.log(`- ${e}`));
  } else {
    console.log("\n[OK] No hay errores de consola en las páginas probadas.");
  }

  expect(errors.length).toBe(0);
});
