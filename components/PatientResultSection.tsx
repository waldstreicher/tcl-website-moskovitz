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

// A single documented patient example: one TuLi session treating the right
// lower quadrant, measured at 5 months. Photos are unretouched crops supplied
// by the practice; the dashed outline marks the treated area.
//
// Layout: the two stat cards (left) stretch to exactly the height of the photo
// column (right) so the columns end together; the footnote and the
// customization note sit in a full-width row beneath.
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
            Real Results, Measured at Five Months
          </h2>
          <p className="text-tcl-gray text-lg max-w-2xl mx-auto leading-relaxed">
            The same patient before and five months after a single TuLi session in which only the
            right lower quadrant of the abdomen was treated.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-14 lg:items-stretch">
          {/* Stats — stretch to match the photo column */}
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="lg:col-span-2 flex flex-col gap-6"
          >
            <motion.div
              variants={fadeUp}
              className="flex-1 flex flex-col justify-center bg-white border border-tcl-gold/40 rounded-lg p-8"
            >
              <p className="font-serif text-6xl lg:text-7xl text-tcl-gold-dark font-semibold leading-none">~225 mL</p>
              <p className="text-tcl-dark mt-4 leading-relaxed">
                of fat reduced in the right lower quadrant at five months, from a single TuLi session.
              </p>
            </motion.div>

            <motion.div
              variants={fadeUp}
              className="flex-1 flex flex-col justify-center bg-tcl-dark rounded-lg p-8 text-white"
            >
              <p className="font-serif text-6xl lg:text-7xl text-tcl-gold font-semibold leading-none">
                &gt;5<span className="text-5xl lg:text-6xl">×</span>
              </p>
              <p className="mt-4 text-lg leading-snug">
                the fat reduction of a CoolSculpting treatment cycle
                <sup className="ml-0.5 text-tcl-gold">1</sup>
              </p>
              <p className="mt-3 text-sm text-white/70 leading-relaxed">
                ~225 mL from a single TuLi procedure, versus about 40 mL per CoolSculpting cycle.
              </p>
            </motion.div>
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

        {/* Full-width row: customization note + citation */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          className="mt-12 pt-8 border-t border-tcl-border grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-14 items-start"
        >
          <p className="lg:col-span-3 text-tcl-dark text-lg leading-relaxed border-l-2 border-tcl-gold pl-5">
            Every TuLi treatment is customized to the patient, based on the patient&apos;s target and
            the physician&apos;s treatment plan.
          </p>
          <p className="lg:col-span-2 text-xs text-tcl-gray leading-relaxed">
            <sup className="text-tcl-gold-dark">1</sup> Garibyan L, et al. Three-dimensional volumetric quantification of fat
            loss following cryolipolysis. <em>Lasers Surg Med.</em> 2014;46(2):75–80 — mean net loss of 39.6 mL at 2
            months after one cycle.{' '}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC4123113/"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2 hover:text-tcl-gold-dark"
            >
              View study
            </a>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
