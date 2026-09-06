import { describe, it, expect, afterAll } from 'vitest';
import { saveDiscoveryResponse, getDiscoveryCounts } from '$lib/server/db/discoveryRepo';

afterAll(async () => {
  await clearDiscoveryResponses();
});

describe('discoveryRepo (local Postgres)', () => {
  it('persists an anonymous response with no user link', async () => {
    await saveDiscoveryResponse({
      discoverySource: 'friend',
      discoveryDetails: 'told by roommate'
    });

    const rows = await queryAll();
    expect(rows).toHaveLength(1);
    const row = rows[0];
    expect(row.source).toBe('friend');
    expect(row.details).toBe('told by roommate');
    // Truly anonymous: the response row must not reference any user.
    expect(Object.keys(row).some((c) => /user/i.test(c))).toBe(false);
  });

  it('aggregates counts per source', async () => {
    await clearDiscoveryResponses();
    await saveDiscoveryResponse({ discoverySource: 'social-media' });
    await saveDiscoveryResponse({ discoverySource: 'social-media' });
    await saveDiscoveryResponse({ discoverySource: 'event' });

    const counts = await getDiscoveryCounts();
    const bySource = Object.fromEntries(counts.map((c) => [c.source, c.count]));
    expect(bySource['social-media']).toBe(2);
    expect(bySource['event']).toBe(1);
  });
});

async function queryAll() {
  const { query } = await import('../support/db');
  const result = await query(`SELECT source, details FROM discovery_responses`);
  return result.rows;
}

async function clearDiscoveryResponses() {
  const { query } = await import('../support/db');
  await query(`DELETE FROM discovery_responses`);
}
