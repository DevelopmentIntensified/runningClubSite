import { db } from '$lib/server/db';
import { discoveryResponses } from '$lib/server/db/schema';
import { sql } from 'drizzle-orm';
import {
  normalizeDiscoveryInput,
  type DiscoveryPayload,
  type DiscoveryResult
} from '$lib/onboarding/discovery';

/**
 * Persist an anonymous "how did you find the club" response.
 *
 * Responses are stored in their own table with no reference to the user, so
 * they stay truly anonymous. Skipped input records nothing.
 */
export async function saveDiscoveryResponse(payload: DiscoveryPayload): Promise<DiscoveryResult> {
  const result = normalizeDiscoveryInput(payload);

  if (!result.ok || result.skip) {
    return result;
  }

  await db.insert(discoveryResponses).values({ source: result.source, details: result.details });
  return result;
}

/** Aggregate counts per source, most common first. */
export async function getDiscoveryCounts(): Promise<{ source: string; count: number }[]> {
  const rows = await db
    .select({
      source: discoveryResponses.source,
      count: sql<number>`count(*)::int`
    })
    .from(discoveryResponses)
    .groupBy(discoveryResponses.source)
    .orderBy(sql`count(*) desc`);

  return rows;
}
