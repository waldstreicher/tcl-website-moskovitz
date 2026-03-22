'use client';

import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

export default function VirtualConsultBanner() {
  return (
    <section className="py-20 bg-gradient-to-r from-tcl-gold to-tcl-gold-dark">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row items-center justify-between gap-8"
        >
          <div>
            <p className="text-white/80 text-sm tracking-widest uppercase mb-2 font-sans">Telehealth</p>
            <h2 className="font-serif text-3xl lg:text-4xl text-white font-semibold mb-3">
              Start Your Journey From Home
            </h2>
            <p className="text-white/90 text-base max-w-xl">
              Connect with Dr. Moskovitz virtually through our secure telehealth platform — powered by SteadyMD.
            </p>
          </div>
          <motion.a
            href="https://www.steadymd.com"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="flex items-center gap-2 px-8 py-4 bg-white text-tcl-gold font-medium text-sm tracking-wide rounded-sm hover:bg-tcl-bg transition-colors whitespace-nowrap"
          >
            Book a Virtual Consultation
            <ArrowRight size={16} />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
