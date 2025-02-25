import React, { useState } from 'react';
import { Settings as AlphabetLatin, Speaker as SpeakerHigh, PencilLine, Search, Lock, Sparkles, Volume2 } from 'lucide-react';
import { FindLetterGame } from './FindLetterGame';
import { WordBuilderGame } from './WordBuilderGame';
import { LetterMatchingGame } from './LetterMatchingGame';
import { PhoneticSoundGame } from './PhoneticSoundGame';

interface GamesPageProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
  language: string;
}

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
      id: 'letter-matching',
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
      id: 'word-builder',
      title: t.gamesPage.mainGames.wordBuilder.title,
      description: t.gamesPage.mainGames.wordBuilder.description,
      icon: PencilLine,
      color: "from-yellow-400 via-orange-400 to-red-400",
      darkColor: "from-yellow-500/30 via-orange-500/30 to-red-500/30",
      lightColor: "from-yellow-100 via-orange-50 to-red-50"
    },
    {
      id: 'find-letter',
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
      title: t.gamesPage.upcomingGames.numberAdventure.title,
      description: t.gamesPage.upcomingGames.numberAdventure.description,
      icon: Lock,
      color: "from-pink-400 via-rose-400 to-red-400",
      darkColor: "from-pink-500/30 via-rose-500/30 to-red-500/30",
      lightColor: "from-pink-100 via-rose-50 to-red-50"
    },
    {
      title: t.gamesPage.upcomingGames.shapeExplorer.title,
      description: t.gamesPage.upcomingGames.shapeExplorer.description,
      icon: Lock,
      color: "from-teal-400 via-cyan-400 to-sky-400",
      darkColor: "from-teal-500/30 via-cyan-500/30 to-sky-500/30",
      lightColor: "from-teal-100 via-cyan-50 to-sky-50"
    }
  ];

  // Render active game or game selection
  if (activeGame === 'letter-matching') {
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

  if (activeGame === 'find-letter') {
    return (
      <FindLetterGame
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        onExit={() => setActiveGame(null)}
        language={language}
      />
    );
  }

  if (activeGame === 'word-builder') {
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
                <game.icon className={`
                  w-24 h-24
                  ${isVibrant
                    ? `bg-gradient-to-r ${game.color} [background-clip:text] text-transparent`
                    : isDarkMode
                      ? 'text-white'
                      : 'text-gray-900'
                  }
                  animate-float
                `} />

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
                  <game.icon className={`
                    w-24 h-24
                    ${isVibrant
                      ? `bg-gradient-to-r ${game.color} [background-clip:text] text-transparent`
                      : isDarkMode
                        ? 'text-white/50'
                        : 'text-gray-900/50'
                    }
                  `} />

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