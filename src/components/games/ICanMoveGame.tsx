import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, Play, XCircle } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface ICanMoveGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Movement actions with translations and animations
const actions = [
  {
    id: 'running',
    animation: 'animate-[run_0.5s_ease-in-out_infinite]',
    text: { en: 'running', es: 'corriendo' },
    prompt: { en: 'Who is running?', es: '¿Quién está corriendo?' }
  },
  {
    id: 'jumping',
    animation: 'animate-bounce',
    text: { en: 'jumping', es: 'saltando' },
    prompt: { en: 'Who is jumping?', es: '¿Quién está saltando?' }
  },
  {
    id: 'spinning',
    animation: 'animate-spin-slow',
    text: { en: 'spinning', es: 'girando' },
    prompt: { en: 'Who is spinning?', es: '¿Quién está girando?' }
  }
];

export function ICanMoveGame({ isDarkMode, isVibrant, onExit, language }: ICanMoveGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentAction, setCurrentAction] = useState(0);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showError, setShowError] = useState(false);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    if (soundEnabled && !isStarted) {
      speakText(
        language === 'es' 
          ? '¡Vamos a movernos!' 
          : "Let's move!",
        language === 'es' ? 'es-ES' : 'en-US'
      );
    }
  }, [isStarted]);

  useEffect(() => {
    if (isStarted) {
      generateNewRound();
    }
  }, [isStarted]);

  const generateNewRound = () => {
    // Select random shape
    const newShape = actions[currentAction];
    
    // Speak the prompt
    if (soundEnabled) {
      const prompt = language === 'es'
        ? `¿Puedes encontrar quién está ${newShape.text.es}?`
        : `Can you find who is ${newShape.text.en}?`;
      speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
    }
  };

  const handleShapeClick = (selectedAction: string) => {
    if (selectedAction === actions[currentAction].id) {
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
        if (currentAction < actions.length - 1) {
          setCurrentAction(prev => prev + 1);
          generateNewRound();
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

      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
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
                {language === 'es' ? '¡Me Puedo Mover!' : 'I Can Move!'}
              </h1>

              <div className="grid grid-cols-3 gap-8">
                {actions.map((action, index) => (
                  <div
                    key={index}
                    className={`
                      aspect-square rounded-2xl
                      ${isVibrant
                        ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
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
                    <div className={`
                      w-24 h-24 rounded-full
                      bg-white/10
                      ${action.animation}
                    `} />
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
              <h2 className={`
                text-2xl font-bold text-center mb-12
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {actions[currentAction].prompt[language as keyof typeof actions[0]['prompt']]}
              </h2>

              <div className="grid grid-cols-3 gap-8">
                {actions.map((action, index) => (
                  <button
                    key={index}
                    onClick={() => handleShapeClick(action.id)}
                    className={`
                      aspect-square rounded-2xl
                      flex items-center justify-center
                      transform hover:scale-110
                      transition-all duration-300
                      ${isVibrant
                        ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                        : isDarkMode
                          ? 'bg-gray-700'
                          : 'bg-purple-600'
                      }
                      shadow-lg
                    `}
                  >
                    <div className={`
                      w-24 h-24 rounded-full
                      bg-white/10
                      ${action.id === actions[currentAction].id ? action.animation : ''}
                    `} />
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

          {/* Error Overlay */}
          {showError && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-500/30 rounded-3xl">
              <div className="text-center">
                <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white">
                  {language === 'es' ? '¡Inténtalo de nuevo!' : 'Try again!'}
                </h3>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}