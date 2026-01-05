
import { test, expect } from '@playwright/test';

test.describe('Auditoría de Experiencia de Usuario - Agente Strategos', () => {
  
  test('Recorrido Completo: Home -> Tech Tree -> Análisis de Civilización', async ({ page }) => {
    console.log("--> [Strategos]: Iniciando sesión. Entrando a la Landing Page...");
    
    // 1. Landing Page
    await page.goto('http://localhost:3000');
    await page.waitForLoadState('networkidle');
    
    const title = await page.title();
    console.log(`--> [Strategos]: Título del sitio detectado: "${title}"`);
    
    // Verificar Hero Section
    const heroVisible = await page.isVisible('text=Wololo Arena'); // Ajustar selector según texto real
    if (heroVisible) {
        console.log("--> [Strategos]: Hero section visible. Buena primera impresión.");
    } else {
        console.log("--> [Strategos]: ATENCIÓN - No veo el título principal 'Wololo Arena' claramente.");
    }

    // 2. Navegación al Tech Tree
    console.log("--> [Strategos]: Buscando acceso al Tech Tree...");
    // Intentar encontrar un enlace o botón que diga "Tech Tree" o "Árbol de Tecnologías"
    const techTreeLink = page.getByRole('link', { name: /Tech Tree|Árbol/i }).first();
    
    if (await techTreeLink.isVisible()) {
        await techTreeLink.click();
    } else {
        // Fallback si no está en el menú principal, intentar navegación directa
        console.log("--> [Strategos]: No encontré enlace directo en el menú. Intentando ruta directa /techtree...");
        await page.goto('http://localhost:3000/techtree');
    }
    
    await page.waitForURL('**/techtree');
    await page.waitForLoadState('networkidle');
    console.log("--> [Strategos]: Tech Tree cargado.");

    // 3. Selección de Civilización (Britons para probar el fix reciente)
    console.log("--> [Strategos]: Abriendo selector de civilizaciones...");
    
    // Buscar el botón que abre el modal (generalmente muestra la civ actual)
    const civButton = page.locator('button').filter({ hasText: /Civilización|Civilization/i }).first();
    await civButton.click();
    
    // Esperar al modal
    await page.waitForTimeout(500); // Pequeña espera visual
    console.log("--> [Strategos]: Buscando a los 'Britons' en el grid...");
    
    const britonsBtn = page.locator('button').filter({ hasText: 'Britons' }).last();
    
    // Verificar si el botón tiene imagen (el fix reciente)
    const hasImage = await britonsBtn.locator('img').count() > 0;
    if (hasImage) {
        console.log("--> [Strategos]: OK - Iconos de civilización visibles en el selector.");
    } else {
        console.log("--> [Strategos]: CRÍTICO - Veo letras en lugar de escudos en el selector.");
    }
    
    await britonsBtn.click();
    
    // 4. Análisis del Sidebar (Datos)
    console.log("--> [Strategos]: Analizando información de la civilización seleccionada...");
    
    // Verificar si se muestran los Bonus de Texto
    const bonusText = await page.locator('text=Shepherds work 25% faster').isVisible();
    if (bonusText) {
        console.log("--> [Strategos]: Datos correctos. Veo los bonus específicos (ej: Pastores más rápidos).");
    } else {
        console.log("--> [Strategos]: ERROR - No encuentro los textos de bonificación esperados.");
    }
    
    // Verificar Team Bonus
    const teamBonus = await page.locator('text=Archery Ranges work 10% faster').isVisible();
    if (teamBonus) {
        console.log("--> [Strategos]: Team Bonus visible y correcto.");
    } else {
        console.log("--> [Strategos]: ERROR - Team Bonus no encontrado o incorrecto.");
    }

    // 5. Interacción con el Árbol (Unidad Única)
    console.log("--> [Strategos]: Buscando al 'Longbowman' en el árbol...");
    
    // Buscar la imagen del Longbowman (Unit_8.png)
    // Usamos un selector de atributo src parcial para asegurar que es la imagen correcta
    const longbowmanImg = page.locator('img[src*="Unit_8.png"]');
    
    if (await longbowmanImg.count() > 0) {
        console.log("--> [Strategos]: Imagen del Longbowman encontrada en el árbol.");
        
        // Simular Hover para ver Tooltip
        console.log("--> [Strategos]: Inspeccionando unidad (Hover)...");
        await longbowmanImg.first().hover();
        await page.waitForTimeout(1000); // Esperar animación del tooltip
        
        // Verificar contenido del Tooltip
        const tooltipVisible = await page.locator('text=LNGBW').isVisible() || await page.locator('text=Longbowman').isVisible();
        const statsVisible = await page.locator('text=Ataque').isVisible();
        
        if (tooltipVisible && statsVisible) {
             console.log("--> [Strategos]: Tooltip funcional. Veo nombre y estadísticas.");
        } else {
             console.log("--> [Strategos]: ERROR - El tooltip no apareció o está vacío.");
        }
        
    } else {
        console.log("--> [Strategos]: CRÍTICO - No encuentro la imagen del Longbowman (Unit_8.png) en el árbol.");
    }

    console.log("--> [Strategos]: Auditoría finalizada.");
  });
});
