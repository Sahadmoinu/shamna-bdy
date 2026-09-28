import confetti from 'canvas-confetti';

export function fireGrandCelebration() {
  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  fire(0.25, {
    spread: 26,
    startVelocity: 55,
    colors: ['#f43f5e', '#ec4899', '#f472b6', '#fbbf24', '#ffffff']
  });
  fire(0.2, {
    spread: 60,
    colors: ['#a855f7', '#ec4899', '#fbcfe8']
  });
  fire(0.35, {
    spread: 100,
    decay: 0.91,
    scalar: 0.8,
    colors: ['#fb7185', '#fda4af', '#fef08a']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 25,
    decay: 0.92,
    scalar: 1.2,
    colors: ['#ff4d6d', '#ff758f', '#ff8fa3']
  });
  fire(0.1, {
    spread: 120,
    startVelocity: 45,
    colors: ['#ffb3c1', '#fbcfe8', '#ffe5ec']
  });
}

// Side cannon fireworks
export function fireFireworks() {
  const duration = 3 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 100 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(function() {
    const timeLeft = animationEnd - Date.now();

    if (timeLeft <= 0) {
      return clearInterval(interval);
    }

    const particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#fbcfe8', '#e879f9']
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
      colors: ['#f43f5e', '#ec4899', '#fbbf24', '#fbcfe8', '#e879f9']
    });
  }, 250);
}
