import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MapPin, Package, Clock, CheckCircle2, Circle } from 'lucide-react';

interface TrackingDetailsProps {
  onClose: () => void;
  letterId: string;
}

interface TrackingEvent {
  id: string;
  timestamp: Date;
  location: string;
  status: string;
  description: string;
  isCompleted: boolean;
}

const mockTrackingData = {
  id: '1',
  from: 'Maya',
  to: 'You',
  avatarColor: 'bg-sage-300',
  hasPackage: false,
  estimatedArrival: new Date(Date.now() + 12 * 60 * 60 * 1000),
  currentLocation: 'Distribution Center, Your City',
  progress: 75,
  events: [
    {
      id: '1',
      timestamp: new Date(Date.now() - 36 * 60 * 60 * 1000),
      location: 'Portland, OR',
      status: 'Letter Sent',
      description: 'Maya has sent you a letter with love',
      isCompleted: true
    },
    {
      id: '2',
      timestamp: new Date(Date.now() - 30 * 60 * 60 * 1000),
      location: 'Regional Processing Center',
      status: 'In Transit',
      description: 'Letter is traveling to your region',
      isCompleted: true
    },
    {
      id: '3',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      location: 'Distribution Center, Your City',
      status: 'Out for Delivery',
      description: 'Letter is in your area and will arrive soon',
      isCompleted: true
    },
    {
      id: '4',
      timestamp: new Date(Date.now() + 12 * 60 * 60 * 1000),
      location: 'Your Mailbox',
      status: 'Delivered',
      description: 'Letter will be ready to open',
      isCompleted: false
    }
  ]
};

export function TrackingDetails({ onClose, letterId }: TrackingDetailsProps) {
  const [data] = useState(mockTrackingData);

  const formatTimeRemaining = (date: Date) => {
    const totalHours = Math.floor((date.getTime() - Date.now()) / (1000 * 60 * 60));
    
    if (totalHours < 1) {
      const minutes = Math.floor((date.getTime() - Date.now()) / (1000 * 60));
      return `${minutes} minutes`;
    }
    
    if (totalHours < 24) {
      return `${totalHours} hour${totalHours !== 1 ? 's' : ''}`;
    }
    
    const days = Math.floor(totalHours / 24);
    const remainingHours = totalHours % 24;
    
    if (remainingHours === 0) {
      return `${days} day${days !== 1 ? 's' : ''}`;
    }
    
    return `${days}d ${remainingHours}h`;
  };

  const formatTimestamp = (date: Date) => {
    const now = Date.now();
    const diff = now - date.getTime();
    const diffHours = Math.floor(diff / (1000 * 60 * 60));
    
    if (diffHours < 1) {
      const minutes = Math.floor(diff / (1000 * 60));
      return `${minutes} minutes ago`;
    }
    
    if (diffHours < 24) {
      return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`;
    }
    
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
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
        className="bg-white rounded-3xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col"
        style={{ maxHeight: '90vh' }}
      >
        {/* Header */}
        <div className="border-b border-taupe-200 px-6 py-5 bg-sand-50">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-ink-700">Tracking Your Letter</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-sand-200 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-taupe-600" />
            </button>
          </div>

          {/* Summary Card */}
          <div className="bg-white rounded-xl p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-taupe-600 mb-1">From {data.from}</p>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-sage-600" />
                  <span className="text-sage-700">
                    Arriving in {formatTimeRemaining(data.estimatedArrival)}
                  </span>
                </div>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-sage-50 rounded-full">
                  <span className="text-sage-700">{data.progress}%</span>
                </div>
              </div>
            </div>

            {/* Progress bar */}
            <div className="relative h-2 bg-taupe-200 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${data.progress}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-sage-400 to-sage-500 rounded-full"
              />
              
              {/* Traveling indicator */}
              <motion.div
                animate={{
                  left: [`${Math.max(0, data.progress - 3)}%`, `${Math.min(100, data.progress + 3)}%`]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  ease: 'easeInOut'
                }}
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-sage-600 rounded-full shadow-lg"
                style={{ left: `${data.progress}%` }}
              />
            </div>
          </div>
        </div>

        {/* Tracking Timeline */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="space-y-6">
            {data.events.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="relative flex gap-4"
              >
                {/* Timeline line */}
                {index < data.events.length - 1 && (
                  <div className={`absolute left-4 top-10 bottom-0 w-0.5 ${
                    event.isCompleted ? 'bg-sage-300' : 'bg-taupe-200'
                  }`} />
                )}

                {/* Status icon */}
                <div className="relative flex-shrink-0">
                  {event.isCompleted ? (
                    <div className="w-8 h-8 bg-sage-500 rounded-full flex items-center justify-center">
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </div>
                  ) : (
                    <div className="w-8 h-8 bg-taupe-200 rounded-full flex items-center justify-center">
                      <Circle className="w-5 h-5 text-taupe-400" />
                    </div>
                  )}
                </div>

                {/* Event details */}
                <div className="flex-1 pb-6">
                  <div className={`rounded-xl p-4 ${
                    event.isCompleted ? 'bg-sage-50' : 'bg-sand-50'
                  }`}>
                    <div className="flex items-start justify-between mb-2">
                      <h3 className={`${
                        event.isCompleted ? 'text-sage-700' : 'text-taupe-600'
                      }`}>
                        {event.status}
                      </h3>
                      <span className="text-taupe-500">
                        {event.isCompleted ? formatTimestamp(event.timestamp) : 
                          event.timestamp.toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })
                        }
                      </span>
                    </div>
                    
                    <p className="text-taupe-600 mb-2">{event.description}</p>
                    
                    <div className="flex items-center gap-2 text-taupe-500">
                      <MapPin className="w-4 h-4" />
                      <span>{event.location}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom message */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="mt-8 p-6 bg-sand-50 rounded-2xl text-center"
          >
            <p className="text-taupe-600 mb-2">
              Your letter is traveling with care
            </p>
            <p className="text-taupe-500">
              You'll be notified when it arrives and is ready to open
            </p>
          </motion.div>
        </div>

        {/* Footer */}
        <div className="border-t border-taupe-200 px-6 py-4 bg-sand-50">
          <button
            onClick={onClose}
            className="w-full px-6 py-3 bg-ink-600 hover:bg-ink-700 text-sand-50 rounded-full transition-colors"
          >
            Close Tracking
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}