import { Mail, Phone } from 'lucide-react';

const footerLinks = [
  { label: 'The Procedure', href: '#procedure' },
  { label: 'About', href: '#about' },
  { label: 'Results', href: '#results' },
  { label: 'Locations', href: '#location' },
  { label: 'Privacy Policy', href: '#' },
];

export default function Footer() {
  return (
    <footer className="bg-tcl-dark text-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <span className="font-serif text-3xl font-semibold tracking-wider text-white">Tullia</span>
              <p className="text-xs tracking-[0.2em] uppercase text-white/50 mt-0.5">Tumescent Lipolysis</p>
            </div>
            <p className="text-white/60 text-sm leading-relaxed italic font-serif">
              &ldquo;A new era in body contouring.&rdquo;
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/50 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <a href={link.href} className="text-sm text-white/70 hover:text-tcl-gold transition-colors">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-widest uppercase text-white/50 mb-4">Contact</h4>
            <div className="space-y-3">
              <a href="mailto:info@tulliaprocedure.com" className="flex items-center gap-2 text-sm text-white/70 hover:text-tcl-gold transition-colors">
                <Mail size={14} className="text-tcl-gold" />
                info@tulliaprocedure.com
              </a>
              <a href="tel:+12012251101" className="flex items-center gap-2 text-sm text-white/70 hover:text-tcl-gold transition-colors">
                <Phone size={14} className="text-tcl-gold" />
                (201) 225-1101
              </a>
              <p className="text-sm text-white/50">
                67 NY-59, Suite 211<br />
                Spring Valley, NY 10977
              </p>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-8 space-y-4">
          <p className="text-sm text-white/50 text-center">
            &copy; 2025 Tullia. All rights reserved. Procedure developed by Dr. Martin Moskovitz, MD, FACS.
          </p>
          <p className="text-xs text-white/30 text-center max-w-3xl mx-auto leading-relaxed">
            The Tullia procedure is a minimally invasive surgical treatment. Results may vary. This website is for
            informational purposes only and does not constitute medical advice. Please consult a qualified physician
            before undergoing any surgical procedure.
          </p>
        </div>
      </div>
    </footer>
  );
}
