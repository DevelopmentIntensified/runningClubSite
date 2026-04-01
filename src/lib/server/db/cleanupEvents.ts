import { db } from '../db';
import { events } from '../db/schema';
import { gt, and, sql } from 'drizzle-orm';

export async function cleanupDuplicateSaturdayRuns() {
  const mayEnd = '2026-05-31T23:59:59.000-04:00';

  await db.execute(sql`
    DELETE FROM events
    WHERE id IN (
      SELECT id FROM (
        SELECT id, start, title, location,
          ROW_NUMBER() OVER (PARTITION BY DATE(start) ORDER BY id) as rn
        FROM events
        WHERE title = 'Long Run' AND EXTRACT(DOW FROM start) = 6
      ) sub
      WHERE rn > 1
    )
  `);
  console.log('Deleted duplicate Saturday Long Run events');

  const afterMay = await db.delete(events).where(gt(events.start, mayEnd));
  console.log(`Deleted events after end of May 2026`);

  console.log('Cleanup complete');
}
