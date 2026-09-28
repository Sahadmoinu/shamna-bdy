import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { sound } from '../utils/audio';

export default function MusicPlayer() {
  const [isMuted, setIsMuted] = useState(false);

  const toggleSound = () => {
    const muted = sound.toggleMute();
    setIsMuted(muted);
    if (!sound.isPlayingMusic && !muted) {
      sound.startRomanticBGM();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1 }}
      className="fixed bottom-5 right-5 z-40"
    >
      <button
        onClick={toggleSound}
        className="cursor-pointer glass-card-glow rounded-full px-4 py-2.5 flex items-center gap-2.5 text-xs sm:text-sm text-pink-200 hover:text-white transition-all shadow-lg hover:scale-105 active:scale-95 group"
        title={isMuted ? "Unmute Music" : "Mute Music"}
      >
        {/* Animated equalizer bars */}
        {!isMuted ? (
          <div className="flex items-end gap-[3px] h-3.5 w-3.5">
            <span className="w-1 bg-pink-400 rounded-full animate-bounce" style={{ height: '70%', animationDuration: '0.6s' }}></span>
            <span className="w-1 bg-rose-400 rounded-full animate-bounce" style={{ height: '100%', animationDuration: '0.8s' }}></span>
            <span className="w-1 bg-amber-300 rounded-full animate-bounce" style={{ height: '50%', animationDuration: '0.5s' }}></span>
          </div>
        ) : (
          <VolumeX className="w-4 h-4 text-pink-400/60" />
        )}

        <span className="hidden sm:inline font-medium">
          {isMuted ? "Music Muted" : "Romantic Melody"}
        </span>

        {!isMuted && (
          <Volume2 className="w-3.5 h-3.5 text-pink-400 group-hover:scale-110 transition-transform" />
        )}
      </button>
    </motion.div>
  );
}
