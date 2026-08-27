import { test } from '@playwright/test';
import { ProductsPage } from '../src/pages/ProductsPage';
import { CartPage } from '../src/pages/CartPage';
import { CheckoutPage } from '../src/pages/CheckoutPage';
import { PRODUCTS, type Product } from '../src/data/products';
import { CHECKOUT_USER } from '../src/data/checkoutUsers';

type CheckoutScenario = {
  name: string;
  items: readonly Product[];
};

const scenarios: readonly CheckoutScenario[] = [
  {
    name: 'Single item checkout',
    items: [PRODUCTS.backpack],
  },
  {
    name: 'Multiple items checkout',
    items: [
      PRODUCTS.backpack,
      PRODUCTS.bikeLight,
      PRODUCTS.fleeceJacket,
    ],
  },
];

test.describe('Checkout', () => {
  for (const scenario of scenarios) {
    test(scenario.name, async ({ page }) => {
      const productsPage = new ProductsPage(page);
      const cartPage = new CartPage(page);
      const checkoutPage = new CheckoutPage(page);

      await test.step('Start from the saved authenticated state', async () => {
        await page.goto('/inventory.html');
        await productsPage.assertLoaded();
      });

      await test.step(
        `Add ${scenario.items.length} item(s) to the cart`,
        async () => {
          await productsPage.addProducts(scenario.items);
        },
      );

      await test.step('Validate the cart contains the selected items', async () => {
        await productsPage.openCart();

        await cartPage.assertLoaded();
        await cartPage.assertItems(scenario.items);
      });

      await test.step('Enter checkout details', async () => {
        await cartPage.checkout();

        await checkoutPage.assertInformationPage();
        await checkoutPage.enterDetails(CHECKOUT_USER);
      });

      await test.step('Validate Checkout Overview', async () => {
        await checkoutPage.assertOverviewPage(scenario.items);
      });

      await test.step('Validate successful order completion', async () => {
        await checkoutPage.finish();
        await checkoutPage.assertOrderComplete();
      });
    });
  }
});
