import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/react';
import { GoogleAnalytics } from '@next/third-parties/google';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://www.tumescentlipolysis.com'),
  alternates: { canonical: '/' },
  title: 'TuLi | Revolutionary Body Contouring by Dr. Moskovitz',
  description:
    'TuLi is a breakthrough minimally invasive body contouring procedure. 15-minute treatment, no anesthesia, immediate return to activity. Developed by Dr. Martin Moskovitz, MD, FACS.',
  keywords: [
    'TuLi',
    'tumescent lipolysis',
    'body contouring',
    'liposuction alternative',
    'Dr. Moskovitz',
    'Spring Valley NY',
  ],
  openGraph: {
    title: 'TuLi — A New Era in Body Contouring',
    description: 'Reshape your body in 15 minutes. No anesthesia. No down time.',
    url: 'https://www.tumescentlipolysis.com',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="font-sans">
        {children}
        <Analytics />
      </body>
      <GoogleAnalytics gaId="G-11SKXRWEF1" />
    </html>
  );
}
