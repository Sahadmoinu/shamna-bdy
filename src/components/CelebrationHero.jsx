import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart, Crown, Cake as CakeIcon, Gift, Stars } from 'lucide-react';
import { fireGrandCelebration, fireFireworks } from '../utils/confetti';
import { sound } from '../utils/audio';

export default function CelebrationHero({ onScrollToCake }) {
  useEffect(() => {
    // Fire double celebration confetti and start background melody
    fireGrandCelebration();
    fireFireworks();
    sound.startRomanticBGM();
  }, []);

  return (
    <div className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-4 pt-12 pb-8 z-10">
      {/* Floating balloons in background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {['🎈', '🌸', '✨', '💖', '🎉', '🌟', '🎈', '💐'].map((emoji, idx) => (
          <motion.div
            key={idx}
            className="absolute text-2xl sm:text-4xl opacity-75"
            style={{
              left: `${(idx * 13) + 5}%`,
              top: `${(idx % 3) * 25 + 15}%`,
            }}
            animate={{
              y: [0, -25, 0],
              rotate: [0, idx % 2 === 0 ? 10 : -10, 0],
            }}
            transition={{
              duration: 4 + (idx % 3),
              repeat: Infinity,
              ease: "easeInOut",
              delay: idx * 0.4,
            }}
          >
            {emoji}
          </motion.div>
        ))}
      </div>

      {/* Royal Crown Badge */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
        className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-gradient-to-r from-amber-500/20 via-pink-500/20 to-purple-500/20 border border-amber-400/40 text-amber-300 text-xs sm:text-sm font-semibold tracking-wider uppercase mb-6 backdrop-blur-md shadow-[0_0_25px_rgba(251,191,36,0.2)]"
      >
        <Crown className="w-4 h-4 text-amber-300 animate-pulse" />
        <span>Queen of the Day</span>
        <Sparkles className="w-4 h-4 text-pink-400" />
      </motion.div>

      {/* Main Glorious Birthday Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.9 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black font-serif-luxury tracking-tight leading-none text-white drop-shadow-[0_5px_15px_rgba(0,0,0,0.6)]">
          Happy Birthday
        </h1>
        <motion.div
          className="shimmer-text font-romantic text-6xl sm:text-8xl md:text-9xl font-bold mt-2 drop-shadow-[0_0_35px_rgba(244,114,182,0.8)] inline-block"
          animate={{ scale: [1, 1.02, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          Shamnaa 💖
        </motion.div>
      </motion.div>

      {/* Sweet Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7, duration: 0.8 }}
        className="text-lg sm:text-2xl text-pink-100 font-light mt-6 max-w-2xl mx-auto leading-relaxed drop-shadow"
      >
        Today is all about celebrating the most incredible, beautiful, and radiant person in the whole universe.
      </motion.p>

      {/* Call to blow cake candles button */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-10 flex flex-wrap gap-4 justify-center"
      >
        <button
          onClick={onScrollToCake}
          className="cursor-pointer inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-gradient-to-r from-pink-500 via-rose-500 to-amber-500 text-white font-semibold shadow-[0_0_30px_rgba(244,63,94,0.5)] hover:scale-105 active:scale-95 transition-all text-sm sm:text-base"
        >
          <CakeIcon className="w-5 h-5" />
          <span>Blow Out Your Candles 🎂</span>
        </button>

        <button
          onClick={() => {
            sound.playMagicChime();
            fireGrandCelebration();
          }}
          className="cursor-pointer inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-pink-200 font-medium backdrop-blur-md hover:scale-105 active:scale-95 transition-all text-sm sm:text-base"
        >
          <Sparkles className="w-4 h-4 text-amber-300" />
          <span>More Confetti! 🎉</span>
        </button>
      </motion.div>
    </div>
  );
}
