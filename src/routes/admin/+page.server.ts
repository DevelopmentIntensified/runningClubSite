import type { PageServerLoad } from './$types';
import { db } from '$lib/server/db';
import { adminAuditLog, users } from '$lib/server/db/schema';
import { desc, eq } from 'drizzle-orm';

export const load: PageServerLoad = async () => {
  const logsRaw = await db
    .select({
      log: adminAuditLog,
      admin: users
    })
    .from(adminAuditLog)
    .leftJoin(users, eq(users.id, adminAuditLog.adminId))
    .orderBy(desc(adminAuditLog.createdAt))
    .limit(200);

  const logs = logsRaw.map(({ log, admin }) => {
    let parsedDetails: Record<string, any> | null = null;
    try {
      parsedDetails = log.details ? JSON.parse(log.details) : null;
    } catch {}
    return {
      ...log,
      parsedDetails,
      adminName: [admin?.firstName, admin?.lastName].filter(Boolean).join(' ') || admin?.email || null
    };
  });

  return { logs };
};
