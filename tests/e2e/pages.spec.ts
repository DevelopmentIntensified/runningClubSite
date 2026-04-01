import { test, expect } from '@playwright/test';

test.describe('Page tests', () => {
  test('Home page', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByText('Liberty Running Club')).toBeVisible();
    await expect(page.getByText('Running and Glorifying God through every step')).toBeVisible();
  });

  test('About page', async ({ page }) => {
    await page.goto('/about');
    await expect(page.getByText('About Liberty Running Club')).toBeVisible();
    await expect(page.getByText('Our Mission')).toBeVisible();
  });

  test('Schedule page', async ({ page }) => {
    await page.goto('/schedule');
    await expect(page.getByText('Club Schedule')).toBeVisible();
  });

  test('Records page', async ({ page }) => {
    await page.goto('/records');
    await expect(page.getByText('Club Records')).toBeVisible();
    await expect(page.getByText('Cross Country Records')).toBeVisible();
    await expect(page.getByText('Track Records')).toBeVisible();
  });

  test('Locations page', async ({ page }) => {
    await page.goto('/locations');
    await expect(page.getByText('Running Locations')).toBeVisible();
    await expect(page.getByText('Liberty Mountain Trail System')).toBeVisible();
  });

  test('Contact page', async ({ page }) => {
    await page.goto('/contact');
    await expect(page.getByText('Contact Us')).toBeVisible();
    await expect(page.getByLabel('Name')).toBeVisible();
    await expect(page.getByLabel('Email')).toBeVisible();
    await expect(page.getByLabel('Message')).toBeVisible();
  });

  test('News page', async ({ page }) => {
    await page.goto('/news');
    await expect(page.getByText('Latest News')).toBeVisible();
  });

  test('Login page', async ({ page }) => {
    await page.goto('/login');
    await expect(page.getByText('Sign in to your account')).toBeVisible();
    await expect(page.getByLabel('Email address')).toBeVisible();
    await expect(page.getByLabel('Password')).toBeVisible();
    await expect(page.getByText('Privacy Policy')).toBeVisible();
  });

  test('Admin news page (unauthenticated)', async ({ page }) => {
    await page.goto('/admin/news');
    // Assuming unauthenticated users are redirected to login page
    await expect(page.getByText('Sign in to your account')).toBeVisible();
  });

  test('Privacy page', async ({ page }) => {
    await page.goto('/privacy');
    await expect(page.getByText('Privacy Policy')).toBeVisible();
  });
});
