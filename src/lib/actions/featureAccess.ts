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

export async function isUserGranted(featureKey: string, userId: number): Promise<boolean> {
  const rows = await db
    .select({ id: featureAccessUsers.id })
    .from(featureAccessUsers)
    .where(
      and(eq(featureAccessUsers.featureKey, featureKey), eq(featureAccessUsers.userId, userId))
    );
  return rows.length > 0;
}

/**
 * Resolve whether a user may access a feature.
 * Admins always have access. Non-admins are checked against the feature's mode.
 */
export async function canAccessFeature(
  featureKey: string,
  user: FeatureUserAttributes | null | undefined
): Promise<boolean> {
  // Admins always pass.
  if (user?.isAdmin) return true;

  const feature = await getFeature(featureKey);
  if (!feature) return false;

  switch (feature.mode) {
    case 'public':
      return true;
    case 'login':
      return !!user && !!user.id;
    case 'admin':
      return false; // handled above
    case 'restricted': {
      if (!user || !user.id) return false;
      const userId = typeof user.id === 'string' ? parseInt(user.id, 10) : user.id;
      return isUserGranted(featureKey, userId);
    }
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
