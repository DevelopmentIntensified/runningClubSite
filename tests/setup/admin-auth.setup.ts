import { test as setup, expect } from '@playwright/test';

const ADMIN_TEST_EMAIL = 'playwright-admin-setup@liberty.edu';

setup.describe('global setup', () => {
  setup('create admin user and save authenticated session', async ({ browser, page }) => {
    const { createTestUser, deleteTestUser } = await import('../support/db');
    
    await deleteTestUser(ADMIN_TEST_EMAIL);
    
    const admin = await createTestUser(ADMIN_TEST_EMAIL, true);
    console.log('Created admin user:', admin.id);
    
    await page.goto('/login');
    await page.fill('input[name="email"]', ADMIN_TEST_EMAIL);
    await page.click('button:has-text("Sign in")');
    await page.waitForTimeout(3000);
    
    const cookies = await page.context().cookies();
    const sessionCookie = cookies.find(c => c.name === 'session');
    
    if (!sessionCookie) {
      console.log('Page content after login attempt:', await page.content());
      throw new Error('Session cookie not found after login');
    }
    
    await page.context().storageState({
      path: './tests/.auth/admin-session.json',
      cookies: [{
        name: 'session',
        value: sessionCookie.value,
        domain: '.test.libertyrunningclub.com',
        path: '/',
        httpOnly: true,
        sameSite: 'Lax'
      }]
    });
    
    console.log('Session saved to file');
  });
});