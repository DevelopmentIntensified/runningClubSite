import { test, expect, type Page } from '@playwright/test';
import * as db from '../support/db';

const PASSWORD = 'localtest123';
const detailsMarker = `e2e-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;

async function countDiscoveryRows() {
  const res = await db.query(`SELECT count(*)::int AS n FROM discovery_responses`);
  return res.rows[0].n;
}

/** Password login with a seeded local user; no emails involved. */
async function loginWithPassword(page: Page, email: string) {
  await page.goto('/login?redirectUrl=%2Fsettings');
  await expect(page.getByRole('heading', { name: 'Sign in to your account' })).toBeVisible();
  await expect(page.locator('#email-address')).toBeVisible();
  // Dev-mode hydration compiles modules on first load; wait for it before
  // clicking the (client-side) mode toggle.
  await page.waitForLoadState('networkidle');

  await page.getByRole('button', { name: 'Sign in with Password', exact: true }).click();
  await page.locator('#email-password').waitFor();
  await page.fill('#email-password', email);
  await page.fill('#password', PASSWORD);
  await page.check('#privacy-password');
  // exact match: "Sign in with Password" also contains "Sign in".
  await page.getByRole('button', { name: 'Sign in', exact: true }).click();
}

async function fillSetupForm(page: Page, firstName: string) {
  await page.fill('#firstName', firstName);
  await page.fill('#lastName', 'Tester');

  // The state dropdown only opens via a hydrated on:input handler; dev-mode
  // hydration can lag, so refill until the option list reacts.
  for (let i = 0; i < 30; i++) {
    await page.fill('#stateOfOrigin', 'Virginia');
    const option = page.locator('li:has-text("Virginia")').first();
    if (await option.isVisible().catch(() => false)) {
      await option.click();
      break;
    }
    await page.waitForTimeout(500);
  }

  await page.selectOption('#graduationYear', { index: 1 });
  await page.fill('#password', PASSWORD);
  await page.fill('#confirmPassword', PASSWORD);
}

test.describe('Onboarding: anonymous discovery question', () => {
  test.setTimeout(120000);
  let email: string;
  let userId: number;

  test.beforeEach(async () => {
    email = `e2eonboard${Date.now()}${Math.floor(Math.random() * 1e6)}@liberty.edu`;
    const user = await db.createTestUserWithPassword(email, PASSWORD);
    userId = user.id;
  });

  test.afterEach(async () => {
    if (userId) {
      await db.deleteTestUser(email);
      userId = 0;
    }
    await db.query(`DELETE FROM discovery_responses WHERE details = $1`, [detailsMarker]);
  });

  test('optional question appears and a chosen answer is stored anonymously', async ({ page }) => {
    await loginWithPassword(page, email);
    await page.waitForURL(/\/login\/setup/, { timeout: 15000 });

    const before = await countDiscoveryRows();

    await fillSetupForm(page, 'Onboard');
    await page.selectOption('#discoverySource', 'friend');
    await page.fill('#discoveryDetails', detailsMarker);
    await page.click('button:has-text("Complete Setup")');

    await page.waitForURL(/\/settings/, { timeout: 15000 });

    const rows = await db.query(
      `SELECT source, details FROM discovery_responses WHERE details = $1`,
      [detailsMarker]
    );
    expect(rows.rows.length).toBe(1);
    expect(rows.rows[0].source).toBe('friend');
    expect(await countDiscoveryRows()).toBe(before + 1);
  });

  test('skipping the optional question records nothing', async ({ page }) => {
    await loginWithPassword(page, email);
    await page.waitForURL(/\/login\/setup/, { timeout: 15000 });
    await page.waitForLoadState('networkidle');

    const before = await countDiscoveryRows();

    await fillSetupForm(page, 'Skipper');
    await page.click('button:has-text("Complete Setup")');

    await page.waitForURL(/\/settings/, { timeout: 15000 });
    expect(await countDiscoveryRows()).toBe(before);
  });
});
