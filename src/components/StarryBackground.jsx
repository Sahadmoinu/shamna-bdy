import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

export default function StarryBackground({ isCelebration = false }) {
  // Generate random twinkling stars
  const stars = useMemo(() => {
    return Array.from({ length: 85 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2.5 + 0.8,
      duration: Math.random() * 3 + 2,
      delay: Math.random() * 4,
      opacity: Math.random() * 0.7 + 0.3,
    }));
  }, []);

  // Floating ambient celebration elements: Ribbons, Balloons, Flowers
  const floatingElements = useMemo(() => {
    const items = [
      { icon: '🎈', label: 'balloon' },
      { icon: '🌸', label: 'cherry-blossom' },
      { icon: '🎀', label: 'ribbon' },
      { icon: '💐', label: 'bouquet' },
      { icon: '🌺', label: 'hibiscus' },
      { icon: '🌷', label: 'tulip' },
      { icon: '🎈', label: 'balloon-red' },
      { icon: '🎀', label: 'ribbon-pink' },
      { icon: '🌹', label: 'rose' },
      { icon: '✨', label: 'sparkle' },
    ];

    const count = isCelebration ? 26 : 16;
    return Array.from({ length: count }).map((_, i) => {
      const item = items[i % items.length];
      return {
        id: i,
        icon: item.icon,
        x: Math.random() * 94 + 3,
        size: Math.random() * 16 + 20, // 20px to 36px
        duration: Math.random() * 12 + 10,
        delay: Math.random() * 10,
        rotate: Math.random() * 60 - 30,
        sway: Math.random() * 40 + 20,
      };
    });
  }, [isCelebration]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 select-none">
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

      {/* Floating Ribbons, Balloons, and Flowers */}
      {floatingElements.map((el) => (
        <motion.div
          key={el.id}
          className="absolute bottom-[-50px] flex items-center justify-center"
          style={{
            left: `${el.x}%`,
            fontSize: `${el.size}px`,
            filter: 'drop-shadow(0 0 12px rgba(244, 114, 182, 0.4))',
          }}
          animate={{
            y: ['0vh', '-120vh'],
            x: [0, (el.id % 2 === 0 ? 1 : -1) * el.sway, 0],
            opacity: [0, 0.85, 0.85, 0],
            rotate: [el.rotate, el.rotate + 35, el.rotate - 35, el.rotate],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            delay: el.delay,
            ease: "easeInOut",
          }}
        >
          {el.icon}
        </motion.div>
      ))}
    </div>
  );
}
