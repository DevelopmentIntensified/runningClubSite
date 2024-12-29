import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { pg } from '@lucia-auth/adapter-postgresql';
import { dev } from '$app/environment';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

export const auth = lucia({
  adapter: pg(pool),
  env: dev ? 'DEV' : 'PROD',
  middleware: sveltekit(),
  transformDatabaseUser: (userData) => {
    return {
      userId: userData.id,
      email: userData.email,
      isAdmin: userData.is_admin
    };
  }
});

export type Auth = typeof auth;

