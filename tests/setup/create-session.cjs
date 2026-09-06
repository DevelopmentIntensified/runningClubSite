const pg = require('pg');
const crypto = require('crypto');

const ADMIN_TEST_EMAIL = 'playwright-admin-setup@liberty.edu';

const pool = new pg.Pool({
  // Local test database (docker-compose.yml). Set DATABASE_URL to override.
  connectionString:
    process.env.DATABASE_URL || 'postgresql://postgres:postgres@127.0.0.1:5434/runningclub'
});

function generateSessionId() {
  return crypto.randomBytes(32).toString('hex');
}

async function query(sql, params = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return result;
  } finally {
    client.release();
  }
}

async function deleteExistingUser(email) {
  try {
    await query(`DELETE FROM session WHERE user_id = (SELECT id FROM "user" WHERE email = $1)`, [
      email
    ]);
    await query(`DELETE FROM "user" WHERE email = $1`, [email]);
    console.log('Deleted existing test user and sessions');
  } catch (e) {
    console.log('No existing user to delete:', e.message);
  }
}

async function createAdminUser(email) {
  const result = await query(
    `INSERT INTO "user" (email, is_admin, first_name, last_name, state_of_origin) VALUES ($1, true, $2, $3, $4) RETURNING id, email, is_admin`,
    [email, 'Playwright', 'Admin', 'VA']
  );
  return result.rows[0];
}

async function createSession(userId) {
  const sessionId = generateSessionId();
  const expiresAt = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);

  await query(`INSERT INTO session (id, user_id, expires_at) VALUES ($1, $2, $3)`, [
    sessionId,
    userId,
    expiresAt
  ]);

  return sessionId;
}

async function runSetup() {
  console.log('Setting up admin test session...');

  await deleteExistingUser(ADMIN_TEST_EMAIL);

  const user = await createAdminUser(ADMIN_TEST_EMAIL);
  console.log('Created admin user:', user.id);

  const sessionId = await createSession(user.id);
  console.log('Created session:', sessionId);

  const fs = require('fs');
  const path = require('path');

  const authDir = './tests/.auth';
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  const storageState = {
    cookies: [
      {
        // Must match lucia.sessionCookieName (default 'auth_session').
        name: 'auth_session',
        value: sessionId,
        domain: 'localhost',
        path: '/',
        httpOnly: true,
        secure: false,
        sameSite: 'Lax',
        expires: Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60
      }
    ]
  };

  fs.writeFileSync(path.join(authDir, 'admin-session.json'), JSON.stringify(storageState, null, 2));

  console.log('Session saved to tests/.auth/admin-session.json');

  await pool.end();
  console.log('Setup complete!');
}

runSetup().catch((e) => {
  console.error('Setup failed:', e);
  process.exit(1);
});
