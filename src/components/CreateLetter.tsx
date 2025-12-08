import { useState } from 'react';
import { motion } from 'motion/react';
import { X, Image, Mic, Clock, Send, User, Heart, Star, Sparkles, Flower } from 'lucide-react';

interface CreateLetterProps {
  onClose: () => void;
  onSend: (letter: any) => void;
}

const recipients = [
  { id: '1', name: 'Maya', relationship: 'Best Friend', avatarColor: 'bg-sage-300' },
  { id: '2', name: 'Alex', relationship: 'Partner', avatarColor: 'bg-ink-300' },
  { id: '3', name: 'Jordan', relationship: 'Sibling', avatarColor: 'bg-rose-300' },
  { id: '4', name: 'Sam', relationship: 'Old Friend', avatarColor: 'bg-aubergine-300' },
  { id: '5', name: 'Riley', relationship: 'Cousin', avatarColor: 'bg-rose-400' },
  { id: '6', name: 'Taylor', relationship: 'Mentor', avatarColor: 'bg-forest-400' },
  { id: '7', name: 'Morgan', relationship: 'Colleague', avatarColor: 'bg-aubergine-400' },
  { id: '8', name: 'Casey', relationship: 'Childhood Friend', avatarColor: 'bg-taupe-400' }
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

export function CreateLetter({ onClose, onSend }: CreateLetterProps) {
  const [step, setStep] = useState<'compose' | 'schedule'>('compose');
  const [selectedRecipient, setSelectedRecipient] = useState('');
  const [content, setContent] = useState('');
  const [deliveryDelay, setDeliveryDelay] = useState('24');
  const [celebrationType, setCelebrationType] = useState<'hearts' | 'stars' | 'sparkles' | 'flowers'>('hearts');
  const [customMessage, setCustomMessage] = useState('Letter opened with love ✨');
  const [includePackage, setIncludePackage] = useState(false);
  const [trackingNumber, setTrackingNumber] = useState('');

  const handleSend = () => {
    onSend({
      recipientId: selectedRecipient,
      content,
      deliveryDelay: parseInt(deliveryDelay),
      includePackage,
      trackingNumber: includePackage ? trackingNumber : undefined
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
            {step === 'compose' ? 'Write Your Letter' : 'Schedule Delivery'}
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
              {/* Recipient Selection */}
              <div>
                <label className="block text-taupe-700 mb-3">To</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {recipients.map((recipient) => (
                    <button
                      key={recipient.id}
                      onClick={() => setSelectedRecipient(recipient.id)}
                      className={`p-4 rounded-xl border-2 transition-all ${
                        selectedRecipient === recipient.id
                          ? 'border-sage-400 bg-sage-50'
                          : 'border-taupe-200 hover:border-taupe-300 bg-white'
                      }`}
                    >
                      <div className={`w-12 h-12 ${recipient.avatarColor} rounded-full flex items-center justify-center mx-auto mb-2`}>
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <p className="text-taupe-700 text-center">{recipient.name}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Letter Content */}
              <div>
                <label className="block text-taupe-700 mb-3">Your Letter</label>
                <textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Take your time. Write from the heart..."
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
                <p className="text-taupe-500 mb-4">Choose how this letter will be celebrated when opened</p>
                
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

              {/* Package Inclusion */}
              <div className="border-t border-taupe-200 pt-6">
                <div className="flex items-center gap-3 mb-4">
                  <input
                    type="checkbox"
                    id="includePackage"
                    checked={includePackage}
                    onChange={(e) => setIncludePackage(e.target.checked)}
                    className="w-5 h-5 text-sage-600 border-taupe-300 rounded focus:ring-sage-500"
                  />
                  <label htmlFor="includePackage" className="text-taupe-700 font-medium">
                    Include a physical package
                  </label>
                </div>
                
                {includePackage && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-4 ml-8"
                  >
                    <div>
                      <label className="block text-taupe-700 mb-2">Package Tracking Number</label>
                      <input
                        type="text"
                        value={trackingNumber}
                        onChange={(e) => setTrackingNumber(e.target.value)}
                        placeholder="e.g., 1Z999AA10123456784"
                        className="w-full px-4 py-3 border-2 border-taupe-200 focus:border-sage-400 rounded-xl focus:outline-none transition-colors"
                        required
                      />
                      <p className="text-taupe-500 text-sm mt-2">
                        The letter will be delivered with the package arrival
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Delay Selection */}
              <div>
                <label className="block text-taupe-700 mb-4">
                  When should this letter arrive?
                </label>
                <p className="text-taupe-500 mb-6">
                  Anticipation makes the heart grow fonder. Choose a delivery delay that feels right.
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
              <div className="bg-sand-50 rounded-2xl p-6">
                <p className="text-taupe-600 mb-2">Your letter will arrive:</p>
                <p className="text-ink-700">
                  {new Date(Date.now() + parseInt(deliveryDelay) * 60 * 60 * 1000).toLocaleDateString('en-US', {
                    weekday: 'long',
                    month: 'long',
                    day: 'numeric',
                    hour: 'numeric',
                    minute: '2-digit'
                  })}
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-taupe-200 px-6 py-5 bg-sand-50 flex items-center justify-between">
          {step === 'compose' ? (
            <>
              <button
                onClick={onClose}
                className="px-6 py-3 text-taupe-600 hover:text-ink-700 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setStep('schedule')}
                disabled={!selectedRecipient || !content.trim()}
                className="px-8 py-3 bg-ink-600 hover:bg-ink-700 disabled:bg-taupe-300 text-sand-50 rounded-full transition-colors disabled:cursor-not-allowed flex items-center gap-2"
              >
                <span>Next</span>
                <Clock className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setStep('compose')}
                className="px-6 py-3 text-taupe-600 hover:text-ink-700 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSend}
                className="px-8 py-3 bg-sage-600 hover:bg-sage-700 text-sand-50 rounded-full transition-colors flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Send Letter</span>
              </button>
            </>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}