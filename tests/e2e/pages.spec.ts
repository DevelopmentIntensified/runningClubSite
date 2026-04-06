import { test, expect } from '@playwright/test';

test.describe('Public Page Tests', () => {
  test('Home page loads correctly', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Liberty Running Club', exact: true })).toBeVisible();
  });

  test('About page loads correctly', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByRole('heading').first()).toBeVisible();
  });

  test('Schedule page loads correctly', async ({ page }) => {
    await page.goto('/schedule');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Records page loads correctly', async ({ page }) => {
    await page.goto('/records');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Locations page loads correctly', async ({ page }) => {
    await page.goto('/locations');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Contact page loads correctly', async ({ page }) => {
    await page.goto('/contact1');
    await expect(page.getByRole('heading', { name: 'Contact Us' })).toBeVisible();
  });

  test('News page loads correctly', async ({ page }) => {
    await page.goto('/news');
    await expect(page.locator('h1').first()).toBeVisible();
  });

  test('Login page loads correctly', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
  });

  test('Admin page redirects unauthenticated users to login', async ({ page }) => {
    await page.goto('/admin/news');
    await expect(page).toHaveURL(/.*\/login/);
  });
});