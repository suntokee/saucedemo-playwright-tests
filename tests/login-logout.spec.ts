import { test } from '@playwright/test';
import { ENV } from '../src/config/environment';
import { LoginPage } from '../src/pages/LoginPage';
import { ProductsPage } from '../src/pages/ProductsPage';

// This scenario must prove login itself, so it deliberately starts without the saved auth state.
test.use({ storageState: { cookies: [], origins: [] } });

test('Login and logout', async ({ page }) => {
  const loginPage = new LoginPage(page);
  const productsPage = new ProductsPage(page);

  await test.step('Log in with the standard sample user', async () => {
    await loginPage.goto();
    await loginPage.login(ENV.sauceUser, ENV.saucePassword);
  });

  await test.step('Validate successful login and Products page', async () => {
    await productsPage.assertLoaded();
  });

  await test.step('Log out and validate return to the login page', async () => {
    await productsPage.logout();
    await loginPage.assertLoggedOut();
  });
});
