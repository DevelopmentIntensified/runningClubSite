import pg from 'pg';
const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://runningclub_owner:VQ2s6GzbfLqH@ep-fancy-river-a81zxdut.eastus2.azure.neon.tech/runningclub?sslmode=require'
});

export async function query(sql: string, params: any[] = []) {
  const client = await pool.connect();
  try {
    const result = await client.query(sql, params);
    return result;
  } finally {
    client.release();
  }
}

export async function createTestUser(email?: string, isAdmin = true) {
  const userEmail = email || `playwright-test-${Date.now()}@liberty.edu`;
  const result = await query(
    `INSERT INTO "user" (email, is_admin) VALUES ($1, $2) RETURNING id, email, is_admin`,
    [userEmail, isAdmin]
  );
  return result.rows[0];
}

export async function deleteTestUser(email: string) {
  await query(`DELETE FROM "user" WHERE email = $1`, [email]);
}

export async function createTestLeader(name: string) {
  const result = await query(
    `INSERT INTO leaders (name, position, bio, "imageUrl", "order", active) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id`,
    [name, 'Test Position', 'Test Bio', 'https://example.com/test.jpg', 1, true]
  );
  return result.rows[0];
}

export async function deleteTestLeader(id: number) {
  await query(`DELETE FROM leaders WHERE id = $1`, [id]);
}

export async function getLeaderById(id: number) {
  const result = await query(`SELECT * FROM leaders WHERE id = $1`, [id]);
  return result.rows[0];
}

export async function createTestNews(title: string, userId: number) {
  const result = await query(
    `INSERT INTO news (title, content, "imageUrl", created_by) VALUES ($1, $2, $3, $4) RETURNING id`,
    [title, 'Test content', 'https://example.com/test.jpg', userId]
  );
  return result.rows[0];
}

export async function deleteTestNews(id: number) {
  await query(`DELETE FROM news WHERE id = $1`, [id]);
}

export async function createTestSlide(title: string) {
  const result = await query(
    `INSERT INTO "slideShowImages" (title, "imageUrl", "order") VALUES ($1, $2, $3) RETURNING id`,
    [title, 'https://example.com/test.jpg', 1]
  );
  return result.rows[0];
}

export async function deleteTestSlide(id: number) {
  await query(`DELETE FROM "slideShowImages" WHERE id = $1`, [id]);
}

export async function createTestAlumni(name: string) {
  const result = await query(
    `INSERT INTO alumni (name, major, "graduationYear") VALUES ($1, $2, $3) RETURNING id`,
    [name, 'Test Major', 2024]
  );
  return result.rows[0];
}

export async function deleteTestAlumni(id: number) {
  await query(`DELETE FROM alumni WHERE id = $1`, [id]);
}

export async function createTestPageImage(locationName: string) {
  const result = await query(
    `INSERT INTO "pageImages" ("locationName", alt, "imageUrl") VALUES ($1, $2, $3) RETURNING id`,
    [locationName, 'Test alt', 'https://example.com/test.jpg']
  );
  return result.rows[0];
}

export async function deleteTestPageImage(id: number) {
  await query(`DELETE FROM "pageImages" WHERE id = $1`, [id]);
}

export async function getUserByEmail(email: string) {
  const result = await query(`SELECT id, email, is_admin FROM "user" WHERE email = $1`, [email]);
  return result.rows[0] || null;
}