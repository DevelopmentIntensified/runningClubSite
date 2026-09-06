export const DISCOVERY_SOURCES = ['friend', 'social-media', 'flyer', 'event', 'other'] as const;

export type DiscoverySource = (typeof DISCOVERY_SOURCES)[number];

export const DISCOVERY_DETAILS_MAX_LENGTH = 500;

/** Contract for the optional onboarding question inside the setup payload. */
export interface DiscoveryPayload {
  discoverySource?: string | null;
  discoveryDetails?: string | null;
}

export type DiscoveryResult =
  | { ok: true; skip: true; source: null; details: null }
  | { ok: true; skip: false; source: DiscoverySource; details: string | null }
  | { ok: false; skip: false; source: null; details: null; error: string };

const ALLOWED = new Set<string>(DISCOVERY_SOURCES);

/** Parse the untrusted setup payload into a validated discovery result. */
export function normalizeDiscoveryInput(
  payload: DiscoveryPayload | null | undefined
): DiscoveryResult {
  const trimmedSource = (payload?.discoverySource ?? '').trim();

  if (!trimmedSource) {
    return { ok: true, skip: true, source: null, details: null };
  }

  if (!ALLOWED.has(trimmedSource)) {
    return { ok: false, skip: false, source: null, details: null, error: 'Invalid source' };
  }

  const trimmedDetails = (payload?.discoveryDetails ?? '').trim();
  if (!trimmedDetails) {
    // SAFETY: trimmedSource was checked against ALLOWED above.
    return { ok: true, skip: false, source: trimmedSource as DiscoverySource, details: null };
  }

  if (trimmedDetails.length > DISCOVERY_DETAILS_MAX_LENGTH) {
    return {
      ok: false,
      skip: false,
      source: null,
      details: null,
      error: `Details must be at most ${DISCOVERY_DETAILS_MAX_LENGTH} characters`
    };
  }

  // SAFETY: trimmedSource was checked against ALLOWED above.
  return {
    ok: true,
    skip: false,
    source: trimmedSource as DiscoverySource,
    details: trimmedDetails
  };
}
