# SauceDemo Playwright Automation Framework

UI automation solution for the SauceDemo application using Playwright and TypeScript.

## Overview

This framework automates the following scenarios:

- Login and logout
- Single item checkout
- Multiple item checkout

## Technology

- Playwright
- TypeScript
- Node.js
- npm

## Browser and Device Coverage

The test suite runs across desktop, mobile and tablet browser configurations using Playwright projects.

### Desktop

- Desktop Chrome
- Desktop Firefox
- Desktop Safari

### Mobile

- Pixel 7 using Chromium
- iPhone 15 using WebKit

### Tablet

- Galaxy Tab S4 landscape using Chromium
- iPad Pro 11 landscape using WebKit

## Project Structure

```text
.
├── playwright/
│   └── .auth/
│
├── src/
│   ├── config/
│   │   └── environment.ts
│   ├── data/
│   │   ├── checkoutUsers.ts
│   │   └── products.ts
│   └── pages/
│       ├── CartPage.ts
│       ├── CheckoutPage.ts
│       ├── LoginPage.ts
│       └── ProductsPage.ts
│
├── tests/
│   ├── checkout.spec.ts
│   ├── global.setup.ts
│   └── login-logout.spec.ts
│
├── .env
├── .gitignore
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
└── README.md
```

## Prerequisites

Ensure Node.js and npm are installed.

Check using:

```bash
node --version
npm --version
```

## Clone the Repository

```bash
git clone https://github.com/suntokee/saucedemo-playwright-tests.git
cd saucedemo-playwright-tests
```

## Install Dependencies

```bash
npm install
```

## Install Playwright Browsers

```bash
npx playwright install
```

This installs the Playwright-managed browser binaries required by the configured Chromium, Firefox and WebKit projects.

## Environment Configuration

The `.env` file contains the SauceDemo test credentials:

```dotenv
SAUCE_USER=standard_user
SAUCE_PASSWORD=secret_sauce
```

The `.env` file is intentionally included because SauceDemo publishes these credentials for use with its demonstration application.

In a production framework, environment files containing credentials would not be committed to source control. Credentials would instead be supplied securely through environment variables or a CI/CD secrets-management solution.

## Run All Tests

```bash
npx playwright test
```

This runs the test suite against Chromium, Firefox and WebKit.

## Run a Specific Browser

Desktop Chrome:

```bash
npx playwright test --project=desktop-chrome
```

Desktop Firefox:

```bash
npx playwright test --project=desktop-firefox
```

Desktop Safari:

```bash
npx playwright test --project=desktop-safari
```

Mobile Chrome:

```bash
npx playwright test --project=mobile-chrome
```

Mobile Safari:

```bash
npx playwright test --project=mobile-safari
```

Tablet Chrome:

```bash
npx playwright test --project=tablet-chrome
```

Tablet Safari:

```bash
npx playwright test --project=tablet-safari
```

## Test Execution Mode

Tests run headed by default when executed locally:

```bash
npx playwright test
```

When the CI environment variable is set, tests run headless. To explicitly run tests headed, use:

```bash
npx playwright test --headed
```

## Reporting

The framework uses Playwright's HTML reporter.

After a test run:

```bash
npx playwright show-report
```

The report displays test results by browser, test scenario and test step.

## Authentication

A global setup performs a successful SauceDemo login before the functional test suite and saves the authenticated browser storage state to:

```text
playwright/.auth/user.json
```

Checkout tests reuse this state so they do not repeatedly execute the login flow.

The Login and Logout test intentionally overrides the saved storage state and starts unauthenticated so that the actual login behaviour is tested independently.

NOTE: The generated authentication state is excluded from Git through `.gitignore`.

## Test Design

The solution uses:

- Page Object Model for UI interactions
- Centralised test data
- Environment-based login credentials
- Reusable authenticated storage state
- Parameterised checkout scenarios
- Playwright test steps for readable reporting
- Cross-browser projects for different Device i.e. Desktop, Mobile and Tablet

The framework intentionally avoids unnecessary abstraction to keep the solution simple and maintainable.
