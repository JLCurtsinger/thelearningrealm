import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, RefreshCw, Home } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { useAuth } from '../../contexts/AuthContext';
import { updateProgressData, addCompletedLesson } from '../../utils/progressStorage';

interface CountingGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Shape data with translations and SVG paths
const shapes = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?auto=format&fit=crop&w=150&h=150',
    name: { en: 'apple', es: 'manzana' }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=150&h=150',
    name: { en: 'balloon', es: 'globo' }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=150&h=150',
    name: { en: 'star', es: 'estrella' }
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=150&h=150',
    name: { en: 'flower', es: 'flor' }
  }
];

export function CountingGame({ isDarkMode, isVibrant, onExit, language }: CountingGameProps) {
  const { user } = useAuth();
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentShape, setCurrentShape] = useState(0);
  const [shapeCount, setShapeCount] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isOptionError, setIsOptionError] = useState(false);
  const [isShapeAnimating, setIsShapeAnimating] = useState(false);
  const [showShapeLabel, setShowShapeLabel] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [showVictory, setShowVictory] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState<number | null>(null);

  // Handle game completion
  const handleGameCompletion = async () => {
    if (!user) return;

    setShowVictory(true);
    setGameComplete(true);
    playGameSound('success');

    try {
      // Update reward points
      await updateProgressData(user.uid, {
        rewardPoints: score * 10 // 10 points per correct count
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

      // Start redirect countdown
      let countdown = 5;
      const timer = window.setInterval(() => {
        countdown--;
        setRedirectTimer(countdown);
        
        if (countdown <= 0) {
          clearInterval(timer);
          onExit(); // Redirect back to learning path
        }
      }, 1000);

    } catch (error) {
      console.error('Error updating progress:', error);
      // Still exit after delay even if progress update fails
      setTimeout(() => {
        onExit();
      }, 5000);
    }
  };

  // Initialize game
  useEffect(() => {
    generateNewRound();
    return () => {
      // Clean up any timers when component unmounts
      if (redirectTimer !== null) {
        clearInterval(redirectTimer);
      }
    };
  }, []);

  const generateNewRound = () => {
    setIsTransitioning(true);
    setShowShapeLabel(false);
    setSelectedOption(null);
    
    // Generate random count (1-5)
    const count = Math.floor(Math.random() * 5) + 1;
    setShapeCount(count);
    
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

    // Speak the prompt
    if (soundEnabled) {
      const prompt = language === 'es'
        ? `¿Cuántos ${shapes[currentShape].name.es}s ves?`
        : `How many ${shapes[currentShape].name.en}s do you see?`;
      speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleOptionClick = (number: number) => {
    if (gameComplete) return;
    setSelectedOption(number);

    if (number === shapeCount) {
      playGameSound('success');
      setScore(score + 1);
      setShowCelebration(true);
      setIsShapeAnimating(true);
      setShowShapeLabel(true);
      
      if (soundEnabled) {
        const celebration = language === 'es'
          ? '¡Excelente trabajo!'
          : 'Great job!';
        speakText(celebration, language === 'es' ? 'es-ES' : 'en-US');
      }
      
      setTimeout(() => {
        setIsShapeAnimating(false);
        setShowCelebration(false);
        if (round < totalRounds) {
          setRound(prev => prev + 1);
          setCurrentShape((currentShape + 1) % shapes.length);
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
                ? `Pregunta ${round} de ${totalRounds}`
                : `Question ${round} of ${totalRounds}`}
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
                ? `¿Cuántos ${shapes[currentShape].name.es}s ves?`
                : `How many ${shapes[currentShape].name.en}s do you see?`}
            </h2>
          </div>

          {/* Shapes Grid */}
          <div className={`
            grid grid-cols-3 gap-4 mb-8
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            {Array.from({ length: shapeCount }).map((_, index) => (
              <div
                key={index}
                className={`
                  aspect-square rounded-xl overflow-hidden
                  transform transition-all duration-300
                  ${isShapeAnimating ? 'animate-bounce' : 'hover:scale-105'}
                  shadow-lg
                `}
              >
                <img
                  src={shapes[currentShape].image}
                  alt={shapes[currentShape].name[language as keyof typeof shapes[0]['name']]}
                  className="w-full h-full object-cover"
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
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                    : isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-purple-600'
                  }
                  ${selectedOption === number && isOptionError
                    ? 'animate-[shake_0.5s_ease-in-out] border-2 border-red-500'
                    : 'hover:scale-110'
                  }
                  ${number === shapeCount && showShapeLabel
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
              onClick={generateNewRound}
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

          {/* Celebration/Victory Overlay */}
          {(showCelebration || showVictory) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white mb-4">
                  {showVictory
                    ? language === 'es'
                      ? '¡Felicitaciones! 🎉\n¡Has completado el juego!'
                      : 'Congratulations! 🎉\nYou completed the game!'
                    : language === 'es'
                      ? '¡Excelente! 🎉'
                      : 'Great Job! 🎉'
                  }
                </h3>
                <div className="flex justify-center space-x-4">
                  {Array.from({ length: showVictory ? 6 : 3 }).map((_, i) => (
                    <Sparkles
                      key={i}
                      className={`
                        w-12 h-12 text-yellow-400
                        ${showVictory ? 'animate-float' : 'animate-spin'}
                      `}
                      style={{
                        animationDelay: `${i * 0.2}s`,
                        transform: showVictory
                          ? `rotate(${i * 60}deg) translateY(${Math.sin(i) * 20}px)`
                          : 'none'
                      }}
                    />
                  ))}
                </div>
                {showVictory && (
                  <>
                    <p className="text-white text-xl mt-4">
                      {language === 'es'
                        ? `¡Ganaste ${score * 10} puntos!`
                        : `You earned ${score * 10} points!`}
                    </p>
                    {redirectTimer !== null && (
                      <p className="text-white text-lg mt-2">
                        {language === 'es'
                          ? `Volviendo al menú en ${redirectTimer}...`
                          : `Returning to menu in ${redirectTimer}...`}
                      </p>
                    )}
                    <button
                      onClick={onExit}
                      className={`
                        mt-6 px-6 py-3 rounded-xl
                        flex items-center gap-2 mx-auto
                        font-bold text-white
                        transform hover:scale-105
                        transition-all duration-300
                        ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100 text-gray-900'}
                        shadow-lg
                      `}
                    >
                      <Home className="w-5 h-5" />
                      <span>{language === 'es' ? 'Volver al Menú' : 'Return to Menu'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}