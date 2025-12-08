import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Heart, Mail } from 'lucide-react';
import { LetterCelebration } from './LetterCelebration';

interface LetterRevealProps {
  onClose: () => void;
  onLetterOpened?: (letterId: string) => void;
  letter: {
    id?: string;
    from: string;
    content: string;
    date: string;
    avatarColor: string;
    isFirstOpen?: boolean;
    celebrationType?: 'hearts' | 'stars' | 'sparkles' | 'flowers';
    customMessage?: string;
  };
}

export function LetterReveal({ onClose, letter, onLetterOpened }: LetterRevealProps) {
  const [isEnvelopeOpen, setIsEnvelopeOpen] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  const handleOpenEnvelope = () => {
    setIsEnvelopeOpen(true);
    // Mark letter as opened
    if (letter.id && onLetterOpened) {
      onLetterOpened(letter.id);
    }
    // Show celebration if this is the first time opening
    if (letter.isFirstOpen !== false) {
      setTimeout(() => setShowCelebration(true), 1200);
    }
  };

  const handleCelebrationComplete = () => {
    setShowCelebration(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-ink-700/30 backdrop-blur-md z-50 flex items-center justify-center p-4"
    >
      <AnimatePresence mode="wait">
        {!isEnvelopeOpen ? (
          // Envelope State
          <motion.div
            key="envelope"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="relative"
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute -top-12 right-0 p-2 hover:bg-white/10 rounded-full transition-colors z-10"
            >
              <X className="w-6 h-6 text-white" />
            </button>

            <motion.div
              className="relative w-80 sm:w-96 h-64 sm:h-80 cursor-pointer"
              onClick={handleOpenEnvelope}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {/* Envelope Body */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-sand-100 to-sand-200 rounded-lg shadow-2xl"
                style={{
                  boxShadow: '0 20px 60px rgba(0,0,0,0.15), 0 0 0 1px rgba(139, 123, 107, 0.1)'
                }}
              >
                {/* Envelope Details */}
                <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.1, 1],
                      rotate: [0, 5, -5, 0]
                    }}
                    transition={{ 
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 3
                    }}
                    className={`w-20 h-20 ${letter.avatarColor} rounded-full flex items-center justify-center mb-6`}
                  >
                    <Mail className="w-10 h-10 text-white" />
                  </motion.div>
                  
                  <h3 className="text-ink-700 mb-2">A letter from {letter.from}</h3>
                  <p className="text-taupe-500 mb-6">Arrived {letter.date}</p>
                  
                  <motion.div
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-taupe-600"
                  >
                    Tap to open
                  </motion.div>
                </div>
              </motion.div>

              {/* Envelope Flap */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-32 sm:h-40 bg-gradient-to-br from-sand-200 to-sand-300 origin-top"
                style={{
                  clipPath: 'polygon(0 0, 100% 0, 50% 100%)',
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
                }}
                animate={{
                  rotateX: [0, -5, 0]
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            </motion.div>
          </motion.div>
        ) : (
          // Letter Content State
          <motion.div
            key="letter"
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ 
              type: 'spring',
              damping: 20,
              stiffness: 100
            }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
            style={{ maxHeight: '85vh' }}
          >
            {/* Header */}
            <div className="border-b border-taupe-200 px-6 py-5 flex items-center justify-between bg-sand-50">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${letter.avatarColor} rounded-full flex items-center justify-center`}>
                  <Mail className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-ink-700">From {letter.from}</h3>
                  <p className="text-taupe-500">{letter.date}</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-sand-200 rounded-full transition-colors"
              >
                <X className="w-5 h-5 text-taupe-600" />
              </button>
            </div>

            {/* Letter Content */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="flex-1 overflow-y-auto p-8 lg:p-12 paper-texture"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="prose prose-lg max-w-none"
              >
                {letter.content.split('\n\n').map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                    className="text-taupe-700 mb-6 leading-relaxed"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </motion.div>
            </motion.div>

            {/* Footer */}
            <div className="border-t border-taupe-200 px-6 py-4 bg-sand-50">
              <button
                onClick={onClose}
                className="w-full px-6 py-3 bg-sage-600 hover:bg-sage-700 text-sand-50 rounded-full transition-colors"
              >
                Keep this letter close
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Celebration overlay */}
      <LetterCelebration
        isVisible={showCelebration}
        onComplete={handleCelebrationComplete}
        celebrationType={letter.celebrationType || 'hearts'}
        message={letter.customMessage || 'Letter opened with love ✨'}
      />
    </motion.div>
  );
}