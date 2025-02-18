import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, Play, XCircle } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface WheresMyToyGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Game locations with translations
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

  useEffect(() => {
    if (soundEnabled) {
      speakPrompt();
    }
    generateOptions();
  }, [currentLocation, gameState]);

  const speakPrompt = () => {
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
    if (gameState !== 'dragging') return;
    setIsDragging(true);
    playGameSound('click');
    
    const pos = 'touches' in e 
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    
    setToyPosition(pos);
  };

  const handleDragMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    
    const pos = 'touches' in e 
      ? { x: e.touches[0].clientX, y: e.touches[0].clientY }
      : { x: e.clientX, y: e.clientY };
    
    setToyPosition(pos);

    // Check if toy is near target zone
    const targetZone = locations[currentLocation].zone;
    const isNearZone = 
      Math.abs(pos.x - targetZone.x) < 50 &&
      Math.abs(pos.y - targetZone.y) < 50;
    
    setIsTargetZoneActive(isNearZone);
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
                absolute transition-all duration-300
                ${isTargetZoneActive ? 'ring-4 ring-yellow-400 scale-105' : ''}
              `} style={{ left: '40%', top: '20%', width: '20%', height: '20%' }}>
                <div className="w-full h-4 bg-brown-600 rounded-lg" /> {/* Table */}
              </div>
              <div className={`
                absolute transition-all duration-300
                ${isTargetZoneActive ? 'ring-4 ring-yellow-400 scale-105' : ''}
              `} style={{ left: '15%', top: '40%', width: '10%', height: '30%' }}>
                <div className="w-full h-full bg-brown-500 rounded-lg" /> {/* Chair */}
              </div>
              <div className={`
                absolute transition-all duration-300
                ${isTargetZoneActive ? 'ring-4 ring-yellow-400 scale-105' : ''}
              `} style={{ left: '70%', top: '60%', width: '25%', height: '10%' }}>
                <div className="w-full h-full bg-brown-700 rounded-lg" /> {/* Bed */}
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
            <div className={`
              w-full h-full rounded-full
              ${isVibrant
                ? 'bg-gradient-to-b from-purple-500 to-pink-500'
                : isDarkMode
                  ? 'bg-gray-700'
                  : 'bg-purple-600'
              }
              shadow-lg
            `}>
              {/* Bear face */}
              <div className="relative w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white" />
                <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-white" />
                <div className="absolute bottom-1/3 left-1/2 w-4 h-2 rounded-full bg-white transform -translate-x-1/2" />
              </div>
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