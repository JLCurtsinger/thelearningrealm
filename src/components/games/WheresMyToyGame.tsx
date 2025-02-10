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
    zone: { x: 40, y: 20, width: 20, height: 20 }
  },
  {
    id: 'chair',
    name: { en: 'next to the chair', es: 'junto a la silla' },
    position: { x: 20, y: 50 },
    zone: { x: 15, y: 40, width: 20, height: 20 }
  },
  {
    id: 'bed',
    name: { en: 'under the bed', es: 'debajo de la cama' },
    position: { x: 80, y: 70 },
    zone: { x: 70, y: 60, width: 20, height: 20 }
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
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);

    const targetZone = locations[currentLocation].zone;
    const isInZone = 
      toyPosition.x >= targetZone.x &&
      toyPosition.x <= targetZone.x + targetZone.width &&
      toyPosition.y >= targetZone.y &&
      toyPosition.y <= targetZone.y + targetZone.height;

    if (isInZone) {
      playGameSound('success');
      
      if (soundEnabled) {
        speakText(
          language === 'es'
            ? '¡Muy bien! Ahora dime, ¿dónde está el oso?'
            : 'Great job! Now tell me, where is the bear?',
          language === 'es' ? 'es-ES' : 'en-US'
        );
      }
      
      setGameState('answering');
    } else {
      playGameSound('error');
      
      if (soundEnabled) {
        speakText(
          language === 'es'
            ? 'Inténtalo de nuevo'
            : 'Try again',
          language === 'es' ? 'es-ES' : 'en-US'
        );
      }
    }
  };

  const handleAnswerClick = (answer: string) => {
    const correctAnswer = locations[currentLocation].name[language as keyof typeof locations[0]['name']];
    
    if (answer === correctAnswer) {
      playGameSound('success');
      
      if (soundEnabled) {
        speakText(
          language === 'es'
            ? '¡Excelente trabajo!'
            : 'Excellent job!',
          language === 'es' ? 'es-ES' : 'en-US'
        );
      }

      setScore(score + 1);
      setShowCelebration(true);
      
      setTimeout(() => {
        setShowCelebration(false);
        if (currentLocation < locations.length - 1) {
          setCurrentLocation(prev => prev + 1);
          setGameState('dragging');
          setToyPosition({ x: 50, y: 50 });
        }
      }, 2000);
    } else {
      playGameSound('error');
      
      if (soundEnabled) {
        speakText(
          language === 'es'
            ? 'Inténtalo de nuevo'
            : 'Try again',
          language === 'es' ? 'es-ES' : 'en-US'
        );
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className={`
            flex items-center space-x-2 px-4 py-2 rounded-full
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
            shadow-lg
          `}>
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">{score}</span>
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
          {/* Room Background */}
          <div className="absolute inset-0 rounded-3xl overflow-hidden">
            <div className="w-full h-full bg-gradient-to-b from-blue-100 to-blue-200">
              {/* Furniture */}
              <div className="absolute" style={{ left: '40%', top: '20%', width: '20%', height: '20%' }}>
                <div className="w-full h-4 bg-brown-600 rounded-lg" /> {/* Table */}
              </div>
              <div className="absolute" style={{ left: '15%', top: '40%', width: '10%', height: '30%' }}>
                <div className="w-full h-full bg-brown-500 rounded-lg" /> {/* Chair */}
              </div>
              <div className="absolute" style={{ left: '70%', top: '60%', width: '25%', height: '10%' }}>
                <div className="w-full h-full bg-brown-700 rounded-lg" /> {/* Bed */}
              </div>
            </div>
          </div>

          {/* Draggable Toy */}
          <div
            className={`
              absolute w-16 h-16 cursor-move
              transform -translate-x-1/2 -translate-y-1/2
              transition-transform
              ${isDragging ? 'scale-110' : 'scale-100'}
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
            `}>
              {/* Bear face */}
              <div className="relative w-full h-full">
                <div className="absolute top-1/4 left-1/4 w-2 h-2 rounded-full bg-white" />
                <div className="absolute top-1/4 right-1/4 w-2 h-2 rounded-full bg-white" />
                <div className="absolute bottom-1/3 left-1/2 w-4 h-2 rounded-full bg-white transform -translate-x-1/2" />
              </div>
            </div>
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
                      transform hover:scale-105
                      transition-all duration-300
                      ${isVibrant
                        ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                        : 'bg-purple-600 hover:bg-purple-700'
                      }
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