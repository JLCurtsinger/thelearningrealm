import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { useAuth } from '../../contexts/AuthContext';
import { updateProgressData, addCompletedLesson } from '../../utils/progressStorage';

interface EmotionMatchGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Emotion data with translations and DiceBear configurations
const emotions = [
  {
    id: 'happy',
    name: { en: 'happy', es: 'feliz' },
    prompt: { en: 'Find the happy face!', es: '¡Encuentra la cara feliz!' },
    config: {
      eyes: 'happy',
      mouth: 'smile',
      backgroundColor: 'transparent'
    },
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 'sad',
    name: { en: 'sad', es: 'triste' },
    prompt: { en: 'Who looks sad?', es: '¿Quién parece triste?' },
    config: {
      eyes: 'cry',
      mouth: 'frown',
      backgroundColor: 'transparent'
    },
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'surprised',
    name: { en: 'surprised', es: 'sorprendido' },
    prompt: { en: 'Find the surprised face!', es: '¡Encuentra la cara sorprendida!' },
    config: {
      eyes: 'wide',
      mouth: 'open',
      backgroundColor: 'transparent'
    },
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'sleepy',
    name: { en: 'sleepy', es: 'soñoliento' },
    prompt: { en: 'Who looks sleepy?', es: '¿Quién parece soñoliento?' },
    config: {
      eyes: 'closed',
      mouth: 'sleep',
      backgroundColor: 'transparent'
    },
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'excited',
    name: { en: 'excited', es: 'emocionado' },
    prompt: { en: 'Find the excited face!', es: '¡Encuentra la cara emocionada!' },
    config: {
      eyes: 'stars',
      mouth: 'laugh',
      backgroundColor: 'transparent'
    },
    color: 'from-pink-400 to-pink-600'
  }
];

export function EmotionMatchGame({ isDarkMode, isVibrant, onExit, language }: EmotionMatchGameProps) {
  const { user } = useAuth();
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentEmotion, setCurrentEmotion] = useState(0);
  const [options, setOptions] = useState<typeof emotions>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedEmotion, setSelectedEmotion] = useState<string | null>(null);
  const [isEmotionAnimating, setIsEmotionAnimating] = useState(false);
  const [showEmotionLabel, setShowEmotionLabel] = useState(false);
  const [isError, setIsError] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [promptReady, setPromptReady] = useState(false);

  // Initialize game on mount
  useEffect(() => {
    generateNewRound(0);
  }, []);

  // Handle game completion
  const handleGameCompletion = async () => {
    if (!user) return;

    setGameComplete(true);
    playGameSound('success');

    try {
      // Update reward points
      await updateProgressData(user.uid, {
        rewardPoints: score * 10 // 10 points per correct emotion
      });

      // Mark lesson as completed
      await addCompletedLesson(user.uid, 'emotionmatch');

      // Play victory sound and speech
      if (soundEnabled) {
        const victoryMessage = language === 'es'
          ? '¡Felicitaciones! ¡Has completado el juego!'
          : 'Congratulations! You have completed the game!';
        speakText(victoryMessage, language === 'es' ? 'es-ES' : 'en-US');
      }

      // Return to learning path after delay
      setTimeout(() => {
        onExit();
      }, 3000);
    } catch (error) {
      console.error('Error updating progress:', error);
      // Still exit after delay even if progress update fails
      setTimeout(() => {
        onExit();
      }, 3000);
    }
  };

  // Generate new round with synchronized emotions and prompts
  const generateNewRound = (emotionIndex: number) => {
    setIsTransitioning(true);
    setPromptReady(false);
    setShowEmotionLabel(false);
    setSelectedEmotion(null);
    
    // Get target emotion and ensure it's included in options
    const targetEmotion = emotions[emotionIndex];
    
    // Get remaining emotions excluding the target emotion
    const otherEmotions = emotions.filter(e => e.id !== targetEmotion.id);
    
    // Randomly select 2 other emotions
    const selectedOtherEmotions = otherEmotions
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    // Combine target emotion with random emotions and shuffle
    const allOptions = [targetEmotion, ...selectedOtherEmotions]
      .sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);

    // Ensure visual transition is complete before speaking prompt
    setTimeout(() => {
      setIsTransitioning(false);
      setPromptReady(true);
      
      // Speak the prompt only after transition and when ready
      if (soundEnabled) {
        const prompt = targetEmotion.prompt[language as keyof typeof targetEmotion.prompt];
        speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
      }
    }, 300);
  };

  const handleEmotionClick = (selectedEmotion: typeof emotions[0]) => {
    if (gameComplete || !promptReady) return;
    setSelectedEmotion(selectedEmotion.id);

    const targetEmotion = emotions[currentEmotion];
    if (selectedEmotion.id === targetEmotion.id) {
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
          const nextEmotion = (currentEmotion + 1) % emotions.length;
          setCurrentEmotion(nextEmotion);
          setRound(prev => prev + 1);
          generateNewRound(nextEmotion);
        } else {
          handleGameCompletion();
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

  // Generate DiceBear URL with configuration
  const getDiceBearUrl = (emotion: typeof emotions[0]) => {
    const { config } = emotion;
    const params = new URLSearchParams({
      seed: emotion.id,
      eyes: config.eyes,
      mouth: config.mouth,
      backgroundColor: config.backgroundColor
    });
    return `https://api.dicebear.com/7.x/bottts/svg?${params.toString()}`;
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
                ? `Emoción ${round} de ${totalRounds}`
                : `Emotion ${round} of ${totalRounds}`}
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
          {/* Target Emotion Display */}
          <div className="text-center mb-8">
            <h2 className={`
              text-2xl font-bold font-comic
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
              ${isTransitioning ? 'opacity-0' : 'opacity-100'}
              transition-opacity duration-300
            `}>
              {emotions[currentEmotion].prompt[language as keyof typeof emotions[0]['prompt']]}
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
                disabled={gameComplete || !promptReady}
                className={`
                  aspect-square rounded-2xl
                  flex items-center justify-center
                  transform transition-all duration-300
                  ${isVibrant
                    ? `bg-gradient-to-r ${emotion.color}`
                    : isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-purple-600'
                  }
                  ${selectedEmotion === emotion.id && isError
                    ? 'animate-[shake_0.5s_ease-in-out] border-2 border-red-500'
                    : 'hover:scale-110'
                  }
                  ${emotion.id === emotions[currentEmotion].id && showEmotionLabel
                    ? 'ring-4 ring-green-500 scale-110'
                    : ''
                  }
                  shadow-lg
                  disabled:opacity-50
                  relative
                  p-4
                `}
              >
                <img
                  src={getDiceBearUrl(emotion)}
                  alt={emotion.name[language as keyof typeof emotion.name]}
                  className={`
                    w-full h-full text-white
                    ${emotion.id === emotions[currentEmotion].id && isEmotionAnimating ? 'animate-bounce' : ''}
                  `}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=fallback";
                  }}
                />

                {/* Emotion Label Overlay */}
                {emotion.id === emotions[currentEmotion].id && showEmotionLabel && (
                  <div className={`
                    absolute bottom-0 left-0 right-0
                    bg-black/50 backdrop-blur-sm
                    text-white text-center py-2 font-bold
                    transform transition-all duration-300
                    rounded-b-2xl
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
              onClick={() => generateNewRound(currentEmotion)}
              disabled={gameComplete}
              className={`
                p-3 rounded-full
                ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
                shadow-lg
                transition-transform hover:scale-110
                disabled:opacity-50
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
                  {gameComplete
                    ? language === 'es'
                      ? '¡Felicitaciones! 🎉\n¡Has completado el juego!'
                      : 'Congratulations! 🎉\nYou completed the game!'
                    : language === 'es'
                      ? '¡Excelente! 🎉'
                      : 'Great Job! 🎉'
                  }
                </h3>
                <div className="flex justify-center space-x-4">
                  {Array.from({ length: gameComplete ? 6 : 3 }).map((_, i) => (
                    <Sparkles
                      key={i}
                      className={`
                        w-12 h-12 text-yellow-400
                        ${gameComplete ? 'animate-float' : 'animate-spin'}
                      `}
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        transform: gameComplete
                          ? `rotate(${i * 60}deg) translateY(${Math.sin(i) * 20}px)`
                          : 'none'
                      }}
                    />
                  ))}
                </div>
                {gameComplete && (
                  <p className="text-white text-xl mt-4">
                    {language === 'es'
                      ? `¡Ganaste ${score * 10} puntos!`
                      : `You earned ${score * 10} points!`}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}