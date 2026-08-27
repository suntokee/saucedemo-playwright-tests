import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

const authFile = path.join(process.cwd(), 'playwright/.auth/user.json');

export default defineConfig({
  testDir: './tests',
  testIgnore: '**/global.setup.ts',
  globalSetup: require.resolve('./tests/global.setup'),
  fullyParallel: true,
  forbidOnly: Boolean(process.env.CI),
  retries: process.env.CI ? 1 : 0,
  workers: process.env.CI ? 2 : undefined,
  timeout: 30_000,
  expect: {
    timeout: 5_000,
  },
  reporter: [
    ['list'],
    ['html', { outputFolder: 'playwright-report', open: 'never' }],
  ],
  use: {
    baseURL: process.env.BASE_URL ?? 'https://www.saucedemo.com',
    storageState: authFile,
    testIdAttribute: 'data-test',
    // Show browsers locally for easy debugging; CI remains headless.
    headless: Boolean(process.env.CI),
    actionTimeout: 5_000,
    navigationTimeout: 10_000,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'off',
  },
  projects: [
    // Desktop browsers
    { name: 'desktop-chrome', use: devices['Desktop Chrome'] },
    { name: 'desktop-firefox', use: devices['Desktop Firefox'] },
    { name: 'desktop-safari', use: devices['Desktop Safari'] },

    // Mobile/tablet emulation (fast CI coverage for responsive web)
    { name: 'mobile-chrome', use: devices['Pixel 7'] },
    { name: 'mobile-safari', use: devices['iPhone 15'] },
    { name: 'tablet-safari', use: devices['iPad Pro 11 landscape'] },
    { name: 'tablet-chrome', use: devices['Galaxy Tab S4 landscape'] },
  ],
});
