import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function StarryBackground({ isCelebration = false }) {
  // Generate random twinkling stars
  const stars = useMemo(() => {
    return Array.from({ length: 90 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  // Floating ambient hearts
  const hearts = useMemo(() => {
    return Array.from({ length: isCelebration ? 22 : 14 }).map((_, i) => ({
      id: i,
      x: Math.random() * 96 + 2,
      size: Math.random() * 18 + 10,
      duration: Math.random() * 12 + 10,
      delay: Math.random() * 10,
      rotate: Math.random() * 40 - 20,
      color: ['#f43f5e', '#ec4899', '#f472b6', '#fda4af', '#f43f5e'][Math.floor(Math.random() * 5)],
    }));
  }, [isCelebration]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Deep Romantic Ambient Nebulae */}
      <div className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full bg-pink-900/20 blur-[130px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60vw] h-[60vw] rounded-full bg-purple-900/20 blur-[140px]" />
      <div className="absolute top-[40%] right-[10%] w-[40vw] h-[40vw] rounded-full bg-rose-950/20 blur-[120px]" />

      {/* Twinkling Stars */}
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            width: `${star.size}px`,
            height: `${star.size}px`,
            boxShadow: `0 0 ${star.size * 2}px rgba(255, 255, 255, 0.8)`,
          }}
          animate={{
            opacity: [star.opacity * 0.2, star.opacity, star.opacity * 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: star.duration,
            repeat: Infinity,
            delay: star.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      {/* Shooting Star */}
      <motion.div
        className="absolute w-[120px] h-[1.5px] bg-gradient-to-r from-transparent via-pink-200 to-white -rotate-45"
        style={{ top: '15%', left: '70%' }}
        animate={{
          x: [-200, 400],
          y: [-100, 300],
          opacity: [0, 1, 0],
        }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          repeatDelay: 9,
          ease: "easeOut",
        }}
      />

      {/* Floating Glowing Hearts */}
      {hearts.map((h) => (
        <motion.div
          key={h.id}
          className="absolute bottom-[-40px]"
          style={{
            left: `${h.x}%`,
            color: h.color,
            filter: `drop-shadow(0 0 10px ${h.color}88)`,
          }}
          animate={{
            y: ['0vh', '-115vh'],
            x: [0, Math.sin(h.id) * 35, 0],
            opacity: [0, 0.75, 0.75, 0],
            rotate: [h.rotate, h.rotate + 15, h.rotate - 15, h.rotate],
          }}
          transition={{
            duration: h.duration,
            repeat: Infinity,
            delay: h.delay,
            ease: "linear",
          }}
        >
          <svg
            width={h.size}
            height={h.size}
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="none"
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  );
}
