import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface EmotionMatchGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Emotion data with properly formatted DiceBear configurations
const EMOTIONS = [
  {
    id: 'happy',
    name: { en: 'happy', es: 'feliz' },
    prompt: { en: 'Find the happy face!', es: '¡Encuentra la cara feliz!' },
    seed: 'happy',
    config: {
      eyes: 'happy',
      mouth: 'smile',
      backgroundColor: 'transparent'
    }
  },
  {
    id: 'sad',
    name: { en: 'sad', es: 'triste' },
    prompt: { en: 'Where is the sad face?', es: '¿Dónde está la cara triste?' },
    seed: 'sad',
    config: {
      eyes: 'cry',
      mouth: 'frown',
      backgroundColor: 'transparent'
    }
  },
  {
    id: 'surprised',
    name: { en: 'surprised', es: 'sorprendido' },
    prompt: { en: 'Can you find the surprised face?', es: '¿Puedes encontrar la cara sorprendida?' },
    seed: 'surprised',
    config: {
      eyes: 'wide',
      mouth: 'open',
      backgroundColor: 'transparent'
    }
  },
  {
    id: 'sleepy',
    name: { en: 'sleepy', es: 'soñoliento' },
    prompt: { en: 'Who looks sleepy?', es: '¿Quién parece soñoliento?' },
    seed: 'sleepy',
    config: {
      eyes: 'closed',
      mouth: 'sleep',
      backgroundColor: 'transparent'
    }
  },
  {
    id: 'excited',
    name: { en: 'excited', es: 'emocionado' },
    prompt: { en: 'Find the excited face!', es: '¡Encuentra la cara emocionada!' },
    seed: 'excited',
    config: {
      eyes: 'stars',
      mouth: 'laugh',
      backgroundColor: 'transparent'
    }
  }
];

export function EmotionMatchGame({ isDarkMode, isVibrant, onExit, language }: EmotionMatchGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentEmotion, setCurrentEmotion] = useState(0);
  const [options, setOptions] = useState<typeof EMOTIONS>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [isEmotionAnimating, setIsEmotionAnimating] = useState(false);
  const [showEmotionLabel, setShowEmotionLabel] = useState(false);
  const [isError, setIsError] = useState(false);

  // Generate DiceBear URL with configuration
  const getDiceBearUrl = (emotion: typeof EMOTIONS[0]) => {
    const { seed, config } = emotion;
    const params = new URLSearchParams({
      seed,
      eyes: config.eyes,
      mouth: config.mouth,
      backgroundColor: config.backgroundColor
    });
    return `https://api.dicebear.com/7.x/bottts/svg?${params.toString()}`;
  };

  // Initialize game
  useEffect(() => {
    generateNewRound();
  }, []);

  const generateNewRound = () => {
    setIsTransitioning(true);
    setShowEmotionLabel(false);
    setSelectedEmotion(null);
    setIsError(false);

    // Get current emotion and generate options
    const targetEmotion = EMOTIONS[currentEmotion];
    let emotionOptions = [targetEmotion];
    
    // Add random emotions for options
    while (emotionOptions.length < 3) {
      const randomEmotion = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
      if (!emotionOptions.some(e => e.id === randomEmotion.id)) {
        emotionOptions.push(randomEmotion);
      }
    }
    
    // Shuffle options
    emotionOptions = emotionOptions.sort(() => Math.random() - 0.5);
    setOptions(emotionOptions);

    // Speak the prompt
    if (soundEnabled) {
      const prompt = targetEmotion.prompt[language as keyof typeof targetEmotion.prompt];
      speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleEmotionClick = (emotion: typeof EMOTIONS[0]) => {
    setSelectedEmotion(emotion.id);

    if (emotion.id === EMOTIONS[currentEmotion].id) {
      playGameSound('success');
      setScore(score + 1);
      setShowCelebration(true);
      setIsEmotionAnimating(true);
      setShowEmotionLabel(true);
      
      if (soundEnabled) {
        const celebration = language === 'es'
          ? '¡Excelente trabajo!'
          : 'Great job!';
        speakText(celebration, language === 'es' ? 'es-ES' : 'en-US');
      }

      setTimeout(() => {
        setIsEmotionAnimating(false);
        setShowCelebration(false);
        if (round < totalRounds) {
          setRound(prev => prev + 1);
          setCurrentEmotion((prev) => (prev + 1) % EMOTIONS.length);
          generateNewRound();
        }
      }, 2000);
    } else {
      playGameSound('error');
      setIsError(true);
      
      if (soundEnabled) {
        const tryAgain = language === 'es'
          ? 'Inténtalo de nuevo'
          : 'Try again';
        speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
      }

      setTimeout(() => {
        setIsError(false);
        setSelectedEmotion(null);
      }, 500);
    }
  };

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
                ? `Ronda ${round} de ${totalRounds}`
                : `Round ${round} of ${totalRounds}`}
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
              {EMOTIONS[currentEmotion].prompt[language as keyof typeof EMOTIONS[0]['prompt']]}
            </h2>
          </div>

          {/* Emotion Options */}
          <div className={`
            grid grid-cols-3 gap-6
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            {options.map((emotion, index) => (
              <button
                key={index}
                onClick={() => handleEmotionClick(emotion)}
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
                  ${selectedEmotion === emotion.id && isError
                    ? 'animate-[shake_0.5s_ease-in-out] border-2 border-red-500'
                    : 'hover:scale-110'
                  }
                  ${emotion.id === EMOTIONS[currentEmotion].id && showEmotionLabel
                    ? 'ring-4 ring-green-500 scale-110'
                    : ''
                  }
                  shadow-lg
                  overflow-hidden
                  relative
                `}
              >
                <img
                  src={getDiceBearUrl(emotion)}
                  alt={emotion.name[language as keyof typeof emotion.name]}
                  className={`
                    w-full h-full p-4
                    ${emotion.id === EMOTIONS[currentEmotion].id && isEmotionAnimating
                      ? 'animate-bounce'
                      : ''
                    }
                  `}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=fallback";
                  }}
                />

                {/* Emotion Label */}
                {emotion.id === EMOTIONS[currentEmotion].id && showEmotionLabel && (
                  <div className={`
                    absolute bottom-0 left-0 right-0
                    bg-black/50 backdrop-blur-sm
                    text-white text-center py-2 font-bold
                    transform transition-all duration-300
                  `}>
                    {emotion.name[language as keyof typeof emotion.name]}
                  </div>
                )}
              </button>
            ))}
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