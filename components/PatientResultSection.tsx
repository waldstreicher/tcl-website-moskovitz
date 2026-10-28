'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

// A single documented patient example: one low-dose, single-session TuLi
// treatment of the right lower quadrant, measured at 5 months. Photos are
// unretouched crops supplied by the practice; the dashed outline marks the
// treated area.
export default function PatientResultSection() {
  return (
    <section id="results" className="py-24 lg:py-32 bg-tcl-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-tcl-gold" />
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">Patient Results</span>
            <div className="h-px w-12 bg-tcl-gold" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold mb-4">
            One Low-Dose Session, Measured at Five Months
          </h2>
          <p className="text-tcl-gray text-lg max-w-2xl mx-auto leading-relaxed">
            The same patient before and five months after a single TuLi session in which only the
            right lower quadrant of the abdomen was treated.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">
          {/* Stat + callouts */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-2 space-y-8"
          >
            <motion.div variants={fadeUp} className="bg-white border border-tcl-gold/40 rounded-lg p-8">
              <p className="font-serif text-6xl lg:text-7xl text-tcl-gold-dark font-semibold leading-none">~225 mL</p>
              <p className="text-tcl-dark mt-4 leading-relaxed">
                of fat reduced in the right lower quadrant at five months, from a single TuLi session.
              </p>
            </motion.div>

            <motion.dl variants={fadeUp} className="divide-y divide-tcl-border border-y border-tcl-border">
              <div className="grid grid-cols-[7rem_1fr] gap-4 py-5">
                <dt className="font-serif text-xl text-tcl-gold-dark font-medium">Low dose</dt>
                <dd className="text-tcl-gray leading-relaxed">Intentionally below a therapeutic volume.</dd>
              </div>
              <div className="grid grid-cols-[7rem_1fr] gap-4 py-5">
                <dt className="font-serif text-xl text-tcl-gold-dark font-medium">1 session</dt>
                <dd className="text-tcl-gray leading-relaxed">No repeat treatment. Results measured at five months.</dd>
              </div>
            </motion.dl>
          </motion.div>

          {/* Before / after */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-3"
          >
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { src: '/results-baseline.jpg', label: 'Baseline', sub: 'Pre-treatment', alt: 'Abdomen before TuLi treatment; the right lower quadrant is outlined' },
                { src: '/results-5-months.jpg', label: '5 Months', sub: 'After one TuLi session', alt: 'The same abdomen five months after a single TuLi session; the treated right lower quadrant is outlined' },
              ].map((p) => (
                <motion.figure key={p.src} variants={fadeUp} className="min-w-0">
                  <figcaption className="mb-3">
                    <span className="text-xs tracking-[0.2em] uppercase font-semibold text-tcl-dark">{p.label}</span>
                    <span className="block sm:inline sm:ml-2 text-xs text-tcl-gray">{p.sub}</span>
                  </figcaption>
                  <div className="relative aspect-[392/412] rounded-lg overflow-hidden border border-tcl-border bg-tcl-alt">
                    <Image src={p.src} alt={p.alt} fill sizes="(min-width: 1024px) 28vw, 45vw" className="object-cover" />
                  </div>
                </motion.figure>
              ))}
            </div>
            <motion.p variants={fadeUp} className="text-sm text-tcl-gray mt-5 leading-relaxed">
              Same patient: baseline and five months after one unilateral TuLi session in which only the
              right lower quadrant was treated. The dashed outline marks the treated area. Photos are
              unretouched. Individual results vary.
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
