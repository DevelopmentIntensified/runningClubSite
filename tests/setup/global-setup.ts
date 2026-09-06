import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

/**
 * Playwright global setup.
 *
 * Runs once before the test suite. It creates a dedicated admin test user and a
 * fresh, valid `session` row directly in the test database, then writes the
 * session cookie to `tests/.auth/admin-session.json` so the authenticated
 * admin CRUD tests (admin.spec.ts) can hit the live test deployment as admin.
 *
 * The cookie injected here is only valid for the test environment and expires
 * in 30 days, so it is regenerated on every run.
 */
export default function globalSetup() {
  const script = fileURLToPath(new URL('./create-session.cjs', import.meta.url));
  execSync(`node "${script}"`, { stdio: 'inherit' });
}
