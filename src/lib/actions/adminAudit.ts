import { db } from '$lib/server/db';
import { adminAuditLog } from '$lib/server/db/schema';

export async function logAdminAction(params: {
  adminId: number;
  action: string;
  targetType?: string;
  targetId?: number;
  details?: string;
}) {
  await db.insert(adminAuditLog).values({
    adminId: params.adminId,
    action: params.action,
    targetType: params.targetType || null,
    targetId: params.targetId || null,
    details: params.details || null
  });
}
