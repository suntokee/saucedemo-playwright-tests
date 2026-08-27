export type Product = {
  readonly name: string;
  readonly testIdSuffix: string;
};

export const PRODUCTS = {
  backpack: {
    name: 'Sauce Labs Backpack',
    testIdSuffix: 'sauce-labs-backpack',
  },
  bikeLight: {
    name: 'Sauce Labs Bike Light',
    testIdSuffix: 'sauce-labs-bike-light',
  },
  fleeceJacket: {
    name: 'Sauce Labs Fleece Jacket',
    testIdSuffix: 'sauce-labs-fleece-jacket',
  },
} as const satisfies Record<string, Product>;
