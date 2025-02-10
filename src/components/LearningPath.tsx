import React, { useState, useEffect } from 'react';
import { Sparkles } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { getPlacementTestResult, type Lesson } from '../utils/placementTestStorage';
import { PlacementTestChat } from './chat/PlacementTestChat';
import { CountingGame } from './games/CountingGame';
import { LetterMatchingGame } from './games/LetterMatchingGame';
import { FindLetterGame } from './games/FindLetterGame';
import { PhoneticSoundGame } from './games/PhoneticSoundGame';
import { WordBuilderGame } from './games/WordBuilderGame';
import { ShapeSorterGame } from './games/ShapeSorterGame';
import { EmotionMatchGame } from './games/EmotionMatchGame';
import { ChatWithGPTGame } from './games/ChatWithGPTGame';
import { WhatAmIWearingGame } from './games/WhatAmIWearingGame';
import { WheresMyToyGame } from './games/WheresMyToyGame';

interface LearningPathProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
  language: string;
}

// Avatar configurations for each game
const GAME_AVATARS: Record<string, string> = {
  'lettermatching': 'teacher&backgroundColor=transparent&eyes=variant09&mouth=smile&hair=long16',
  'counting': 'math&backgroundColor=transparent&eyes=variant06&mouth=variant06&hair=long15',
  'findletter': 'detective&backgroundColor=transparent&eyes=variant04&mouth=variant04&hair=long14',
  'phoneticsound': 'sound&backgroundColor=transparent&eyes=variant07&mouth=variant07&hair=long13',
  'wordbuilder': 'writer&backgroundColor=transparent&eyes=variant05&mouth=variant05&hair=long12',
  'shapesorter': 'shapes&backgroundColor=transparent&eyes=variant03&mouth=variant03&hair=long11',
  'emotionmatch': 'happy&backgroundColor=transparent&eyes=variant02&mouth=variant02&hair=long10',
  'chatwithgpt': 'chat&backgroundColor=transparent&eyes=variant01&mouth=variant01&hair=long09',
  'whatamiwearing': 'fashion&backgroundColor=transparent&eyes=variant08&mouth=variant08&hair=long08',
  'wheresmytoy': 'explorer&backgroundColor=transparent&eyes=variant10&mouth=variant10&hair=long07'
};

// Default games for users without placement test results
const DEFAULT_LESSONS: Lesson[] = [
  {
    id: 'lettermatching',
    title: '📝 Letter Matching',
    description: 'Match letters with pictures that start with that letter',
    targetSkills: ['letters', 'phonics', 'letter-sound-correspondence', 'vocabulary'],
    difficultyLevel: 'beginner',
    icon: 'letter-matching',
    component: 'LetterMatchingGame'
  },
  {
    id: 'counting',
    title: '🔢 Counting Adventure',
    description: 'Learn to count objects and recognize numbers',
    targetSkills: ['numbers', 'counting', 'quantity-recognition', 'decision-making'],
    difficultyLevel: 'beginner',
    icon: 'counting',
    component: 'CountingGame'
  }
];

// Map component names to actual components
const GAME_COMPONENTS: Record<string, React.ComponentType<any>> = {
  'CountingGame': CountingGame,
  'LetterMatchingGame': LetterMatchingGame,
  'FindLetterGame': FindLetterGame,
  'PhoneticSoundGame': PhoneticSoundGame,
  'WordBuilderGame': WordBuilderGame,
  'ShapeSorterGame': ShapeSorterGame,
  'EmotionMatchGame': EmotionMatchGame,
  'ChatWithGPTGame': ChatWithGPTGame,
  'WhatAmIWearingGame': WhatAmIWearingGame,
  'WheresMyToyGame': WheresMyToyGame
};

export function LearningPath({ isDarkMode, isVibrant, t, language }: LearningPathProps) {
  const { user } = useAuth();
  const [activeGame, setActiveGame] = useState<string | null>(null);
  const [displayedLessons, setDisplayedLessons] = useState<Lesson[]>(DEFAULT_LESSONS);
  const [showPlacementTest, setShowPlacementTest] = useState(false);

  useEffect(() => {
    const loadRecommendedLessons = async () => {
      if (user) {
        const result = await getPlacementTestResult(user.uid);
        if (result?.lessons) {
          setDisplayedLessons(result.lessons.slice(0, 2));
        }
      } else {
        setDisplayedLessons(DEFAULT_LESSONS);
      }
    };

    loadRecommendedLessons();
  }, [user]);

  const handlePlacementTestComplete = (result: { lessons: Lesson[] }) => {
    setDisplayedLessons(result.lessons.slice(0, 2));
    setShowPlacementTest(false);
  };

  if (activeGame) {
    const selectedLesson = displayedLessons.find(lesson => lesson.id === activeGame);
    if (selectedLesson?.component) {
      const GameComponent = GAME_COMPONENTS[selectedLesson.component];
      if (GameComponent) {
        return (
          <GameComponent
            isDarkMode={isDarkMode}
            isVibrant={isVibrant}
            onExit={() => setActiveGame(null)}
            language={language}
          />
        );
      }
    }
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] pt-20 pb-8 px-4">
      <div className="max-w-[80%] mx-auto">
        {/* Lesson Cards Grid */}
        <div className="flex flex-col space-y-12">
          {displayedLessons.map((lesson) => (
            <div
              key={lesson.id}
              className={`
                relative transform
                hover:scale-105
                transition-all duration-500
                w-full
                mx-auto
              `}
            >
              <button
                onClick={() => setActiveGame(lesson.id)}
                className={`
                  relative w-full
                  flex flex-col items-center
                  rounded-3xl
                  transition-all duration-500
                  overflow-hidden
                  focus:outline-none focus:ring-4 focus:ring-purple-400
                  ${isDarkMode ? 'bg-gray-800/95' : 'bg-white/95'}
                  shadow-2xl
                  group
                  aspect-[2/1]
                `}
              >
                {/* Gradient Background */}
                <div className={`
                  absolute inset-0
                  bg-gradient-to-br from-purple-400 via-pink-500 to-red-500
                  opacity-15
                  group-hover:opacity-30
                  transition-opacity duration-500
                `} />

                {/* Content Area */}
                <div className="relative flex w-full h-full">
                  {/* Avatar Container - Left Side */}
                  <div className="flex-1 flex items-center justify-center p-8">
                    <div className="w-72 h-72 transform group-hover:scale-110 transition-transform duration-500">
                      <img
                        src={`https://api.dicebear.com/7.x/adventurer/svg?seed=${GAME_AVATARS[lesson.id]}`}
                        alt={lesson.title}
                        className="w-full h-full object-contain"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.onerror = null;
                          target.src = "https://api.dicebear.com/7.x/adventurer/svg?seed=fallback";
                        }}
                      />
                    </div>
                  </div>

                  {/* Text Content - Right Side */}
                  <div className="flex-1 flex flex-col justify-center p-8">
                    <h3 className={`
                      text-3xl font-bold mb-4 font-comic
                      ${isDarkMode ? 'text-white' : 'text-gray-900'}
                    `}>
                      {lesson.title}
                    </h3>
                    <p className={`
                      text-lg mb-6
                      ${isDarkMode ? 'text-white/75' : 'text-gray-700/75'}
                    `}>
                      {lesson.description}
                    </p>
                  </div>
                </div>

                {/* Sparkle Effect on Hover */}
                <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Sparkles
                      key={i}
                      className={`
                        absolute w-6 h-6
                        text-yellow-400
                        animate-pulse
                      `}
                      style={{
                        top: `${Math.random() * 100}%`,
                        left: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`
                      }}
                    />
                  ))}
                </div>
              </button>
            </div>
          ))}
        </div>

        {/* Placement Test Modal */}
        {showPlacementTest && (
          <PlacementTestChat
            isDarkMode={isDarkMode}
            isVibrant={isVibrant}
            onComplete={handlePlacementTestComplete}
          />
        )}
      </div>
    </div>
  );
}