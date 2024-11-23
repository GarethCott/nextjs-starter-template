import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  projects: [
    // Setup project for component tests
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1280, height: 720 },
      },
      testMatch: /.*\.spec\.ts/,
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
      testMatch: /.*\.spec\.ts/,
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
      testMatch: /.*\.spec\.ts/,
    },
    // Component testing
    {
      name: 'component',
      testMatch: /.*\.component\.ts/,
      use: {
        viewport: { width: 1280, height: 720 },
      },
    },
    // Mobile viewports
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
      testMatch: /.*\.spec\.ts/,
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 12'] },
      testMatch: /.*\.spec\.ts/,
    },
  ],

  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
});
