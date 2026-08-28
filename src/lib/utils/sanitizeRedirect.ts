/**
 * Ensure a post-login redirect target is safe to send the browser to.
 *
 * Only allows same-origin relative paths (must start with a single "/" and not
 * with "//" or a backslash). Anything else (absolute URLs, protocol-relative
 * URLs, javascript:, etc.) falls back to `fallback`. This prevents open-redirect
 * attacks where an attacker supplies `?redirectUrl=https://evil.com`.
 */
export function sanitizeRedirectUrl(
  redirectUrl: string | null | undefined,
  fallback = '/groupme'
): string {
  if (
    redirectUrl &&
    redirectUrl.startsWith('/') &&
    !redirectUrl.startsWith('//') &&
    !redirectUrl.startsWith('/\\')
  ) {
    return redirectUrl;
  }
  return fallback;
}
