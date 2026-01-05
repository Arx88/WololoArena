import { test, expect } from '@playwright/test';

test('Auditoría Pro de Rendimiento y Mejores Prácticas', async ({ page }) => {
  const metrics: any = {
    longTasks: [],
    layoutShifts: 0,
  };

  // Monitorear Tareas Largas (> 50ms)
  await page.exposeFunction('reportLongTask', (duration: number) => {
    metrics.longTasks.push(duration);
  });

  // Inyectar observadores de rendimiento
  await page.addInitScript(() => {
    // 1. Observador de Tareas Largas
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        (window as any).reportLongTask(entry.duration);
      }
    }).observe({ entryTypes: ['longtask'] });

    // 2. Observador de Layout Shift (CLS)
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          (window as any).layoutShiftCount = ((window as any).layoutShiftCount || 0) + (entry as any).value;
        }
      }
    }).observe({ entryTypes: ['layout-shift'] });
  });

  console.log("--> Iniciando captura de métricas en Home...");
  
  const startTime = Date.now();
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle' });
  const loadTime = Date.now() - startTime;

  // Medir complejidad del DOM
  const domStats = await page.evaluate(() => {
    return {
      totalNodes: document.querySelectorAll('*').length,
      maxDepth: (() => {
        let max = 0;
        const traverse = (node: Element, depth: number) => {
          max = Math.max(max, depth);
          for (const child of Array.from(node.children)) traverse(child, depth + 1);
        };
        traverse(document.body, 1);
        return max;
      })(),
      heavyStyles: Array.from(document.querySelectorAll('*')).filter(el => {
        const style = window.getComputedStyle(el);
        return style.backdropFilter !== 'none' || style.filter !== 'none';
      }).length
    };
  });

  // Simular interacción para medir respuesta (Input Latency)
  const interactionStart = Date.now();
  await page.mouse.move(500, 500);
  await page.mouse.wheel(0, 2000);
  await page.waitForTimeout(1000); // Dar tiempo a que se procesen los scrolls
  const interactionLatency = Date.now() - interactionStart - 1000;

  console.log("\n=== RESULTADOS DE AUDITORÍA TÉCNICA ===");
  console.log(`- Tiempo de Carga (Idle): ${loadTime}ms`);
  console.log(`- Nodos totales en el DOM: ${domStats.totalNodes}`);
  console.log(`- Profundidad máxima del DOM: ${domStats.maxDepth}`);
  console.log(`- Elementos con Filtros Pesados (Blur/Filter): ${domStats.heavyStyles}`);
  console.log(`- Tareas Largas (Bloqueos): ${metrics.longTasks.length} detectadas`);
  if (metrics.longTasks.length > 0) {
    const totalTBT = metrics.longTasks.reduce((a: number, b: number) => a + (b - 50), 0);
    console.log(`- Total Blocking Time (TBT) estimado: ${totalTBT.toFixed(2)}ms`);
    console.log(`- Bloqueo más largo: ${Math.max(...metrics.longTasks).toFixed(2)}ms`);
  }
  console.log(`- Latencia de Interacción: ${interactionLatency}ms`);

  // Análisis de Mejores Prácticas (Consola)
  const consoleErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') consoleErrors.push(msg.text());
  });
  
  console.log(`- Errores de consola: ${consoleErrors.length}`);

  console.log("\n=== DIAGNÓSTICO ESTRATEGOS ===");
  if (domStats.totalNodes > 3000) console.log("[CRÍTICO] DOM demasiado grande. Reduce elementos repetitivos.");
  if (domStats.heavyStyles > 20) console.log("[ADVERTENCIA] Demasiados efectos de blur/filter. Saturación de GPU.");
  if (metrics.longTasks.some((t: number) => t > 100)) console.log("[CRÍTICO] Tareas de >100ms detectadas. La interfaz se congelará obligatoriamente.");

  expect(loadTime).toBeLessThan(6000);
});
