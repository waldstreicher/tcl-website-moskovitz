import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Tecela | Revolutionary Body Contouring by Dr. Moskovitz',
  description:
    'Tecela is a breakthrough minimally invasive body contouring procedure. 15-minute treatment, no anesthesia, immediate return to activity. Invented by Dr. Martin Moskovitz, MD, FACS.',
  keywords: [
    'Tecela',
    'tumescent lipolysis',
    'body contouring',
    'liposuction alternative',
    'Dr. Moskovitz',
    'Spring Valley NY',
  ],
  openGraph: {
    title: 'Tecela — A New Era in Body Contouring',
    description: 'Reshape your body in 15 minutes. No anesthesia. No downtime.',
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
      <body className="font-sans">{children}</body>
    </html>
  );
}
