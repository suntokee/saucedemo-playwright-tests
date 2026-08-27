import { expect, type Page } from '@playwright/test';
import type { Product } from '../data/products';

export class CartPage {
  constructor(private readonly page: Page) {}

  private readonly title = () => this.page.getByTestId('title');
  private readonly cartItems = () => this.page.locator('.cart_item');
  private readonly checkoutButton = () => this.page.getByTestId('checkout');

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    await expect(this.title()).toHaveText('Your Cart');
    await expect(this.checkoutButton()).toBeVisible();
  }

  async assertItems(products: readonly Product[]): Promise<void> {
    await expect(this.cartItems()).toHaveCount(products.length);

    for (const product of products) {
      await expect(
        this.page.getByRole('link', { name: product.name, exact: true }),
      ).toBeVisible();
    }
  }

  async checkout(): Promise<void> {
    await this.checkoutButton().click();
  }
}
