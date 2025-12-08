import { motion } from 'motion/react';
import { Mail, Send, Clock, User, Archive, Users as UsersIcon } from 'lucide-react';
import { useState } from 'react';
import { Groups } from './Groups';
import { getAvatarColor } from '../utils/colors';

interface Correspondent {
  id: string;
  name: string;
  relationship: string;
  lastLetter?: {
    date: string;
    preview: string;
  };
  pendingLetters: number;
  avatarColor: string;
  initial?: string;
}

interface DashboardProps {
  onCreateLetter: () => void;
  onCreateGroupLetter: () => void;
  onAddFriend: () => void;
  onCreateNewGroup: () => void;
  onViewInTransit: () => void;
  onSelectCorrespondent: (id: string) => void;
  onViewGroup: (groupId: string) => void;
  onViewPendingDetails: (id: string) => void;
  openedLetters: Set<string>;
  allLetters: any[];
  children?: any;
}

const mockCorrespondents: Correspondent[] = [
  {
    id: '1',
    name: 'Maya',
    relationship: 'Best Friend',
    lastLetter: {
      date: '3 days ago',
      preview: 'Thank you for your words about the garden...'
    },
    pendingLetters: 0,
    avatarColor: 'bg-sage-300',
    initial: 'M'
  },
  {
    id: '2',
    name: 'Alex',
    relationship: 'Partner',
    lastLetter: {
      date: '1 week ago',
      preview: 'I keep thinking about our conversation...'
    },
    pendingLetters: 0,
    avatarColor: 'bg-ink-300',
    initial: 'A'
  },
  {
    id: '3',
    name: 'Jordan',
    relationship: 'Sibling',
    lastLetter: {
      date: '2 weeks ago',
      preview: 'Remember when we used to write letters as kids?'
    },
    pendingLetters: 0,
    avatarColor: 'bg-rose-300',
    initial: 'J'
  },
  {
    id: '4',
    name: 'Sam',
    relationship: 'Old Friend',
    lastLetter: {
      date: '3 weeks ago',
      preview: 'I tried that writing exercise you suggested. It took me to some unexpected places...'
    },
    pendingLetters: 0,
    avatarColor: 'bg-aubergine-300',
    initial: 'S'
  },
  {
    id: '5',
    name: 'Riley',
    relationship: 'Cousin',
    lastLetter: {
      date: '1 month ago',
      preview: 'Remember that summer at grandma\'s house? I found some old photos...'
    },
    pendingLetters: 0,
    avatarColor: 'bg-rose-400',
    initial: 'R'
  },
  {
    id: '6',
    name: 'Taylor',
    relationship: 'Mentor',
    pendingLetters: 0,
    avatarColor: 'bg-forest-400',
    initial: 'T'
  },
  {
    id: '7',
    name: 'Morgan',
    relationship: 'Colleague',
    lastLetter: {
      date: '2 months ago',
      preview: 'Your advice about slowing down really changed my perspective...'
    },
    pendingLetters: 0,
    avatarColor: 'bg-aubergine-400',
    initial: 'M'
  },
  {
    id: '8',
    name: 'Casey',
    relationship: 'Childhood Friend',
    lastLetter: {
      date: '6 weeks ago',
      preview: 'Can you believe it\'s been 20 years since we met?'
    },
    pendingLetters: 0,
    avatarColor: 'bg-taupe-400',
    initial: 'C'
  }
];

export function Dashboard({ onCreateLetter, onCreateGroupLetter, onAddFriend, onCreateNewGroup, onViewInTransit, onSelectCorrespondent, onViewGroup, onViewPendingDetails, openedLetters, allLetters, children }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<'letters' | 'groups'>('letters');

  // Calculate pending letters for each correspondent
  const getCorrespondentPendingCount = (correspondentName: string) => {
    return allLetters.filter(letter => 
      letter.from === correspondentName && !openedLetters.has(letter.id)
    ).length;
  };

  return (
    <div className="min-h-screen bg-sand-50 paper-texture">
      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="border-b border-taupe-200 bg-sand-50/80 backdrop-blur-sm sticky top-0 z-10"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-ink-700">Dearly</h1>
              <p className="text-taupe-500 mt-1">Slow correspondence, deep connection</p>
            </div>
            <button
              onClick={onViewInTransit}
              className="flex items-center gap-2 px-4 py-2 bg-sand-100 hover:bg-sand-200 rounded-full transition-colors"
            >
              <Clock className="w-4 h-4 text-ink-600" />
              <span className="text-ink-700 hidden sm:inline">In Transit</span>
            </button>
          </div>

          {/* Tabs */}
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('letters')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                activeTab === 'letters' 
                  ? 'bg-ink-600 text-sand-50' 
                  : 'bg-sand-100 text-ink-600 hover:bg-sand-200'
              }`}
            >
              <Mail className="w-4 h-4" />
              <span>Letters</span>
            </button>
            <button
              onClick={() => setActiveTab('groups')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                activeTab === 'groups' 
                  ? 'bg-ink-600 text-sand-50' 
                  : 'bg-sand-100 text-ink-600 hover:bg-sand-200'
              }`}
            >
              <UsersIcon className="w-4 h-4" />
              <span>Groups</span>
            </button>
          </div>
        </div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
        {/* Quick Actions - Context dependent */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          {activeTab === 'letters' ? (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onCreateLetter}
                className="group px-8 py-4 bg-ink-600 hover:bg-ink-700 text-sand-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span>Write a Letter</span>
              </button>
              <button
                onClick={onAddFriend}
                className="px-6 py-4 bg-sand-100 hover:bg-sand-200 text-ink-700 rounded-2xl transition-all duration-300 flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                <span>Add Friend</span>
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap gap-3">
              <button
                onClick={onCreateGroupLetter}
                className="group px-8 py-4 bg-ink-600 hover:bg-ink-700 text-sand-50 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
              >
                <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                <span>Write to Group</span>
              </button>
              <button
                onClick={onCreateNewGroup}
                className="px-6 py-4 bg-sand-100 hover:bg-sand-200 text-ink-700 rounded-2xl transition-all duration-300 flex items-center gap-2"
              >
                <User className="w-5 h-5" />
                <span>Create Group</span>
              </button>
            </div>
          )}
        </motion.div>

        {/* Conditional Content based on active tab */}
        {activeTab === 'letters' ? (
          <>
            {/* Pending Arrivals Section */}
            {children}

            {/* Correspondents Grid */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-ink-700">Your Correspondents</h2>
                <p className="text-taupe-500">{mockCorrespondents.length} connections</p>
              </div>

          <div className="grid gap-4 sm:gap-6 grid-cols-1 lg:grid-cols-2">
            {mockCorrespondents.map((correspondent, index) => {
              const pendingCount = getCorrespondentPendingCount(correspondent.name);
              return (
              <motion.button
                key={correspondent.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + index * 0.05 }}
                onClick={() => onSelectCorrespondent(correspondent.id)}
                className="group relative bg-white hover:bg-sand-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-left overflow-hidden"
              >
                {/* Pending indicator */}
                {pendingCount > 0 && (
                  <div className="absolute top-4 right-4 w-8 h-8 bg-rose-400 rounded-full flex items-center justify-center">
                    <span className="text-white">{pendingCount}</span>
                  </div>
                )}

                <div className="flex items-start gap-4">
                  {/* Avatar */}
                  <div 
                    className="w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform"
                    style={{ backgroundColor: getAvatarColor(correspondent.avatarColor) }}
                  >
                    {correspondent.initial ? (
                      <span className="text-white text-2xl font-medium">{correspondent.initial}</span>
                    ) : (
                      <User className="w-8 h-8 text-white" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-ink-700 mb-1">{correspondent.name}</h3>
                    <p className="text-taupe-500 mb-3">{correspondent.relationship}</p>
                    
                    {correspondent.lastLetter ? (
                      <div className="space-y-1">
                        <p className="text-taupe-600 truncate italic">
                          &ldquo;{correspondent.lastLetter.preview}&rdquo;
                        </p>
                        <div className="flex items-center gap-2 text-taupe-400">
                          <Mail className="w-3 h-3" />
                          <span>{correspondent.lastLetter.date}</span>
                        </div>
                      </div>
                    ) : (
                      <p className="text-taupe-400 italic">No letters yet. Start the conversation.</p>
                    )}
                  </div>
                </div>

                {/* Hover effect border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-sage-300 rounded-2xl transition-colors pointer-events-none" />
              </motion.button>
              );
            })}
          </div>
        </div>

        {/* Gentle CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <p className="text-taupe-500 max-w-2xl mx-auto">
            Take your time. Every letter is a gift of attention in a hurried world.
          </p>
        </motion.div>
          </>
        ) : (
          <Groups onViewGroup={onViewGroup} />
        )}
      </main>
    </div>
  );
}