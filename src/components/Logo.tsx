import { motion } from 'motion/react';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  animated?: boolean;
}

export function Logo({ size = 'medium', animated = false }: LogoProps) {
  const scale = size === 'small' ? 0.5 : size === 'large' ? 1.5 : 1;
  
  return (
    <motion.svg 
      width={400 * scale} 
      height={120 * scale} 
      viewBox="0 0 400 120" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      initial={animated ? { opacity: 0 } : undefined}
      animate={animated ? { opacity: 1 } : undefined}
      transition={{ duration: 0.5 }}
    >
      {/* Wax Seal Circle with Maroon */}
      <motion.circle 
        cx="60" cy="60" r="35" 
        fill="#66474F" 
        opacity="0.12"
        initial={animated ? { scale: 0 } : undefined}
        animate={animated ? { scale: 1 } : undefined}
        transition={{ duration: 0.6, delay: 0.2 }}
      />
      <motion.circle 
        cx="60" cy="60" r="28" 
        fill="none" 
        stroke="#825A65" 
        strokeWidth="1.5"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated ? { pathLength: 1 } : undefined}
        transition={{ duration: 1, delay: 0.3 }}
      />
      
      {/* Envelope Icon in Seal */}
      <motion.path 
        d="M45 52L60 62L75 52M45 52V68H75V52M45 52L60 42L75 52" 
        stroke="#66474F" 
        strokeWidth="1.8" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        fill="none"
        initial={animated ? { pathLength: 0, opacity: 0 } : undefined}
        animate={animated ? { pathLength: 1, opacity: 1 } : undefined}
        transition={{ duration: 1.2, delay: 0.5 }}
      />
      
      {/* Decorative Seal Detail */}
      <motion.circle 
        cx="60" cy="60" r="3" 
        fill="#825A65" 
        opacity="0.4"
        initial={animated ? { scale: 0 } : undefined}
        animate={animated ? { scale: 1 } : undefined}
        transition={{ duration: 0.3, delay: 1.2 }}
      />
      
      {/* Gradient Definition */}
      <defs>
        <linearGradient id="textGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#66474F" stopOpacity="1" />
          <stop offset="50%" stopColor="#2D424F" stopOpacity="1" />
          <stop offset="100%" stopColor="#3A5447" stopOpacity="1" />
        </linearGradient>
      </defs>
      
      {/* Dearly Text */}
      <motion.text 
        x="110" y="72" 
        fontFamily="'Cormorant Garamond', Georgia, serif" 
        fontSize="48" 
        fontWeight="500" 
        fill="url(#textGradient)" 
        letterSpacing="2"
        initial={animated ? { opacity: 0, x: -20 } : undefined}
        animate={animated ? { opacity: 1, x: 0 } : undefined}
        transition={{ duration: 0.8, delay: 0.8 }}
      >
        Dearly
      </motion.text>
      
      {/* Tagline */}
      <motion.text 
        x="110" y="90" 
        fontFamily="'Inter', sans-serif" 
        fontSize="11" 
        fontWeight="400" 
        fill="#66474F" 
        letterSpacing="3"
        initial={animated ? { opacity: 0 } : undefined}
        animate={animated ? { opacity: 1 } : undefined}
        transition={{ duration: 0.5, delay: 1.3 }}
      >
        SLOW CORRESPONDENCE
      </motion.text>
      
      {/* Decorative Lines */}
      <motion.line 
        x1="110" y1="45" x2="135" y2="45" 
        stroke="#825A65" 
        strokeWidth="1" 
        opacity="0.4"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.4, delay: 1.5 }}
      />
      <motion.line 
        x1="340" y1="45" x2="365" y2="45" 
        stroke="#825A65" 
        strokeWidth="1" 
        opacity="0.4"
        initial={animated ? { pathLength: 0 } : undefined}
        animate={animated ? { pathLength: 1 } : undefined}
        transition={{ duration: 0.4, delay: 1.5 }}
      />
    </motion.svg>
  );
}
