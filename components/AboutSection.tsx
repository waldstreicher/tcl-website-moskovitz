'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const credentials = [
  'Board Certified — Plastic Surgery',
  'Board Certified — General Surgery',
  'Fellow, American College of Surgeons',
  '35+ Years Experience',
];

export default function AboutSection() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-tcl-bg">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="relative"
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-lg overflow-hidden">
              <Image
                src="/dr-moskovitz.jpg"
                alt="Dr. Martin Moskovitz, MD, FACS — Board Certified Plastic Surgeon"
                fill
                className="object-cover object-top"
                data-slot="about-doctor-photo"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-tcl-dark/30 to-transparent" />
            </div>
            {/* Decorative gold frame accent */}
            <div className="absolute -bottom-4 -right-4 w-32 h-32 border-2 border-tcl-gold rounded-lg -z-10" />
          </motion.div>

          {/* Content */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="h-px w-12 bg-tcl-gold" />
              <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">The Inventor</span>
            </div>
            <h2 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold mb-2">
              Meet the Inventor
            </h2>
            <h3 className="font-serif text-2xl text-tcl-gold font-medium mb-6">
              Dr. Martin Moskovitz, MD, FACS
            </h3>

            <div className="space-y-4 text-tcl-gray leading-relaxed text-sm">
              <p>
                Dr. Martin Moskovitz is a Board Certified Plastic Surgeon and Fellow of the American College of Surgeons,
                with over 35 years of experience. He is board certified in both plastic surgery and general surgery — a
                distinction that means he understands the full physiological impact of surgery on every patient.
              </p>
              <p>
                Dr. Moskovitz completed his medical training at Rutgers Robert Wood Johnson Medical School and went on
                to serve as Assistant Professor of Plastic Surgery at Baylor College of Medicine, where he also directed
                the Aesthetic Surgery Clinic. In that role, he trained dozens of residents who have since established
                their own practices nationwide.
              </p>
              <p>
                He continues to teach at the annual meeting of the American Society of Plastic Surgeons, where he
                supervises the Liposuction Breast Reduction course. He has published numerous peer-reviewed papers and
                book chapters in the field.
              </p>
              <p>
                The Tecela procedure was invented by Dr. Moskovitz as a safer, faster, and more
                effective alternative to both traditional liposuction and non-invasive body contouring. His practice,
                Moskovitz Plastic Surgery PLLC, is a fully accredited surgery center approved by Quad A.
              </p>
            </div>

            {/* Credential badges */}
            <div className="flex flex-wrap gap-3 mt-8">
              {credentials.map((c) => (
                <span
                  key={c}
                  className="text-xs px-4 py-2 border border-tcl-gold text-tcl-gold rounded-full font-sans tracking-wide"
                >
                  {c}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
