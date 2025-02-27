import React, { useState } from 'react';
import { Settings as AlphabetLatin, Speaker as SpeakerHigh, PencilLine, Search, Lock, Sparkles, Volume2, Gamepad2, Smile, Shirt, ToyBrick, Calculator, Shapes, MessageCircle, Clover } from 'lucide-react';
import { FindLetterGame } from './games/FindLetterGame';
import { WordBuilderGame } from './games/WordBuilderGame';
import { LetterMatchingGame } from './games/LetterMatchingGame';
import { PhoneticSoundGame } from './games/PhoneticSoundGame';
import { CountingGame } from './games/CountingGame';
import { ShapeSorterGame } from './games/ShapeSorterGame';
import { EmotionMatchGame } from './games/EmotionMatchGame';
import { ChatWithGPTGame } from './games/ChatWithGPTGame';
import { WhatAmIWearingGame } from './games/WhatAmIWearingGame';
import { WheresMyToyGame } from './games/WheresMyToyGame';
import { ICanMoveGame } from './games/ICanMoveGame';
import { ICanWaveGame } from './games/ICanWaveGame';
import { ICanJumpGame } from './games/ICanJumpGame';
import { ICanClapGame } from './games/ICanClapGame';
import { ICanStompGame } from './games/ICanStompGame';
import { ICanDoItAllGame } from './games/ICanDoItAllGame';

interface GamesPageProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
  language: string;
}

// Function to generate unique Dicebear avatar configurations
const generateUniqueAvatarConfig = (gameId: string) => {
  // Use the game ID as a base for the seed to ensure consistency
  const baseSeeds: Record<string, string> = {
    'letter-matching': 'teacher',
    'phonics': 'sound',
    'word-builder': 'writer',
    'find-letter': 'detective',
    'number-adventure': 'math',
    'shape-explorer': 'shapes',
    'counting': 'numbers',
    'shape-sorter': 'geometry',
    'emotion-match': 'feelings',
    'chat-with-gpt': 'conversation',
    'what-am-i-wearing': 'clothes',
    'wheres-my-toy': 'toys',
    'i-can-move': 'movement',
    'i-can-wave': 'greeting',
    'i-can-jump': 'jumping',
    'i-can-clap': 'clapping',
    'i-can-stomp': 'stomping',
    'i-can-do-it-all': 'actions'
  };
  
  // Get base seed or use gameId if not found
  const baseSeed = baseSeeds[gameId] || gameId;
  
  // Add randomization to ensure uniqueness but with deterministic values based on gameId
  // This ensures the same game always gets the same avatar
  const hash = gameId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const randomEyes = (hash % 16) + 1;
  const randomMouth = ((hash * 3) % 16) + 1;
  const randomColor = (hash * 7) % 360;
  
  // Create a unique configuration string
  return `${baseSeed}&backgroundColor=transparent&eyes=variant${randomEyes.toString().padStart(2, '0')}&mouth=variant${randomMouth.toString().padStart(2, '0')}&colors=primary,${randomColor}`;
};

// Pre-generate all avatar configurations
const preGeneratedAvatars: Record<string, string> = {};

export function GamesPage({ isDarkMode, isVibrant, t, language }: GamesPageProps) {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Audio feedback setup
  const playSound = (type: 'success' | 'click') => {
    // To be implemented with actual sound effects
    console.log(`Playing ${type} sound`);
  };

  // Main games data
  const mainGames = [
    {
      id: 'lettermatching',
      title: t.gamesPage.mainGames.letterMatching.title,
      description: t.gamesPage.mainGames.letterMatching.description,
      icon: AlphabetLatin,
      color: "from-blue-400 via-purple-400 to-pink-400",
      darkColor: "from-blue-500/30 via-purple-500/30 to-pink-500/30",
      lightColor: "from-blue-100 via-purple-50 to-pink-50"
    },
    {
      id: 'phonics',
      title: t.gamesPage.mainGames.phonics.title,
      description: t.gamesPage.mainGames.phonics.description,
      icon: SpeakerHigh,
      color: "from-green-400 via-emerald-400 to-teal-400",
      darkColor: "from-green-500/30 via-emerald-500/30 to-teal-500/30",
      lightColor: "from-green-100 via-emerald-50 to-teal-50"
    },
    {
      id: 'wordbuilder',
      title: t.gamesPage.mainGames.wordBuilder.title,
      description: t.gamesPage.mainGames.wordBuilder.description,
      icon: PencilLine,
      color: "from-yellow-400 via-orange-400 to-red-400",
      darkColor: "from-yellow-500/30 via-orange-500/30 to-red-500/30",
      lightColor: "from-yellow-100 via-orange-50 to-red-50"
    },
    {
      id: 'findletter',
      title: t.gamesPage.mainGames.findLetter.title,
      description: t.gamesPage.mainGames.findLetter.description,
      icon: Search,
      color: "from-purple-400 via-indigo-400 to-blue-400",
      darkColor: "from-purple-500/30 via-indigo-500/30 to-blue-500/30",
      lightColor: "from-purple-100 via-indigo-50 to-blue-50"
    }
  ];

  // Coming soon games
  const upcomingGames = [
    {
      id: 'numberadventure',
      title: t.gamesPage.upcomingGames.numberAdventure.title,
      description: t.gamesPage.upcomingGames.numberAdventure.description,
      icon: Lock,
      color: "from-pink-400 via-rose-400 to-red-400",
      darkColor: "from-pink-500/30 via-rose-500/30 to-red-500/30",
      lightColor: "from-pink-100 via-rose-50 to-red-50"
    },
    {
      id: 'shapeexplorer',
      title: t.gamesPage.upcomingGames.shapeExplorer.title,
      description: t.gamesPage.upcomingGames.shapeExplorer.description,
      icon: Lock,
      color: "from-teal-400 via-cyan-400 to-sky-400",
      darkColor: "from-teal-500/30 via-cyan-500/30 to-sky-500/30",
      lightColor: "from-teal-100 via-cyan-50 to-sky-50"
    }
  ];

  // Additional games data
  const additionalGames = [
    {
      id: 'counting',
      title: "Counting Adventure",
      description: "Learn to count objects and recognize numbers",
      icon: Calculator,
      color: "from-blue-400 via-indigo-400 to-violet-400",
      darkColor: "from-blue-500/30 via-indigo-500/30 to-violet-500/30",
      lightColor: "from-blue-100 via-indigo-50 to-violet-50"
    },
    {
      id: 'shapesorter',
      title: "Shape Sorter",
      description: "Sort and identify different shapes",
      icon: Shapes,
      color: "from-green-400 via-teal-400 to-cyan-400",
      darkColor: "from-green-500/30 via-teal-500/30 to-cyan-500/30",
      lightColor: "from-green-100 via-teal-50 to-cyan-50"
    },
    {
      id: 'emotionmatch',
      title: "Emotion Match",
      description: "Match emotions with facial expressions",
      icon: Smile,
      color: "from-yellow-400 via-amber-400 to-orange-400",
      darkColor: "from-yellow-500/30 via-amber-500/30 to-orange-500/30",
      lightColor: "from-yellow-100 via-amber-50 to-orange-50"
    },
    {
      id: 'chatwithgpt',
      title: "Chat with Animals",
      description: "Learn animal names and sounds through chat",
      icon: MessageCircle,
      color: "from-purple-400 via-fuchsia-400 to-pink-400",
      darkColor: "from-purple-500/30 via-fuchsia-500/30 to-pink-500/30",
      lightColor: "from-purple-100 via-fuchsia-50 to-pink-50"
    },
    {
      id: 'whatamiwearing',
      title: "What am I Wearing?",
      description: "Learn clothing items and colors",
      icon: Shirt,
      color: "from-red-400 via-rose-400 to-pink-400",
      darkColor: "from-red-500/30 via-rose-500/30 to-pink-500/30",
      lightColor: "from-red-100 via-rose-50 to-pink-50"
    },
    {
      id: 'wheresmytoy',
      title: "Where's My Toy?",
      description: "Find hidden toys and learn about locations",
      icon: ToyBrick,
      color: "from-cyan-400 via-sky-400 to-blue-400",
      darkColor: "from-cyan-500/30 via-sky-500/30 to-blue-500/30",
      lightColor: "from-cyan-100 via-sky-50 to-blue-50"
    },
    {
      id: 'icandoitall',
      title: "I Can Do It All!",
      description: "Practice all actions in one fun game",
      icon: Gamepad2,
      color: "from-emerald-400 via-green-400 to-lime-400",
      darkColor: "from-emerald-500/30 via-green-500/30 to-lime-500/30",
      lightColor: "from-emerald-100 via-green-50 to-lime-50"
    },
    {
      id: 'icanmove',
      title: "I Can Move!",
      description: "Learn about different movements and actions",
      icon: Clover,
      color: "from-violet-400 via-purple-400 to-fuchsia-400",
      darkColor: "from-violet-500/30 via-purple-500/30 to-fuchsia-500/30",
      lightColor: "from-violet-100 via-purple-50 to-fuchsia-50"
    }
  ];

  // Generate avatars for all games
  if (Object.keys(preGeneratedAvatars).length === 0) {
    [...mainGames, ...upcomingGames, ...additionalGames].forEach(game => {
      preGeneratedAvatars[game.id] = generateUniqueAvatarConfig(game.id);
    });
  }

  // Render active game or game selection
  if (activeGame === 'lettermatching') {
    return (
      <LetterMatchingGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'phonics') {
    return (
      <PhoneticSoundGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'findletter') {
    return (
      <FindLetterGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'wordbuilder') {
    return (
      <WordBuilderGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'counting') {
    return (
      <CountingGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'shapesorter') {
    return (
      <ShapeSorterGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'emotionmatch') {
    return (
      <EmotionMatchGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'chatwithgpt') {
    return (
      <ChatWithGPTGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'whatamiwearing') {
    return (
      <WhatAmIWearingGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'wheresmytoy') {
    return (
      <WheresMyToyGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'icanmove') {
    return (
      <ICanMoveGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'icanwave') {
    return (
      <ICanWaveGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'icanjump') {
    return (
      <ICanJumpGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'icanclap') {
    return (
      <ICanClapGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'icanstomp') {
    return (
      <ICanStompGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'icandoitall') {
    return (
      <ICanDoItAllGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Main Games Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mainGames.map((game, index) => (
            <button
              key={index}
              onClick={() => {
                playSound('click');
                setActiveGame(game.id);
              }}
              className={`
                relative p-8 rounded-3xl
                transform hover:scale-105 transition-all duration-500
                focus:outline-none focus:ring-4 focus:ring-purple-400
                shadow-xl
                group
                cursor-pointer
                overflow-hidden
              `}
            >
              {/* Gradient Background */}
              <div className={`
                absolute inset-0
                bg-gradient-to-br
                ${isDarkMode ? game.darkColor : game.lightColor}
                group-hover:opacity-80
                transition-opacity
              `} />

              {/* Glowing Effect */}
              <div className={`
                absolute inset-0
                bg-gradient-to-br ${game.color}
                opacity-0 group-hover:opacity-20
                transition-opacity
                blur-xl
              `} />

              {/* Content */}
              <div className="relative flex flex-col items-center space-y-6">
                {/* Dicebear Character */}
                <div className="w-24 h-24 transform group-hover:scale-110 transition-transform duration-500">
                  <img
                    src={`https://api.dicebear.com/7.x/bottts/svg?seed=${preGeneratedAvatars[game.id] || game.id}`}
                    alt={game.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=fallback";
                    }}
                  />
                </div>

                <div className="text-center">
                  <h3 className={`
                    text-2xl font-bold mb-2 font-comic
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}>
                    {game.title}
                  </h3>
                  <p className={`
                    text-lg
                    ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                  `}>
                    {game.description}
                  </p>
                </div>

                {/* Sound Indicator */}
                <Volume2 className={`
                  w-6 h-6
                  ${isDarkMode ? 'text-white/50' : 'text-gray-900/50'}
                  animate-pulse
                `} />
              </div>
            </button>
          ))}
        </div>

        {/* Additional Games Section */}
        <div className="mt-12">
          <h2 className={`
            text-2xl font-bold mb-8 font-comic
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            Additional Project Cards
            <Sparkles className="inline-block w-6 h-6 ml-2 text-yellow-400 animate-pulse" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {additionalGames.map((game, index) => (
              <button
                key={index}
                onClick={() => {
                  playSound('click');
                  setActiveGame(game.id);
                }}
                className={`
                  relative p-6 rounded-2xl
                  transform hover:scale-105 transition-all duration-500
                  focus:outline-none focus:ring-4 focus:ring-purple-400
                  shadow-lg
                  group
                  cursor-pointer
                  overflow-hidden
                `}
              >
                {/* Gradient Background */}
                <div className={`
                  absolute inset-0
                  bg-gradient-to-br
                  ${isDarkMode ? game.darkColor : game.lightColor}
                  group-hover:opacity-80
                  transition-opacity
                `} />

                {/* Glowing Effect */}
                <div className={`
                  absolute inset-0
                  bg-gradient-to-br ${game.color}
                  opacity-0 group-hover:opacity-20
                  transition-opacity
                  blur-xl
                `} />

                {/* Content */}
                <div className="relative flex flex-col items-center space-y-4">
                  {/* Dicebear Character */}
                  <div className="w-20 h-20 transform group-hover:scale-110 transition-transform duration-500">
                    <img
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${preGeneratedAvatars[game.id] || game.id}`}
                      alt={game.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=fallback";
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <h3 className={`
                      text-xl font-bold mb-1 font-comic
                      ${isDarkMode ? 'text-white' : 'text-gray-900'}
                    `}>
                      {game.title}
                    </h3>
                    <p className={`
                      text-sm
                      ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                    `}>
                      {game.description}
                    </p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Coming Soon Section */}
        <div className="mt-12">
          <h2 className={`
            text-2xl font-bold mb-8 font-comic
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            {t.gamesPage.upcomingGames.numberAdventure.description}
            <Sparkles className="inline-block w-6 h-6 ml-2 text-yellow-400 animate-pulse" />
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingGames.map((game, index) => (
              <div
                key={index}
                className={`
                  relative p-8 rounded-3xl
                  transform hover:scale-102 transition-all duration-300
                  shadow-xl
                  group
                  overflow-hidden
                  opacity-75
                `}
              >
                {/* Gradient Background */}
                <div className={`
                  absolute inset-0
                  bg-gradient-to-br
                  ${isDarkMode ? game.darkColor : game.lightColor}
                  transition-opacity
                `} />

                {/* Content */}
                <div className="relative flex flex-col items-center space-y-6">
                  {/* Dicebear Character */}
                  <div className="w-24 h-24 opacity-60">
                    <img
                      src={`https://api.dicebear.com/7.x/bottts/svg?seed=${preGeneratedAvatars[game.id] || game.id}`}
                      alt={game.title}
                      className="w-full h-full object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.onerror = null;
                        target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=fallback";
                      }}
                    />
                  </div>

                  <div className="text-center">
                    <h3 className={`
                      text-2xl font-bold mb-2 font-comic
                      ${isDarkMode ? 'text-white/75' : 'text-gray-900/75'}
                    `}>
                      {game.title}
                    </h3>
                    <p className={`
                      text-lg
                      ${isDarkMode ? 'text-gray-300/75' : 'text-gray-600/75'}
                    `}>
                      {game.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
