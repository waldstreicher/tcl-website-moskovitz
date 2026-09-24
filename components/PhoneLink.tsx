'use client';

import type { ReactNode } from 'react';
import { trackFbq } from '@/lib/fbq';

// A tap-to-call <a href="tel:..."> that reports a Meta Pixel Contact event on
// click. Wrapping the anchor keeps the tracking in one place and lets server
// components (e.g. Footer) use it without becoming client components.
export default function PhoneLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => trackFbq('Contact')}>
      {children}
    </a>
  );
}
