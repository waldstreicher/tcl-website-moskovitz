'use client';

import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, ArrowRight } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const hours = [
  { day: 'Monday', hours: '10:00 AM – 4:00 PM' },
  { day: 'Tuesday', hours: '10:00 AM – 6:00 PM' },
  { day: 'Wednesday', hours: '10:00 AM – 4:00 PM' },
  { day: 'Thursday', hours: '8:00 AM – 4:00 PM' },
  { day: 'Friday', hours: '8:00 AM – 1:00 PM' },
  { day: 'Saturday – Sunday', hours: 'Closed' },
];

export default function LocationSection() {
  return (
    <section id="location" className="py-24 lg:py-32 bg-tcl-alt">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="h-px w-12 bg-tcl-gold" />
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">Location</span>
            <div className="h-px w-12 bg-tcl-gold" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold mb-3">Visit Us</h2>
          <p className="text-tcl-gray text-lg">67 NY-59, Suite 211 · Spring Valley, NY 10977</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="rounded-lg overflow-hidden shadow-sm"
          >
            <iframe
              src="https://maps.google.com/maps?q=67+NY-59+Suite+211,+Spring+Valley,+NY+10977&output=embed"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              title="Moskovitz Plastic Surgery location map"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </motion.div>

          {/* Contact details */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-6 border border-tcl-border space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="text-tcl-gold shrink-0 mt-0.5" size={18} />
                <div>
                  <p className="text-sm font-medium text-tcl-dark">Address</p>
                  <p className="text-sm text-tcl-gray">67 NY-59, Suite 211<br />Spring Valley, NY 10977</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="text-tcl-gold shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-tcl-dark">Phone</p>
                  <a href="tel:+12012251101" className="text-sm text-tcl-gray hover:text-tcl-gold transition-colors">(201) 225-1101</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="text-tcl-gold shrink-0" size={18} />
                <div>
                  <p className="text-sm font-medium text-tcl-dark">Email</p>
                  <a href="mailto:info@tulliaprocedure.com" className="text-sm text-tcl-gray hover:text-tcl-gold transition-colors">
                    info@tulliaprocedure.com
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-tcl-border">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="text-tcl-gold" size={18} />
                <p className="text-sm font-medium text-tcl-dark">Office Hours</p>
              </div>
              <div className="space-y-2">
                {hours.map(({ day, hours: h }) => (
                  <div key={day} className="flex justify-between text-sm">
                    <span className="text-tcl-dark">{day}</span>
                    <span className={h === 'Closed' ? 'text-tcl-gray/60' : 'text-tcl-gray'}>{h}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a
                href="https://www.google.com/maps/dir/?api=1&destination=67+NY-59+Suite+211,+Spring+Valley,+NY+10977"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-tcl-gold text-white text-sm font-medium rounded-sm hover:bg-tcl-gold-dark transition-colors"
              >
                Get Directions <ArrowRight size={16} />
              </motion.a>
              <motion.a
                href="#consult"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center justify-center gap-2 px-6 py-3 border border-tcl-gold text-tcl-gold text-sm font-medium rounded-sm hover:bg-tcl-gold hover:text-white transition-colors"
              >
                Send Us a Message <ArrowRight size={16} />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
