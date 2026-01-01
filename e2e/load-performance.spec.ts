import { test, expect } from '@playwright/test';

test('Site Load Performance Check', async ({ page, context }) => {
  // 1. Check Home Page
  console.log('Navigating to Home...');
  await page.goto('http://localhost:3000/');
  await expect(page.locator('body')).toBeVisible();
  // Check for some home page element
  await expect(page.getByText('Next Gen Drafting')).toBeVisible();
  await expect(page.getByText('Wololo Arena').first()).toBeVisible();
  console.log('Home loaded.');

  // 2. Check Lobby (with Demo Mode)
  console.log('Setting up Demo Mode...');
  await context.addCookies([{
    name: 'demo_mode',
    value: 'true',
    domain: 'localhost',
    path: '/'
  }]);
  
  // Inject demo user for consistency
  await page.addInitScript(() => {
    localStorage.setItem("demo_mode", "true");
    localStorage.setItem("demo_user", JSON.stringify({ id: "demo-user-001", username: "Admin" }));
  });

  console.log('Navigating to Lobby...');
  await page.goto('http://localhost:3000/lobby');
  
  // Should NOT see infinite spinner
  // "Draft Lobby" header should appear
  await expect(page.getByText('Draft Lobby')).toBeVisible({ timeout: 10000 });
  console.log('Lobby loaded.');

  // 3. Create a Demo Lobby and Check Draft Load
  console.log('Navigating to Demo Draft...');
  await page.goto('http://localhost:3000/draft/demo-load-test');
  
  // Should load draft interface
  await expect(page.getByText('Tactical Protocol')).toBeVisible({ timeout: 15000 });
  console.log('Draft loaded.');
});
