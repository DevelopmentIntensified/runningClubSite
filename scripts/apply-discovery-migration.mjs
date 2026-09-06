// scripts/apply-discovery-migration.mjs
// Usage: node scripts/apply-discovery-migration.mjs [DATABASE_URL]
import pg from 'pg';

const url = process.argv[2] || process.env.DATABASE_URL;
if (!url) {
  console.error('Pass DATABASE_URL as arg 1 (or set env). Aborting.');
  process.exit(1);
}

const SQL = `
CREATE TABLE IF NOT EXISTS "discovery_responses" (
  "id" serial PRIMARY KEY NOT NULL,
  "source" text NOT NULL,
  "details" text,
  "created_at" timestamp DEFAULT now() NOT NULL
);`;

const isLocal = url.includes('localhost');
const pool = new pg.Pool({
  connectionString: url,
  ssl: isLocal ? false : { rejectUnauthorized: false }
});

try {
  const existing = await pool.query(
    `SELECT 1 FROM information_schema.tables WHERE table_name = 'discovery_responses'`
  );
  if (existing.rowCount > 0) {
    console.log('discovery_responses already exists — skipping.');
  } else {
    await pool.query(SQL);
    console.log('Created discovery_responses.');
  }
  const cols = await pool.query(
    `SELECT column_name FROM information_schema.columns WHERE table_name = 'discovery_responses' ORDER BY ordinal_position`
  );
  console.log('Columns:', cols.rows.map((r) => r.column_name).join(', '));
} finally {
  await pool.end();
}
