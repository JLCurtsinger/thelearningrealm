import React, { useState } from 'react';
import { Settings as AlphabetLatin, Speaker as SpeakerHigh, PencilLine, Search, Lock, Sparkles, Volume2 } from 'lucide-react';
import { FindLetterGame } from './games/FindLetterGame';
import { WordBuilderGame } from './games/WordBuilderGame';
import { LetterMatchingGame } from './games/LetterMatchingGame';
import { PhoneticSoundGame } from './games/PhoneticSoundGame';

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
    'shape-explorer': 'shapes'
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

  // Generate avatars for all games
  if (Object.keys(preGeneratedAvatars).length === 0) {
    [...mainGames, ...upcomingGames].forEach(game => {
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