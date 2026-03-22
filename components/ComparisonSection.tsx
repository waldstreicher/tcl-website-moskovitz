'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const rows = [
  { feature: 'Procedure Time', tcl: '15 minutes', lipo: '1–3 hours', non: '35–60 min/session' },
  { feature: 'Anesthesia', tcl: 'None required', lipo: 'General or IV sedation', non: 'None' },
  { feature: 'Pain Level', tcl: 'Minimal', lipo: 'Significant', non: 'Moderate' },
  { feature: 'Recovery Time', tcl: 'Immediate', lipo: '1–2 weeks', non: 'None' },
  { feature: 'Sessions Required', tcl: 'One', lipo: 'One', non: '3–6+ sessions' },
  { feature: 'Tissue Targeted', tcl: 'Up to 4× more', lipo: 'Standard', non: 'Minimal' },
  { feature: 'Post-Op Care', tcl: 'None', lipo: 'Extensive', non: 'None' },
];

export default function ComparisonSection() {
  return (
    <section id="compare" className="py-24 lg:py-32 bg-tcl-alt">
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
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">Comparison</span>
            <div className="h-px w-12 bg-tcl-gold" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold mb-4">
            How Does TCL Compare?
          </h2>
          <p className="text-tcl-gray text-lg max-w-2xl mx-auto leading-relaxed">
            See how TCL stacks up against traditional liposuction and non-invasive body contouring alternatives.
          </p>
        </motion.div>

        {/* Table */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="overflow-x-auto rounded-lg shadow-sm"
        >
          <table className="w-full border-collapse bg-white">
            <thead>
              <tr>
                <th className="text-left py-5 px-6 text-sm font-medium text-tcl-gray border-b border-tcl-border">
                  Feature
                </th>
                <th className="py-5 px-6 text-center border-b border-tcl-border bg-tcl-gold">
                  <span className="text-white text-sm font-semibold tracking-wide">TCL ✓</span>
                </th>
                <th className="py-5 px-6 text-center text-sm font-medium text-tcl-gray border-b border-tcl-border">
                  Traditional Liposuction
                </th>
                <th className="py-5 px-6 text-center text-sm font-medium text-tcl-gray border-b border-tcl-border">
                  Non-Invasive Contouring
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? 'bg-white' : 'bg-tcl-bg'}>
                  <td className="py-4 px-6 text-sm text-tcl-dark font-medium border-b border-tcl-border">
                    {row.feature}
                  </td>
                  <td className="py-4 px-6 text-center text-sm font-semibold text-tcl-gold border-b border-tcl-border border-l-2 border-r-2 border-tcl-gold/20">
                    {row.tcl}
                  </td>
                  <td className="py-4 px-6 text-center text-sm text-tcl-gray border-b border-tcl-border">
                    {row.lipo}
                  </td>
                  <td className="py-4 px-6 text-center text-sm text-tcl-gray border-b border-tcl-border">
                    {row.non}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Callout boxes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
          {[
            {
              title: 'TCL vs. Liposuction',
              points: [
                'Faster procedure — 15 minutes vs. 1–3 hours',
                'Significantly less pain and discomfort',
                'Quicker, easier recovery with no anesthesia risks',
              ],
            },
            {
              title: 'TCL vs. CoolSculpting & Similar',
              points: [
                'No need for multiple treatment sessions',
                'Faster than any non-invasive alternative',
                'Targets 3–4× more tissue per session',
              ],
            },
          ].map((box) => (
            <motion.div
              key={box.title}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-100px' }}
              className="bg-white border border-tcl-border rounded-lg p-8"
            >
              <h3 className="font-serif text-xl text-tcl-dark font-medium mb-4">{box.title}</h3>
              <ul className="space-y-3">
                {box.points.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-sm text-tcl-gray">
                    <Check className="text-tcl-gold mt-0.5 shrink-0" size={16} />
                    {p}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
