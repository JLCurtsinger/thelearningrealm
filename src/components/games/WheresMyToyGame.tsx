import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, Play, XCircle } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { useAuth } from '../../contexts/AuthContext';
import { updateProgressData, addCompletedLesson } from '../../utils/progressStorage';

interface WheresMyToyGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Game locations with translations and visual zones
const locations = [
  {
    id: 'table',
    name: { en: 'on the table', es: 'sobre la mesa' },
    position: { x: 50, y: 30 },
    zone: { x: 40, y: 20, width: 20, height: 20 },
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'chair',
    name: { en: 'next to the chair', es: 'junto a la silla' },
    position: { x: 20, y: 50 },
    zone: { x: 15, y: 40, width: 20, height: 20 },
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'bed',
    name: { en: 'under the bed', es: 'debajo de la cama' },
    position: { x: 80, y: 70 },
    zone: { x: 70, y: 60, width: 20, height: 20 },
    color: 'from-yellow-400 to-yellow-600'
  }
];

export function WheresMyToyGame({ isDarkMode, isVibrant, onExit, language }: WheresMyToyGameProps) {
  const { user } = useAuth();
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentLocation, setCurrentLocation] = useState(0);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [toyPosition, setToyPosition] = useState({ x: 50, y: 50 });
  const [gameState, setGameState] = useState<'dragging' | 'answering'>('dragging');
  const [options, setOptions] = useState<string[]>([]);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionError, setIsOptionError] = useState(false);
  const [showLocationLabel, setShowLocationLabel] = useState(false);
  const [isTargetZoneActive, setIsTargetZoneActive] = useState(false);
  const [isToyAnimating, setIsToyAnimating] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Handle game completion
  const handleGameCompletion = async () => {
    if (!user) return;

    setGameComplete(true);
    playGameSound('success');

    try {
      // Update reward points (10 points per correct placement)
      await updateProgressData(user.uid, {
        rewardPoints: score * 10
      });

      // Mark lesson as completed
      await addCompletedLesson(user.uid, 'wheresmytoy');

      // Play victory sound and speech
      if (soundEnabled) {
        const victoryMessage = language === 'es'
          ? '¡Felicitaciones! ¡Has encontrado todos los juguetes!'
          : 'Congratulations! You found all the toys!';
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

  // Initialize game
  useEffect(() => {
    generateOptions();
    speakPrompt();
  }, [currentLocation]);

  const speakPrompt = () => {
    if (!soundEnabled) return;
    const location = locations[currentLocation];
    const prompt = gameState === 'dragging'
      ? language === 'es'
        ? `¿Puedes poner el oso ${location.name.es}?`
        : `Can you put the bear ${location.name.en}?`
      : language === 'es'
        ? '¿Dónde está el oso?'
        : 'Where is the bear?';

    speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
  };

  const generateOptions = () => {
    let allOptions = locations.map(loc => loc.name[language as keyof typeof loc.name]);
    allOptions = allOptions.sort(() => Math.random() - 0.5);
    setOptions(allOptions);
  };

  const handleDragStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (gameState !== 'dragging' || gameComplete) return;
    setIsDragging(true);
    playGameSound('click');
    
    const container = e.currentTarget.getBoundingClientRect();
    const pos = 'touches' in e 
      ? { 
          x: ((e.touches[0].clientX - container.left) / container.width) * 100,
          y: ((e.touches[0].clientY - container.top) / container.height) * 100
        }
      : {
          x: ((e.clientX - container.left) / container.width) * 100,
          y: ((e.clientY - container.top) / container.height) * 100
        };
    
    setToyPosition(pos);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const container = e.currentTarget.getBoundingClientRect();
    const pos = 'touches' in e 
      ? {
          x: ((e.touches[0].clientX - container.left) / container.width) * 100,
          y: ((e.touches[0].clientY - container.top) / container.height) * 100
        }
      : {
          x: ((e.clientX - container.left) / container.width) * 100,
          y: ((e.clientY - container.top) / container.height) * 100
        };
    
    setToyPosition(pos);

    // Check if toy is near target zone
    const targetZone = locations[currentLocation].zone;
    const isNearZone = 
      Math.abs(pos.x - targetZone.x) < targetZone.width &&
      Math.abs(pos.y - targetZone.y) < targetZone.height;
    
    setIsTargetZoneActive(isNearZone);
    
    // Play sound when entering target zone
    if (isNearZone && !isTargetZoneActive) {
      playGameSound('click');
    }
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    setIsTargetZoneActive(false);

    const targetZone = locations[currentLocation].zone;
    const isInZone = 
      toyPosition.x >= targetZone.x &&
      toyPosition.x <= targetZone.x + targetZone.width &&
      toyPosition.y >= targetZone.y &&
      toyPosition.y <= targetZone.y + targetZone.height;

    if (isInZone) {
      playGameSound('success');
      setIsToyAnimating(true);
      setShowLocationLabel(true);
      
      if (soundEnabled) {
        const celebration = language === 'es'
          ? '¡Muy bien! Ahora dime, ¿dónde está el oso?'
          : 'Great job! Now tell me, where is the bear?';
        speakText(celebration, language === 'es' ? 'es-ES' : 'en-US');
      }
      
      setTimeout(() => {
        setIsToyAnimating(false);
        setGameState('answering');
      }, 1000);
    } else {
      playGameSound('error');
      
      if (soundEnabled) {
        const tryAgain = language === 'es'
          ? 'Inténtalo de nuevo'
          : 'Try again';
        speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
      }
    }
  };

  const handleAnswerClick = (answer: string) => {
    if (gameComplete) return;
    setSelectedOption(answer);
    const correctAnswer = locations[currentLocation].name[language as keyof typeof locations[0]['name']];
    
    if (answer === correctAnswer) {
      playGameSound('success');
      setScore(score + 1);
      setShowCelebration(true);
      
      if (soundEnabled) {
        const celebration = language === 'es'
          ? '¡Excelente trabajo!'
          : 'Excellent job!';
        speakText(celebration, language === 'es' ? 'es-ES' : 'en-US');
      }

      setTimeout(() => {
        setShowCelebration(false);
        if (round < totalRounds) {
          setIsTransitioning(true);
          setTimeout(() => {
            setRound(prev => prev + 1);
            setCurrentLocation((currentLocation + 1) % locations.length);
            setGameState('dragging');
            setToyPosition({ x: 50, y: 50 });
            setShowLocationLabel(false);
            setSelectedOption(null);
            setIsTransitioning(false);
          }, 500);
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

          <button
            onClick={toggleSound}
            className={`
              p-3 rounded-full
              ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
              shadow-lg
              transition-transform hover:scale-110
            `}
          >
            <Volume2 className={`w-6 h-6 ${soundEnabled ? '' : 'opacity-50'}`} />
          </button>
        </div>

        {/* Game Area */}
        <div className={`
          relative p-8 rounded-3xl
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
          shadow-xl
          min-h-[600px]
        `}
          onMouseMove={handleDragMove}
          onTouchMove={handleDragMove}
          onMouseUp={handleDragEnd}
          onTouchEnd={handleDragEnd}
        >
          {/* Target Location Banner */}
          <div className={`
            absolute top-4 left-1/2 transform -translate-x-1/2
            px-6 py-3 rounded-full
            ${isVibrant
              ? `bg-gradient-to-r ${locations[currentLocation].color}`
              : isDarkMode
                ? 'bg-gray-700'
                : 'bg-purple-600'
            }
            text-white font-bold text-lg
            shadow-lg
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            {language === 'es'
              ? `Pon el oso ${locations[currentLocation].name.es}`
              : `Put the bear ${locations[currentLocation].name.en}`}
          </div>

          {/* Room Background */}
          <div className={`
            absolute inset-0 rounded-3xl overflow-hidden
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            <div className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-200">
              {/* Furniture */}
              <div className={`
                absolute w-32 h-4 bg-brown-600 rounded-lg
                transition-all duration-300
                ${isTargetZoneActive ? 'ring-4 ring-yellow-400 scale-105' : ''}
              `} style={{ left: '40%', top: '20%' }}>
                <div className="w-full h-full bg-gradient-to-r from-yellow-800 to-yellow-700 rounded-lg" />
              </div>
              
              <div className={`
                absolute w-16 h-32 bg-brown-500 rounded-lg
                transition-all duration-300
                ${isTargetZoneActive ? 'ring-4 ring-yellow-400 scale-105' : ''}
              `} style={{ left: '15%', top: '40%' }}>
                <div className="w-full h-full bg-gradient-to-b from-yellow-800 to-yellow-700 rounded-lg" />
              </div>
              
              <div className={`
                absolute w-48 h-8 bg-brown-700 rounded-lg
                transition-all duration-300
                ${isTargetZoneActive ? 'ring-4 ring-yellow-400 scale-105' : ''}
              `} style={{ left: '70%', top: '60%' }}>
                <div className="w-full h-full bg-gradient-to-r from-yellow-900 to-yellow-800 rounded-lg" />
              </div>
            </div>
          </div>

          {/* Draggable Toy */}
          <div
            className={`
              absolute w-16 h-16 cursor-move
              transform -translate-x-1/2 -translate-y-1/2
              transition-all duration-300
              ${isDragging ? 'scale-110 shadow-lg' : 'scale-100'}
              ${isToyAnimating ? 'animate-bounce' : ''}
            `}
            style={{ left: `${toyPosition.x}%`, top: `${toyPosition.y}%` }}
            onMouseDown={handleDragStart}
            onTouchStart={handleDragStart}
          >
            {/* Bear Body */}
            <div className={`
              w-full h-full rounded-full
              ${isVibrant
                ? 'bg-gradient-to-b from-yellow-500 to-yellow-600'
                : isDarkMode
                  ? 'bg-yellow-600'
                  : 'bg-yellow-500'
              }
              shadow-lg
              relative
            `}>
              {/* Bear Face */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                {/* Eyes */}
                <div className="flex space-x-4 mb-2">
                  <div className="w-2 h-2 rounded-full bg-brown-900" />
                  <div className="w-2 h-2 rounded-full bg-brown-900" />
                </div>
                {/* Nose */}
                <div className="w-3 h-2 rounded-full bg-brown-900" />
                {/* Mouth */}
                <div className="w-4 h-1 mt-1 rounded-full bg-brown-900" />
              </div>
              
              {/* Ears */}
              <div className="absolute -top-2 -left-2 w-4 h-4 rounded-full bg-yellow-600" />
              <div className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-yellow-600" />
            </div>

            {/* Location Label */}
            {showLocationLabel && (
              <div className={`
                absolute -top-8 left-1/2 transform -translate-x-1/2
                bg-black/50 backdrop-blur-sm
                text-white text-center px-4 py-2 rounded-full
                font-bold text-sm
                transition-opacity duration-300
                whitespace-nowrap
              `}>
                {locations[currentLocation].name[language as keyof typeof locations[0]['name']]}
              </div>
            )}
          </div>

          {/* Answer Options */}
          {gameState === 'answering' && (
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-full max-w-md">
              <div className="grid grid-cols-1 gap-4">
                {options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    disabled={gameComplete}
                    className={`
                      px-6 py-3 rounded-xl
                      font-bold text-white
                      transform transition-all duration-300
                      ${isVibrant
                        ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                        : 'bg-purple-600'
                      }
                      ${selectedOption === option && isOptionError
                        ? 'animate-[shake_0.5s_ease-in-out] border-2 border-red-500'
                        : 'hover:scale-105'
                      }
                      shadow-lg
                      disabled:opacity-50
                    `}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Celebration Overlay */}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white mb-4">
                  {gameComplete
                    ? language === 'es'
                      ? '¡Felicitaciones! 🎉\n¡Has encontrado todos los juguetes!'
                      : 'Congratulations! 🎉\nYou found all the toys!'
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