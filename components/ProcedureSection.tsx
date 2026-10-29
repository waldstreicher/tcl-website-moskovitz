'use client';

import { motion } from 'framer-motion';
import { Clock, ShieldCheck, Activity, Sparkles, HeartPulse, Zap } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const cards = [
  {
    icon: Clock,
    title: '15-Minute Treatment',
    body: 'The complete procedure — including abdomen, hips, thighs, arms, and chin — takes just 15 minutes in the office.',
  },
  {
    icon: ShieldCheck,
    title: 'No Anesthesia Required',
    body: 'TuLi can be performed without anesthesia. Self-administered nitrous oxide is available should you choose to have it.',
  },
  {
    icon: Activity,
    title: 'Return to Activity Immediately',
    body: 'Walk out of the office and back into your life. No down time, no special post-operative care required.',
  },
  {
    icon: Sparkles,
    title: 'Multiple Areas in One Visit',
    body: 'Treat one body area at a time or multiple areas in the same session, depending on the degree of treatment and the approach developed by the surgeon.',
  },
  {
    icon: HeartPulse,
    title: 'No Special Post-Op Care',
    body: 'Forget compression garments and drainage tubes. TuLi requires none of the typical post-operative care of traditional liposuction.',
  },
  {
    icon: Zap,
    title: 'Lasting Results',
    body: 'TuLi permanently treats fat cells, delivering sculpted, natural-looking contours that last.',
  },
];

// The technology, in the order it happens during a treatment.
const steps = [
  {
    title: 'Numb and enter',
    body: 'The surgeon numbs the skin with lidocaine and makes a small punch-biopsy entry point near the targeted area. Most procedures use a few entry sites, depending on the anatomy.',
  },
  {
    title: 'Thread the cannula',
    body: 'A cannula is threaded under the skin into the fat, similar to liposuction.',
  },
  {
    title: 'Infiltrate the cold solution',
    body: 'The surgeon infiltrates a cold solution into the deep and superficial fat layers, freezing the fat cells from the inside.',
  },
  {
    title: 'About 5 minutes per area',
    body: 'Infiltration takes about 5 minutes per body area, with a few more minutes for setup and closing the entry sites.',
  },
];

export default function ProcedureSection() {
  return (
    <section id="procedure" className="py-24 lg:py-32 bg-tcl-bg">
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
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">The Procedure</span>
            <div className="h-px w-12 bg-tcl-gold" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold mb-4">
            The TuLi Procedure
          </h2>
          <p className="text-tcl-gray text-lg max-w-2xl mx-auto leading-relaxed">
            A minimally invasive body sculpting procedure that delivers results no other treatment can match.
          </p>
        </motion.div>

        {/* How it works — the technology, step by step */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-20"
        >
          <motion.h3 variants={fadeUp} className="font-serif text-3xl text-tcl-dark font-semibold text-center mb-10">
            How TuLi Works
          </motion.h3>
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <motion.li key={step.title} variants={fadeUp} className="bg-white border border-tcl-border rounded-lg p-7 flex flex-col">
                <span className="font-serif text-4xl text-tcl-gold leading-none mb-4">{i + 1}</span>
                <h4 className="font-serif text-xl text-tcl-dark font-medium mb-2">{step.title}</h4>
                <p className="text-tcl-gray text-sm leading-relaxed">{step.body}</p>
              </motion.li>
            ))}
          </ol>
          <motion.p
            variants={fadeUp}
            className="mt-8 mx-auto max-w-2xl text-center font-serif text-2xl text-tcl-dark"
          >
            <span className="text-tcl-gold-dark font-semibold">No fat is removed.</span> TuLi treats fat cells in place.
          </motion.p>
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={fadeUp}
              whileHover={{ y: -4, boxShadow: '0 12px 40px rgba(196,149,106,0.15)' }}
              className="bg-white border border-tcl-border rounded-lg p-8 transition-all duration-300 hover:border-tcl-gold/40"
            >
              <card.icon className="text-tcl-gold mb-4" size={28} strokeWidth={1.5} />
              <h3 className="font-serif text-xl text-tcl-dark font-medium mb-3">{card.title}</h3>
              <p className="text-tcl-gray text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
