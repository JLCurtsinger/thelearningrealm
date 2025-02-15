import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, Play, XCircle } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface ShapeSorterGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Shape data with translations and SVG paths
const shapes = [
  {
    id: 'circle',
    path: 'M50 90a40 40 0 1 0 0-80 40 40 0 0 0 0 80z',
    name: { en: 'circle', es: 'círculo' },
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'square',
    path: 'M10 10h80v80H10z',
    name: { en: 'square', es: 'cuadrado' },
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'triangle',
    path: 'M50 10L90 90H10z',
    name: { en: 'triangle', es: 'triángulo' },
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 'star',
    path: 'M50 10l12 24 26 4-19 18 4 26-23-12-23 12 4-26-19-18 26-4z',
    name: { en: 'star', es: 'estrella' },
    color: 'from-purple-400 to-purple-600'
  },
  {
    id: 'heart',
    path: 'M50 90c30-20 40-38 40-48 0-22-40-22-40 0 0-22-40-22-40 0 0 10 10 28 40 48z',
    name: { en: 'heart', es: 'corazón' },
    color: 'from-red-400 to-red-600'
  }
];

export function ShapeSorterGame({ isDarkMode, isVibrant, onExit, language }: ShapeSorterGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentShape, setCurrentShape] = useState(0);
  const [options, setOptions] = useState<typeof shapes>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (soundEnabled && !isStarted) {
      speakText(
        language === 'es' 
          ? '¡Vamos a aprender las formas!' 
          : "Let's learn about shapes!",
        language === 'es' ? 'es-ES' : 'en-US'
      );
    }
  }, [isStarted]);

  useEffect(() => {
    if (isStarted) {
      generateNewRound();
    }
  }, [isStarted]);

  const generateNewRound = (shapeIndex?: number) => {
    // Use provided shapeIndex if available, otherwise use currentShape
    const targetIndex = typeof shapeIndex === 'number' ? shapeIndex : currentShape;
    const targetShape = shapes[targetIndex];
    
    // Create a pool of other shapes excluding the target shape
    const otherShapes = shapes.filter(s => s.id !== targetShape.id);
    
    // Randomly select 2 other shapes
    const selectedOtherShapes = otherShapes
      .sort(() => Math.random() - 0.5)
      .slice(0, 2);
    
    // Combine target shape with random shapes and shuffle
    const allOptions = [targetShape, ...selectedOtherShapes]
      .sort(() => Math.random() - 0.5);
    
    setOptions(allOptions);

    // Speak the prompt
    if (soundEnabled) {
      const prompt = language === 'es'
        ? `¿Puedes encontrar el ${targetShape.name.es}?`
        : `Can you find the ${targetShape.name.en}?`;
      speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
    }
  };

  const handleShapeClick = (selectedShape: typeof shapes[0]) => {
    if (selectedShape.id === shapes[currentShape].id) {
      playGameSound('success');

      if (soundEnabled) {
        const celebration = language === 'es'
          ? '¡Excelente trabajo!'
          : 'Great job!';
        speakText(celebration, language === 'es' ? 'es-ES' : 'en-US');
      }

      setScore(score + 1);
      setShowCelebration(true);
      
      setTimeout(() => {
        setShowCelebration(false);
        if (currentShape < shapes.length - 1) {
          const nextShapeIndex = currentShape + 1;
          setCurrentShape(nextShapeIndex);
          generateNewRound(nextShapeIndex);
        }
      }, 2000);
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
        `}>
          {!isStarted ? (
            // Title Screen
            <div className="flex flex-col items-center space-y-8">
              <h1 className={`
                text-4xl font-bold text-center
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {language === 'es' ? '¡Formas Divertidas!' : 'Fun Shapes!'}
              </h1>

              <div className="grid grid-cols-3 gap-8">
                {shapes.slice(0, 3).map((shape, index) => (
                  <div
                    key={index}
                    className={`
                      aspect-square rounded-2xl
                      ${isVibrant
                        ? `bg-gradient-to-r ${shape.color}`
                        : isDarkMode
                          ? 'bg-gray-700'
                          : 'bg-purple-600'
                      }
                      flex items-center justify-center
                      transform hover:scale-110
                      transition-all duration-300
                      animate-float
                    `}
                    style={{ animationDelay: `${index * 0.2}s` }}
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="w-24 h-24 text-white"
                    >
                      <path d={shape.path} fill="currentColor" />
                    </svg>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setIsStarted(true)}
                className={`
                  px-8 py-4 rounded-xl
                  flex items-center gap-2
                  font-bold text-white
                  transform hover:scale-105
                  transition-all duration-300
                  ${isVibrant
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                    : 'bg-purple-600 hover:bg-purple-700'
                  }
                `}
              >
                <Play className="w-6 h-6" />
                <span>{language === 'es' ? 'Comenzar' : 'Start'}</span>
              </button>
            </div>
          ) : (
            <>
              {/* Target Shape */}
              <div className="flex justify-center mb-12">
                <div className={`
                  w-48 h-48 rounded-2xl
                  ${isVibrant
                    ? `bg-gradient-to-r ${shapes[currentShape].color}`
                    : isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-purple-600'
                  }
                  flex items-center justify-center
                  shadow-lg
                `}>
                  <svg
                    viewBox="0 0 100 100"
                    className="w-32 h-32 text-white"
                  >
                    <path d={shapes[currentShape].path} fill="currentColor" />
                  </svg>
                </div>
              </div>

              {/* Shape Options */}
              <div className="grid grid-cols-3 gap-6">
                {options.map((shape, index) => (
                  <button
                    key={index}
                    onClick={() => handleShapeClick(shape)}
                    className={`
                      aspect-square rounded-2xl
                      flex items-center justify-center
                      transform hover:scale-110
                      transition-all duration-300
                      ${isVibrant
                        ? `bg-gradient-to-r ${shape.color}`
                        : isDarkMode
                          ? 'bg-gray-700'
                          : 'bg-purple-600'
                      }
                      shadow-lg
                    `}
                  >
                    <svg
                      viewBox="0 0 100 100"
                      className="w-24 h-24 text-white"
                    >
                      <path d={shape.path} fill="currentColor" />
                    </svg>
                  </button>
                ))}
              </div>
            </>
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