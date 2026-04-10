import { db } from '$lib/server/db';
import { users, sessions, type User } from '$lib/server/db/schema';
import { eq, asc, desc } from 'drizzle-orm';

export async function getUsers(sortBy: 'email' | 'createdAt' | 'lastLogin' = 'email') {
  let orderBy;
  switch (sortBy) {
    case 'createdAt':
      orderBy = desc(users.createdAt);
      break;
    case 'lastLogin':
      orderBy = desc(users.lastLogin);
      break;
    default:
      orderBy = asc(users.email);
  }
  return await db.select().from(users).orderBy(orderBy);
}

export async function getUser(id: number) {
  const [User] = await db.select().from(users).where(eq(users.id, id));
  return User;
}

export async function createUser(data: Omit<User, 'id'>) {
  const [createdUser] = await db.insert(users).values(data).returning();
  return createdUser;
}

export async function updateUser(id: number, data: Partial<Omit<User, 'id'>>) {
  const [updatedUser] = await db.update(users).set(data).where(eq(users.id, id)).returning();
  return updatedUser;
}

export async function deleteUser(id: number) {
  await db.delete(sessions).where(eq(sessions.userId, id));
  await db.delete(users).where(eq(users.id, id));
}
