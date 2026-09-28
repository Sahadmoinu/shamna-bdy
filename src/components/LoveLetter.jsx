import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Mail, Sparkles, Feather } from 'lucide-react';
import { sound } from '../utils/audio';

export default function LoveLetter() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleLetter = () => {
    sound.playPop();
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative py-14 px-4 max-w-2xl mx-auto text-center z-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <span className="text-xs uppercase tracking-widest text-rose-400 font-semibold px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20">
          From The Heart
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury mt-3 text-white">
          A Love Letter For You 💌
        </h2>
        <p className="text-pink-200/80 text-sm sm:text-base mt-2">
          {isOpen ? "Read every word with your heart" : "Tap the wax seal to unfold this secret message"}
        </p>
      </motion.div>

      {/* Envelope Container */}
      <div className="relative mx-auto flex flex-col items-center">
        {/* Closed Envelope view */}
        {!isOpen && (
          <motion.div
            initial={{ scale: 0.95 }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleLetter}
            className="w-full max-w-md h-56 rounded-3xl bg-gradient-to-br from-rose-900/60 via-pink-950/80 to-purple-950/70 border-2 border-pink-400/40 p-6 flex flex-col items-center justify-center cursor-pointer shadow-[0_10px_35px_rgba(244,63,94,0.25)] relative overflow-hidden group"
          >
            {/* Envelope flap lines */}
            <div className="absolute top-0 inset-x-0 h-28 border-b-2 border-pink-400/30 bg-pink-500/10 [clip-path:polygon(0_0,100%_0,50%_100%)] pointer-events-none group-hover:bg-pink-500/15 transition-colors" />

            {/* Wax Seal Stamp */}
            <motion.div
              whileHover={{ rotate: 10, scale: 1.1 }}
              className="z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-amber-600 via-rose-600 to-red-500 border-2 border-amber-300 shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center justify-center cursor-pointer"
            >
              <Heart className="w-8 h-8 text-amber-100 fill-amber-100 drop-shadow" />
            </motion.div>

            <span className="z-10 mt-4 text-xs font-semibold uppercase tracking-wider text-pink-200 flex items-center gap-1.5 group-hover:text-white transition-colors">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Tap to Break Seal</span>
            </span>

            <div className="absolute bottom-3 text-pink-300/60 font-romantic text-lg">
              For Shamna With Love
            </div>
          </motion.div>
        )}

        {/* Unfolded Letter Sheet */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 20 }}
              transition={{ type: "spring", damping: 22, stiffness: 220 }}
              className="w-full max-w-lg rounded-3xl bg-[#fffaf5] text-slate-800 p-8 sm:p-10 shadow-[0_0_50px_rgba(244,114,182,0.4)] relative border-4 border-pink-200/80 text-left select-text"
            >
              {/* Decorative Stamp in corner */}
              <div className="absolute top-6 right-6 flex items-center gap-1 text-pink-400/60">
                <Feather className="w-5 h-5 text-rose-500" />
              </div>

              {/* Salutation */}
              <div className="font-romantic text-3xl sm:text-4xl text-rose-600 font-bold mb-4">
                My Dearest Shamna,
              </div>

              {/* Letter Body */}
              <div className="space-y-4 text-slate-700 text-sm sm:text-base leading-relaxed font-normal">
                <p>
                  Today is the most beautiful day of the year, because it is the day that brought 
                  <strong className="text-rose-600 font-semibold"> you </strong> into this world.
                </p>
                <p>
                  Your smile has this effortless way of lighting up even the gloomiest moments, and your kindness makes everything around you warmer and gentler. Being able to celebrate you today fills my heart with nothing but pure gratitude.
                </p>
                <p>
                  I wish for you a year overflowing with endless laughter, gentle peace, every dream you hold secretly coming true, and all the immense happiness that you so genuinely deserve.
                </p>
                <p>
                  Never forget how deeply special, adored, and cherished you are — today and for all the days to come.
                </p>
              </div>

              {/* Signature */}
              <div className="mt-6 pt-4 border-t border-rose-200 flex flex-col items-end">
                <span className="text-xs uppercase tracking-wider text-rose-400 font-medium">Forever & always,</span>
                <span className="font-romantic text-3xl text-rose-600 font-bold mt-1">With all my love ❤️</span>
              </div>

              {/* Close / Fold Back button */}
              <div className="mt-6 text-center">
                <button
                  onClick={toggleLetter}
                  className="cursor-pointer inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-rose-100 hover:bg-rose-200 text-rose-700 text-xs font-medium transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Fold letter back</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
