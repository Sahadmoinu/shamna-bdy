import React, { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import StarryBackground from './components/StarryBackground';
import LandingHero from './components/LandingHero';
import CelebrationHero from './components/CelebrationHero';
import BirthdayCake from './components/BirthdayCake';
import LoveLetter from './components/LoveLetter';
import MemoriesGallery from './components/MemoriesGallery';
import SweetNotes from './components/SweetNotes';
import MusicPlayer from './components/MusicPlayer';
import { Heart, Sparkles, Cake as CakeIcon, Mail, Camera } from 'lucide-react';

export default function App() {
  const [hasRevealed, setHasRevealed] = useState(false);
  const cakeRef = useRef(null);

  const scrollToCake = () => {
    if (cakeRef.current) {
      cakeRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen text-slate-100 relative selection:bg-pink-500 selection:text-white">
      {/* Dynamic Starry & Glowing Hearts Background */}
      <StarryBackground isCelebration={hasRevealed} />

      <AnimatePresence mode="wait">
        {!hasRevealed ? (
          <motion.div
            key="landing"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)" }}
            transition={{ duration: 0.8 }}
          >
            <LandingHero onReveal={() => setHasRevealed(true)} />
          </motion.div>
        ) : (
          <motion.div
            key="celebration"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10"
          >
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-30 backdrop-blur-xl bg-black/30 border-b border-pink-500/20 px-4 py-3">
              <div className="max-w-5xl mx-auto flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xl">🎂</span>
                  <span className="font-romantic text-2xl font-bold text-pink-300">
                    Shamna's Day
                  </span>
                </div>

                <div className="flex items-center gap-1.5 sm:gap-3 text-xs sm:text-sm">
                  <button
                    onClick={scrollToCake}
                    className="cursor-pointer px-3 py-1.5 rounded-full bg-pink-500/10 hover:bg-pink-500/20 border border-pink-500/30 text-pink-200 transition-colors flex items-center gap-1.5"
                  >
                    <CakeIcon className="w-3.5 h-3.5 text-pink-400" />
                    <span className="hidden sm:inline">The Cake</span>
                  </button>
                  <a
                    href="#letter"
                    className="px-3 py-1.5 rounded-full bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-200 transition-colors flex items-center gap-1.5"
                  >
                    <Mail className="w-3.5 h-3.5 text-rose-400" />
                    <span className="hidden sm:inline">Love Letter</span>
                  </a>
                  <a
                    href="#memories"
                    className="px-3 py-1.5 rounded-full bg-purple-500/10 hover:bg-purple-500/20 border border-purple-500/30 text-purple-200 transition-colors flex items-center gap-1.5"
                  >
                    <Camera className="w-3.5 h-3.5 text-purple-400" />
                    <span className="hidden sm:inline">Gallery</span>
                  </a>
                </div>
              </div>
            </header>

            {/* Main Sections */}
            <main className="space-y-12 sm:space-y-20 pb-28">
              {/* Grand Birthday Greeting Hero */}
              <CelebrationHero onScrollToCake={scrollToCake} />

              {/* Interactive Birthday Cake Ritual */}
              <div ref={cakeRef} id="cake" className="scroll-mt-20">
                <BirthdayCake />
              </div>

              {/* Love Letter Envelope */}
              <div id="letter" className="scroll-mt-20">
                <LoveLetter />
              </div>

              {/* Memory Polaroids Gallery */}
              <div id="memories" className="scroll-mt-20">
                <MemoriesGallery />
              </div>

              {/* Reasons Why You're Special */}
              <div id="reasons" className="scroll-mt-20">
                <SweetNotes />
              </div>
            </main>

            {/* Footer */}
            <footer className="relative border-t border-pink-500/20 py-8 px-4 text-center text-xs sm:text-sm text-pink-200/70 backdrop-blur-md bg-black/40">
              <div className="max-w-md mx-auto space-y-2">
                <div className="flex items-center justify-center gap-1.5 text-pink-400 font-romantic text-2xl">
                  <span>created for u shamnaaaa....</span>
                  <Heart className="w-4 h-4 fill-rose-500 text-rose-500 animate-pulse" />
                </div>
                <p className="text-pink-300/50 text-xs">
                  Happy Birthday to the most amazing girl in the world ✨
                </p>
              </div>
            </footer>

            {/* Floating Music Player */}
            <MusicPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
