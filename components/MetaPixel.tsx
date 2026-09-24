'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';

const PIXEL_ID = '2149670755983410';

// Meta Pixel for the site, loaded once from the root layout.
//
// No <noscript> fallback img: the standard snippet pairs the JS pixel with a
// <noscript> beacon meant only for JS-disabled visitors, but rendering it
// through the framework (SSR markup + hydration) makes it fire a duplicate
// PageView for JS-ENABLED users too, double-counting every visit. Since the
// pixel itself (fbevents.js) requires JS, the noscript path captures nothing
// actionable, so it's dropped. The JS pixel is the single source of truth.
//
// The base snippet's IIFE guards fbevents loading with `if(f.fbq)return`, but
// its `init` and first `track` calls sit outside that guard. next/script can
// execute inline content more than once, so those calls are wrapped in a
// one-time `window.__tuliPixelInit` guard.
//
// The homepage navigates with plain <a> (full reloads, each re-runs the base
// PageView), but the blog uses next/link — those client navigations don't
// reload, so a pathname effect fires PageView on route change.
//
// Dedupe is by path VALUE, not by run count: usePathname can report null then
// the real path during hydration (two effect runs for one load), and a
// skip-first-run guard would let the second run fire a duplicate. Instead we
// record the path the base snippet already tracked and only fire when the path
// actually changes to a new value.
export default function MetaPixel() {
  const pathname = usePathname();
  const lastTracked = useRef<string | null>(null);

  useEffect(() => {
    if (!pathname) return;
    // Seed with the initial path without firing — the base snippet already
    // sent its PageView.
    if (lastTracked.current === null) {
      lastTracked.current = pathname;
      return;
    }
    if (lastTracked.current === pathname) return;
    lastTracked.current = pathname;
    if (typeof window.fbq === 'function') {
      window.fbq('track', 'PageView');
    }
  }, [pathname]);

  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
if(!window.__tuliPixelInit){window.__tuliPixelInit=!0;
fbq('init', '${PIXEL_ID}');
fbq('track', 'PageView');}`}
    </Script>
  );
}
