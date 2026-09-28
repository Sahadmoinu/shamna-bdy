import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Heart, Sparkles, Smile, Star } from 'lucide-react';
import { sound } from '../utils/audio';

const reasons = [
  {
    id: 1,
    emoji: '🌸',
    title: 'Your Smile',
    desc: 'The way your whole face lights up whenever you smile melts away everything else.',
  },
  {
    id: 2,
    emoji: '💫',
    title: 'Your Eyes',
    desc: 'Your brownish eyes sparkle so beautifully when the sunlight hits ✨',
  },
  {
    id: 3,
    emoji: '💖',
    title: 'Your Care & Love',
    desc: 'The pure kindness, warmth, and endless love you shower so effortlessly every single day.',
  },
];

export default function SweetNotes() {
  const [revealedIds, setRevealedIds] = useState([]);

  const toggleReveal = (id) => {
    sound.playPop();
    if (revealedIds.includes(id)) {
      setRevealedIds(revealedIds.filter((item) => item !== id));
    } else {
      setRevealedIds([...revealedIds, id]);
    }
  };

  return (
    <div className="relative py-16 px-4 max-w-4xl mx-auto z-10 text-center">
      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-10"
      >
        <span className="text-xs uppercase tracking-widest text-pink-400 font-semibold px-3 py-1 rounded-full bg-pink-500/10 border border-pink-500/20 inline-flex items-center gap-1.5">
          <Heart className="w-3.5 h-3.5 fill-rose-400 text-rose-400" />
          <span>Tap to Reveal Love Notes</span>
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold font-serif-luxury mt-3 text-white">
          Things That Make You So Special ✨
        </h2>
        <p className="text-pink-200/80 text-sm sm:text-base mt-2">
          Click each secret card to uncover a reason why you are adored.
        </p>
      </motion.div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
        {reasons.map((item, idx) => {
          const isRevealed = revealedIds.includes(item.id);

          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.12 }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              onClick={() => toggleReveal(item.id)}
              className={`cursor-pointer rounded-3xl p-6 transition-all duration-300 relative overflow-hidden text-center min-h-[180px] flex flex-col items-center justify-center border ${
                isRevealed
                  ? 'bg-gradient-to-br from-pink-900/60 to-purple-950/70 border-pink-400/50 shadow-[0_0_25px_rgba(244,114,182,0.3)]'
                  : 'glass-panel border-white/10 hover:border-pink-500/40 hover:shadow-[0_0_20px_rgba(244,114,182,0.2)]'
              }`}
            >
              {isRevealed ? (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-2.5"
                >
                  <span className="text-3xl">{item.emoji}</span>
                  <h4 className="font-semibold text-pink-200 text-lg">
                    {item.title}
                  </h4>
                  <p className="text-pink-100/90 text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-pink-500/20 border border-pink-500/30 flex items-center justify-center mx-auto text-2xl shadow-inner group-hover:scale-110 transition-transform">
                    {item.emoji}
                  </div>
                  <span className="text-sm font-semibold tracking-wide text-pink-200 flex items-center justify-center gap-1.5">
                    <span>{item.title}</span>
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                  </span>
                  <span className="text-pink-400/80 text-xs inline-block">Tap to reveal ✨</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
