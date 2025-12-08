const { test, expect } = require('@playwright/test');

test.describe('Login Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:5000');
    });

    test('should load login page', async ({ page }) => {
        await expect(page.locator('h1')).toContainText('Smart Bill WASC');
    });

    test('should login as admin', async ({ page }) => {
        await page.selectOption('#userType', 'admin');
        await page.fill('#username', 'admin');
        await page.fill('#password', 'admin123');
        await page.click('button[type="submit"]');
        
        await expect(page.locator('#adminDashboard')).toBeVisible();
    });

    test('should show error for invalid credentials', async ({ page }) => {
        await page.selectOption('#userType', 'admin');
        await page.fill('#username', 'wrong');
        await page.fill('#password', 'wrong');
        await page.click('button[type="submit"]');
        
        await expect(page.locator('#toast')).toContainText('Invalid');
    });
});
