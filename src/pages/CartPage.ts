import { expect, type Page } from '@playwright/test';
import type { Product } from '../data/products';

export class CartPage {
  constructor(private readonly page: Page) {}

  private readonly title = () => this.page.getByTestId('title');
  private readonly cartItems = () => this.page.getByTestId('inventory-item');
  private readonly checkoutButton = () => this.page.getByTestId('checkout');
  private cartItem(product: Product) {
  return this.cartItems().filter({
    has: this.page
      .getByTestId('inventory-item-name')
      .filter({ hasText: product.name }),
  });
}

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/cart\.html$/);
    await expect(this.title()).toHaveText('Your Cart');
    await expect(this.checkoutButton()).toBeVisible();
  }

  async assertItems(products: readonly Product[]): Promise<void> {
    await expect(this.cartItems()).toHaveCount(products.length);

    for (const product of products) {
      const cartItem = this.cartItem(product);

      await expect(cartItem).toHaveCount(1);

      await expect(
        cartItem.getByTestId('inventory-item-name'),
      ).toHaveText(product.name);
    }
  }

  async checkout(): Promise<void> {
    await this.checkoutButton().click();
  }
}
