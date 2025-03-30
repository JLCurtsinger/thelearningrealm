import React from 'react';
import { Volume2, Sparkles } from 'lucide-react';
import { GameData } from './GameData';

interface GameListProps {
  mainGames: GameData[];
  additionalGames: GameData[];
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
  onGameSelect: (gameId: string) => void;
}

// Avatar configurations for each game with transparent backgrounds
const GAME_AVATARS: Record<string, string> = {
  'bubblepop': 'underwater&backgroundColor=transparent&eyes=happy&mouth=smile&backgroundType=gradientLinear&backgroundRotation=0',
  'lettermatching': 'teacher&backgroundColor=transparent&eyes=variant09&mouth=smile&backgroundType=gradientLinear&backgroundRotation=0',
  'counting': 'math&backgroundColor=transparent&eyes=variant06&mouth=variant06&backgroundType=gradientLinear&backgroundRotation=0',
  'findletter': 'detective&backgroundColor=transparent&eyes=variant04&mouth=variant04&backgroundType=gradientLinear&backgroundRotation=0',
  'phoneticsound': 'sound&backgroundColor=transparent&eyes=variant07&mouth=variant07&backgroundType=gradientLinear&backgroundRotation=0',
  'wordbuilder': 'writer&backgroundColor=transparent&eyes=variant05&mouth=variant05&backgroundType=gradientLinear&backgroundRotation=0',
  'shapesorter': 'shapes&backgroundColor=transparent&eyes=variant03&mouth=variant03&backgroundType=gradientLinear&backgroundRotation=0',
  'emotionmatch': 'happy&backgroundColor=transparent&eyes=variant02&mouth=variant02&backgroundType=gradientLinear&backgroundRotation=0',
  'chatwithgpt': 'chat&backgroundColor=transparent&eyes=variant01&mouth=variant01&backgroundType=gradientLinear&backgroundRotation=0',
  'whatamiwearing': 'fashion&backgroundColor=transparent&eyes=variant08&mouth=variant08&backgroundType=gradientLinear&backgroundRotation=0',
  'wheresmytoy': 'explorer&backgroundColor=transparent&eyes=variant10&mouth=variant10&backgroundType=gradientLinear&backgroundRotation=0'
};

// Function to get avatar URL with fallback
const getAvatarUrl = (gameId: string) => {
  const seed = GAME_AVATARS[gameId] || `default-${gameId}`;
  return `https://api.dicebear.com/7.x/adventurer/svg?seed=${seed}`;
};

export function GameList({ mainGames, additionalGames, isDarkMode, isVibrant, t, onGameSelect }: GameListProps) {
  return (
    <div className="space-y-12">
      {/* Main Games Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {mainGames.map((game, index) => (
          <button
            key={index}
            onClick={() => onGameSelect(game.id)}
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
              {/* Game Avatar */}
              <div className={`
                w-24 h-24 rounded-full overflow-hidden
                ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}
                shadow-lg
                transition-all duration-300
              `}>
                <img
                  src={getAvatarUrl(game.id)}
                  alt={game.title}
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=fallback&backgroundColor=transparent`;
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
          Additional Games
          <Sparkles className="inline-block w-6 h-6 ml-2 text-yellow-400 animate-pulse" />
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {additionalGames.map((game, index) => (
            <button
              key={index}
              onClick={() => onGameSelect(game.id)}
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
                {/* Game Avatar */}
                <div className={`
                  w-20 h-20 rounded-full overflow-hidden
                  ${isDarkMode ? 'bg-gray-800' : 'bg-gray-100'}
                  shadow-lg
                  transition-all duration-300
                `}>
                  <img
                    src={getAvatarUrl(game.id)}
                    alt={game.title}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.onerror = null;
                      target.src = `https://api.dicebear.com/7.x/adventurer/svg?seed=fallback&backgroundColor=transparent`;
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
    </div>
  );
}