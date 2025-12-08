import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Image, Mic, Clock, Send, Users, Heart, Star, Sparkles, Flower } from 'lucide-react';

interface CreateGroupLetterProps {
  onClose: () => void;
  onSend: (letter: any) => void;
}

const groups = [
  { 
    id: 'g1', 
    name: 'Book Club', 
    members: ['Maya', 'Alex', 'Jordan'],
    color: 'bg-sage-200' 
  },
  { 
    id: 'g2', 
    name: 'Family Updates', 
    members: ['Jordan', 'Sam'],
    color: 'bg-rose-200' 
  },
  { 
    id: 'g3', 
    name: 'Creative Writing Circle', 
    members: ['Alex', 'Sam'],
    color: 'bg-ink-200' 
  }
];

const celebrationTypes = [
  { id: 'hearts', label: 'Hearts', icon: Heart, color: 'text-rose-500' },
  { id: 'stars', label: 'Stars', icon: Star, color: 'text-yellow-500' },
  { id: 'sparkles', label: 'Sparkles', icon: Sparkles, color: 'text-purple-500' },
  { id: 'flowers', label: 'Flowers', icon: Flower, color: 'text-green-500' }
];

const messagePresets = [
  'Letter opened with love ✨',
  'Letter opened with gratitude 🙏',
  'Letter opened with care 💝',
  'Letter opened with patience 🌱',
  'Letter opened with joy 🌸',
  'Letter opened with warmth ☀️'
];

export function CreateGroupLetter({ onClose, onSend }: CreateGroupLetterProps) {
  const [step, setStep] = useState<'compose' | 'schedule'>('compose');
  const [selectedGroup, setSelectedGroup] = useState('');
  const [content, setContent] = useState('');
  const [deliveryDelay, setDeliveryDelay] = useState('24');
  const [celebrationType, setCelebrationType] = useState<'hearts' | 'stars' | 'sparkles' | 'flowers'>('hearts');
  const [customMessage, setCustomMessage] = useState('Letter opened with love ✨');

  const handleSend = () => {
    onSend({
      groupId: selectedGroup,
      content,
      deliveryDelay: parseInt(deliveryDelay),
      celebrationType,
      customMessage
    });
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
        style={{ width: '100%', maxWidth: '768px', maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="border-b border-taupe-200 px-6 py-5 flex items-center justify-between bg-sand-50">
          <h2 className="text-ink-700">
            {step === 'compose' ? 'Write to Your Group' : 'Schedule Delivery'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sand-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-taupe-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          {step === 'compose' ? (
            <div className="space-y-6">
              {/* Group Selection */}
              <div>
                <label className="block text-taupe-700 mb-3">Select Group</label>
                <div className="space-y-3">
                  {groups.map((group) => (
                    <button
                      key={group.id}
                      onClick={() => setSelectedGroup(group.id)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        selectedGroup === group.id
                          ? 'border-sage-400 bg-sage-50'
                          : 'border-taupe-200 hover:border-taupe-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 ${group.color} rounded-full flex items-center justify-center`}>
                          <Users className="w-6 h-6 text-ink-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-ink-700 font-medium">{group.name}</p>
                          <p className="text-taupe-600 text-sm">
                            {group.members.length} members: {group.members.join(', ')}
                          </p>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Letter Content */}
              <div>
                <label className="block text-taupe-700 mb-3">Your Group Letter</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share your thoughts with the whole group. Everyone will receive this letter at the same time..."
                  className="w-full h-64 lg:h-80 px-5 py-4 border-2 border-taupe-200 focus:border-sage-400 rounded-2xl resize-none focus:outline-none transition-colors bg-white"
                  style={{ lineHeight: '1.8' }}
                />
                <p className="text-taupe-400 mt-2">{content.length} characters</p>
              </div>

              {/* Attachments */}
              <div>
                <label className="block text-taupe-700 mb-3">Attachments (optional)</label>
                <div className="flex flex-wrap gap-3">
                  <button className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-taupe-300 hover:border-sage-400 rounded-xl transition-colors">
                    <Image className="w-5 h-5 text-taupe-500" />
                    <span className="text-taupe-600">Add Photo</span>
                  </button>
                  <button className="flex items-center gap-2 px-4 py-3 border-2 border-dashed border-taupe-300 hover:border-sage-400 rounded-xl transition-colors">
                    <Mic className="w-5 h-5 text-taupe-500" />
                    <span className="text-taupe-600">Voice Note</span>
                  </button>
                </div>
              </div>

              {/* Opening Celebration */}
              <div>
                <label className="block text-taupe-700 mb-3">Opening Celebration</label>
                <p className="text-taupe-500 mb-4">All group members will see this celebration when they open the letter</p>
                
                {/* Animation Type */}
                <div className="mb-4">
                  <p className="text-taupe-600 text-sm mb-2">Animation Style</p>
                  <div className="grid grid-cols-4 gap-3">
                    {celebrationTypes.map((type) => {
                      const Icon = type.icon;
                      return (
                        <button
                          key={type.id}
                          onClick={() => setCelebrationType(type.id as any)}
                          className={`p-4 rounded-xl border-2 transition-all ${
                            celebrationType === type.id
                              ? 'border-sage-400 bg-sage-50'
                              : 'border-taupe-200 hover:border-taupe-300 bg-white'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mx-auto mb-1 ${type.color}`} />
                          <p className="text-taupe-700 text-xs text-center">{type.label}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Custom Message */}
                <div>
                  <p className="text-taupe-600 text-sm mb-2">Opening Message</p>
                  <div className="space-y-2 mb-3">
                    {messagePresets.map((preset) => (
                      <button
                        key={preset}
                        onClick={() => setCustomMessage(preset)}
                        className={`w-full px-4 py-2 rounded-lg text-left transition-all ${
                          customMessage === preset
                            ? 'bg-sage-100 text-ink-700'
                            : 'bg-sand-50 text-taupe-600 hover:bg-sand-100'
                        }`}
                      >
                        {preset}
                      </button>
                    ))}
                  </div>
                  <input
                    type="text"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value.slice(0, 50))}
                    placeholder="Or write your own..."
                    className="w-full px-4 py-2 border-2 border-taupe-200 focus:border-sage-400 rounded-lg focus:outline-none transition-colors"
                  />
                  <p className="text-taupe-400 text-xs mt-1">{customMessage.length}/50 characters</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Delay Selection */}
              <div>
                <label className="block text-taupe-700 mb-4">
                  When should this group letter arrive?
                </label>
                <p className="text-taupe-500 mb-6">
                  All members will receive the letter at the same time. Choose a delivery delay that feels right for your group.
                </p>
                
                <div className="space-y-3">
                  {[
                    { hours: '24', label: '1 day', description: 'A gentle pause' },
                    { hours: '72', label: '3 days', description: 'Time to reflect' },
                    { hours: '168', label: '1 week', description: 'Building anticipation' },
                    { hours: '336', label: '2 weeks', description: 'The long wait' }
                  ].map((option) => (
                    <button
                      key={option.hours}
                      onClick={() => setDeliveryDelay(option.hours)}
                      className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                        deliveryDelay === option.hours
                          ? 'border-sage-400 bg-sage-50'
                          : 'border-taupe-200 hover:border-taupe-300 bg-white'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-ink-700 mb-1">{option.label}</p>
                          <p className="text-taupe-500">{option.description}</p>
                        </div>
                        <Clock className={`w-5 h-5 ${
                          deliveryDelay === option.hours ? 'text-sage-600' : 'text-taupe-400'
                        }`} />
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Preview */}
              <div className="bg-sand-50 rounded-2xl p-6 border border-taupe-200">
                <p className="text-taupe-600 mb-3">Your group letter will be delivered:</p>
                <p className="text-ink-700">
                  In {parseInt(deliveryDelay) / 24} {parseInt(deliveryDelay) === 24 ? 'day' : 'days'}
                </p>
                <p className="text-taupe-500 mt-2">
                  to {groups.find(g => g.id === selectedGroup)?.members.length || 0} members
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-taupe-200 px-6 py-4 bg-sand-50 flex justify-between items-center">
          {step === 'compose' ? (
            <>
              <button
                onClick={onClose}
                className="px-6 py-2 text-taupe-600 hover:text-ink-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('schedule')}
                disabled={!selectedGroup || !content.trim()}
                className="px-6 py-2 bg-ink-600 hover:bg-ink-700 text-sand-50 rounded-full disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                Continue
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep('compose')}
                className="px-6 py-2 text-taupe-600 hover:text-ink-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSend}
                className="flex items-center gap-2 px-6 py-2 bg-ink-600 hover:bg-ink-700 text-sand-50 rounded-full transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Send to Group</span>
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
