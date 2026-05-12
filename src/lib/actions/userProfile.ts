import { db } from '$lib/server/db';
import { users, userChangeLog } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';

export async function updateUserProfile(
  userId: number,
  updates: { firstName?: string; lastName?: string; stateOfOrigin?: string; graduationYear?: number; academicLevel?: string },
  options?: { loggedByAdmin?: boolean }
) {
  const result = await db.execute(
    sql`SELECT first_name, last_name, state_of_origin, academic_level FROM "user" WHERE id = ${userId}`
  ) as any[];

  const current = result[0] || {};
  const changes: { field: string; oldValue: string | null; newValue: string | null }[] = [];

  if (updates.firstName !== undefined && updates.firstName !== current.first_name) {
    changes.push({ field: 'first_name', oldValue: current.first_name, newValue: updates.firstName });
  }
  if (updates.lastName !== undefined && updates.lastName !== current.last_name) {
    changes.push({ field: 'last_name', oldValue: current.last_name, newValue: updates.lastName });
  }
  if (updates.stateOfOrigin !== undefined && updates.stateOfOrigin !== current.state_of_origin) {
    changes.push({ field: 'state_of_origin', oldValue: current.state_of_origin, newValue: updates.stateOfOrigin });
  }
  if (updates.academicLevel !== undefined && updates.academicLevel !== current.academic_level) {
    changes.push({ field: 'academic_level', oldValue: current.academic_level, newValue: updates.academicLevel });
  }

  if (changes.length === 0 && !updates.graduationYear) return { updated: false };

  const setData: Record<string, any> = { lastUpdated: new Date() };
  if (updates.firstName !== undefined) setData.firstName = updates.firstName;
  if (updates.lastName !== undefined) setData.lastName = updates.lastName;
  if (updates.stateOfOrigin !== undefined) setData.stateOfOrigin = updates.stateOfOrigin;
  if (updates.graduationYear !== undefined) setData.graduationYear = updates.graduationYear;
  if (updates.academicLevel !== undefined) setData.academicLevel = updates.academicLevel;

  await db.update(users).set(setData).where(eq(users.id, userId));

  if (!options?.loggedByAdmin) {
    for (const change of changes) {
      await db.insert(userChangeLog).values({
        userId,
        field: change.field,
        oldValue: change.oldValue,
        newValue: change.newValue
      });
    }
  }

  return { updated: true, changes };
}
