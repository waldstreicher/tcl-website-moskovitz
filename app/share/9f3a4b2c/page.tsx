import type { Metadata } from 'next';
import { ExternalLink } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Hidden / unlinked page — only accessible by direct link.
// Embedded form URL = Google Forms viewform endpoint with embedded=true.
// Short-link fallback = forms.gle URL, opens in a new tab if the iframe
// is blocked by a browser or Google CSP.
const FORM_ID = '1FAIpQLSdh4qHtJX9NdCdzt5nAGb50UJAVNKe6zBqBFDHtlowAwGlcsA';
const EMBED_URL = `https://docs.google.com/forms/d/e/${FORM_ID}/viewform?embedded=true`;
const SHORT_URL = 'https://forms.gle/iRvMLUpw5tyJ6xex6';

export const metadata: Metadata = {
  title: 'Tullia',
  // No indexing — kept out of search engines.
  robots: { index: false, follow: false, nocache: true },
  // Explicitly DO NOT set a canonical URL — we don't want this in any
  // alternate-URL maps.
};

export default function SharedFormPage() {
  return (
    <main className="min-h-screen bg-tcl-bg">
      <Navbar />

      <section className="pt-32 lg:pt-40 pb-12 lg:pb-16 bg-tcl-alt">
        <div className="max-w-3xl mx-auto px-6 lg:px-12 text-center">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-tcl-gold" />
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">
              Shared with you
            </span>
            <div className="h-px w-12 bg-tcl-gold" />
          </div>
          <h1 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold mb-4">
            We&apos;d love to hear from you.
          </h1>
          <p className="text-tcl-gray text-base lg:text-lg max-w-xl mx-auto leading-relaxed">
            Please take a moment to complete the form below. Your responses help
            us improve the Tullia experience.
          </p>
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-12">
          {/* Embed */}
          <div className="bg-white border border-tcl-border rounded-lg overflow-hidden shadow-sm">
            <iframe
              src={EMBED_URL}
              title="Tullia feedback form"
              width="100%"
              height="1400"
              frameBorder={0}
              marginHeight={0}
              marginWidth={0}
              loading="lazy"
              className="block w-full"
            >
              Loading…
            </iframe>
          </div>

          {/* Fallback link — in case the iframe is blocked */}
          <p className="text-center text-sm text-tcl-gray mt-6">
            Trouble viewing the form?{' '}
            <a
              href={SHORT_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 text-tcl-gold hover:text-tcl-gold-dark underline underline-offset-2"
            >
              Open it in a new tab
              <ExternalLink size={12} />
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
