/**
 * Seed the local test database (docker-compose.yml / .env.test) with test
 * users. Run with `npm run seed:local`. No emails are sent — users log in
 * directly with a password.
 *
 * Users created:
 *  - local-admin@liberty.edu  (isAdmin, full profile, password localtest123)
 *  - local-user@liberty.edu   (regular user, password localtest123)
 *  - local-onboard@liberty.edu (regular user without a first name, so password
 *    login sends it through the /login/setup onboarding flow)
 */
import pg from 'pg';
import { hash } from '@node-rs/argon2';

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL
});

const PASSWORD = 'localtest123';

async function upsertUser({ email, isAdmin = false, firstName = null, lastName = null }) {
  const hashedPassword = await hash(PASSWORD);
  await pool.query(
    `INSERT INTO "user" (email, is_admin, first_name, last_name, state_of_origin, hashed_password)
     VALUES ($1, $2, $3, $4, $5, $6)
     ON CONFLICT (email) DO UPDATE
       SET is_admin = EXCLUDED.is_admin,
           first_name = EXCLUDED.first_name,
           last_name = EXCLUDED.last_name,
           state_of_origin = EXCLUDED.state_of_origin,
           hashed_password = EXCLUDED.hashed_password`,
    [email, isAdmin, firstName, lastName, 'VA', hashedPassword]
  );
  console.log(`Seeded user: ${email} (password: ${PASSWORD})`);
}

async function run() {
  if (!process.env.DATABASE_URL) {
    console.error('DATABASE_URL is not set. Run with: npm run seed:local');
    process.exit(1);
  }

  await upsertUser({ email: 'local-admin@liberty.edu', isAdmin: true, firstName: 'Local', lastName: 'Admin' });
  await upsertUser({ email: 'local-user@liberty.edu', firstName: 'Local', lastName: 'User' });
  // No first name → password login redirects to /login/setup for onboarding.
  await upsertUser({ email: 'local-onboard@liberty.edu' });

  await pool.end();
  console.log('Local seed complete.');
}

run().catch((e) => {
  console.error('Seed failed:', e);
  process.exit(1);
});
