import { motion } from 'motion/react';
import { X, MapPin, Clock, User } from 'lucide-react';

interface InTransitProps {
  onClose: () => void;
}

interface Letter {
  id: string;
  to: string;
  avatarColor: string;
  sentDate: Date;
  arrivalDate: Date;
  progress: number;
  message: string;
}

const mockLetters: Letter[] = [
  {
    id: '1',
    to: 'Maya',
    avatarColor: 'bg-sage-300',
    sentDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
    arrivalDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
    progress: 50,
    message: 'Thank you for being such a wonderful friend...'
  },
  {
    id: '2',
    to: 'Alex',
    avatarColor: 'bg-ink-300',
    sentDate: new Date(Date.now() - 48 * 60 * 60 * 1000),
    arrivalDate: new Date(Date.now() + 120 * 60 * 60 * 1000),
    progress: 28,
    message: 'I have been thinking about our last conversation...'
  }
];

export function InTransit({ onClose }: InTransitProps) {
  const formatTimeRemaining = (date: Date) => {
    const hours = Math.floor((date.getTime() - Date.now()) / (1000 * 60 * 60));
    if (hours < 24) return `${hours} hours`;
    const days = Math.floor(hours / 24);
    return `${days} day${days !== 1 ? 's' : ''}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-ink-700/20 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="border-b border-taupe-200 px-6 py-5 flex items-center justify-between bg-sand-50">
          <div>
            <h2 className="text-ink-700">Letters in Transit</h2>
            <p className="text-taupe-500 mt-1">On their way to your loved ones</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sand-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-taupe-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {mockLetters.length > 0 ? (
            <div className="space-y-6">
              {mockLetters.map((letter, index) => (
                <motion.div
                  key={letter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-sand-50 rounded-2xl p-6 space-y-6"
                >
                  {/* Recipient */}
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${letter.avatarColor} rounded-full flex items-center justify-center`}>
                      <User className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-ink-700">To {letter.to}</p>
                      <p className="text-taupe-500">
                        Arrives in {formatTimeRemaining(letter.arrivalDate)}
                      </p>
                    </div>
                  </div>

                  {/* Progress Visualization */}
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-taupe-600">
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Sent</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        <span>In Transit</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Arrives</span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-2 bg-taupe-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${letter.progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-sage-400 to-sage-500 rounded-full"
                      />
                      
                      {/* Traveling indicator */}
                      <motion.div
                        animate={{
                          left: [`${Math.max(0, letter.progress - 5)}%`, `${Math.min(100, letter.progress + 5)}%`]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          repeatType: 'reverse',
                          ease: 'easeInOut'
                        }}
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-sage-600 rounded-full shadow-lg"
                        style={{ left: `${letter.progress}%` }}
                      />
                    </div>

                    {/* Timeline */}
                    <div className="flex items-center justify-between text-taupe-500">
                      <span>
                        {letter.sentDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                      <span className="text-sage-600">{letter.progress}%</span>
                      <span>
                        {letter.arrivalDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>

                  {/* Message Preview */}
                  <div className="pt-4 border-t border-taupe-200">
                    <p className="text-taupe-600 italic truncate">
                      &ldquo;{letter.message}&rdquo;
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="w-20 h-20 bg-sand-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="w-10 h-10 text-taupe-400" />
              </div>
              <h3 className="text-ink-700 mb-2">No letters in transit</h3>
              <p className="text-taupe-500">
                All your letters have been delivered. Write a new one to start the journey again.
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-taupe-200 px-6 py-4 bg-sand-50">
          <p className="text-taupe-500 text-center">
            Each letter travels at its own pace, building anticipation
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}