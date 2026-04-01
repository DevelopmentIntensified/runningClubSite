import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { env } from '$env/dynamic/private';
if (!env.DATABASE_URL) throw new Error('DATABASE_URL is not set');
const client = postgres(env.DATABASE_URL);
export const db = drizzle(client);

import { insertMensRecords } from './insertMensRecords';
import { insertWomensRecords } from './insertWomensRecords';
import { insertEvents } from './insertEvents';
import { insertLocations } from './insertLocations';
import { insertLeaders } from './insertLeaders';
import { insertRecurringEvents } from './insertRecurringEvents';

if (false) {
  insertLeaders();
}
if (false) {
  insertLocations();
}
if (false) {
  insertEvents();
}
if (false) {
  await insertMensRecords();
}
if (false) {
  await insertWomensRecords();
}
if (false) {
  await insertRecurringEvents()
    .then(() => console.log('All recurring events for 16 weeks inserted successfully'))
    .catch(error => console.error('Error inserting recurring events:', error))

  // Log the current date for reference
  console.log('Script run date:', new Date().toISOString());
}
