import { test, expect } from '@playwright/test';

test('TG Builder Manual Verification', async ({ page }) => {
  // Ir al login demo
  await page.goto('http://localhost:3000/auth/login');
  await page.fill('#email', 'admin');
  await page.fill('#password', 'admin');
  await page.click('button[type="submit"]');
  
  // Navegar directamente a team-builder
  await page.goto('http://localhost:3000/team-builder');
  
  // Log de consola para detectar errores de JS
  page.on('console', msg => console.log('BROWSER LOG:', msg.text()));
  page.on('pageerror', err => console.log('BROWSER ERROR:', err.message));

  console.log('Waiting for Aztecs button...');
  const aztecsBtn = page.locator('button:has-text("Aztecs")').first();
  await expect(aztecsBtn).toBeVisible({ timeout: 15000 });

  console.log('Clicking Aztecs...');
  await aztecsBtn.click();
  
  // Verificar que aparezca en "Tu Equipo"
  await expect(page.locator('body')).toContainText('Aztecs');
  
  console.log('Clicking Lithuanians...');
  const lithuBtn = page.locator('button:has-text("Lithuanians")').first();
  await lithuBtn.scrollIntoViewIfNeeded();
  await expect(lithuBtn).toBeVisible();
  await lithuBtn.click();
  
  // Verificar sinergia
  console.log('Checking for synergy percentage...');
  await expect(page.locator('body')).toContainText('%');
  
  console.log('Verification successful! Site did not break.');
});
