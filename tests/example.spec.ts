import { test, expect } from '@playwright/test';

test.describe('Coffee Shop Testing', () => {

  test('TC01 - Verify total price of one Cafe Latte', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');
    await page.getByText('Cafe Latte').click();
    await page.getByText(/cart \(\d+\)/i).click();
    await expect(page.getByText('Total: $16.00')).toBeVisible();
    await page.screenshot({
      path: 'screenshots/TC01-Cafe-Latte.png',
      fullPage: true
    });
  });

  test('TC02 - Verify total price of three items', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');
    await page.getByText('Espresso').click();
    await page.getByText('Espresso Macchiato').click();
    await page.getByText('Cappuccino').click();
    await page.getByText(/cart \(\d+\)/i).click();
    await expect(page.getByText('Total: $41.00')).toBeVisible();
    await page.screenshot({
      path: 'screenshots/TC02-Three-Items.png',
      fullPage: true
    });
  });

  test('TC03 - Verify total price after adding same item twice', async ({ page }) => {
    await page.goto('https://coffee-cart.app/');
    await page.getByText('Espresso').click();
    await page.getByText(/cart \(\d+\)/i).click();
    await page.getByRole('button', { name: '+' }).click();
    await expect(page.getByText('Total: $20.00')).toBeVisible();
    await page.screenshot({
      path: 'screenshots/TC03-Double-Item.png',
      fullPage: true
    });
  });

});