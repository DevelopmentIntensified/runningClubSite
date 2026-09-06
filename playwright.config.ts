import { defineConfig } from '@playwright/test';
import dotenv from 'dotenv';

// Load local test env (.env.test) so the suite knows whether Vercel Blob is
// available (no blob token locally → image-upload tests skip). Values already
// present in the real environment take precedence.
dotenv.config({ path: '.env.test', override: false });

const isCI = !!process.env.CI;

export default defineConfig({
  testDir: './tests/e2e',
  globalSetup: './tests/setup/global-setup.ts',
  fullyParallel: false,
  forbidOnly: isCI,
  retries: isCI ? 2 : 0,
  workers: isCI ? 1 : undefined,
  reporter: 'html',
  // Local test run against the dev server seeded from the local Postgres
  // (docker-compose.yml, .env.test). Start it with `npm run dev:test`, or let
  // the webServer below start it automatically.
  use: {
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:4173',
    trace: 'on-first-retry'
  },
  webServer: process.env.E2E_BASE_URL
    ? undefined
    : {
        command: 'npm run dev:test',
        url: 'http://localhost:4173',
        reuseExistingServer: !isCI,
        timeout: 120000
      },
  projects: [
    {
      // Authenticated admin CRUD tests. Uses the session created by global-setup.
      name: 'chromium-admin',
      testMatch: /admin\.spec\.ts/,
      use: {
        viewport: { width: 1280, height: 720 },
        storageState: './tests/.auth/admin-session.json'
      }
    },
    {
      // Public pages + unauthenticated admin access tests. Runs WITHOUT a session
      // so redirects (to /no-access) are exercised correctly.
      name: 'chromium',
      testIgnore: /admin\.spec\.ts/,
      use: {
        viewport: { width: 1280, height: 720 }
      }
    }
  ]
});
