import { test, expect } from '@playwright/test';

test('Diagnóstico de Rendimiento - Wololo Arena', async ({ page }) => {
  const logs: string[] = [];
  const performanceMetrics: any = {};

  // Escuchar por tareas largas (Long Tasks)
  await page.exposeFunction('logLongTask', (duration: number, name: string) => {
    logs.push(`[LONG TASK] ${name} duró ${duration.toFixed(2)}ms`);
  });

  await page.addInitScript(() => {
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.duration > 50) {
          (window as any).logLongTask(entry.duration, entry.name);
        }
      }
    });
    observer.observe({ entryTypes: ['longtask'] });
  });

  console.log("--> Iniciando auditoría de rendimiento en el Home...");
  
  const start = Date.now();
  await page.goto('http://localhost:3000');
  await page.waitForLoadState('networkidle');
  performanceMetrics.loadTime = Date.now() - start;

  // 1. Contar Nodos del DOM (El exceso de nodos ralentiza el renderizado)
  const nodeCount = await page.evaluate(() => document.querySelectorAll('*').length);
  performanceMetrics.domNodes = nodeCount;

  // 2. Medir FPS simulado (comprobando el lag en scroll)
  console.log("--> Midiendo respuesta al scroll...");
  await page.mouse.wheel(0, 500);
  await page.waitForTimeout(500);
  await page.mouse.wheel(0, 1000);
  await page.waitForTimeout(1000);

  // 3. Medir Latencia de Click en el Menú de Usuario
  console.log("--> Midiendo latencia de click en Menú de Usuario...");
  const userMenu = page.locator('button:has-text("Commander"), button:has-text("Comandante"), button:has-text("Admin")').first();
  
  if (await userMenu.isVisible()) {
    const clickStart = Date.now();
    await userMenu.click();
    // Esperar a que el contenido del dropdown sea visible
    await page.locator('[data-slot="dropdown-menu-content"]').waitFor({ state: 'visible' });
    performanceMetrics.clickLatency = Date.now() - clickStart;
  }

  // 4. Reporte Final
  console.log("\n=== REPORTE DE RENDIMIENTO (RAW DATA) ===");
  console.log(`- Tiempo de Carga: ${performanceMetrics.loadTime}ms`);
  console.log(`- Nodos en el DOM: ${performanceMetrics.domNodes}`);
  console.log(`- Latencia Click Menú: ${performanceMetrics.clickLatency || 'N/A'}ms`);
  console.log("\n--- Tareas Largas Detectadas (Bloqueos de Hilo Principal) ---");
  logs.forEach(log => console.log(log));
  
  if (nodeCount > 1500) {
    console.log("\n[ADVERTENCIA] El número de nodos es elevado. Posible sobrecarga de componentes.");
  }
  
  expect(performanceMetrics.loadTime).toBeLessThan(5000);
});
