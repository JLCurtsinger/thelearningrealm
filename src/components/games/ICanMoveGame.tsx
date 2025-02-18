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
    prompt: { en: 'Who is running?', es: '¿Quién está corriendo?' },
    icon: '🏃'
  },
  {
    id: 'jumping',
    animation: 'animate-bounce',
    text: { en: 'jumping', es: 'saltando' },
    prompt: { en: 'Who is jumping?', es: '¿Quién está saltando?' },
    icon: '🦘'
  },
  {
    id: 'spinning',
    animation: 'animate-spin-slow',
    text: { en: 'spinning', es: 'girando' },
    prompt: { en: 'Who is spinning?', es: '¿Quién está girando?' },
    icon: '🌀'
  }
];

export function ICanMoveGame({ isDarkMode, isVibrant, onExit, language }: ICanMoveGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentAction, setCurrentAction] = useState(0);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [isCharacterAnimating, setIsCharacterAnimating] = useState(false);
  const [showActionLabel, setShowActionLabel] = useState(false);
  const [isError, setIsError] = useState(false);

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
  }, [isStarted, currentAction]);

  const generateNewRound = () => {
    setIsTransitioning(true);
    setShowActionLabel(false);
    setSelectedCharacter(null);
    setIsError(false);

    // Speak the current action prompt
    if (soundEnabled) {
      const prompt = actions[currentAction].prompt[language as keyof typeof actions[0]['prompt']];
      speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleActionClick = (selectedAction: string, index: number) => {
    setSelectedCharacter(index);

    if (selectedAction === actions[currentAction].id) {
      playGameSound('success');
      setIsCharacterAnimating(true);
      setShowActionLabel(true);

      if (soundEnabled) {
        const celebration = language === 'es'
          ? '¡Excelente trabajo!'
          : 'Great job!';
        speakText(celebration, language === 'es' ? 'es-ES' : 'en-US');
      }

      setScore(score + 1);
      setShowCelebration(true);
      
      setTimeout(() => {
        setIsCharacterAnimating(false);
        setShowCelebration(false);
        setShowActionLabel(false);
        if (currentAction < actions.length - 1) {
          setCurrentAction(prev => prev + 1);
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
        setSelectedCharacter(null);
      }, 500);
    }
  };

  // Animated character component
  const Character = ({ action = '', onClick, index }: { action?: string; onClick?: () => void; index: number }) => {
    const actionData = actions.find(a => a.id === action) || actions[0];
    
    return (
      <button
        onClick={onClick}
        disabled={showCelebration}
        className={`
          relative w-48 h-48
          transform transition-all duration-300
          hover:scale-105 focus:outline-none
          ${selectedCharacter === index && isError ? 'animate-[shake_0.5s_ease-in-out]' : ''}
          ${action === actions[currentAction].id && isCharacterAnimating ? actionData.animation : ''}
          disabled:opacity-50
        `}
      >
        <div className={`
          absolute inset-0
          ${isVibrant
            ? 'bg-gradient-to-b from-purple-500 to-pink-500'
            : isDarkMode
              ? 'bg-gray-700'
              : 'bg-purple-600'
          }
          rounded-full
          shadow-lg
        `}>
          {/* Character face */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="flex space-x-4 mb-4">
              <div className="w-4 h-4 rounded-full bg-white"></div>
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <div className="w-8 h-2 bg-white rounded-full"></div>

            {/* Action Label */}
            {action === actions[currentAction].id && showActionLabel && (
              <div className={`
                absolute -top-8 left-1/2 transform -translate-x-1/2
                bg-black/50 backdrop-blur-sm
                text-white text-center px-4 py-2 rounded-full
                font-bold text-sm
                transition-opacity duration-300
              `}>
                {actionData.text[language as keyof typeof actionData.text]}
              </div>
            )}
          </div>
        </div>
      </button>
    );
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            {/* Progress Indicator */}
            {isStarted && (
              <div className={`
                px-4 py-2 rounded-full font-bold
                ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
                shadow-lg
                transition-opacity duration-300
              `}>
                {language === 'es'
                  ? `Acción ${currentAction + 1} de ${actions.length}`
                  : `Action ${currentAction + 1} of ${actions.length}`}
              </div>
            )}

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
        `}>
          {!isStarted ? (
            // Title Screen with enhanced fade-in
            <div className={`
              flex flex-col items-center space-y-8
              animate-fade-in
            `}>
              <h1 className={`
                text-4xl font-bold text-center font-comic
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {language === 'es' ? '¡Me Puedo Mover!' : 'I Can Move!'}
              </h1>

              <div className="grid grid-cols-3 gap-8">
                {actions.map((action, index) => (
                  <Character
                    key={index}
                    action={action.id}
                    index={index}
                  />
                ))}
              </div>

              <button
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setIsStarted(true);
                    setIsTransitioning(false);
                  }, 300);
                }}
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
                  shadow-lg
                `}
              >
                <Play className="w-6 h-6" />
                <span>{language === 'es' ? 'Comenzar' : 'Start'}</span>
              </button>
            </div>
          ) : (
            <>
              <div className="flex items-center justify-center gap-2 mb-8">
                <h2 className={`
                  text-2xl font-bold text-center font-comic
                  ${isDarkMode ? 'text-white' : 'text-gray-900'}
                `}>
                  {actions[currentAction].prompt[language as keyof typeof actions[0]['prompt']]}
                </h2>
                <span className="text-2xl">{actions[currentAction].icon}</span>
              </div>

              <div className={`
                grid grid-cols-3 gap-8
                transition-opacity duration-300
                ${isTransitioning ? 'opacity-0' : 'opacity-100'}
              `}>
                {actions.map((action, index) => (
                  <Character
                    key={index}
                    action={action.id}
                    onClick={() => handleActionClick(action.id, index)}
                    index={index}
                  />
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