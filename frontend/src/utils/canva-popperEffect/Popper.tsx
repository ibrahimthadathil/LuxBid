import confetti from 'canvas-confetti';

// Trigger confetti
export const showConfetti = () => {
    confetti({
        particleCount: 100,
        spread: 100,
        origin: { x: 0.5, y: 0.5 },
     });
};


export const showFireworkConfetti = () => {
      confetti({
        particleCount: 300,
        angle: 60,
        spread: 360,
        origin: { x: 0 },
      });
  
      confetti({
        particleCount: 300,
        angle: 120,
        spread: 360,
        origin: { x: 1 },
      });
  };