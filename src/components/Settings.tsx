import { motion } from 'motion/react';
import { X, User, Bell, Lock, Palette, Mail, Heart, Star, Sparkles, Flower2 } from 'lucide-react';
import { useState } from 'react';

interface SettingsProps {
  onClose: () => void;
}

export function Settings({ onClose }: SettingsProps) {
  const [celebrationType, setCelebrationType] = useState<'hearts' | 'stars' | 'sparkles' | 'flowers'>('hearts');
  const [customMessage, setCustomMessage] = useState('Letter opened with love ✨');

  const celebrationOptions = [
    { value: 'hearts' as const, label: 'Hearts', icon: Heart, color: 'text-rose-500' },
    { value: 'stars' as const, label: 'Stars', icon: Star, color: 'text-yellow-500' },
    { value: 'sparkles' as const, label: 'Sparkles', icon: Sparkles, color: 'text-purple-500' },
    { value: 'flowers' as const, label: 'Flowers', icon: Flower2, color: 'text-green-500' }
  ];

  const messagePresets = [
    'Letter opened with love ✨',
    'Letter opened with patience 🌱',
    'Letter opened with care 💝',
    'Letter opened with joy 🌟',
    'Letter opened with gratitude 🙏',
    'Letter opened with curiosity ✨'
  ];

  const settingsSections = [
    {
      title: 'Profile',
      icon: User,
      items: [
        { label: 'Display Name', value: 'You', action: 'Edit' },
        { label: 'Personal Note', value: 'Lover of slow letters', action: 'Edit' }
      ]
    },
    {
      title: 'Notifications',
      icon: Bell,
      items: [
        { label: 'Letter Arrivals', value: 'Enabled', action: 'Toggle' },
        { label: 'Reminders to Write', value: 'Weekly', action: 'Change' }
      ]
    },
    {
      title: 'Letter Opening',
      icon: Mail,
      items: [],
      customContent: (
        <div className="space-y-6">
          <div>
            <p className="text-taupe-700 mb-3">Celebration Style</p>
            <p className="text-taupe-500 mb-4">Choose what appears when you open a letter for the first time</p>
            <div className="grid grid-cols-4 gap-3">
              {celebrationOptions.map((option) => {
                const OptionIcon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setCelebrationType(option.value)}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      celebrationType === option.value
                        ? 'border-sage-400 bg-sage-50'
                        : 'border-taupe-200 hover:border-taupe-300 bg-white'
                    }`}
                  >
                    <OptionIcon className={`w-8 h-8 mx-auto mb-2 ${option.color}`} />
                    <p className="text-taupe-700 text-center text-sm">{option.label}</p>
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="text-taupe-700 mb-3">Opening Message</p>
            <p className="text-taupe-500 mb-4">What message appears when you open a letter?</p>
            
            {/* Preset messages */}
            <div className="space-y-2 mb-4">
              {messagePresets.map((preset) => (
                <button
                  key={preset}
                  onClick={() => setCustomMessage(preset)}
                  className={`w-full text-left px-4 py-3 rounded-xl border-2 transition-all ${
                    customMessage === preset
                      ? 'border-sage-400 bg-sage-50 text-sage-700'
                      : 'border-taupe-200 hover:border-taupe-300 bg-white text-taupe-700'
                  }`}
                >
                  {preset}
                </button>
              ))}
            </div>

            {/* Custom message input */}
            <div>
              <label className="text-taupe-600 text-sm mb-2 block">Or write your own:</label>
              <input
                type="text"
                value={customMessage}
                onChange={(e) => setCustomMessage(e.target.value)}
                placeholder="Letter opened with..."
                className="w-full px-4 py-3 border-2 border-taupe-200 focus:border-sage-400 rounded-xl focus:outline-none transition-colors"
                maxLength={50}
              />
              <p className="text-taupe-400 text-sm mt-1">{customMessage.length}/50 characters</p>
            </div>
          </div>
        </div>
      )
    },
    {
      title: 'Appearance',
      icon: Palette,
      items: [
        { label: 'Color Theme', value: 'Warm Sand', action: 'Change' },
        { label: 'Font Size', value: 'Comfortable', action: 'Adjust' }
      ]
    },
    {
      title: 'Privacy',
      icon: Lock,
      items: [
        { label: 'Letter Archive', value: 'Private', action: 'Manage' },
        { label: 'Read Receipts', value: 'Off', action: 'Toggle' }
      ]
    }
  ];

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
          <h2 className="text-ink-700">Settings</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-sand-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-taupe-600" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="space-y-8">
            {settingsSections.map((section, sectionIndex) => {
              const Icon = section.icon;
              return (
                <motion.div
                  key={section.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: sectionIndex * 0.1 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-8 bg-sage-100 rounded-lg flex items-center justify-center">
                      <Icon className="w-4 h-4 text-sage-600" />
                    </div>
                    <h3 className="text-ink-700">{section.title}</h3>
                  </div>

                  {/* Custom content for special sections */}
                  {'customContent' in section && section.customContent}

                  {/* Regular items */}
                  <div className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <div
                        key={itemIndex}
                        className="bg-sand-50 hover:bg-sand-100 rounded-xl p-4 transition-colors cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-taupe-700 mb-1">{item.label}</p>
                            <p className="text-taupe-500">{item.value}</p>
                          </div>
                          <button className="text-sage-600 hover:text-sage-700 transition-colors">
                            {item.action}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              );
            })}

            {/* About Section */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="pt-8 border-t border-taupe-200"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-ink-100 rounded-lg flex items-center justify-center">
                  <Mail className="w-4 h-4 text-ink-600" />
                </div>
                <h3 className="text-ink-700">About</h3>
              </div>
              <div className="bg-sand-50 rounded-xl p-6 space-y-3">
                <p className="text-taupe-700">
                  Slow Letters is designed to bring back the art of thoughtful correspondence in a digital age.
                </p>
                <p className="text-taupe-500">
                  Version 1.0.0
                </p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-taupe-200 px-6 py-4 bg-sand-50">
          <p className="text-taupe-500 text-center">
            Take your time. Every setting matters.
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}