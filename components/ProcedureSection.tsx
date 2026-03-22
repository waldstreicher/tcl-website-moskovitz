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
    body: 'The complete procedure — including abdomen, back, thighs, arms, and chin — takes just 15 minutes in the office.',
  },
  {
    icon: ShieldCheck,
    title: 'No Anesthesia Required',
    body: 'TCL uses a tumescent solution that numbs the treatment area, eliminating the need for general anesthesia entirely.',
  },
  {
    icon: Activity,
    title: 'Return to Activity Immediately',
    body: 'Walk out of the office and back into your life. No recovery period, no special post-operative care required.',
  },
  {
    icon: Sparkles,
    title: 'Multiple Areas in One Visit',
    body: 'Treat the abdomen, back, thighs, arms, and chin in a single 15-minute session.',
  },
  {
    icon: HeartPulse,
    title: 'No Special Post-Op Care',
    body: 'Forget compression garments and drainage tubes. TCL requires none of the typical post-operative care of traditional liposuction.',
  },
  {
    icon: Zap,
    title: 'Lasting Results',
    body: 'TCL permanently removes fat cells, delivering sculpted, natural-looking contours that last.',
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
            The TCL Procedure
          </h2>
          <p className="text-tcl-gray text-lg max-w-2xl mx-auto leading-relaxed">
            A minimally invasive body sculpting procedure that delivers results no other treatment can match.
          </p>
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
