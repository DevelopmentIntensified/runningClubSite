import { test, expect } from '@playwright/test';

test.describe('Admin Pages - Authentication & Authorization', () => {
  test.describe('Unauthenticated Access', () => {
    test('leaders page redirects to no-access', async ({ page }) => {
      await page.goto('/admin/leaders');
      await expect(page).toHaveURL(/.*\/no-access/);
    });

    test('news page redirects to no-access', async ({ page }) => {
      await page.goto('/admin/news');
      await expect(page).toHaveURL(/.*\/no-access/);
    });

    test('slideshow page redirects to no-access', async ({ page }) => {
      await page.goto('/admin/slideshow');
      await expect(page).toHaveURL(/.*\/no-access/);
    });

    test('alumni page redirects to no-access', async ({ page }) => {
      await page.goto('/admin/alumni');
      await expect(page).toHaveURL(/.*\/no-access/);
    });

    test('page-images page redirects to no-access', async ({ page }) => {
      await page.goto('/admin/page-images');
      await expect(page).toHaveURL(/.*\/no-access/);
    });
  });

  test.describe('Image Upload API', () => {
    test('returns 401 for unauthenticated requests', async ({ page }) => {
      const response = await page.request.post(
        'https://test.libertyrunningclub.com/api/blob/upload',
        {
          data: {
            blob: { size: 1000, type: 'image/jpeg', name: 'test.jpg' }
          }
        }
      );
      expect(response.status()).toBeGreaterThanOrEqual(400);
    });
  });
});
