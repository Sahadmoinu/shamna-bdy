import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Gift } from 'lucide-react';
import { sound } from '../utils/audio';

export default function LandingHero({ onReveal }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleClick = () => {
    setIsOpening(true);
    sound.playMagicChime();
    // Short delay for the gift box opening animation before scene change
    setTimeout(() => {
      onReveal();
    }, 700);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 py-12 z-10">
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 1.1, filter: "blur(12px)" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-xl mx-auto"
      >
        {/* Glowing glass container */}
        <div className="glass-card-glow rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden backdrop-blur-2xl">
          {/* Subtle background glow circle */}
          <div className="absolute -top-24 -left-24 w-60 h-60 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-60 h-60 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

          {/* Top Romantic Tag */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-xs sm:text-sm font-medium mb-6 shadow-inner"
          >
            <Sparkles className="w-3.5 h-3.5 text-pink-400 animate-spin" style={{ animationDuration: '6s' }} />
            <span>A Secret Surprise Awaits</span>
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400/80 animate-pulse" />
          </motion.div>

          {/* Mystery Salutation */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-4xl sm:text-5xl md:text-6xl font-bold font-serif-luxury tracking-tight mb-4 text-white drop-shadow-md"
          >
            Hey <span className="font-romantic text-5xl sm:text-6xl md:text-7xl text-pink-400 inline-block drop-shadow-[0_0_20px_rgba(244,114,182,0.6)]">Shamna...</span>
          </motion.h1>

          {/* Mystery Sub-message */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-lg sm:text-xl text-pink-100/90 font-light leading-relaxed mb-8 max-w-md mx-auto"
          >
            Someone made something special for you <span className="inline-block animate-bounce">✨</span>
          </motion.p>

          {/* Animated 3D Gift Box Visual */}
          <motion.div
            className="relative my-8 inline-block cursor-pointer"
            onClick={handleClick}
            whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
            whileTap={{ scale: 0.95 }}
            animate={isOpening ? { scale: [1, 1.25, 0], opacity: [1, 1, 0] } : { y: [0, -8, 0] }}
            transition={isOpening ? { duration: 0.6 } : { duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-tr from-pink-600 via-rose-500 to-amber-300 p-[2px] shadow-[0_0_40px_rgba(244,63,94,0.5)]">
              <div className="w-full h-full bg-[#160b24] rounded-2xl flex items-center justify-center relative overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-t from-pink-500/20 to-transparent opacity-80" />
                <Gift className="w-12 h-12 text-pink-300 drop-shadow-[0_0_12px_rgba(244,114,182,0.8)] transition-transform duration-300 group-hover:scale-110" />
                <Sparkles className="w-4 h-4 text-amber-300 absolute top-3 right-3 animate-ping" />
              </div>
            </div>
          </motion.div>

          {/* Grand Call-To-Action Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1 }}
            className="mt-4"
          >
            <motion.button
              onClick={handleClick}
              disabled={isOpening}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.96 }}
              className="relative group inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-semibold text-white text-base sm:text-lg overflow-hidden shadow-[0_0_35px_rgba(236,72,153,0.6)] cursor-pointer"
            >
              {/* Animated Glowing Gradient background */}
              <span className="absolute inset-0 bg-gradient-to-r from-pink-500 via-rose-500 to-purple-600 transition-all duration-300 group-hover:opacity-95" />
              <span className="absolute inset-0 bg-gradient-to-r from-amber-400 via-pink-500 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm" />
              
              {/* Shimmer sweep */}
              <span className="absolute top-0 left-0 w-full h-full bg-white/20 -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out" />

              <span className="relative flex items-center gap-2.5 font-medium tracking-wide">
                <span>Tap to Open Your Surprise</span>
                <span className="text-xl">🎁</span>
              </span>
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
