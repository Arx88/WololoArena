import { test, expect } from '@playwright/test';

test.describe('Tech Tree Diagnostics', () => {
  test('verify armenians unique unit data exists', async ({ page }) => {
    await page.goto('http://localhost:3000/techtree');
    
    // Select Armenians
    await page.click('button:has-text("Civilización")');
    await page.fill('input[placeholder="Buscar civilización..."]', 'Armenians');
    await page.locator('button[title="Armenians"]').first().click();
    
    // Find Composite Bowman (ID 1800) using new data-testid
    const uuNode = page.getByTestId('node-1800');
    await uuNode.scrollIntoViewIfNeeded();
    await uuNode.hover({ force: true });
    
    // Check Tooltip
    const tooltip = page.locator('div[z-index="300"], div.z-\[300\]').last();
    await expect(tooltip).toBeVisible();
    
    // Log what we found to the console
    const content = await tooltip.innerText();
    console.log('--- Tooltip Found ---');
    console.log(content);
    console.log('----------------------');

    expect(content.toLowerCase()).toContain('arco compuesto');
    expect(content.toLowerCase()).toContain('armenios');
  });
});