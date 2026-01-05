
import { test, expect } from '@playwright/test';

const BASE_URL = 'http://localhost:3000';

test.describe('Wololo Arena - Integrity Audit', () => {

  test('Home Page - Navbar & Content', async ({ page }) => {
    await page.goto(BASE_URL);
    await expect(page.locator('nav')).toBeVisible();
    const heroTitle = page.locator('h1');
    await expect(heroTitle).toBeVisible();
    
    // Check if hero is not hidden by navbar (navbar is usually 80px)
    const box = await heroTitle.boundingBox();
    if (box) {
      console.log(`Hero title Y position: ${box.y}`);
      expect(box.y).toBeGreaterThan(60); 
    }
  });

  test('Tech Tree - No Crash & Image Check', async ({ page }) => {
    await page.goto(`${BASE_URL}/techtree`);
    await expect(page.locator('text=Civilization')).toBeVisible();
    
    // Wait for images to load
    await page.waitForTimeout(2000);
    
    // Check for broken images
    const images = await page.locator('img').all();
    for (const img of images) {
      const src = await img.getAttribute('src');
      if (src && src.includes('techtree')) {
        const isVisible = await img.isVisible();
        const naturalWidth = await img.evaluate((node: HTMLImageElement) => node.naturalWidth);
        if (naturalWidth === 0) {
          console.log(`[FAIL] Broken TechTree Image: ${src}`);
        }
      }
    }
  });

  test('Lobby Hub - Alignment', async ({ page }) => {
    // Set demo mode in localStorage
    await page.goto(BASE_URL);
    await page.evaluate(() => localStorage.setItem('demo_mode', 'true'));
    
    await page.goto(`${BASE_URL}/lobby`);
    await expect(page.locator('text=Create Lobby')).toBeVisible();
    
    const card = page.locator('.max-w-2xl');
    const box = await card.boundingBox();
    if (box) {
      console.log(`Lobby Card Y position: ${box.y}`);
      expect(box.y).toBeGreaterThan(100); // Should be well below Navbar (80px) + NewsTicker (40px)
    }
  });

  test('Draft Interface - Ticker & Grid Non-Overlap', async ({ page }) => {
    await page.goto(BASE_URL);
    await page.evaluate(() => {
      localStorage.setItem('demo_mode', 'true');
      localStorage.setItem('demo_lobby_data_demo-test', JSON.stringify({
        id: 'demo-test',
        host_id: 'demo-user-001',
        guest_id: 'demo-user-002',
        settings: { map_pool: ['arabia', 'arena'], map_mode: 'ban_until_one' }
      }));
    });
    
    await page.goto(`${BASE_URL}/draft/demo-test`);
    
    // Wait for layout
    await page.waitForSelector('text=MAP BANS', { timeout: 5000 });
    
    const ticker = page.locator('text=Map Bans').first();
    const grid = page.locator('.grid-cols-2, .grid-cols-3, .grid-cols-4').first(); // Map or Civ grid
    
    const tickerBox = await ticker.boundingBox();
    const gridBox = await grid.boundingBox();
    
    if (tickerBox && gridBox) {
      console.log(`Ticker Y: ${tickerBox.y}, Grid Y: ${gridBox.y}`);
      // Grid must be lower than Ticker
      expect(gridBox.y).toBeGreaterThan(tickerBox.y + tickerBox.height);
    }
  });
});
