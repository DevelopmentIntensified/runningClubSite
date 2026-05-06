import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { users } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  const result = await db.execute(sql`
    SELECT 
      state_of_origin AS state,
      COUNT(*) AS total,
      MIN(EXTRACT(YEAR FROM created_at)) AS first_year
    FROM "user"
    WHERE state_of_origin IS NOT NULL 
      AND state_of_origin != ''
    GROUP BY state_of_origin
  `);

  const data: Record<string, { total: number; firstYear: number }> = {};
  for (const row of result) {
    if (row.state) {
      data[row.state.toUpperCase()] = {
        total: parseInt(row.total as string),
        firstYear: parseInt(row.first_year as string)
      };
    }
  }

  const allYearsResult = await db.execute(sql`
    SELECT DISTINCT EXTRACT(YEAR FROM created_at) AS year
    FROM "user"
    ORDER BY year DESC
  `);
  const years = allYearsResult.map((r) => r.year as string);

  return { stats: data, years };
};
