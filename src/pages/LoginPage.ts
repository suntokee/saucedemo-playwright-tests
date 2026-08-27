import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) {}

  private readonly username = () => this.page.locator('[data-test="username"]');
  private readonly password = () => this.page.locator('[data-test="password"]');
  private readonly loginButton = () => this.page.locator('[data-test="login-button"]');

  async goto(): Promise<void> {
    await this.page.goto('/');
    await expect(this.loginButton()).toBeVisible();
  }

  async login(username: string, password: string): Promise<void> {
    await this.username().fill(username);
    await this.password().fill(password);
    await this.loginButton().click();
  }

  async assertLoggedOut(): Promise<void> {
    await expect(this.page).toHaveURL(/\/$/);
    await expect(this.username()).toBeVisible();
    await expect(this.password()).toBeVisible();
    await expect(this.loginButton()).toBeVisible();
  }
}
