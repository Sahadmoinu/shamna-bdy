import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Camera } from 'lucide-react';
import { sound } from '../utils/audio';

const memories = [
  {
    id: 1,
    url: '/photos/shamna_smile.jpg',
    title: 'That Radiant Smile',
    caption: 'The smile that never fails to brighten up my entire world.',
    rotation: -3,
    tag: 'Favorite'
  },
  {
    id: 2,
    url: '/photos/shamna_cute.jpg',
    title: 'Pure Cutest Soul',
    caption: 'Your playful laughter and cutest smile melt away everything else.',
    rotation: 2,
    tag: 'Precious'
  },
  {
    id: 3,
    url: '/photos/shamna_grace.jpg',
    title: 'Grace & Elegance',
    caption: 'Looking effortlessly graceful, beautiful, and royal today and always.',
    rotation: -2,
    tag: 'Queen'
  }
];

export default function MemoriesGallery() {
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  const handleCardClick = (photo) => {
    sound.playPop();
    setSelectedPhoto(photo);
  };

  return (
    <div className="relative py-16 px-4 max-w-5xl mx-auto z-10">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12"
      >
        <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 inline-flex items-center gap-1.5">
          <Camera className="w-3.5 h-3.5" />
          <span>Cherished Frames</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury mt-3 text-white">
          Moments of You 📸
        </h2>
        <p className="text-pink-200/80 text-sm sm:text-base mt-2">
          A glimpse into the beauty, grace, and joy you bring everywhere you go.
        </p>
      </motion.div>

      {/* Polaroid Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
        {memories.map((photo, idx) => (
          <motion.div
            key={photo.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15 }}
            whileHover={{ scale: 1.05, rotate: 0, zIndex: 20 }}
            onClick={() => handleCardClick(photo)}
            style={{ transform: `rotate(${photo.rotation}deg)` }}
            className="cursor-pointer group relative bg-white p-3.5 pb-6 rounded-2xl shadow-xl hover:shadow-[0_15px_35px_rgba(244,114,182,0.4)] transition-all duration-300"
          >
            {/* Washi tape visual on top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-20 h-6 bg-pink-200/80 rounded-sm shadow-sm rotate-1 backdrop-blur-sm pointer-events-none border-dashed border-pink-300 border-t border-b" />

            {/* Photo frame */}
            <div className="relative aspect-4/5 w-full rounded-xl overflow-hidden bg-slate-100">
              <img
                src={photo.url}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                loading="lazy"
              />
              <span className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/50 text-white text-[10px] backdrop-blur-md">
                {photo.tag}
              </span>
            </div>

            {/* Caption beneath photo */}
            <div className="mt-4 px-1 text-center">
              <h3 className="font-romantic text-2xl text-slate-800 font-bold group-hover:text-rose-600 transition-colors">
                {photo.title}
              </h3>
              <p className="text-slate-500 text-xs mt-1 line-clamp-2 leading-relaxed">
                {photo.caption}
              </p>
            </div>

            {/* Subtle heart icon in bottom right */}
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400 absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity" />
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
            className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-3xl p-4 sm:p-6 max-w-lg w-full text-slate-800 shadow-2xl relative cursor-default"
            >
              <button
                onClick={() => setSelectedPhoto(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="w-full max-h-[65vh] rounded-2xl overflow-hidden bg-slate-100 mt-2 flex items-center justify-center">
                <img
                  src={selectedPhoto.url}
                  alt={selectedPhoto.title}
                  className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl"
                />
              </div>

              <div className="mt-4 text-center">
                <h3 className="font-romantic text-3xl text-rose-600 font-bold">
                  {selectedPhoto.title}
                </h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  {selectedPhoto.caption}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
