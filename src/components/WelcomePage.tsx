import { motion } from 'motion/react';
import { useState } from 'react';

interface WelcomePageProps {
  onStart: () => void;
}

export function WelcomePage({ onStart }: WelcomePageProps) {
  const [isAnimationComplete, setIsAnimationComplete] = useState(false);

  // Handwriting animation for "Dearly" text
  const pathVariants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { 
      pathLength: 1, 
      opacity: 1,
      transition: { 
        pathLength: { duration: 2.5, ease: "easeInOut" },
        opacity: { duration: 0.3 }
      }
    }
  };

  return (
    <motion.div 
      className="min-h-screen bg-sand-50 flex flex-col items-center justify-center relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {/* Subtle paper texture overlay */}
      <div className="absolute inset-0 paper-texture opacity-50" />
      
      {/* Floating decorative elements */}
      <motion.div
        className="absolute top-20 left-20 w-32 h-32 rounded-full bg-sage-200/20"
        animate={{ 
          y: [0, -20, 0],
          scale: [1, 1.05, 1]
        }}
        transition={{ 
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      <motion.div
        className="absolute bottom-32 right-24 w-24 h-24 rounded-full bg-rose-200/20"
        animate={{ 
          y: [0, 15, 0],
          scale: [1, 1.08, 1]
        }}
        transition={{ 
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      />
      <motion.div
        className="absolute top-40 right-32 w-16 h-16 rounded-full bg-aubergine-200/20"
        animate={{ 
          y: [0, -10, 0],
          x: [0, 5, 0]
        }}
        transition={{ 
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5
        }}
      />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Animated Logo with Handwriting Effect */}
        <motion.svg 
          width="500" 
          height="200" 
          viewBox="0 0 500 200" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          className="mb-8"
        >
          {/* Wax Seal - Animated entrance */}
          <motion.g
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ duration: 1, delay: 0.2, type: "spring", stiffness: 100 }}
          >
            <circle cx="80" cy="100" r="45" fill="#66474F" opacity="0.12"/>
            <motion.circle 
              cx="80" cy="100" r="36" 
              fill="none" 
              stroke="#825A65" 
              strokeWidth="2"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
            />
            
            {/* Envelope Icon */}
            <motion.path 
              d="M60 90L80 105L100 90M60 90V115H100V90M60 90L80 75L100 90" 
              stroke="#66474F" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              fill="none"
              variants={pathVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.5 }}
            />
            
            {/* Center dot */}
            <motion.circle 
              cx="80" cy="100" r="4" 
              fill="#825A65" 
              opacity="0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 1.5, duration: 0.3 }}
            />
          </motion.g>
          
          {/* Gradient for text */}
          <defs>
            <linearGradient id="welcomeTextGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#66474F" stopOpacity="1" />
              <stop offset="50%" stopColor="#2D424F" stopOpacity="1" />
              <stop offset="100%" stopColor="#3A5447" stopOpacity="1" />
            </linearGradient>
            
            {/* Pen/quill cursor effect */}
            <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* "Dearly" text with handwriting stroke animation */}
          <motion.text 
            x="150" y="115" 
            fontFamily="'Cormorant Garamond', Georgia, serif" 
            fontSize="64" 
            fontWeight="500" 
            fill="url(#welcomeTextGradient)" 
            letterSpacing="3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1.5 }}
          >
            <motion.tspan
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.3 }}
            >D</motion.tspan>
            <motion.tspan
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.3 }}
            >e</motion.tspan>
            <motion.tspan
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4, duration: 0.3 }}
            >a</motion.tspan>
            <motion.tspan
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.6, duration: 0.3 }}
            >r</motion.tspan>
            <motion.tspan
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.3 }}
            >l</motion.tspan>
            <motion.tspan
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.0, duration: 0.3 }}
              onAnimationComplete={() => setIsAnimationComplete(true)}
            >y</motion.tspan>
          </motion.text>
          
          {/* Animated pen/quill cursor */}
          <motion.g
            initial={{ x: 140, y: 80, opacity: 1 }}
            animate={{ 
              x: [140, 170, 210, 250, 280, 310, 340],
              y: [80, 115, 115, 115, 115, 115, 115],
              opacity: [1, 1, 1, 1, 1, 1, 0]
            }}
            transition={{ 
              duration: 2.2, 
              delay: 0.8,
              times: [0, 0.15, 0.3, 0.45, 0.6, 0.8, 1],
              ease: "easeInOut"
            }}
          >
            {/* Pen icon */}
            <motion.path
              d="M0 0L-8 20L0 16L8 20L0 0Z"
              fill="#66474F"
              transform="rotate(135)"
            />
            {/* Ink drop effect */}
            <motion.circle
              cx="0" cy="0" r="2"
              fill="#825A65"
              initial={{ scale: 0 }}
              animate={{ scale: [0, 1, 0] }}
              transition={{ duration: 0.3, repeat: 6, delay: 1.0 }}
            />
          </motion.g>
          
          {/* Tagline */}
          <motion.text 
            x="150" y="145" 
            fontFamily="'Inter', sans-serif" 
            fontSize="14" 
            fontWeight="400" 
            fill="#66474F" 
            letterSpacing="4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.8 }}
          >
            SLOW CORRESPONDENCE
          </motion.text>
          
          {/* Decorative underline */}
          <motion.line 
            x1="150" y1="160" x2="370" y2="160" 
            stroke="#825A65" 
            strokeWidth="1" 
            opacity="0.3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.8, duration: 0.6 }}
          />
        </motion.svg>

        {/* Tagline text */}
        <motion.p
          className="text-taupe-600 text-lg mb-12 text-center max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.8 }}
        >
          Where anticipation meets connection—savor the journey of thoughtful, unhurried letters.
        </motion.p>

        {/* Start Button */}
        <motion.button
          onClick={onStart}
          className="group relative px-8 py-3 border-2 border-aubergine-400/60 text-aubergine-600 rounded-full font-serif text-lg tracking-widest uppercase bg-transparent hover:bg-aubergine-50 transition-all duration-300"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isAnimationComplete ? 1 : 0, y: isAnimationComplete ? 0 : 30 }}
          transition={{ duration: 0.6 }}
          whileHover={{ scale: 1.02, letterSpacing: '0.2em' }}
          whileTap={{ scale: 0.98 }}
        >
          <span className="relative z-10">Enter</span>
        </motion.button>
      </div>

      {/* Bottom decorative wave */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-24 overflow-hidden"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
      >
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
          <motion.path 
            d="M0,60 C300,120 600,0 900,60 C1050,90 1150,30 1200,60 L1200,120 L0,120 Z" 
            fill="#825A65" 
            opacity="0.05"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.5, duration: 1.5 }}
          />
        </svg>
      </motion.div>
    </motion.div>
  );
}
