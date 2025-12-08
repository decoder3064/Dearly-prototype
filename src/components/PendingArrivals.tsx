import { motion } from 'motion/react';
import { MapPin, Package, Plane, Truck, Mail, Pin } from 'lucide-react';

interface PendingArrival {
  id: string;
  from: string;
  avatarColor: string;
  sentDate: Date;
  arrivalDate: Date;
  progress: number;
  currentLocation: string;
  lastUpdate: string;
  hasPackage?: boolean;
  isUnopened?: boolean;
}

interface PendingArrivalsProps {
  onViewDetails: (id: string) => void;
}

const mockPendingLetters: PendingArrival[] = [
  {
    id: '1',
    from: 'Maya',
    avatarColor: 'bg-sage-300',
    sentDate: new Date(Date.now() - 36 * 60 * 60 * 1000),
    arrivalDate: new Date(Date.now() + 12 * 60 * 60 * 1000),
    progress: 75,
    currentLocation: 'Distribution Center, Your City',
    lastUpdate: '2 hours ago',
    hasPackage: false,
    isUnopened: true
  },
  {
    id: '2',
    from: 'Alex',
    avatarColor: 'bg-ink-300',
    sentDate: new Date(Date.now() - 24 * 60 * 60 * 1000),
    arrivalDate: new Date(Date.now() + 4 * 24 * 60 * 60 * 1000),
    progress: 20,
    currentLocation: 'Regional Sorting Facility',
    lastUpdate: '6 hours ago',
    hasPackage: true,
    isUnopened: true
  },
  {
    id: '3',
    from: 'Book Club',
    avatarColor: 'bg-sage-200',
    sentDate: new Date(Date.now() - 48 * 60 * 60 * 1000),
    arrivalDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000),
    progress: 40,
    currentLocation: 'In Transit',
    lastUpdate: '12 hours ago',
    hasPackage: false,
    isUnopened: true
  }
];

export function PendingArrivals({ onViewDetails }: PendingArrivalsProps) {
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

  const getTransportIcon = (progress: number) => {
    if (progress < 30) return Plane;
    if (progress < 70) return Truck;
    return Mail;
  };

  if (mockPendingLetters.length === 0) {
    return null;
  }

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-ink-700">Arriving Soon</h2>
          <p className="text-taupe-500 mt-1">Letters on their way to you</p>
        </div>
        <div className="flex items-center gap-2 text-sage-600">
          <div className="w-2 h-2 bg-sage-500 rounded-full animate-pulse" />
          <span>Live tracking</span>
        </div>
      </div>

      <div className="space-y-4">
        {mockPendingLetters.map((letter, index) => {
          const TransportIcon = getTransportIcon(letter.progress);
          
          return (
            <motion.button
              key={letter.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => onViewDetails(letter.id)}
              className="group w-full bg-white hover:bg-sand-50 rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 text-left border-2 border-transparent hover:border-sage-200"
            >
              <div className="flex items-start gap-4">
                {/* Avatar with notification badge */}
                <div className="relative flex-shrink-0">
                  <div className={`w-14 h-14 ${letter.avatarColor} rounded-full flex items-center justify-center group-hover:scale-105 transition-transform`}>
                    <Mail className="w-7 h-7 text-white" />
                  </div>
                  
                  {/* Pin indicator for unopened letters */}
                  {letter.isUnopened && (
                    <motion.div
                      initial={{ scale: 0, rotate: -45 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 500, damping: 15, delay: 0.2 }}
                      className="absolute -top-2 -right-2"
                    >
                      <div className="relative">
                        <Pin className="w-6 h-6 text-rose-500 fill-rose-500 drop-shadow-lg" style={{ transform: 'rotate(45deg)' }} />
                        <div className="absolute inset-0 bg-rose-400 blur-sm opacity-50 rounded-full" />
                      </div>
                    </motion.div>
                  )}
                  
                  {letter.hasPackage && (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-rose-400 rounded-full flex items-center justify-center border-2 border-white">
                      <Package className="w-3 h-3 text-white" />
                    </div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-ink-700 mb-1">Letter from {letter.from}</h3>
                      <p className="text-taupe-500">
                        Arrives in {formatTimeRemaining(letter.arrivalDate)}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-sage-50 rounded-full">
                        <TransportIcon className="w-4 h-4 text-sage-600" />
                        <span className="text-sage-700">{letter.progress}%</span>
                      </div>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="mb-3">
                    <div className="relative h-1.5 bg-taupe-200 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${letter.progress}%` }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-sage-400 to-sage-500 rounded-full"
                      />
                    </div>
                  </div>

                  {/* Location info */}
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 text-sage-600 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-taupe-700">{letter.currentLocation}</p>
                      <p className="text-taupe-400">Updated {letter.lastUpdate}</p>
                    </div>
                  </div>

                  {letter.hasPackage && (
                    <div className="mt-3 pt-3 border-t border-taupe-200">
                      <div className="flex items-center gap-2 text-rose-600">
                        <Package className="w-4 h-4" />
                        <span>Includes a package</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Hover indicator */}
              <div className="mt-4 pt-4 border-t border-taupe-200 opacity-0 group-hover:opacity-100 transition-opacity">
                <p className="text-sage-600 text-center">Click to view tracking details</p>
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
