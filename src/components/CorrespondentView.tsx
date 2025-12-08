import { motion } from 'motion/react';
import { X, Mail } from 'lucide-react';

interface Letter {
  id: string;
  from: string;
  content: string;
  date: string;
  avatarColor: string;
  isFirstOpen: boolean;
  celebrationType: 'hearts' | 'stars' | 'sparkles' | 'flowers';
  customMessage: string;
}

interface CorrespondentViewProps {
  onClose: () => void;
  correspondentName: string;
  letters: Letter[];
  avatarColor: string;
  onOpenLetter: (letter: Letter) => void;
}

export function CorrespondentView({ onClose, correspondentName, letters, avatarColor, onOpenLetter }: CorrespondentViewProps) {
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
        className="bg-sand-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
        style={{ width: '100%', maxWidth: '700px', maxHeight: '85vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-taupe-200">
          <div className="flex items-center gap-3">
            <div className={`w-12 h-12 rounded-full ${avatarColor} flex items-center justify-center`}>
              <span className="text-white text-xl font-medium">{correspondentName[0].toUpperCase()}</span>
            </div>
            <div>
              <h2 className="text-2xl text-ink-700 font-serif">{correspondentName}</h2>
              <p className="text-taupe-500 text-sm">
                {letters.length === 0 ? 'No letters yet' : `${letters.length} ${letters.length === 1 ? 'letter' : 'letters'}`}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sand-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-ink-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            {letters.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-20 h-20 bg-taupe-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="w-10 h-10 text-taupe-400" />
                </div>
                <h3 className="text-xl text-ink-700 mb-2">No letters yet</h3>
                <p className="text-taupe-500">
                  You haven't exchanged any letters with {correspondentName} yet.
                  <br />
                  Start the conversation by writing your first letter!
                </p>
              </div>
            ) : (
              letters.map((letter) => (
                <motion.div
                  key={letter.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-all cursor-pointer group"
                  onClick={() => onOpenLetter(letter)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full ${avatarColor} flex items-center justify-center`}>
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h4 className="text-ink-700 font-medium">From {letter.from}</h4>
                        <p className="text-taupe-500 text-sm">{letter.date}</p>
                      </div>
                    </div>
                    {letter.isFirstOpen && (
                      <div className="w-2 h-2 bg-rose-500 rounded-full animate-pulse" />
                    )}
                  </div>
                  <p className="text-taupe-600 line-clamp-3 group-hover:text-ink-600 transition-colors">
                    {letter.content.substring(0, 200)}...
                  </p>
                  <div className="mt-4 flex items-center text-sage-600 text-sm">
                    <span className="group-hover:underline">Read letter →</span>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
