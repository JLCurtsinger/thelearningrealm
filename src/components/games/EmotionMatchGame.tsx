import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface EmotionMatchGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Emotion data with DiceBear avatars
const EMOTIONS = [
  { name: 'happy', prompt: 'Find the happy face!', seed: 'happy&eyes=happy&mouth=smile' },
  { name: 'sad', prompt: 'Where is the sad face?', seed: 'sad&eyes=cry&mouth=frown' },
  { name: 'surprised', prompt: 'Can you find the surprised face?', seed: 'surprised&eyes=wide&mouth=open' },
  { name: 'sleepy', prompt: 'Who looks sleepy?', seed: 'sleepy&eyes=closed&mouth=sleep' },
  { name: 'excited', prompt: 'Find the excited face!', seed: 'excited&eyes=stars&mouth=laugh' }
];

export function EmotionMatchGame({ isDarkMode, isVibrant, onExit, language }: EmotionMatchGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentEmotion, setCurrentEmotion] = useState<typeof EMOTIONS[0] | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [level, setLevel] = useState(1);
  const [totalLevels] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionError, setIsOptionError] = useState(false);
  const [showEmotionLabel, setShowEmotionLabel] = useState(false);
  const [isEmotionAnimating, setIsEmotionAnimating] = useState(false);

  // Initialize game
  useEffect(() => {
    generateNewRound();
  }, []);

  // Generate a new round
  const generateNewRound = () => {
    setIsTransitioning(true);
    setShowEmotionLabel(false);
    setSelectedOption(null);
    
    // Select random emotion
    const newEmotion = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
    setCurrentEmotion(newEmotion);
    
    // Generate three random emotions for options
    let emotionOptions = [newEmotion.name];
    while (emotionOptions.length < 3) {
      const randomEmotion = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
      if (!emotionOptions.includes(randomEmotion.name)) {
        emotionOptions.push(randomEmotion.name);
      }
    }
    
    // Shuffle options
    emotionOptions = emotionOptions.sort(() => Math.random() - 0.5);
    setOptions(emotionOptions);

    // Speak the prompt
    if (soundEnabled) {
      const prompt = language === 'es'
        ? `¿Puedes encontrar la cara ${newEmotion.name}?`
        : newEmotion.prompt;
      speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // Handle emotion selection
  const handleEmotionClick = (emotion: string) => {
    if (!currentEmotion) return;
    setSelectedOption(emotion);

    if (emotion === currentEmotion.name) {
      // Correct answer
      playGameSound('success');
      setScore(score + 1);
      setShowEmotionLabel(true);
      setIsEmotionAnimating(true);
      
      // Celebration voice feedback
      if (soundEnabled) {
        const celebration = language === 'es'
          ? '¡Excelente trabajo!'
          : 'Great job!';
        speakText(celebration, language === 'es' ? 'es-ES' : 'en-US');
      }

      setShowCelebration(true);
      
      setTimeout(() => {
        setIsEmotionAnimating(false);
        setShowCelebration(false);
        if (level < totalLevels) {
          setLevel(prev => prev + 1);
          generateNewRound();
        }
      }, 2000);
    } else {
      // Wrong answer
      playGameSound('error');
      setIsOptionError(true);
      
      if (soundEnabled) {
        const tryAgain = language === 'es'
          ? 'Inténtalo de nuevo'
          : 'Try again';
        speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
      }

      setTimeout(() => {
        setIsOptionError(false);
        setSelectedOption(null);
      }, 500);
    }
  };

  if (!currentEmotion) return null;

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onExit}
            className={`
              p-2 rounded-full
              ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
              shadow-lg
              transition-transform hover:scale-110
            `}
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-4">
            {/* Progress Indicator */}
            <div className={`
              px-4 py-2 rounded-full font-bold
              ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
              shadow-lg
            `}>
              {language === 'es'
                ? `Nivel ${level} de ${totalLevels}`
                : `Level ${level} of ${totalLevels}`}
            </div>

            <div className={`
              flex items-center space-x-2 px-4 py-2 rounded-full
              ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
              shadow-lg
            `}>
              <Star className="w-5 h-5 text-yellow-400" />
              <span className="font-bold">{score}</span>
            </div>
          </div>
        </div>

        {/* Game Area */}
        <div className={`
          relative p-8 rounded-3xl
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
          shadow-xl
        `}>
          {/* Prompt */}
          <div className="text-center mb-8">
            <h2 className={`
              text-2xl font-bold font-comic
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
              {language === 'es'
                ? `¿Puedes encontrar la cara ${currentEmotion.name}?`
                : currentEmotion.prompt}
            </h2>
          </div>

          {/* Emotion Options */}
          <div className={`
            grid grid-cols-3 gap-6
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            {options.map((emotion, index) => {
              const emotionData = EMOTIONS.find(e => e.name === emotion);
              return (
                <button
                  key={index}
                  onClick={() => handleEmotionClick(emotion)}
                  disabled={showCelebration}
                  className={`
                    aspect-square rounded-2xl
                    flex items-center justify-center
                    transform transition-all duration-300
                    ${isVibrant
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                      : isDarkMode
                        ? 'bg-gray-700'
                        : 'bg-purple-600'
                    }
                    ${selectedOption === emotion && isOptionError
                      ? 'animate-[shake_0.5s_ease-in-out] border-2 border-red-500'
                      : 'hover:scale-110'
                    }
                    ${emotion === currentEmotion.name && showEmotionLabel
                      ? 'ring-4 ring-green-500 scale-110'
                      : ''
                    }
                    shadow-lg
                    overflow-hidden
                    disabled:opacity-50
                    relative
                  `}
                >
                  <img
                    src={`https://api.dicebear.com/7.x/bottts/svg?seed=${emotionData?.seed || ''}&backgroundColor=transparent`}
                    alt={emotion}
                    className={`
                      w-full h-full p-4
                      ${emotion === currentEmotion.name && isEmotionAnimating ? 'animate-bounce' : ''}
                    `}
                  />
                  
                  {/* Emotion Label Overlay */}
                  {emotion === currentEmotion.name && showEmotionLabel && (
                    <div className={`
                      absolute bottom-0 left-0 right-0
                      bg-black/50 backdrop-blur-sm
                      text-white text-center py-2 font-bold
                      transform transition-all duration-300
                    `}>
                      {emotion}
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={generateNewRound}
              className={`
                p-3 rounded-full
                ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
                shadow-lg
                transition-transform hover:scale-110
              `}
            >
              <RefreshCw className="w-6 h-6" />
            </button>
            
            <button
              onClick={toggleSound}
              className={`
                p-3 rounded-full
                ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
                shadow-lg
                transition-transform hover:scale-110
              `}
            >
              <Volume2 className={`w-6 h-6 ${soundEnabled ? '' : 'opacity-50'}`} />
            </button>
          </div>

          {/* Celebration Overlay */}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white mb-4">
                  {language === 'es' ? '¡Excelente! 🎉' : 'Great Job! 🎉'}
                </h3>
                <div className="flex justify-center space-x-4">
                  {Array.from({ length: 3 }).map((_, i) => (
                    <Sparkles
                      key={i}
                      className="w-12 h-12 text-yellow-400 animate-spin"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}