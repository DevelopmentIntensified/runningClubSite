import { db } from '$lib/server/db';
import { featureAccess, featureAccessUsers, type FeatureMode } from '$lib/server/db/schema';
import { eq, and } from 'drizzle-orm';

export interface FeatureUserAttributes {
  id: number | string;
  isAdmin?: boolean;
}

/**
 * The set of gated features and their defaults. 'admin' features are always
 * admin-only and not changeable. The others can be reconfigured by admins.
 */
export const DEFAULT_FEATURES: {
  key: string;
  name: string;
  description: string;
  mode: FeatureMode;
  locked?: boolean;
}[] = [
  {
    key: 'admin',
    name: 'Admin Dashboard',
    description: 'Full admin dashboard. Always admin-only.',
    mode: 'admin',
    locked: true
  },
  {
    key: 'season-photos',
    name: 'Season Photos',
    description: 'Photo galleries from each season.',
    mode: 'login'
  },
  {
    key: 'trainingplan',
    name: 'Training Plan',
    description: 'The club training plan.',
    mode: 'login'
  },
  {
    key: 'groupme',
    name: 'GroupMe',
    description: 'GroupMe community access.',
    mode: 'login'
  },
  {
    key: 'forms',
    name: 'Forms',
    description: 'Club forms and documents.',
    mode: 'login'
  }
];

/** Insert any default features that don't exist yet (idempotent seeding). */
export async function ensureDefaultFeatures() {
  const existing = await db.select({ key: featureAccess.key }).from(featureAccess);
  const existingKeys = new Set(existing.map((f) => f.key));
  const toInsert = DEFAULT_FEATURES.filter((f) => !existingKeys.has(f.key)).map((f) => ({
    key: f.key,
    name: f.name,
    description: f.description,
    mode: f.mode
  }));
  if (toInsert.length > 0) {
    await db.insert(featureAccess).values(toInsert);
  }
}

export async function getFeatures() {
  await ensureDefaultFeatures();
  return db.select().from(featureAccess).orderBy(featureAccess.id);
}

export async function getFeature(key: string) {
  await ensureDefaultFeatures();
  const [feature] = await db.select().from(featureAccess).where(eq(featureAccess.key, key));
  return feature ?? null;
}

export async function setFeatureMode(key: string, mode: FeatureMode) {
  await db.update(featureAccess).set({ mode }).where(eq(featureAccess.key, key));
}

export async function getFeatureUsers(key: string) {
  return db.select().from(featureAccessUsers).where(eq(featureAccessUsers.featureKey, key));
}

export async function addFeatureUser(key: string, userId: number) {
  const exists = await db
    .select({ id: featureAccessUsers.id })
    .from(featureAccessUsers)
    .where(and(eq(featureAccessUsers.featureKey, key), eq(featureAccessUsers.userId, userId)));
  if (exists.length === 0) {
    await db.insert(featureAccessUsers).values({ featureKey: key, userId });
  }
}

export async function removeFeatureUser(key: string, userId: number) {
  await db
    .delete(featureAccessUsers)
    .where(and(eq(featureAccessUsers.featureKey, key), eq(featureAccessUsers.userId, userId)));
}

/** Whether a specific user has been explicitly denied a feature. */
export async function isUserDenied(featureKey: string, userId: number): Promise<boolean> {
  const rows = await db
    .select({ id: featureAccessUsers.id })
    .from(featureAccessUsers)
    .where(
      and(eq(featureAccessUsers.featureKey, featureKey), eq(featureAccessUsers.userId, userId))
    );
  return rows.length > 0;
}

/** Keys of all features a specific user is explicitly denied access to. */
export async function getUserDeniedKeys(userId: number): Promise<string[]> {
  const rows = await db
    .select({ featureKey: featureAccessUsers.featureKey })
    .from(featureAccessUsers)
    .where(eq(featureAccessUsers.userId, userId));
  return rows.map((r) => r.featureKey);
}

/**
 * Sync a user's explicit denials to exactly the given set of keys.
 * Features not present are allowed (follow the global mode).
 */
export async function setUserDeniedKeys(userId: number, keys: string[]) {
  const current = new Set(await getUserDeniedKeys(userId));
  const desired = new Set(keys);
  await db.transaction(async (tx) => {
    for (const key of current) {
      if (!desired.has(key)) {
        await tx
          .delete(featureAccessUsers)
          .where(
            and(eq(featureAccessUsers.featureKey, key), eq(featureAccessUsers.userId, userId))
          );
      }
    }
    for (const key of desired) {
      if (!current.has(key)) {
        await tx.insert(featureAccessUsers).values({ featureKey: key, userId });
      }
    }
  });
}

/**
 * Resolve whether a user may access a feature.
 * Admins always have access. Otherwise the global mode applies unless the
 * user has been explicitly denied the feature (per-user deny override).
 */
export async function canAccessFeature(
  featureKey: string,
  user: FeatureUserAttributes | null | undefined
): Promise<boolean> {
  // Admins always pass.
  if (user?.isAdmin) return true;

  const feature = await getFeature(featureKey);
  if (!feature) return false;

  // mode 'admin' is never accessible to non-admins.
  if (feature.mode === 'admin') return false;

  // Non-admin users can be denied a feature regardless of its global mode.
  if (user && user.id) {
    const userId = typeof user.id === 'string' ? parseInt(user.id, 10) : user.id;
    if (await isUserDenied(featureKey, userId)) return false;
  }

  switch (feature.mode) {
    case 'public':
      return true;
    case 'login':
      return !!user && !!user.id;
    default:
      return false;
  }
}

/** Convenience: check access to many features at once, keyed by feature key. */
export async function canAccessFeatures(
  keys: string[],
  user: FeatureUserAttributes | null | undefined
): Promise<Record<string, boolean>> {
  const entries = await Promise.all(
    keys.map(async (k) => [k, await canAccessFeature(k, user)] as const)
  );
  return Object.fromEntries(entries);
}
