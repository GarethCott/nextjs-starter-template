import { expect, test } from '@playwright/test';

test.describe('Contact Form', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/contact');
  });

  test('should render form fields', async ({ page }) => {
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Subject')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
    await expect(
      page.getByRole('button', { name: 'Send message' }),
    ).toBeVisible();
  });

  test('should submit form with valid data', async ({ page }) => {
    // Fill in the form
    await page.getByLabel('Name').fill('John Doe');
    await page.getByLabel('Email').fill('john@example.com');
    await page.getByLabel('Subject').fill('Test Subject');
    await page.getByLabel('Message').fill('This is a test message.');

    // Submit the form
    await page.getByRole('button', { name: 'Send message' }).click();
  });

  test('should be keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Name')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Email')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Subject')).toBeFocused();

    await page.keyboard.press('Tab');
    await expect(page.getByLabel('Message')).toBeFocused();
  });
});
