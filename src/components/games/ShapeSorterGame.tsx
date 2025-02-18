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
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedShape, setSelectedShape] = useState<string | null>(null);
  const [isShapeAnimating, setIsShapeAnimating] = useState(false);
  const [showShapeLabel, setShowShapeLabel] = useState(false);
  const [isShapeError, setIsShapeError] = useState(false);

  useEffect(() => {
    generateNewRound();
  }, []);

  const generateNewRound = () => {
    setIsTransitioning(true);
    setShowShapeLabel(false);
    setSelectedShape(null);
    
    const targetShape = shapes[currentShape];
    
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

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleShapeClick = (selectedShape: typeof shapes[0]) => {
    setSelectedShape(selectedShape.id);

    if (selectedShape.id === shapes[currentShape].id) {
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
        }
      }, 2000);
    } else {
      playGameSound('error');
      setIsShapeError(true);
      
      if (soundEnabled) {
        const tryAgain = language === 'es'
          ? 'Inténtalo de nuevo'
          : 'Try again';
        speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
      }

      setTimeout(() => {
        setIsShapeError(false);
        setSelectedShape(null);
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
                ? `Forma ${round} de ${totalRounds}`
                : `Shape ${round} of ${totalRounds}`}
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
          {/* Target Shape Display */}
          <div className="text-center mb-8">
            <h2 className={`
              text-2xl font-bold font-comic
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
              {language === 'es'
                ? `¿Puedes encontrar el ${shapes[currentShape].name.es}?`
                : `Can you find the ${shapes[currentShape].name.en}?`}
            </h2>
          </div>

          {/* Shape Options */}
          <div className={`
            grid grid-cols-3 gap-6
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            {options.map((shape, index) => (
              <button
                key={index}
                onClick={() => handleShapeClick(shape)}
                disabled={showCelebration}
                className={`
                  aspect-square rounded-2xl
                  flex items-center justify-center
                  transform transition-all duration-300
                  ${isVibrant
                    ? `bg-gradient-to-r ${shape.color}`
                    : isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-purple-600'
                  }
                  ${selectedShape === shape.id && isShapeError
                    ? 'animate-[shake_0.5s_ease-in-out] border-2 border-red-500'
                    : 'hover:scale-110'
                  }
                  ${shape.id === shapes[currentShape].id && showShapeLabel
                    ? 'ring-4 ring-green-500 scale-110'
                    : ''
                  }
                  shadow-lg
                  disabled:opacity-50
                  relative
                  p-4
                `}
              >
                <svg
                  viewBox="0 0 100 100"
                  className={`
                    w-full h-full text-white
                    ${shape.id === shapes[currentShape].id && isShapeAnimating ? 'animate-bounce' : ''}
                  `}
                >
                  <path d={shape.path} fill="currentColor" />
                </svg>

                {/* Shape Label Overlay */}
                {shape.id === shapes[currentShape].id && showShapeLabel && (
                  <div className={`
                    absolute bottom-0 left-0 right-0
                    bg-black/50 backdrop-blur-sm
                    text-white text-center py-2 font-bold
                    transform transition-all duration-300
                    rounded-b-2xl
                  `}>
                    {shape.name[language as keyof typeof shape.name]}
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