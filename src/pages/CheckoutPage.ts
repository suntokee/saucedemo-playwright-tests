import { expect, type Page } from '@playwright/test';
import type { Product } from '../data/products';
import type { CheckoutUser } from '../data/checkoutUsers';

export class CheckoutPage {
  constructor(private readonly page: Page) {}

  private readonly title = () => this.page.getByTestId('title');
  private readonly firstName = () => this.page.getByTestId('firstName');
  private readonly lastName = () => this.page.getByTestId('lastName');
  private readonly postalCode = () => this.page.getByTestId('postalCode');
  private readonly continueButton = () => this.page.getByTestId('continue');
  private readonly finishButton = () => this.page.getByTestId('finish');
  private readonly itemTotal = () => this.page.getByTestId('subtotal-label');
  private readonly tax = () => this.page.getByTestId('tax-label');
  private readonly total = () => this.page.getByTestId('total-label');

  async assertInformationPage(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-one\.html$/);
    await expect(this.title()).toHaveText('Checkout: Your Information');
    await expect(this.firstName()).toBeVisible();
    await expect(this.lastName()).toBeVisible();
    await expect(this.postalCode()).toBeVisible();
  }

  async enterDetails(details: CheckoutUser): Promise<void> {
    await this.firstName().fill(details.firstName);
    await this.lastName().fill(details.lastName);
    await this.postalCode().fill(details.postalCode);
    await this.continueButton().click();
  }

  async assertOverviewPage(products: readonly Product[]): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-step-two\.html$/);
    await expect(this.title()).toHaveText('Checkout: Overview');

    for (const product of products) {
      await expect(
        this.page.getByRole('link', { name: product.name, exact: true }),
      ).toBeVisible();
    }

    await expect(
      this.page.getByText('Payment Information:', { exact: true }),
    ).toBeVisible();

    await expect(
      this.page.getByText('Shipping Information:', { exact: true }),
    ).toBeVisible();

    await expect(this.itemTotal()).toBeVisible();
    await expect(this.itemTotal()).toHaveText(/^Item total: \$\d+\.\d{2}$/);

    await expect(this.tax()).toBeVisible();
    await expect(this.tax()).toHaveText(/^Tax: \$\d+\.\d{2}$/);

    await expect(this.total()).toBeVisible();
    await expect(this.total()).toHaveText(/^Total: \$\d+\.\d{2}$/);

    await expect(this.finishButton()).toBeVisible();
  }

  async finish(): Promise<void> {
    await this.finishButton().click();
  }

  async assertOrderComplete(): Promise<void> {
    await expect(this.page).toHaveURL(/\/checkout-complete\.html$/);
    await expect(this.title()).toHaveText('Checkout: Complete!');

    await expect(
      this.page.getByRole('heading', { name: 'Thank you for your order!' }),
    ).toBeVisible();
  }
}
