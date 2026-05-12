import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { adminAuditLog } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  const logs = await db.select()
    .from(adminAuditLog)
    .orderBy(desc(adminAuditLog.createdAt))
    .limit(200);
  return { logs };
};
