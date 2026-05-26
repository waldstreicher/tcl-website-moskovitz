import type { Metadata } from 'next';
import RNStudyForm from './RNStudyForm';

export const metadata: Metadata = {
  title: 'Medical Device Summative Study — Nurses',
  // Hidden from search engines; this page is shared by direct link only.
  robots: { index: false, follow: false, nocache: true },
};

export default function RNStudyPage() {
  return <RNStudyForm />;
}
