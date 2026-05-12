import { db } from '$lib/server/db';
import { users, userChangeLog } from '$lib/server/db/schema';
import { eq, sql } from 'drizzle-orm';
import { objectDiff } from '$lib/utils/objectDiff';

export async function updateUserProfile(
  userId: number,
  updates: { firstName?: string; lastName?: string; stateOfOrigin?: string; graduationYear?: number; academicLevel?: string },
  options?: { loggedByAdmin?: boolean }
) {
  const result = await db.execute(
    sql`SELECT first_name, last_name, state_of_origin, academic_level, graduation_year FROM "user" WHERE id = ${userId}`
  ) as any[];

  const current = result[0] || {};

  const currentCamel: Record<string, any> = {};
  if (current.first_name !== undefined) currentCamel.firstName = current.first_name;
  if (current.last_name !== undefined) currentCamel.lastName = current.last_name;
  if (current.state_of_origin !== undefined) currentCamel.stateOfOrigin = current.state_of_origin;
  if (current.academic_level !== undefined) currentCamel.academicLevel = current.academic_level;
  if (current.graduation_year !== undefined) currentCamel.graduationYear = current.graduation_year;

  const diff = objectDiff(currentCamel, updates as Record<string, any>);

  if (Object.keys(diff).length === 0) return { updated: false };

  const setData: Record<string, any> = { lastUpdated: new Date() };
  if (updates.firstName !== undefined) setData.firstName = updates.firstName;
  if (updates.lastName !== undefined) setData.lastName = updates.lastName;
  if (updates.stateOfOrigin !== undefined) setData.stateOfOrigin = updates.stateOfOrigin;
  if (updates.graduationYear !== undefined) setData.graduationYear = updates.graduationYear;
  if (updates.academicLevel !== undefined) setData.academicLevel = updates.academicLevel;

  await db.update(users).set(setData).where(eq(users.id, userId));

  if (!options?.loggedByAdmin) {
    const fieldMap: Record<string, string> = {
      firstName: 'first_name',
      lastName: 'last_name',
      stateOfOrigin: 'state_of_origin',
      graduationYear: 'graduation_year',
      academicLevel: 'academic_level'
    };
    for (const [field, change] of Object.entries(diff)) {
      const dbField = fieldMap[field] || field;
      await db.insert(userChangeLog).values({
        userId,
        field: dbField,
        oldValue: change.old?.toString() ?? null,
        newValue: change.new?.toString() ?? null
      });
    }
  }

  return { updated: true, changes: diff };
}
