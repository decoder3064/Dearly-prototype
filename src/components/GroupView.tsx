import { motion, AnimatePresence } from 'motion/react';
import { X, Users, Calendar, Heart, Mail } from 'lucide-react';
import { useState } from 'react';

interface GroupViewProps {
  onClose: () => void;
  groupId: string;
}

// Mock group letters data
const mockGroupLetters: Record<string, {
  name: string;
  description: string;
  members: { name: string; avatarColor: string; initial: string }[];
  letters: {
    id: string;
    from: string;
    date: string;
    preview: string;
    content: string;
    avatarColor: string;
  }[];
}> = {
  'book-club': {
    name: 'Book Club',
    description: 'Monthly discussions about our favorite reads',
    members: [
      { name: 'Maya', avatarColor: 'bg-sage-300', initial: 'M' },
      { name: 'Jordan', avatarColor: 'bg-rose-300', initial: 'J' },
      { name: 'Alex', avatarColor: 'bg-ink-300', initial: 'A' },
    ],
    letters: [
      {
        id: 'book-club-1',
        from: 'Maya',
        date: 'November 20, 2025',
        preview: 'Just finished "The Overstory" and I am still thinking about it...',
        content: `Dear Book Club,

Just finished "The Overstory" and I'm still thinking about it days later. The way Richard Powers weaves together all those stories about trees and the people who love them - it's changed how I look at the world around me.

I found myself walking through the park yesterday, really seeing the trees for the first time. Did you know some of the oaks there are over 200 years old? They've witnessed so much history, silently growing while generations came and went.

The chapter about Mimi's father and the mulberry tree made me cry. That connection between memory, place, and nature felt so real. I keep thinking about what we leave behind, what stories our own trees might tell.

Can't wait to discuss this with you all at our next meeting. I have so many questions about the ending.

With love and leaves,
Maya`,
        avatarColor: 'bg-sage-300'
      }
    ]
  },
  'family-updates': {
    name: 'Family Updates',
    description: 'Keeping in touch with loved ones',
    members: [
      { name: 'Riley', avatarColor: 'bg-rose-400', initial: 'R' },
      { name: 'Maya', avatarColor: 'bg-sage-300', initial: 'M' },
      { name: 'Sam', avatarColor: 'bg-aubergine-300', initial: 'S' },
    ],
    letters: [
      {
        id: 'family-1',
        from: 'Riley',
        date: 'October 15, 2025',
        preview: 'Grandma asked about everyone at Sunday dinner...',
        content: `Dear Family,

Grandma asked about everyone at Sunday dinner yesterday. She made her famous apple pie and we sat on the porch watching the sunset, just like when we were kids.

She wanted me to tell you all that she's been organizing the old photo albums. She found pictures from that summer we all spent at the lake house - remember the rope swing? And Jordan falling in with their clothes on?

She's thinking about having everyone over for Thanksgiving. It's been too long since we were all together. The house feels too quiet these days, she says, though I think she just misses the chaos of having all of us grandkids running around.

Let me know if you can make it. It would mean the world to her.

Love,
Riley`,
        avatarColor: 'bg-rose-400'
      }
    ]
  },
  'creative-writing': {
    name: 'Creative Writing Circle',
    description: 'Sharing our stories and supporting each other',
    members: [
      { name: 'Taylor', avatarColor: 'bg-sage-400', initial: 'T' },
      { name: 'Jordan', avatarColor: 'bg-rose-300', initial: 'J' },
      { name: 'Casey', avatarColor: 'bg-taupe-400', initial: 'C' },
    ],
    letters: [
      {
        id: 'writing-1',
        from: 'Taylor',
        date: 'September 30, 2025',
        preview: 'I have been working on that short story about the lighthouse keeper...',
        content: `Dear Writing Circle,

I've been working on that short story about the lighthouse keeper we discussed last month. You know, the one about memory and isolation? It's finally starting to come together.

I took your feedback about making the lighthouse itself more of a character. Now it has a voice, a presence that's both comforting and unsettling. The keeper talks to it, and sometimes, in the quiet moments, it almost seems to respond.

I'm still struggling with the ending though. Does she stay? Does she leave? Or is there a third option I'm not seeing yet? I'd love your thoughts when we share next week.

This circle has been such a gift. Knowing there are others out there, wrestling with words and stories, trying to make sense of the world through writing - it makes the solitary work of creation feel less lonely.

Thank you for being my lighthouse keepers.

With gratitude,
Taylor`,
        avatarColor: 'bg-sage-400'
      }
    ]
  }
};

export function GroupView({ onClose, groupId }: GroupViewProps) {
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const group = mockGroupLetters[groupId];

  if (!group) {
    return null;
  }

  const selectedLetterData = selectedLetter
    ? group.letters.find(l => l.id === selectedLetter)
    : null;

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
        style={{ width: '100%', maxWidth: '800px', maxHeight: '85vh' }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-taupe-200">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-sage-200 flex items-center justify-center">
              <Users className="w-6 h-6 text-sage-700" />
            </div>
            <div>
              <h2 className="text-2xl text-ink-700 font-serif">{group.name}</h2>
              <p className="text-taupe-500 text-sm">{group.description}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sand-200 rounded-full transition-colors"
          >
            <X className="w-6 h-6 text-ink-700" />
          </button>
        </div>

        {/* Members */}
        <div className="px-6 py-4 border-b border-taupe-200">
          <div className="flex items-center gap-2">
            <span className="text-sm text-taupe-600">Members:</span>
            <div className="flex -space-x-2">
              {group.members.map((member, idx) => (
                <div
                  key={idx}
                  className={`w-8 h-8 rounded-full ${member.avatarColor} flex items-center justify-center text-white text-sm font-medium ring-2 ring-sand-50`}
                  title={member.name}
                >
                  {member.initial}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-4">
            <h3 className="text-ink-600 font-medium mb-4">Shared Letters</h3>
            
            {group.letters.map((letter) => (
              <motion.div
                key={letter.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => setSelectedLetter(letter.id)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-12 h-12 rounded-full ${letter.avatarColor} flex items-center justify-center shrink-0`}>
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-ink-700 font-medium">From {letter.from}</h4>
                      <div className="flex items-center gap-2 text-taupe-500 text-sm">
                        <Calendar className="w-4 h-4" />
                        <span>{letter.date}</span>
                      </div>
                    </div>
                    <p className="text-taupe-600 text-sm line-clamp-2">{letter.preview}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {group.letters.length === 0 && (
              <div className="text-center py-12">
                <Mail className="w-12 h-12 text-taupe-300 mx-auto mb-3" />
                <p className="text-taupe-500">No letters yet in this group</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Letter Detail Modal */}
      <AnimatePresence>
        {selectedLetterData && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[60] flex items-center justify-center p-4"
            onClick={() => setSelectedLetter(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-sand-50 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
              style={{ width: '100%', maxWidth: '600px', maxHeight: '80vh' }}
            >
              <div className="flex items-center justify-between p-6 border-b border-taupe-200">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full ${selectedLetterData.avatarColor} flex items-center justify-center`}>
                    <Heart className="w-5 h-5 text-white" fill="currentColor" />
                  </div>
                  <div>
                    <h3 className="text-xl text-ink-700 font-serif">From {selectedLetterData.from}</h3>
                    <p className="text-taupe-500 text-sm">{selectedLetterData.date}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedLetter(null)}
                  className="p-2 hover:bg-sand-200 rounded-full transition-colors"
                >
                  <X className="w-6 h-6 text-ink-700" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-8">
                <div className="max-w-2xl mx-auto">
                  <p className="whitespace-pre-wrap text-ink-600 leading-relaxed">
                    {selectedLetterData.content}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
