import { test, expect } from '@playwright/test';

test.describe('SauceDemo - Guest checkout', () => {

  test('Guest checkout - เข้าหน้า checkout โดยไม่ล็อกอิน', async ({ page }) => {
    await page.goto('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page).toHaveURL('https://www.saucedemo.com/');
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    await expect(page.locator('[data-test="error"]'))
      .toContainText("You can only access '/checkout-step-one.html' when you are logged in.");
  });
});

test.describe('SauceDemo - ทดสอบ Checkout', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://www.saucedemo.com/');
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    await page.locator('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    await page.locator('[data-test="shopping-cart-link"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/cart.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Your Cart');
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
  });

  test('TC-CKO-001 - กด Checkout แล้วไปหน้ากรอกข้อมูล', async ({ page }) => {
    await expect(page.locator('[data-test="checkout"]')).toBeEnabled();
    await page.locator('[data-test="checkout"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Your Information');
    await expect(page.locator('[data-test="firstName"]')).toBeVisible();
    await expect(page.locator('[data-test="lastName"]')).toBeVisible();
    await expect(page.locator('[data-test="postalCode"]')).toBeVisible();
  });

  test('TC-CKO-003 - ไม่กรอกข้อมูลแล้วกด Continue', async ({ page }) => {
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="continue"]').click();
    await expect(page.locator('[data-test="error"]')).toHaveText('Error: First Name is required');
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-one.html');
  });

  test('TC-CKO-012 - กด Finish แล้วสั่งซื้อสำเร็จ', async ({ page }) => {
    await page.locator('[data-test="checkout"]').click();
    await page.locator('[data-test="firstName"]').fill('omar');
    await page.locator('[data-test="lastName"]').fill('abdo');
    await page.locator('[data-test="postalCode"]').fill('12345');
    await page.locator('[data-test="continue"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-step-two.html');
    await expect(page.locator('[data-test="inventory-item-name"]')).toHaveText('Sauce Labs Backpack');
    await page.locator('[data-test="finish"]').click();
    await expect(page).toHaveURL('https://www.saucedemo.com/checkout-complete.html');
    await expect(page.locator('[data-test="title"]')).toHaveText('Checkout: Complete!');
    await expect(page.locator('[data-test="complete-header"]')).toHaveText('Thank you for your order!');
    await expect(page.locator('[data-test="shopping-cart-badge"]')).toHaveCount(0);
  });
});
