import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, RotateCcw, PartyPopper } from 'lucide-react';
import { sound } from '../utils/audio';
import { fireGrandCelebration } from '../utils/confetti';

export default function BirthdayCake() {
  const [candlesBlown, setCandlesBlown] = useState(false);
  const [wishMade, setWishMade] = useState(false);

  const handleBlowCandles = () => {
    if (candlesBlown) return;
    
    sound.playBlowSound();
    setCandlesBlown(true);

    setTimeout(() => {
      sound.playMagicChime();
      fireGrandCelebration();
      setWishMade(true);
    }, 700);
  };

  const handleRelight = () => {
    sound.playPop();
    setCandlesBlown(false);
    setWishMade(false);
  };

  return (
    <div className="relative py-12 px-4 max-w-2xl mx-auto text-center">
      {/* Title & Instruction */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-8"
      >
        <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20">
          Birthday Ritual
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury mt-3 text-white">
          Make a Birthday Wish 🎂
        </h2>
        <p className="text-pink-200/80 text-sm sm:text-base mt-2">
          {candlesBlown
            ? "Your wish has been carried to the stars ✨"
            : "Close your eyes, make your deepest wish, then tap the cake to blow out the candles!"}
        </p>
      </motion.div>

      {/* Interactive Birthday Cake Illustration */}
      <div className="relative inline-block my-6 cursor-pointer select-none" onClick={handleBlowCandles}>
        {/* Glow behind cake */}
        <div className={`absolute -inset-10 rounded-full blur-3xl transition-all duration-700 pointer-events-none ${
          candlesBlown ? 'bg-purple-900/20' : 'bg-amber-500/20'
        }`} />

        <div className="relative flex flex-col items-center">
          {/* Candles Row */}
          <div className="flex gap-6 sm:gap-8 items-end justify-center mb-1 z-20">
            {[0, 1, 2].map((i) => (
              <div key={i} className="flex flex-col items-center relative">
                {/* Flame or Smoke */}
                {!candlesBlown ? (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="candle-flame w-4 h-6 sm:w-5 sm:h-7 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_15px_#f59e0b] cursor-pointer"
                  />
                ) : (
                  <div className="smoke-particle w-2.5 h-2.5 rounded-full bg-slate-300/60 blur-[1px] -mb-1" />
                )}

                {/* Candle Wick */}
                <div className="w-[2px] h-2.5 bg-zinc-800" />

                {/* Candle Body */}
                <div className={`w-3 sm:w-3.5 h-12 rounded-t-sm shadow-md border-t border-white/40 ${
                  i === 1
                    ? 'bg-gradient-to-b from-pink-300 via-rose-400 to-pink-500'
                    : 'bg-gradient-to-b from-amber-200 via-pink-300 to-rose-400'
                }`} />
              </div>
            ))}
          </div>

          {/* Cake Top Tier */}
          <div className="relative w-48 sm:w-56 h-16 rounded-2xl bg-gradient-to-r from-pink-400 via-pink-300 to-rose-400 shadow-lg border-t-2 border-white/50 flex items-center justify-center overflow-hidden z-10">
            {/* White dripping cream frosting */}
            <div className="absolute top-0 inset-x-0 h-4 bg-white/80 rounded-b-xl flex justify-around">
              <span className="w-4 h-4 bg-white/80 rounded-full -mt-1"></span>
              <span className="w-5 h-6 bg-white/80 rounded-full -mt-1"></span>
              <span className="w-4 h-5 bg-white/80 rounded-full -mt-1"></span>
              <span className="w-5 h-6 bg-white/80 rounded-full -mt-1"></span>
              <span className="w-4 h-4 bg-white/80 rounded-full -mt-1"></span>
            </div>
            {/* Sprinkles */}
            <div className="flex gap-4 text-xs">
              <span className="text-yellow-200">★</span>
              <span className="text-pink-100">♥</span>
              <span className="text-yellow-200">★</span>
              <span className="text-pink-100">♥</span>
            </div>
          </div>

          {/* Cake Middle Cream Layer */}
          <div className="w-44 sm:w-52 h-2.5 bg-rose-200/90 shadow-inner z-10" />

          {/* Cake Bottom Tier */}
          <div className="relative w-64 sm:w-76 h-22 rounded-2xl bg-gradient-to-r from-rose-500 via-pink-500 to-purple-600 shadow-xl border-t-2 border-white/30 flex items-center justify-center overflow-hidden z-10">
            {/* Dripping frosting layer */}
            <div className="absolute top-0 inset-x-0 h-4 bg-pink-100/90 rounded-b-2xl flex justify-around">
              <span className="w-6 h-5 bg-pink-100/90 rounded-full -mt-1"></span>
              <span className="w-7 h-7 bg-pink-100/90 rounded-full -mt-1"></span>
              <span className="w-6 h-6 bg-pink-100/90 rounded-full -mt-1"></span>
              <span className="w-8 h-8 bg-pink-100/90 rounded-full -mt-1"></span>
              <span className="w-6 h-5 bg-pink-100/90 rounded-full -mt-1"></span>
            </div>

            {/* Inscription on cake */}
            <div className="font-romantic text-2xl sm:text-3xl text-white font-bold drop-shadow-md mt-2">
              Shamna 💖
            </div>
          </div>

          {/* Cake Plate / Stand */}
          <div className="w-72 sm:w-88 h-4 rounded-full bg-gradient-to-r from-amber-100 via-yellow-300 to-amber-400 shadow-2xl border-t border-white/80 -mt-1 z-0" />
          <div className="w-40 sm:w-48 h-3 rounded-b-xl bg-amber-500/70 shadow-lg mx-auto" />
        </div>

        {/* Floating tap hint if not blown yet */}
        {!candlesBlown && (
          <motion.div
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-pink-500/30 to-purple-500/30 border border-pink-400/40 text-pink-200 text-sm font-medium backdrop-blur-md shadow-lg"
          >
            <Sparkles className="w-4 h-4 text-amber-300 animate-spin" style={{ animationDuration: '4s' }} />
            <span>Tap candles to blow them out</span>
            <span className="text-base">💨🕯️</span>
          </motion.div>
        )}
      </div>

      {/* Relight button if blown */}
      {candlesBlown && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4"
        >
          <button
            onClick={handleRelight}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 hover:bg-white/15 border border-white/20 text-pink-200 text-xs sm:text-sm font-medium transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Light the candles again</span>
          </button>
        </motion.div>
      )}

      {/* Wish Granted Modal / Reveal */}
      <AnimatePresence>
        {wishMade && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="mt-8 glass-card-glow rounded-3xl p-6 sm:p-8 max-w-lg mx-auto relative overflow-hidden text-center"
          >
            <div className="w-12 h-12 rounded-full bg-pink-500/20 border border-pink-500/40 flex items-center justify-center mx-auto mb-4 text-pink-400">
              <PartyPopper className="w-6 h-6 animate-bounce" />
            </div>

            <h3 className="text-2xl font-bold font-serif-luxury text-white mb-2">
              Wish Granted! ✨
            </h3>

            <p className="text-pink-100/90 text-sm sm:text-base leading-relaxed">
              May every single dream, secret wish, and prayer in your heart come true this year, <strong className="text-pink-300 font-semibold">Shamna</strong>.
              May your days be filled with endless smiles, peace, and all the love you give so effortlessly to the world! 💖
            </p>

            <div className="mt-4 flex items-center justify-center gap-1 text-xs text-pink-300/80 font-romantic text-lg">
              <span>Forever & Always</span>
              <Heart className="w-4 h-4 fill-rose-500 text-rose-500 inline ml-1 animate-pulse" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
