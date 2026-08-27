import { expect, type Page } from '@playwright/test';
import type { Product } from '../data/products';

export class ProductsPage {
  constructor(private readonly page: Page) {}

  private readonly title = () => this.page.getByTestId('title');
  private readonly cartLink = () => this.page.getByTestId('shopping-cart-link');
  private readonly cartBadge = () => this.page.getByTestId('shopping-cart-badge');
  private readonly menuButton = () => this.page.getByRole('button', { name: 'Open Menu' });
  private readonly logoutLink = () => this.page.getByTestId('logout-sidebar-link');

  async assertLoaded(): Promise<void> {
    await expect(this.page).toHaveURL(/\/inventory\.html$/);
    await expect(this.title()).toHaveText('Products');
  }

  async addProducts(products: readonly Product[]): Promise<void> {
    for (const product of products) {
      await this.page.getByTestId(`add-to-cart-${product.testIdSuffix}`).click();
    }

    await expect(this.cartBadge()).toHaveText(String(products.length));
  }

  async openCart(): Promise<void> {
    await this.cartLink().click();
  }

  async logout(): Promise<void> {
    await this.menuButton().click();
    await expect(this.logoutLink()).toBeVisible();
    await this.logoutLink().click();
  }
}
