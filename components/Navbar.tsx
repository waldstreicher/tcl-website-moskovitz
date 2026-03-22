'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'The Procedure', href: '#procedure' },
  { label: 'About', href: '#about' },
  { label: 'Results', href: '#results' },
  { label: 'Locations', href: '#location' },
  { label: 'Contact', href: '#consult' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Gold accent bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-tcl-gold" />

      <motion.nav
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-[3px] left-0 right-0 z-40 transition-all duration-300 ${
          scrolled ? 'bg-white shadow-md' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between h-20">
          {/* Logo */}
          <a href="#" className="flex flex-col leading-none">
            <span className={`font-serif text-3xl font-semibold tracking-wider ${scrolled ? 'text-tcl-dark' : 'text-white'}`}>
              TCL
            </span>
            <span className={`text-[10px] tracking-[0.2em] uppercase font-sans ${scrolled ? 'text-tcl-gray' : 'text-white/80'}`}>
              Tumescent Cryolipolysis
            </span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide font-sans transition-colors hover:text-tcl-gold ${
                  scrolled ? 'text-tcl-dark' : 'text-white/90'
                }`}
              >
                {link.label}
              </a>
            ))}
            <motion.a
              href="#consult"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="ml-4 px-6 py-2.5 bg-tcl-gold text-white text-sm font-medium tracking-wide rounded-sm hover:bg-tcl-gold-dark transition-colors"
            >
              Request Consultation
            </motion.a>
          </div>

          {/* Mobile hamburger */}
          <button
            className={`md:hidden p-2 ${scrolled ? 'text-tcl-dark' : 'text-white'}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-30 bg-white flex flex-col items-center justify-center gap-8 md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="font-serif text-3xl text-tcl-dark hover:text-tcl-gold transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#consult"
              onClick={() => setMenuOpen(false)}
              className="mt-4 px-8 py-3 bg-tcl-gold text-white text-sm font-medium tracking-wide rounded-sm"
            >
              Request Consultation
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
