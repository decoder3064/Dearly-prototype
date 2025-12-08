import { useState } from 'react';
import { AnimatePresence } from 'motion/react';
import { WelcomePage } from './components/WelcomePage';
import { Dashboard } from './components/Dashboard';
import { CreateLetter } from './components/CreateLetter';
import { CreateGroupLetter } from './components/CreateGroupLetter';
import { CreateGroup } from './components/CreateGroup';
import { AddFriend } from './components/AddFriend';
import { InTransit } from './components/InTransit';
import { LetterReveal } from './components/LetterReveal';
import { GroupView } from './components/GroupView';
import { CorrespondentView } from './components/CorrespondentView';
import { Settings } from './components/Settings';
import { PendingArrivals } from './components/PendingArrivals';
import { TrackingDetails } from './components/TrackingDetails';
import { Settings as SettingsIcon } from 'lucide-react';

type View = 'welcome' | 'dashboard' | 'create' | 'createGroup' | 'transit' | 'reveal' | 'settings' | 'tracking' | 'newGroup' | 'addFriend' | 'groupView' | 'correspondentView';

function App() {
  const [currentView, setCurrentView] = useState<View>('welcome');
  const [showSettings, setShowSettings] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<any>(null);
  const [selectedTrackingId, setSelectedTrackingId] = useState<string | null>(null);
  const [selectedCorrespondent, setSelectedCorrespondent] = useState<{ name: string; avatarColor: string } | null>(null);
  const [openedLetters, setOpenedLetters] = useState<Set<string>>(new Set());

  // Multiple mock letters for demo
  const mockLetters = [
    {
      id: 'maya-letter-1',
      from: 'Maya',
      content: `My dear friend,

I hope this letter finds you in a moment of peace. I've been thinking about our last conversation under the oak tree, how the afternoon light filtered through the leaves and painted everything in gold.

There's something about writing letters that feels sacred, doesn't it? Each word chosen carefully, each thought given space to breathe. In our world of instant messages, taking the time to craft something meaningful feels like an act of rebellion — a beautiful, quiet one.

I wanted to tell you how much your friendship means to me. Not in a hurried text between meetings, but here, in this slower space where gratitude can unfold properly.

Thank you for being someone who still believes in taking time, in letting things develop at their own pace, in the beauty of anticipation.

Until we meet again, I'm sending you warmth and light.

With love and slowness,
Maya`,
      date: 'December 7, 2025',
      avatarColor: 'bg-sage-300',
      isFirstOpen: !openedLetters.has('maya-letter-1'),
      celebrationType: 'hearts' as const,
      customMessage: 'Letter opened with love ✨'
    },
    {
      id: 'alex-letter-1',
      from: 'Alex',
      content: `Hey there,

I've been watching the snow fall outside my window and thinking about you. There's something magical about winter, isn't there? The way everything slows down, invites us to be more introspective.

I wanted to share some exciting news - I finally finished that painting I've been working on for months! The one inspired by our hike last summer. Looking at it makes me feel like I'm back there on that trail, surrounded by wildflowers and possibility.

Life moves so fast sometimes. I'm grateful we have this - a way to stay connected that feels intentional and meaningful. Every letter is a little treasure.

Can't wait to hear what you've been up to. Take your time responding - I'll be here, waiting patiently.

With gratitude,
Alex`,
      date: 'December 6, 2025',
      avatarColor: 'bg-ink-300',
      isFirstOpen: !openedLetters.has('alex-letter-1'),
      celebrationType: 'stars' as const,
      customMessage: 'Letter opened with gratitude 🙏'
    },
    {
      id: 'jordan-letter-1',
      from: 'Jordan',
      content: `Dear sibling,

Remember when we used to write secret notes to each other as kids? This feels a bit like that, except now we're adults with real responsibilities and complicated lives.

I've been thinking a lot about family lately, about how lucky I am to have you. Even though we're miles apart, these letters make me feel close to you in a way that texts never could.

Mom asked about you yesterday. I told her you're doing great, that you're taking care of yourself. I hope that's true. Remember to be kind to yourself, okay? You deserve that.

Looking forward to the holidays when we can catch up properly. Until then, know that you're loved and thought of often.

Your favorite sibling (obviously),
Jordan`,
      date: 'December 5, 2025',
      avatarColor: 'bg-rose-300',
      isFirstOpen: !openedLetters.has('jordan-letter-1'),
      celebrationType: 'sparkles' as const,
      customMessage: 'Letter opened with care 💝'
    },
    {
      id: 'sam-letter-1',
      from: 'Sam',
      content: `Old friend,

It's been what, three years since we last saw each other? Time has this funny way of stretching and compressing simultaneously. Some days it feels like yesterday we were sitting in that coffee shop planning our futures.

I've learned so much since then. About myself, about what matters, about how to be present. I wish I could share it all with you over a long walk, the way we used to.

Your last letter made me smile. I love hearing about the small moments in your life - the book you're reading, the recipe you tried, the sunset you stopped to admire. These details are what friendship is made of.

Keep writing. Keep being curious about the world. Keep being you.

With patience and hope,
Sam`,
      date: 'December 4, 2025',
      avatarColor: 'bg-aubergine-300',
      isFirstOpen: !openedLetters.has('sam-letter-1'),
      celebrationType: 'flowers' as const,
      customMessage: 'Letter opened with patience 🌱'
    },
    {
      id: 'riley-letter-1',
      from: 'Riley',
      content: `Hey cousin!

I was going through some old boxes at grandma's house and found the most amazing photos. There's one of us from that summer when we were like 8 and 10, covered in mud from playing in the creek behind her house. Remember that?

It got me thinking about how much has changed, but also how some things stay the same. Like how we can go months without talking and then pick right back up where we left off. That's family, I guess.

Grandma asked me to tell you she misses you and that you should visit more often. She's doing well, still making those incredible pies. I may have eaten three slices last weekend.

Hope life is treating you kindly. Can't wait to catch up properly soon.

Love always,
Riley`,
      date: 'November 15, 2025',
      avatarColor: 'bg-rose-400',
      isFirstOpen: !openedLetters.has('riley-letter-1'),
      celebrationType: 'hearts' as const,
      customMessage: 'Letter opened with joy 🌸'
    },
    {
      id: 'taylor-letter-1',
      from: 'Taylor',
      content: `Dear friend,

I hope this letter finds you well. I wanted to reach out because I've been reflecting on our conversations over the years, and I realize how much I've learned from you.

You have this unique ability to see potential in things others overlook. It's one of the qualities I admire most about you. In a world that rushes past everything, you take the time to truly observe.

I recently read something that made me think of you: "The art of living is more like wrestling than dancing." Sometimes we need to struggle with our circumstances to truly appreciate them. I think you understand this intuitively.

Keep nurturing that curiosity and patience. They will serve you well.

With deep respect,
Taylor`,
      date: 'October 28, 2025',
      avatarColor: 'bg-sage-400',
      isFirstOpen: !openedLetters.has('taylor-letter-1'),
      celebrationType: 'stars' as const,
      customMessage: 'Letter opened with wisdom ✨'
    },
    {
      id: 'morgan-letter-1',
      from: 'Morgan',
      content: `Hello,

Your advice about slowing down really changed my perspective. I've been trying to implement it at work, taking actual lunch breaks, not checking email after hours. It's harder than I thought it would be, but also more rewarding.

I wanted to thank you for that conversation we had. Sometimes we don't realize how much we need to hear something until someone says it. You have a gift for that - knowing what people need to hear.

Work has been intense lately, but in a good way. I'm learning to find the balance between ambition and wellbeing. It's a daily practice, not a destination.

How have you been? I'd love to hear about what you've been working on, thinking about, dreaming about.

Take care,
Morgan`,
      date: 'October 10, 2025',
      avatarColor: 'bg-ink-400',
      isFirstOpen: !openedLetters.has('morgan-letter-1'),
      celebrationType: 'sparkles' as const,
      customMessage: 'Letter opened with gratitude 🙏'
    },
    {
      id: 'casey-letter-1',
      from: 'Casey',
      content: `My dear friend,

Can you believe it's been twenty years since we first met? I was looking at old yearbook photos and couldn't stop smiling. We were so young, so certain about everything, so ready to take on the world.

And you know what? We did take it on. Maybe not in the ways we expected, but in ways that matter more. We grew, we learned, we became the people we needed to be.

I'm grateful we've maintained this friendship through all the changes - different cities, different jobs, different chapters of life. It says something about the foundation we built all those years ago.

Let's not wait another year to see each other. Life's too short, and true friendship is too precious.

With twenty years of love,
Casey`,
      date: 'September 22, 2025',
      avatarColor: 'bg-taupe-400',
      isFirstOpen: !openedLetters.has('casey-letter-1'),
      celebrationType: 'flowers' as const,
      customMessage: 'Letter opened with nostalgia 💝'
    }
  ];

  const handleSelectCorrespondent = (correspondentId: string) => {
    // Map correspondent ID to name and color
    const correspondentData: { [key: string]: { name: string; avatarColor: string } } = {
      '1': { name: 'Maya', avatarColor: 'bg-sage-300' },
      '2': { name: 'Alex', avatarColor: 'bg-ink-300' },
      '3': { name: 'Jordan', avatarColor: 'bg-rose-300' },
      '4': { name: 'Sam', avatarColor: 'bg-aubergine-300' },
      '5': { name: 'Riley', avatarColor: 'bg-rose-400' },
      '6': { name: 'Taylor', avatarColor: 'bg-forest-400' },
      '7': { name: 'Morgan', avatarColor: 'bg-aubergine-400' },
      '8': { name: 'Casey', avatarColor: 'bg-taupe-400' }
    };
    
    const correspondent = correspondentData[correspondentId];
    if (correspondent) {
      setSelectedCorrespondent(correspondent);
      setCurrentView('correspondentView');
    }
  };

  const handleOpenLetterFromCorrespondent = (letter: any) => {
    setSelectedLetter(letter);
    setCurrentView('reveal');
  };

  const handleLetterOpened = (letterId: string) => {
    setOpenedLetters(prev => new Set(prev).add(letterId));
  };

  const handleCreateLetter = () => {
    setCurrentView('create');
  };

  const handleCreateGroupLetter = () => {
    setCurrentView('createGroup');
  };

  const handleViewGroup = (groupId: string) => {
    setSelectedTrackingId(groupId);
    setCurrentView('groupView');
  };

  const handleCreateNewGroup = () => {
    setCurrentView('newGroup');
  };

  const handleAddFriend = () => {
    setCurrentView('addFriend');
  };

  const handleGroupCreated = (group: any) => {
    console.log('Group created:', group);
    setCurrentView('dashboard');
  };

  const handleFriendAdded = (friend: any) => {
    console.log('Friend added:', friend);
    setCurrentView('dashboard');
  };

  const handleViewInTransit = () => {
    setCurrentView('transit');
  };

  const handleViewPendingDetails = (letterId: string) => {
    setSelectedTrackingId(letterId);
    setCurrentView('tracking');
  };

  const handleSendLetter = (letter: any) => {
    console.log('Sending letter:', letter);
    setCurrentView('transit');
  };

  const handleCloseModal = () => {
    setCurrentView('dashboard');
    setSelectedLetter(null);
    setSelectedTrackingId(null);
    setSelectedCorrespondent(null);
  };

  // Show Welcome Page first
  if (currentView === 'welcome') {
    return (
      <AnimatePresence mode="wait">
        <WelcomePage onStart={() => setCurrentView('dashboard')} />
      </AnimatePresence>
    );
  }

  return (
    <div className="min-h-screen bg-sand-50">
      {/* Settings Button - Always visible */}
      <button
        onClick={() => setShowSettings(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-ink-600 hover:bg-ink-700 text-sand-50 rounded-full shadow-lg hover:shadow-xl transition-all z-40 flex items-center justify-center group"
      >
        <SettingsIcon className="w-6 h-6 group-hover:rotate-45 transition-transform duration-300" />
      </button>

      {/* Main Dashboard with Pending Arrivals */}
      <Dashboard
        onCreateLetter={handleCreateLetter}
        onCreateGroupLetter={handleCreateGroupLetter}
        onAddFriend={handleAddFriend}
        onCreateNewGroup={handleCreateNewGroup}
        onViewInTransit={handleViewInTransit}
        onSelectCorrespondent={handleSelectCorrespondent}
        onViewGroup={handleViewGroup}
        onViewPendingDetails={handleViewPendingDetails}
        openedLetters={openedLetters}
        allLetters={mockLetters}
      >
        <PendingArrivals onViewDetails={handleViewPendingDetails} />
      </Dashboard>

      {/* Modals */}
      <AnimatePresence>
        {currentView === 'create' && (
          <CreateLetter
            onClose={handleCloseModal}
            onSend={handleSendLetter}
          />
        )}

        {currentView === 'createGroup' && (
          <CreateGroupLetter
            onClose={handleCloseModal}
            onSend={handleSendLetter}
          />
        )}

        {currentView === 'newGroup' && (
          <CreateGroup
            onClose={handleCloseModal}
            onCreate={handleGroupCreated}
          />
        )}

        {currentView === 'addFriend' && (
          <AddFriend
            onClose={handleCloseModal}
            onAdd={handleFriendAdded}
          />
        )}

        {currentView === 'transit' && (
          <InTransit onClose={handleCloseModal} />
        )}

        {currentView === 'reveal' && selectedLetter && (
          <LetterReveal
            onClose={handleCloseModal}
            letter={selectedLetter}
            onLetterOpened={handleLetterOpened}
          />
        )}

        {currentView === 'tracking' && selectedTrackingId && (
          <TrackingDetails
            onClose={handleCloseModal}
            letterId={selectedTrackingId}
          />
        )}

        {currentView === 'groupView' && selectedTrackingId && (
          <GroupView
            onClose={handleCloseModal}
            groupId={selectedTrackingId}
          />
        )}

        {currentView === 'correspondentView' && selectedCorrespondent && (
          <CorrespondentView
            onClose={handleCloseModal}
            correspondentName={selectedCorrespondent.name}
            avatarColor={selectedCorrespondent.avatarColor}
            letters={mockLetters.filter(l => l.from === selectedCorrespondent.name).map(l => ({ ...l, isFirstOpen: !openedLetters.has(l.id) }))}
            onOpenLetter={handleOpenLetterFromCorrespondent}
          />
        )}

        {showSettings && (
          <Settings onClose={() => setShowSettings(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;