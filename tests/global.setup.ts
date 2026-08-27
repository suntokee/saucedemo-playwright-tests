import fs from 'node:fs';
import path from 'node:path';
import { chromium, expect, type FullConfig } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ENV } from '../src/config/environment';

export const AUTH_FILE = path.join(process.cwd(), 'playwright/.auth/user.json');

export default async function globalSetup(config: FullConfig): Promise<void> {
  fs.mkdirSync(path.dirname(AUTH_FILE), { recursive: true });

  const baseURL = config.projects[0]?.use.baseURL;
  if (typeof baseURL !== 'string') {
    throw new Error('Playwright baseURL must be configured.');
  }

  // Chromium is intentional: SauceDemo storageState can be reused across Playwright browser projects.
  const browser = await chromium.launch();
  const context = await browser.newContext({ baseURL });
  const page = await context.newPage();

  try {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.login(ENV.sauceUser, ENV.saucePassword);

    await expect(page).toHaveURL(/\/inventory\.html$/);
    await expect(page.locator('[data-test="title"]')).toHaveText('Products');

    await context.storageState({ path: AUTH_FILE });
  } finally {
    await browser.close();
  }
}
