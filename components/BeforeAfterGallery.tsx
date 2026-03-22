'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const beforeAfterImages = [
  { before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', after: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80', area: 'Abdomen' },
  { before: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80', after: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80', area: 'Waist & Hips' },
  { before: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80', after: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400&q=80', area: 'Arms' },
  { before: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80', after: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80', area: 'Back' },
  { before: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=400&q=80', after: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400&q=80', area: 'Thighs' },
  { before: 'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=400&q=80', after: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=400&q=80', area: 'Chin' },
];

function BeforeAfterCard({ item, index }: { item: typeof beforeAfterImages[0]; index: number }) {
  const [revealed, setRevealed] = useState(50);

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-lg overflow-hidden shadow-sm border border-tcl-border"
    >
      <div
        className="relative h-64 cursor-col-resize select-none"
        onMouseMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = ((e.clientX - rect.left) / rect.width) * 100;
          setRevealed(Math.max(5, Math.min(95, pct)));
        }}
        onTouchMove={(e) => {
          const rect = e.currentTarget.getBoundingClientRect();
          const pct = ((e.touches[0].clientX - rect.left) / rect.width) * 100;
          setRevealed(Math.max(5, Math.min(95, pct)));
        }}
        data-slot={`before-after-${index + 1}`}
      >
        {/* After image (full) */}
        <div className="absolute inset-0">
          <Image src={item.after} alt={`After TCL treatment — ${item.area}`} fill className="object-cover" />
          <div className="absolute top-2 right-2 bg-tcl-gold text-white text-xs px-2 py-1 rounded">After</div>
        </div>
        {/* Before image (clipped) */}
        <div className="absolute inset-0 overflow-hidden" style={{ width: `${revealed}%` }}>
          <Image src={item.before} alt={`Before TCL treatment — ${item.area}`} fill className="object-cover" />
          <div className="absolute top-2 left-2 bg-tcl-dark/70 text-white text-xs px-2 py-1 rounded">Before</div>
        </div>
        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-10"
          style={{ left: `${revealed}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-6 h-6 bg-white rounded-full shadow flex items-center justify-center">
            <div className="flex gap-0.5">
              <div className="w-0.5 h-3 bg-tcl-gold rounded" />
              <div className="w-0.5 h-3 bg-tcl-gold rounded" />
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white px-4 py-3">
        <p className="text-sm font-medium text-tcl-dark font-sans">{item.area}</p>
        <p className="text-xs text-tcl-gray">Drag to reveal</p>
      </div>
    </motion.div>
  );
}

export default function BeforeAfterGallery() {
  return (
    <section id="results" className="py-24 lg:py-32 bg-tcl-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-tcl-gold" />
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">Results</span>
            <div className="h-px w-12 bg-tcl-gold" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold mb-4">Real Results</h2>
          <p className="text-tcl-gray text-lg max-w-xl mx-auto">
            See the transformation TCL can achieve.
          </p>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {beforeAfterImages.map((item, i) => (
            <BeforeAfterCard key={i} item={item} index={i} />
          ))}
        </motion.div>

        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center text-xs text-tcl-gray mt-8 italic"
        >
          Individual results may vary. Before and after photos shown with patient consent.
        </motion.p>
      </div>
    </section>
  );
}
