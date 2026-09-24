// Safe wrapper around the Meta Pixel's global fbq (installed in
// components/MetaPixel.tsx). No-ops when the pixel hasn't loaded — blocked by
// an ad blocker, still initializing, or running server-side — so callers never
// need to guard for it themselves.
export function trackFbq(event: string): void {
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    window.fbq('track', event);
  }
}
