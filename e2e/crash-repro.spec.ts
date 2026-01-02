import { test, expect } from '@playwright/test';

test('verify full draft stability', async ({ page }) => {
  const browserErrors: string[] = [];
  page.on('console', msg => {
    if (msg.type() === 'error') {
      const text = msg.text();
      if (text.includes("404")) return;
      console.log(`[BROWSER ERROR] ${text}`);
      browserErrors.push(text);
    } else {
      console.log(`[BROWSER LOG] ${msg.text()}`);
    }
  });
  page.on('pageerror', err => {
    console.log(`[PAGE CRASH] ${err.message}`);
    browserErrors.push(err.message);
  });

  // Setup demo mode
  await page.goto('http://localhost:3000/auth/login');
  await page.evaluate(() => {
    localStorage.setItem('demo_mode', 'true');
    localStorage.setItem('demo_user', JSON.stringify({ id: 'demo-user-001', username: 'Admin' }));
    document.cookie = "demo_mode=true; path=/; max-age=86400; SameSite=Lax";
  });

  // 1. Create Lobby (Wizard 5 steps)
  await page.goto('http://localhost:3000/lobby');
  await page.screenshot({ path: 'e2e/debug-lobby-start.png' });
  
  console.log("Navigating Wizard phases...");
  // Steps 1 to 4
  for (let s = 1; s <= 4; s++) {
    const nextBtn = page.getByText('Next Phase');
    await nextBtn.waitFor({ state: 'visible', timeout: 5000 }).catch(async () => {
      await page.screenshot({ path: `e2e/debug-fail-step-${s}.png` });
      const html = await page.content();
      console.log(`HTML at step ${s}:`, html);
      throw new Error(`Button 'Next Phase' not found at step ${s}`);
    });
    await nextBtn.click();
    await page.waitForTimeout(500);
  }

  // Step 5: Disable Coin Flip (to avoid waiting for animation)
  console.log("Step 5: Disabling coin flip...");
  const coinFlipSwitch = page.locator('button[role="switch"]').last(); // Coin flip is usually the last switch in step 5
  await coinFlipSwitch.click();
  
  // Step 5: Finalize
  const initBtn = page.getByText('START ARENA');
  await initBtn.waitFor({ state: 'visible' });
  await initBtn.click();
  
  await page.waitForURL(/lobby\?id=/, { timeout: 15000 });
  console.log("Lobby Room reached. URL: " + page.url());

  // 2. Ready Up
  const readyBtn = page.getByText('DECLARE READINESS');
  await readyBtn.waitFor({ state: 'visible' });
  await readyBtn.click();
  
  // 3. Wait for Countdown and Draft Interface
  await page.waitForURL(/\/draft\//, { timeout: 20000 });
  console.log("Draft Interface active.");

  // 4. Perform a few selections to check interaction
  for (let i = 0; i < 3; i++) {
    if (browserErrors.length > 0) throw new Error("CRASH DETECTED: " + browserErrors[0]);
    
    const isMyTurn = await page.getByText(/YOUR TURN/i).first().isVisible();
    if (isMyTurn) {
      console.log(`Step ${i}: Selecting item...`);
      // Updated selector to match both CivGrid (aspect-square) and MapGrid (rounded-xl)
      const item = page.locator('button.group.relative.aspect-square, button.group.relative.overflow-hidden.rounded-xl').first();
      await item.waitFor({ state: 'visible', timeout: 10000 }).catch(async () => {
        await page.screenshot({ path: `e2e/debug-draft-step-${i}.png` });
        console.log("Draft item button not found/visible.");
      });
      await item.click({ force: true });
    }
    await page.waitForTimeout(3000); // Wait for bot
  }

  expect(browserErrors.length).toBe(0);
});
