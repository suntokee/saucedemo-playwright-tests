import fs from 'node:fs';
import path from 'node:path';
import { chromium, expect, selectors, type FullConfig } from '@playwright/test';
import { LoginPage } from '../src/pages/LoginPage';
import { ENV } from '../src/config/environment';

export default async function globalSetup(config: FullConfig): Promise<void> {
  selectors.setTestIdAttribute('data-test');
  const projectUse = config.projects[0]?.use;

  const baseURL = projectUse?.baseURL;
  const storageState = projectUse?.storageState;

  if (typeof baseURL !== 'string') {
    throw new Error('Playwright baseURL must be configured.');
  }

  if (typeof storageState !== 'string') {
    throw new Error('Playwright storageState path must be configured.');
  }

  fs.mkdirSync(path.dirname(storageState), { recursive: true });
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

    await context.storageState({ path: storageState });
  } finally {
    await browser.close();
  }
}
