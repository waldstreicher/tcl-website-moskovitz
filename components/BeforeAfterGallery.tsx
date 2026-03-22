'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

// Combined images: single side-by-side file, left = Before, right = After
// Separate images: beforeSrc + afterSrc as individual files
const beforeAfterImages = [
  { src: '/abdomen-before-after.jpg', area: 'Abdomen' },
  { src: '/hips-before-after.jpg',    area: 'Waist & Hips' },
  { src: '/arms-before-after.jpg',    area: 'Arms' },
  { src: '/back-before-after.jpg',    area: 'Back' },
  { src: '/thighs-before-after.jpg',  area: 'Thighs' },
  { beforeSrc: '/chin-before.jpg', afterSrc: '/chin-after.jpg', area: 'Chin' },
];

function BeforeAfterCard({ item, index }: { item: typeof beforeAfterImages[0]; index: number }) {
  const [revealed, setRevealed] = useState(95);

  const isSeparate = 'beforeSrc' in item;
  const yPos   = ('yPos'   in item ? item.yPos   : undefined) ?? '50%';
  const bgSize = ('bgSize' in item ? item.bgSize : undefined) ?? '200% auto';

  const handleMove = (clientX: number, rect: DOMRect) => {
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setRevealed(Math.max(5, Math.min(95, pct)));
  };

  return (
    <motion.div
      variants={fadeUp}
      className="rounded-lg overflow-hidden shadow-sm border border-tcl-border"
    >
      <div
        className="relative h-64 cursor-col-resize select-none overflow-hidden"
        onMouseMove={(e) => handleMove(e.clientX, e.currentTarget.getBoundingClientRect())}
        onTouchMove={(e) => handleMove(e.touches[0].clientX, e.currentTarget.getBoundingClientRect())}
        data-slot={`before-after-${index + 1}`}
      >
        {/* ── After image (always full width underneath) ── */}
        <div
          className="absolute inset-0"
          style={isSeparate ? {
            backgroundImage: `url(${'afterSrc' in item ? item.afterSrc : ''})`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
          } : {
            backgroundImage: `url(${'src' in item ? item.src : ''})`,
            backgroundSize: bgSize,
            backgroundPosition: `100% ${yPos}`,
            backgroundRepeat: 'no-repeat',
          }}
        />
        <div className="absolute top-2 right-2 bg-tcl-gold text-white text-xs px-2 py-1 rounded z-10 pointer-events-none">
          After
        </div>

        {/* ── Before image (clipped by clip-path, reveals as slider moves right) ── */}
        <div
          className="absolute inset-0"
          style={isSeparate ? {
            backgroundImage: `url(${'beforeSrc' in item ? item.beforeSrc : ''})`,
            backgroundSize: 'cover',
            backgroundPosition: '50% 50%',
            backgroundRepeat: 'no-repeat',
            clipPath: `inset(0 ${100 - revealed}% 0 0)`,
          } : {
            backgroundImage: `url(${'src' in item ? item.src : ''})`,
            backgroundSize: bgSize,
            backgroundPosition: `0% ${yPos}`,
            backgroundRepeat: 'no-repeat',
            clipPath: `inset(0 ${100 - revealed}% 0 0)`,
          }}
        />
        {revealed > 10 && (
          <div className="absolute top-2 left-2 bg-tcl-dark/70 text-white text-xs px-2 py-1 rounded z-10 pointer-events-none">
            Before
          </div>
        )}

        {/* Drag divider handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg z-20 pointer-events-none"
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
        <p className="text-xs text-tcl-gray">Drag to reveal After</p>
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
