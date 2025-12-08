import { useState } from 'react';
import { motion } from 'motion/react';
import { X, UserPlus, Phone } from 'lucide-react';

interface AddFriendProps {
  onClose: () => void;
  onAdd: (friend: any) => void;
}

export function AddFriend({ onClose, onAdd }: AddFriendProps) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');
  const [relationship, setRelationship] = useState('');

  const formatPhoneNumber = (value: string) => {
    const cleaned = value.replace(/\D/g, '');
    const match = cleaned.match(/^(\d{0,3})(\d{0,3})(\d{0,4})$/);
    if (match) {
      return !match[2] ? match[1] : `(${match[1]}) ${match[2]}${match[3] ? `-${match[3]}` : ''}`;
    }
    return value;
  };

  const handlePhoneChange = (e: any) => {
    const formatted = formatPhoneNumber(e.target.value);
    setPhoneNumber(formatted);
  };

  const handleAdd = () => {
    if (phoneNumber.replace(/\D/g, '').length === 10 && name.trim()) {
      onAdd({
        phoneNumber,
        name,
        relationship: relationship || 'Friend'
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
        style={{ width: '100%', maxWidth: '500px' }}
      >
        {/* Header */}
        <div className="border-b border-taupe-200 px-6 py-5 flex items-center justify-between bg-sand-50">
          <h2 className="text-ink-700">Add a Friend</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sand-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-taupe-600" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-8 space-y-6">
          <div className="bg-sage-50 rounded-2xl p-4 border border-sage-200">
            <p className="text-taupe-600 text-sm">
              Invite someone to exchange letters with you. They'll receive an invitation via SMS to join Dearly.
            </p>
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-taupe-700 mb-3">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={handlePhoneChange}
              placeholder="(555) 123-4567"
              maxLength={14}
              className="w-full px-4 py-3 border-2 border-taupe-200 focus:border-sage-400 rounded-xl focus:outline-none transition-colors"
            />
          </div>

          {/* Name */}
          <div>
            <label className="block text-taupe-700 mb-3">Their Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g., Maya"
              className="w-full px-4 py-3 border-2 border-taupe-200 focus:border-sage-400 rounded-xl focus:outline-none transition-colors"
            />
          </div>

          {/* Relationship */}
          <div>
            <label className="block text-taupe-700 mb-3">Relationship (optional)</label>
            <input
              type="text"
              value={relationship}
              onChange={(e) => setRelationship(e.target.value)}
              placeholder="e.g., College Friend, Cousin..."
              className="w-full px-4 py-3 border-2 border-taupe-200 focus:border-sage-400 rounded-xl focus:outline-none transition-colors"
            />
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
            onClick={handleAdd}
            disabled={phoneNumber.replace(/\D/g, '').length !== 10 || !name.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-ink-600 hover:bg-ink-700 text-sand-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            <UserPlus className="w-4 h-4" />
            <span>Send Invitation</span>
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
