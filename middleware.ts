import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Canonical paths for the hidden recruitment pages. iOS Safari,
// Messages, Mail, and several keyboards/autocorrect flows re-case URLs
// as they're typed/pasted/autolinked, which previously caused 404s.
// This middleware sends any case variant to the canonical path with a
// 308 permanent redirect.
//
// Note: we can't use next.config.js `redirects()` for this — its
// `source` matching is case-INSENSITIVE (path-to-regexp default), so
// `/md` matches `/MD` too and creates a self-redirect loop.
const CASE_SENSITIVE_ROUTES = ['/MD', '/RN', '/tech'];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  for (const canonical of CASE_SENSITIVE_ROUTES) {
    if (
      pathname.toLowerCase() === canonical.toLowerCase() &&
      pathname !== canonical
    ) {
      const url = request.nextUrl.clone();
      url.pathname = canonical;
      return NextResponse.redirect(url, 308);
    }
  }

  return NextResponse.next();
}

export const config = {
  // Next.js middleware matchers behave inconsistently on case (they
  // catch the canonical and the fully-lowercase form but not mixed
  // case like /Md), so list every casing explicitly for short paths.
  // /tech is 4 chars (16 case variants); we only enumerate the
  // realistic iOS auto-cap forms.
  matcher: [
    '/md', '/Md', '/mD', '/MD',
    '/rn', '/Rn', '/rN', '/RN',
    '/tech', '/Tech', '/TECH',
  ],
};
