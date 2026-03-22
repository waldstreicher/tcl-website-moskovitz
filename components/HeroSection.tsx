'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const words = ['A', 'New', 'Era', 'in', 'Body', 'Contouring.'];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-tcl-dark">
      {/* Background image — full bleed */}
      <div className="absolute inset-0">
        <Image
          src="/hero-woman.jpg"
          alt="Confident women in activewear — TCL body contouring patients"
          fill
          priority
          className="object-cover object-center"
          data-slot="hero-background"
        />
        {/* Dark overlay: heavier on left for text legibility, lighter on right */}
        <div className="absolute inset-0 bg-gradient-to-r from-tcl-dark/90 via-tcl-dark/60 to-tcl-dark/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12 py-32 lg:py-0 w-full">
        <div className="max-w-xl lg:max-w-2xl">
          {/* Tag */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-flex items-center gap-2 mb-6"
          >
            <div className="h-px w-8 bg-tcl-gold" />
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">
              Introducing a Breakthrough Procedure
            </span>
          </motion.div>

          {/* Headline with staggered word animation */}
          <h1 className="font-serif text-5xl lg:text-7xl text-white font-semibold leading-tight mb-6">
            {words.map((word, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: 'easeOut' }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </h1>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="text-white/80 text-lg lg:text-xl font-sans font-light leading-relaxed mb-10 max-w-lg"
          >
            The Tumescent Cryolipolysis procedure delivers dramatic, lasting results — in just{' '}
            <span className="text-tcl-gold font-medium">15 minutes</span>, with no anesthesia and no downtime.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.a
              href="#procedure"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 bg-tcl-gold text-white text-sm font-medium tracking-widest uppercase rounded-sm hover:bg-tcl-gold-dark transition-colors text-center"
            >
              Discover TCL
            </motion.a>
            <motion.a
              href="#consult"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-4 border border-white/50 text-white text-sm font-medium tracking-widest uppercase rounded-sm hover:border-tcl-gold hover:text-tcl-gold transition-colors text-center"
            >
              Request Consultation
            </motion.a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-white/50 text-xs tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="w-px h-8 bg-gradient-to-b from-tcl-gold to-transparent"
        />
      </motion.div>
    </section>
  );
}
