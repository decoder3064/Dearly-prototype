import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Star, Sparkles, Flower2 } from 'lucide-react';

interface LetterCelebrationProps {
  isVisible: boolean;
  onComplete: () => void;
  celebrationType?: 'hearts' | 'stars' | 'sparkles' | 'flowers';
  message?: string;
}

export function LetterCelebration({ 
  isVisible, 
  onComplete, 
  celebrationType = 'hearts',
  message = 'Letter opened with love ✨'
}: LetterCelebrationProps) {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; delay: number; rotation: number }>>([]);

  useEffect(() => {
    if (isVisible) {
      // Generate random particles
      const newParticles = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100 - 50, // -50 to 50
        y: Math.random() * -100 - 20, // -20 to -120
        delay: Math.random() * 0.3,
        rotation: Math.random() * 360
      }));
      setParticles(newParticles);

      // Auto-complete after animation
      const timer = setTimeout(onComplete, 2500);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onComplete]);

  const getIcon = () => {
    switch (celebrationType) {
      case 'hearts':
        return Heart;
      case 'stars':
        return Star;
      case 'sparkles':
        return Sparkles;
      case 'flowers':
        return Flower2;
      default:
        return Heart;
    }
  };

  const getColors = () => {
    switch (celebrationType) {
      case 'hearts':
        return ['text-rose-400', 'text-rose-500', 'text-rose-600'];
      case 'stars':
        return ['text-yellow-400', 'text-yellow-500', 'text-amber-400'];
      case 'sparkles':
        return ['text-purple-400', 'text-pink-400', 'text-blue-400'];
      case 'flowers':
        return ['text-green-400', 'text-emerald-400', 'text-teal-400'];
      default:
        return ['text-rose-400', 'text-rose-500', 'text-rose-600'];
    }
  };

  const Icon = getIcon();
  const colors = getColors();

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-[100] flex items-center justify-center"
        >
          {/* Background overlay with gentle pulse */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: [0.8, 1.1, 1],
              opacity: [0, 0.3, 0]
            }}
            transition={{ duration: 1.5, ease: 'easeOut' }}
            className="absolute inset-0 bg-gradient-radial from-rose-100/50 via-transparent to-transparent"
          />

          {/* Particles - bursting from center */}
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              initial={{ 
                x: 0,
                y: 0,
                scale: 0,
                opacity: 0,
                rotate: 0
              }}
              animate={{ 
                x: `${particle.x}vw`,
                y: `${particle.y}vh`,
                scale: [0, 1.2, 0.8, 0],
                opacity: [0, 1, 1, 0],
                rotate: particle.rotation
              }}
              transition={{
                duration: 1.5,
                delay: particle.delay,
                ease: 'easeOut'
              }}
              className="absolute"
              style={{
                left: '50%',
                top: '50%'
              }}
            >
              <Icon 
                className={`${colors[particle.id % colors.length]} fill-current drop-shadow-lg`}
                size={Math.random() * 16 + 16}
              />
            </motion.div>
          ))}

          {/* Center burst */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ 
              scale: [0, 1.5, 1],
              rotate: 0,
              opacity: [0, 1, 0]
            }}
            transition={{ 
              duration: 1,
              ease: 'easeOut'
            }}
            className="absolute"
          >
            <Icon 
              className="text-rose-400 fill-current drop-shadow-2xl" 
              size={80}
            />
          </motion.div>

          {/* Text overlay */}
          <motion.div
            initial={{ y: 20, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: [0, 1, 1, 0], scale: 1 }}
            transition={{ 
              duration: 2,
              times: [0, 0.2, 0.8, 1],
              delay: 0.8
            }}
            className="absolute mt-32"
          >
            <div className="bg-white backdrop-blur-sm px-8 py-4 rounded-full shadow-2xl border-2 border-rose-300">
              <p className="text-rose-700 font-semibold text-lg drop-shadow-sm">{message}</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
