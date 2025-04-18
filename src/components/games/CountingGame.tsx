import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { useAuth } from '../../contexts/AuthContext';
import { updateProgressData, addCompletedLesson } from '../../utils/progressStorage';

interface CountingGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Game items with reliable Unsplash images and translations
const items = [
  {
    id: 'apple',
    image: 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=150&h=150',
    name: { en: 'apple', es: 'manzana' },
    prompt: { en: 'How many images of apples do you see?', es: '¿Cuántas fotos de manzanas ves?' },
    color: 'from-red-400 to-red-600'
  },
  {
    id: 'star',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=150&h=150',
    name: { en: 'star', es: 'estrella' },
    prompt: { en: 'How many photos of stars do you see?', es: '¿Cuántas fotos de estrellas ves?' },
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 'flower',
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=150&h=150',
    name: { en: 'flower', es: 'flor' },
    prompt: { en: 'How many pictures of flowers do you see?', es: '¿Cuántas fotos de flores ves?' },
    color: 'from-pink-400 to-pink-600'
  },
  {
    id: 'toy',
    image: 'https://images.unsplash.com/photo-1558877385-81a1c7e67d72?auto=format&fit=crop&w=150&h=150',
    name: { en: 'toy', es: 'juguete' },
    prompt: { en: 'How many images of toys do you see?', es: '¿Cuántos fotos de juguetes ves?' },
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'cookie',
    image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=150&h=150',
    name: { en: 'cookie', es: 'galleta' },
    prompt: { en: 'How many photos of cookies do you see?', es: '¿Cuántas fotos de galletas ves?' },
    color: 'from-amber-400 to-amber-600'
  }
];

export function CountingGame({ isDarkMode, isVibrant, onExit, language }: CountingGameProps) {
  const { user } = useAuth();
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentItem, setCurrentItem] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isOptionError, setIsOptionError] = useState(false);
  const [isItemAnimating, setIsItemAnimating] = useState(false);
  const [showItemLabel, setShowItemLabel] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Initialize game
  useEffect(() => {
    generateNewRound();
  }, []);

  const handleGameCompletion = async () => {
    if (!user) return;

    setGameComplete(true);
    playGameSound('success');

    try {
      // Update reward points (10 points per correct count)
      await updateProgressData(user.uid, {
        rewardPoints: score * 10
      });

      // Mark lesson as completed
      await addCompletedLesson(user.uid, 'counting');

      // Play victory sound and speech
      if (soundEnabled) {
        const victoryMessage = language === 'es'
          ? '¡Felicitaciones! ¡Has completado el juego!'
          : 'Congratulations! You have completed the game!';
        speakText(victoryMessage, language === 'es' ? 'es-ES' : 'en-US');
      }

      // Return to learning path and force refresh to repopulate games
      setTimeout(() => {
        onExit();
        window.location.reload(); // Force refresh to repopulate available games
      }, 3000);

    } catch (error) {
      console.error('Error updating progress:', error);
      // Still exit and refresh after error
      setTimeout(() => {
        onExit();
        window.location.reload(); // Force refresh even after error
      }, 3000);
    }
  };

  const generateNewRound = () => {
    setIsTransitioning(true);
    setShowItemLabel(false);
    setSelectedOption(null);
    
    // Get next unused item
    const nextItem = Math.floor(Math.random() * items.length);
    setCurrentItem(nextItem);
    
    // Generate random count (1-5)
    const count = Math.floor(Math.random() * 5) + 1;
    setItemCount(count);
    
    // Generate number options
    let numberOptions = [count];
    while (numberOptions.length < 3) {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      if (!numberOptions.includes(randomNumber)) {
        numberOptions.push(randomNumber);
      }
    }
    
    // Shuffle options
    numberOptions = numberOptions.sort(() => Math.random() - 0.5);
    setOptions(numberOptions);

    // Speak the prompt for the current item
    setTimeout(() => {
      setIsTransitioning(false);
      if (soundEnabled) {
        const prompt = items[nextItem].prompt[language as keyof typeof items[0]['prompt']];
        speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
      }
    }, 300);
  };

  const handleOptionClick = (number: number) => {
    if (gameComplete) return;
    setSelectedOption(number);

    if (number === itemCount) {
      playGameSound('success');
      setScore(score + 1);
      setShowCelebration(true);
      setIsItemAnimating(true);
      setShowItemLabel(true);
      
      if (soundEnabled) {
        const celebration = language === 'es'
          ? '¡Excelente trabajo!'
          : 'Great job!';
        speakText(celebration, language === 'es' ? 'es-ES' : 'en-US');
      }
      
      setTimeout(() => {
        setIsItemAnimating(false);
        setShowCelebration(false);
        if (round < totalRounds) {
          setRound(prev => prev + 1);
          generateNewRound();
        } else {
          handleGameCompletion();
        }
      }, 2000);
    } else {
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
          {/* Items Grid */}
          <div className={`
            grid grid-cols-3 gap-4 mb-8
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            {Array.from({ length: itemCount }).map((_, index) => (
              <div
                key={index}
                className={`
                  aspect-square rounded-xl overflow-hidden
                  transform transition-all duration-300
                  ${isItemAnimating ? 'animate-bounce' : 'hover:scale-105'}
                  shadow-lg
                  relative
                `}
              >
                <img
                  src={items[currentItem].image}
                  alt={items[currentItem].name[language as keyof typeof items[0]['name']]}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=150&h=150";
                  }}
                />
              </div>
            ))}
          </div>

          {/* Number Options */}
          <div className="flex justify-center gap-6">
            {options.map((number, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(number)}
                disabled={showCelebration || gameComplete}
                className={`
                  w-24 h-24 rounded-2xl
                  flex items-center justify-center
                  text-4xl font-bold font-comic text-white
                  transform transition-all duration-300
                  ${isVibrant
                    ? `bg-gradient-to-r ${items[currentItem].color}`
                    : isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-purple-600'
                  }
                  ${selectedOption === number && isOptionError
                    ? 'animate-[shake_0.5s_ease-in-out] border-2 border-red-500'
                    : 'hover:scale-110'
                  }
                  ${number === itemCount && showItemLabel
                    ? 'ring-4 ring-green-500 scale-110'
                    : ''
                  }
                  shadow-lg
                  disabled:opacity-50
                `}
              >
                {number}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={() => generateNewRound()}
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