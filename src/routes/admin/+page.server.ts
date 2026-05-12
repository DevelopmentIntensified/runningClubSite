import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { adminAuditLog } from '$lib/server/db/schema';
import { desc } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  const logsRaw = await db.select()
    .from(adminAuditLog)
    .orderBy(desc(adminAuditLog.createdAt))
    .limit(200);

  const logs = logsRaw.map(log => {
    let parsedDetails: Record<string, any> | null = null;
    try {
      parsedDetails = log.details ? JSON.parse(log.details) : null;
    } catch {}
    return { ...log, parsedDetails };
  });

  return { logs };
};
