'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, X } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const videos = [
  { name: 'Sarah', area: 'Abdomen & Waist', thumbnail: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=600&q=80', videoUrl: 'https://www.youtube.com/embed/placeholder1', slot: 'video-testimonial-1' },
  { name: 'Jennifer', area: 'Thighs & Hips', thumbnail: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&q=80', videoUrl: 'https://www.youtube.com/embed/placeholder2', slot: 'video-testimonial-2' },
  { name: 'Michelle', area: 'Arms & Back', thumbnail: 'https://images.unsplash.com/photo-1499952127939-9bbf5af6c51c?w=600&q=80', videoUrl: 'https://www.youtube.com/embed/placeholder3', slot: 'video-testimonial-3' },
];

export default function VideoGallery() {
  const [activeVideo, setActiveVideo] = useState<(typeof videos)[0] | null>(null);

  return (
    <section className="py-24 lg:py-32 bg-tcl-bg">
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
            <span className="text-tcl-gold text-xs tracking-[0.25em] uppercase font-sans">Testimonials</span>
            <div className="h-px w-12 bg-tcl-gold" />
          </div>
          <h2 className="font-serif text-4xl lg:text-5xl text-tcl-dark font-semibold mb-4">
            Hear From Our Patients
          </h2>
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {videos.map((video) => (
            <motion.div
              key={video.slot}
              variants={fadeUp}
              whileHover={{ y: -4 }}
              className="rounded-lg overflow-hidden shadow-sm cursor-pointer group"
              onClick={() => setActiveVideo(video)}
              data-slot={video.slot}
            >
              <div className="relative h-56 bg-tcl-dark">
                <img
                  src={video.thumbnail}
                  alt={`${video.name} — patient testimonial for TCL`}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-tcl-gold/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Play className="text-white ml-1" size={24} fill="white" />
                  </div>
                </div>
              </div>
              <div className="bg-white p-4 border border-tcl-border border-t-0">
                <p className="font-serif text-lg text-tcl-dark">{video.name}</p>
                <p className="text-xs text-tcl-gray mt-1">{video.area}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Video Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
            onClick={() => setActiveVideo(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-3xl aspect-video bg-black rounded-lg overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <iframe
                src={activeVideo.videoUrl}
                className="w-full h-full"
                title={`Patient testimonial — ${activeVideo.name}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              <button
                onClick={() => setActiveVideo(null)}
                className="absolute top-3 right-3 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-white hover:bg-white/40 transition-colors"
                aria-label="Close video"
              >
                <X size={16} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
