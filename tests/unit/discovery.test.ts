import { describe, it, expect } from 'vitest';
import {
  DISCOVERY_SOURCES,
  normalizeDiscoveryInput,
  type DiscoveryPayload
} from '$lib/onboarding/discovery';

const input = (
  source: DiscoveryPayload['discoverySource'],
  details?: DiscoveryPayload['discoveryDetails']
): DiscoveryPayload => ({
  discoverySource: source,
  discoveryDetails: details
});

describe('discovery sources', () => {
  it('exposes exactly the six agreed options', () => {
    expect([...DISCOVERY_SOURCES].sort()).toEqual(
      ['event', 'flyer', 'friend', 'other', 'social-media', 'website'].sort()
    );
  });
});

describe('normalizeDiscoveryInput', () => {
  it('treats missing/blank input as skipped (no insert)', () => {
    for (const payload of [undefined, null, {}, input(''), input('   '), input(null)]) {
      const result = normalizeDiscoveryInput(payload);
      expect(result.ok).toBe(true);
      expect(result.skip).toBe(true);
      expect(result.source).toBeNull();
    }
  });

  it('accepts each allowed source', () => {
    for (const source of DISCOVERY_SOURCES) {
      const result = normalizeDiscoveryInput(input(source));
      expect(result.ok).toBe(true);
      expect(result.skip).toBe(false);
      expect(result.source).toBe(source);
    }
  });

  it('rejects unknown sources', () => {
    const result = normalizeDiscoveryInput(input('billboard'));
    expect(result.ok).toBe(false);
    expect(result.skip).toBe(false);
  });

  it('trims and caps free-text details at 500 chars', () => {
    const ok = normalizeDiscoveryInput(input('other', '  saw a poster at the gym  '));
    expect(ok.ok).toBe(true);
    if (ok.ok && !ok.skip) {
      expect(ok.details).toBe('saw a poster at the gym');
    }

    const tooLong = normalizeDiscoveryInput(input('other', 'x'.repeat(501)));
    expect(tooLong.ok).toBe(false);
  });

  it('normalizes blank details to null', () => {
    const result = normalizeDiscoveryInput(input('friend', '   '));
    expect(result.ok).toBe(true);
    if (result.ok && !result.skip) {
      expect(result.details).toBeNull();
    }
  });
});
