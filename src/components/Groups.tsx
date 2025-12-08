import { motion } from 'motion/react';
import { Users, Mail, Pin } from 'lucide-react';

interface GroupMember {
  name: string;
  avatarColor: string;
}

interface Group {
  id: string;
  name: string;
  description: string;
  members: GroupMember[];
  latestLetter?: {
    from: string;
    preview: string;
    date: string;
  };
  unreadCount: number;
  color: string;
}

const mockGroups: Group[] = [
  {
    id: 'book-club',
    name: 'Book Club',
    description: 'Monthly reflections on our readings',
    members: [
      { name: 'Maya', avatarColor: 'bg-sage-300' },
      { name: 'Alex', avatarColor: 'bg-ink-300' },
      { name: 'Jordan', avatarColor: 'bg-rose-300' }
    ],
    latestLetter: {
      from: 'Maya',
      preview: 'Just finished the latest chapter and had so many thoughts about the protagonist\'s journey...',
      date: '2 days ago'
    },
    unreadCount: 2,
    color: 'bg-sage-200'
  },
  {
    id: 'family-updates',
    name: 'Family Updates',
    description: 'Staying connected across distances',
    members: [
      { name: 'Jordan', avatarColor: 'bg-rose-300' },
      { name: 'Sam', avatarColor: 'bg-aubergine-300' }
    ],
    latestLetter: {
      from: 'Jordan',
      preview: 'Mom would have loved to see the garden in full bloom this year. Remember how she used to...',
      date: '5 days ago'
    },
    unreadCount: 0,
    color: 'bg-rose-200'
  },
  {
    id: 'creative-writing',
    name: 'Creative Writing Circle',
    description: 'Sharing stories and encouragement',
    members: [
      { name: 'Alex', avatarColor: 'bg-ink-300' },
      { name: 'Sam', avatarColor: 'bg-aubergine-300' }
    ],
    latestLetter: {
      from: 'Sam',
      preview: 'I tried that writing exercise you suggested. It took me to some unexpected places...',
      date: '1 week ago'
    },
    unreadCount: 1,
    color: 'bg-ink-200'
  }
];

interface GroupsProps {
  onViewGroup: (groupId: string) => void;
}

export function Groups({ onViewGroup }: GroupsProps) {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-ink-700">Your Groups</h2>
        <p className="text-taupe-500">{mockGroups.length} conversations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {mockGroups.map((group, index) => (
          <motion.div
            key={group.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onViewGroup(group.id)}
            className={`${group.color} rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer relative overflow-hidden`}
          >
            {/* Unread indicator */}
            {group.unreadCount > 0 && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                className="absolute top-4 right-4 flex items-center gap-1"
              >
                <Pin className="w-4 h-4 text-rose-600" fill="currentColor" />
                <span className="bg-rose-600 text-white text-xs font-medium px-2 py-1 rounded-full">
                  {group.unreadCount}
                </span>
              </motion.div>
            )}

            {/* Group info */}
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-ink-600" />
              </div>
              <div className="flex-1">
                <h3 className="text-ink-700 font-medium mb-1">{group.name}</h3>
                <p className="text-taupe-600 text-sm">{group.description}</p>
              </div>
            </div>

            {/* Members */}
            <div className="flex items-center gap-2 mb-4">
              <div className="flex -space-x-2">
                {group.members.map((member, i) => (
                  <div
                    key={i}
                    className={`w-8 h-8 ${member.avatarColor} rounded-full border-2 border-white flex items-center justify-center`}
                    title={member.name}
                  >
                    <span className="text-xs text-white font-medium">
                      {member.name[0]}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-taupe-600 text-sm ml-1">
                {group.members.length} members
              </span>
            </div>

            {/* Latest letter preview */}
            {group.latestLetter && (
              <div className="bg-white/40 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-ink-500" />
                  <span className="text-ink-600 text-sm font-medium">
                    {group.latestLetter.from}
                  </span>
                  <span className="text-taupe-500 text-xs">
                    {group.latestLetter.date}
                  </span>
                </div>
                <p className="text-taupe-700 text-sm line-clamp-2">
                  {group.latestLetter.preview}
                </p>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
