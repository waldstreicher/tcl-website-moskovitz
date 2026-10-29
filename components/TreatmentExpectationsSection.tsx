'use client';

import { motion } from 'framer-motion';
import { Repeat, Hand, Droplets, Activity, CircleDot } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const timeline = [
  { when: '3 months', what: 'Initial improvement' },
  { when: '6 months', what: 'Continued improvement' },
  { when: 'Up to 1 year', what: 'Final results may continue developing' },
];

const expectations = [
  {
    icon: Repeat,
    title: 'Usually one treatment',
    body: 'Most patients require only one treatment, with the possibility of a second cycle if needed, typically performed six months later.',
  },
  {
    icon: Hand,
    title: 'Temporary numbness',
    body: 'Temporary skin numbness can last approximately 3 to 6 months.',
  },
  {
    icon: Droplets,
    title: 'Mild swelling',
    body: 'Mild bloating or swelling may occur during the first few days and gradually resolves as the body absorbs the treated fat cells.',
  },
  {
    icon: CircleDot,
    title: 'Mild bruising',
    body: 'Mild bruising may occur in the treated area.',
  },
  {
    icon: Activity,
    title: 'No activity restrictions',
    body: 'There are no activity restrictions following treatment. You can exercise as soon as you’re ready.',
  },
];

// What to expect after a TuLi treatment, in the practice's approved wording.
export default function TreatmentExpectationsSection() {
  return (
    <section id="expectations" className="py-24 lg:py-32 bg-white">
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
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">After Your Treatment</span>
            <div className="h-px w-12 bg-tcl-gold" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold mb-4">
            Treatment Expectations
          </h2>
          <p className="text-tcl-gray text-lg max-w-2xl mx-auto leading-relaxed">
            What to expect in the days, months, and year after a TuLi treatment.
          </p>
        </motion.div>

        {/* Results timeline */}
        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="mb-16"
        >
          <motion.p variants={fadeUp} className="text-center text-xs tracking-[0.25em] uppercase text-tcl-gray mb-8">
            Expected timeline for results
          </motion.p>
          <ol className="relative grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-6">
            {/* connector */}
            <div aria-hidden className="hidden sm:block absolute top-[11px] left-[16.7%] right-[16.7%] h-px bg-tcl-gold/40" />
            {timeline.map((t) => (
              <motion.li key={t.when} variants={fadeUp} className="relative text-center">
                <span className="relative z-10 inline-block w-[22px] h-[22px] rounded-full bg-tcl-bg border-2 border-tcl-gold" />
                <p className="font-serif text-2xl text-tcl-dark font-semibold mt-4">{t.when}</p>
                <p className="text-tcl-gray text-sm mt-1">{t.what}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>

        {/* Expectations */}
        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6"
        >
          {expectations.map((e) => (
            <motion.li key={e.title} variants={fadeUp} className="bg-tcl-bg border border-tcl-border rounded-lg p-7">
              <e.icon className="text-tcl-gold mb-4" size={26} strokeWidth={1.5} />
              <h3 className="font-serif text-xl text-tcl-dark font-medium mb-2">{e.title}</h3>
              <p className="text-tcl-gray text-sm leading-relaxed">{e.body}</p>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
