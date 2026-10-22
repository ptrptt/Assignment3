import { test, expect } from '@playwright/test';

test.describe('Coffee Shop - ทดสอบราคารวม', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('https://seleniumbase.io/coffee/');
  });

  test('Coffee_001 - ซื้อ Cafe Latte 1 แก้ว', async ({ page }) => {
    await page.locator('[data-test="Cafe_Latte"]').click();
    await page.getByRole('link', { name: 'Cart page', exact: true }).click();

    // Cafe Latte ราคา 16 ดอลลาร์
    await expect(page.getByRole('button', { name: 'Proceed to checkout' })).toHaveText('Total: $16.00');
  });

  test('Coffee_002 - ซื้อ Mocha, Flat White และ Cappuccino', async ({ page }) => {
    await page.locator('[data-test="Mocha"]').click();
    await page.locator('[data-test="Flat_White"]').click();
    await page.locator('[data-test="Cappuccino"]').click();
    await page.getByRole('link', { name: 'Cart page', exact: true }).click();
    // Mocha 8 + Flat White 18 + Cappuccino 19 = 45 ดอลลาร์
    await expect(page.getByRole('button', { name: 'Proceed to checkout' })).toHaveText('Total: $45.00');
  });

  test('Coffee_003 - ซื้อ Americano 2 แก้ว', async ({ page }) => {
    await page.locator('[data-test="Americano"]').click();
    await page.getByRole('link', { name: 'Cart page', exact: true }).click();
    await page.getByRole('button', { name: 'Add one Americano', exact: true }).click();
    await expect(page.getByRole('link', { name: 'Cart page', exact: true })).toHaveText('cart (2)');
    // Americano แก้วละ 7 ดอลลาร์ จำนวน 2 แก้ว รวม 14 ดอลลาร์
    await expect(page.getByRole('button', { name: 'Proceed to checkout' })).toHaveText('Total: $14.00');
  });
});

