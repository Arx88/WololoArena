
import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  console.log("Checking /lobby...");
  try {
    await page.goto('http://localhost:3000/lobby');
    await page.waitForLoadState('networkidle');
    const content = await page.evaluate(() => document.body.innerText);
    console.log("Lobby Content Preview:", content.substring(0, 500));
    
    const errors = await page.evaluate(() => (window as any).__NEXT_DATA__?.props?.pageProps?.error || "None");
    console.log("Potential Next.js Props Error:", errors);
  } catch (e) {
    console.error("Navigation failed:", e);
  }
  
  await browser.close();
})();
