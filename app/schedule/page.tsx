import type { Metadata } from 'next';
import { Suspense } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SchedulePicker from '@/components/SchedulePicker';

// Transactional page reached right after the consultation form — not for search.
export const metadata: Metadata = {
  title: 'Schedule Your Call — TuLi',
  robots: { index: false, follow: false },
};

export default function SchedulePage() {
  return (
    <main className="min-h-screen bg-tcl-bg">
      <Navbar />

      {/* Dark band so the transparent navbar's white text stays legible. */}
      <section className="pt-32 pb-14 lg:pt-40 lg:pb-20 bg-tcl-dark">
        <div className="max-w-7xl mx-auto px-6 lg:px-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-tcl-gold" />
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">One Last Step</span>
            <div className="h-px w-12 bg-tcl-gold" />
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl text-white font-semibold mb-3">Schedule Your Follow-Up Call</h1>
          <p className="text-white/70 text-lg max-w-2xl mx-auto">
            We received your request. Pick a time that works and we&apos;ll call you then.
          </p>
        </div>
      </section>

      <section className="py-14 lg:py-20">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          <Suspense fallback={<div className="bg-white border border-tcl-border rounded-lg p-10 text-center text-tcl-gray">Loading…</div>}>
            <SchedulePicker />
          </Suspense>
        </div>
      </section>

      <Footer />
    </main>
  );
}
