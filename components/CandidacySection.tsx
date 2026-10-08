'use client';

import { motion } from 'framer-motion';
import { Check, X, CheckCircle2, XCircle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const goodFit = [
  'Have localized, stubborn fat you want reduced',
  'Have good skin tone and elasticity in the treatment area',
  'Are near your goal weight and want to refine your shape',
  'Want results without surgical downtime',
];

const notFit = [
  'Are mainly concerned with loose, sagging, or excess skin',
  'Have significant skin laxity after major weight loss or pregnancy',
  'Are looking for a lift or tightening rather than fat removal',
];

// Candidacy section. TuLi is a fat-reduction procedure, not a skin-tightening
// treatment; this sets that expectation early so visitors whose primary
// concern is skin laxity self-qualify before requesting a consultation.
export default function CandidacySection() {
  return (
    <section id="candidacy" className="py-24 lg:py-32 bg-white">
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
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">Who It&apos;s For</span>
            <div className="h-px w-12 bg-tcl-gold" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold mb-4">
            Is TuLi Right for You?
          </h2>
          <p className="text-tcl-gray text-lg max-w-2xl mx-auto leading-relaxed">
            TuLi is a fat reduction procedure. It is not a skin tightening treatment — and
            understanding that difference is the best way to make sure you&apos;ll love your results.
          </p>
        </motion.div>

        {/* Does / doesn't contrast */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16"
        >
          <motion.div
            variants={fadeUp}
            className="bg-tcl-bg border border-tcl-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-tcl-gold/15">
                <Check className="text-tcl-gold" size={18} strokeWidth={2.5} />
              </span>
              <h3 className="font-serif text-xl text-tcl-dark font-medium">What TuLi does</h3>
            </div>
            <p className="text-tcl-gray text-sm leading-relaxed">
              Permanently removes stubborn pockets of fat — abdomen, hips, thighs, arms, and chin —
              in a single 15-minute visit. It reshapes the areas that don&apos;t respond to diet and
              exercise.
            </p>
          </motion.div>

          <motion.div
            variants={fadeUp}
            className="bg-tcl-bg border border-tcl-border rounded-lg p-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-9 h-9 rounded-full bg-tcl-dark/10">
                <X className="text-tcl-dark" size={18} strokeWidth={2.5} />
              </span>
              <h3 className="font-serif text-xl text-tcl-dark font-medium">What TuLi doesn&apos;t do</h3>
            </div>
            <p className="text-tcl-gray text-sm leading-relaxed">
              TuLi does not tighten, lift, or remove loose skin. Removing fat beneath skin that has
              lost its elasticity will not make that skin firmer — and can make laxity more
              noticeable.
            </p>
          </motion.div>
        </motion.div>

        {/* Candidate checklists */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-10 max-w-5xl mx-auto mb-14"
        >
          <motion.div variants={fadeUp}>
            <h3 className="font-serif text-2xl text-tcl-dark font-medium mb-5">
              You&apos;re likely a good candidate if you…
            </h3>
            <ul className="space-y-3">
              {goodFit.map((item) => (
                <li key={item} className="flex items-start gap-3 text-tcl-gray text-sm leading-relaxed">
                  <CheckCircle2 className="text-tcl-gold shrink-0 mt-0.5" size={18} strokeWidth={1.75} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div variants={fadeUp}>
            <h3 className="font-serif text-2xl text-tcl-dark font-medium mb-5">
              TuLi may not be the right fit if you…
            </h3>
            <ul className="space-y-3">
              {notFit.map((item) => (
                <li key={item} className="flex items-start gap-3 text-tcl-gray text-sm leading-relaxed">
                  <XCircle className="text-tcl-gray/70 shrink-0 mt-0.5" size={18} strokeWidth={1.75} />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        {/* Closing */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center max-w-2xl mx-auto"
        >
          <p className="text-tcl-gray leading-relaxed">
            Not sure which describes you?{' '}
            <a href="/#consult" className="text-tcl-gold-dark underline underline-offset-4 hover:text-tcl-gold transition-colors">
              Tell us about your goals when you request a consultation.
            </a>{' '}
            Dr. Moskovitz will give you an honest assessment — and if a different procedure would
            serve you better, he&apos;ll say so.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
