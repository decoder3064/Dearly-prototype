import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Users, Plus } from 'lucide-react';

interface CreateGroupProps {
  onClose: () => void;
  onCreate: (group: any) => void;
}

const availableContacts = [
  { id: '1', name: 'Maya', phone: '+1 (555) 123-4567', avatarColor: 'bg-sage-300' },
  { id: '2', name: 'Alex', phone: '+1 (555) 234-5678', avatarColor: 'bg-ink-300' },
  { id: '3', name: 'Jordan', phone: '+1 (555) 345-6789', avatarColor: 'bg-rose-300' },
  { id: '4', name: 'Sam', phone: '+1 (555) 456-7890', avatarColor: 'bg-aubergine-300' },
  { id: '5', name: 'Riley', phone: '+1 (555) 567-8901', avatarColor: 'bg-rose-400' },
  { id: '6', name: 'Taylor', phone: '+1 (555) 678-9012', avatarColor: 'bg-sage-400' },
  { id: '7', name: 'Morgan', phone: '+1 (555) 789-0123', avatarColor: 'bg-ink-400' },
  { id: '8', name: 'Casey', phone: '+1 (555) 890-1234', avatarColor: 'bg-taupe-400' }
];

export function CreateGroup({ onClose, onCreate }: CreateGroupProps) {
  const [groupName, setGroupName] = useState('');
  const [groupDescription, setGroupDescription] = useState('');
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const toggleMember = (id: string) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter(m => m !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const handleCreate = () => {
    if (groupName.trim() && selectedMembers.length >= 2) {
      onCreate({
        name: groupName,
        description: groupDescription,
        memberIds: selectedMembers
      });
    }
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
        className="bg-white rounded-3xl shadow-2xl overflow-hidden flex flex-col"
        style={{ width: '100%', maxWidth: '600px', maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="border-b border-taupe-200 px-6 py-5 flex items-center justify-between bg-sand-50">
          <h2 className="text-ink-700">Create a Group</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sand-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-taupe-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8 space-y-6">
          {/* Group Name */}
          <div>
            <label className="block text-taupe-700 mb-3">Group Name</label>
            <input
              type="text"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              placeholder="e.g., Book Club, Family Updates..."
              className="w-full px-4 py-3 border-2 border-taupe-200 focus:border-sage-400 rounded-xl focus:outline-none transition-colors"
            />
          </div>

          {/* Group Description */}
          <div>
            <label className="block text-taupe-700 mb-3">Description (optional)</label>
            <textarea
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              placeholder="What brings this group together?"
              className="w-full h-24 px-4 py-3 border-2 border-taupe-200 focus:border-sage-400 rounded-xl resize-none focus:outline-none transition-colors"
            />
          </div>

          {/* Member Selection */}
          <div>
            <label className="block text-taupe-700 mb-3">
              Add Members (select at least 2)
            </label>
            <p className="text-taupe-500 text-sm mb-4">
              Choose from your existing correspondents
            </p>
            
            <div className="space-y-3">
              {availableContacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => toggleMember(contact.id)}
                  className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                    selectedMembers.includes(contact.id)
                      ? 'border-sage-400 bg-sage-50'
                      : 'border-taupe-200 hover:border-taupe-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 ${contact.avatarColor} rounded-full flex items-center justify-center flex-shrink-0`}>
                      <span className="text-white font-medium">{contact.name[0]}</span>
                    </div>
                    <div className="flex-1">
                      <p className="text-ink-700 font-medium">{contact.name}</p>
                      <p className="text-taupe-500 text-sm">{contact.phone}</p>
                    </div>
                    {selectedMembers.includes(contact.id) && (
                      <div className="w-6 h-6 bg-sage-400 rounded-full flex items-center justify-center">
                        <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-taupe-200 px-6 py-4 bg-sand-50 flex justify-between items-center">
          <button
            onClick={onClose}
            className="px-6 py-2 text-taupe-600 hover:text-ink-700 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleCreate}
            disabled={!groupName.trim() || selectedMembers.length < 2}
            className="flex items-center gap-2 px-6 py-2 bg-ink-600 hover:bg-ink-700 text-sand-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <Users className="w-4 h-4" />
            <span>Create Group</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
