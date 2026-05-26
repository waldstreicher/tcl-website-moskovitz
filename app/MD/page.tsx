import type { Metadata } from 'next';
import MDStudyForm from './MDStudyForm';

export const metadata: Metadata = {
  title: 'Medical Device Summative Study — Physicians',
  // Hidden from search engines; this page is shared by direct link only.
  robots: { index: false, follow: false, nocache: true },
};

export default function MDStudyPage() {
  return <MDStudyForm />;
}
