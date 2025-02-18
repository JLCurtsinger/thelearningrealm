import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, Play, XCircle, ArrowLeft, ArrowRight, Home } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface ICanDoItAllGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// All possible actions with their animations and translations
const actions = [
  {
    id: 'wave',
    animation: 'wave',
    text: { en: 'waving', es: 'saludando' },
    prompt: { en: 'Who is waving?', es: '¿Quién está saludando?' },
    icon: '👋'
  },
  {
    id: 'jump',
    animation: 'bounce',
    text: { en: 'jumping', es: 'saltando' },
    prompt: { en: 'Who is jumping?', es: '¿Quién está saltando?' },
    icon: '🦘'
  },
  {
    id: 'clap',
    animation: 'clap',
    text: { en: 'clapping', es: 'aplaudiendo' },
    prompt: { en: 'Who is clapping?', es: '¿Quién está aplaudiendo?' },
    icon: '👏'
  },
  {
    id: 'stomp',
    animation: 'stomp',
    text: { en: 'stomping', es: 'pisando fuerte' },
    prompt: { en: 'Who is stomping?', es: '¿Quién está pisando fuerte?' },
    icon: '👣'
  }
];

export function ICanDoItAllGame({ isDarkMode, isVibrant, onExit, language }: ICanDoItAllGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'final'>('intro');
  const [currentAction, setCurrentAction] = useState(0);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [isCharacterAnimating, setIsCharacterAnimating] = useState(false);
  const [showActionLabel, setShowActionLabel] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    if (soundEnabled && gameState === 'intro') {
      speakIntro();
    }
  }, [gameState]);

  useEffect(() => {
    if (gameState === 'playing') {
      generateNewRound();
    }
  }, [gameState, currentAction]);

  const speakIntro = () => {
    const intro = language === 'es' 
      ? '¡Vamos a practicar todo lo que hemos aprendido!'
      : "Let's practice everything we've learned!";
    speakText(intro, language === 'es' ? 'es-ES' : 'en-US');
  };

  const speakPrompt = () => {
    const prompt = actions[currentAction].prompt[language as keyof typeof actions[0]['prompt']];
    speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
  };

  const generateNewRound = () => {
    setIsTransitioning(true);
    setShowActionLabel(false);
    setSelectedCharacter(null);
    setIsError(false);

    setTimeout(() => {
      speakPrompt();
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
        } else {
          setGameState('final');
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
          ${action === actions[currentAction].id && isCharacterAnimating ? 'animate-bounce' : ''}
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

            {/* Action-specific animations */}
            {action === 'wave' && (
              <div className="absolute -right-4 top-1/2">
                <div className="w-8 h-2 bg-yellow-400 rounded-full animate-wave"></div>
              </div>
            )}
            {action === 'clap' && (
              <div className="absolute -bottom-4 flex justify-center w-full">
                <div className="relative">
                  <div className="absolute w-8 h-8 bg-yellow-400 rounded-full -left-6 animate-[clap_0.5s_ease-in-out_infinite]"></div>
                  <div className="absolute w-8 h-8 bg-yellow-400 rounded-full left-2 animate-[clap_0.5s_ease-in-out_infinite_reverse]"></div>
                </div>
              </div>
            )}
            {action === 'stomp' && (
              <>
                <div className="absolute -bottom-4 flex justify-center w-full">
                  <div className="relative">
                    <div className="absolute w-12 h-4 bg-yellow-400 rounded-full -left-8 animate-[stomp-left_0.5s_ease-in-out_infinite]"></div>
                    <div className="absolute w-12 h-4 bg-yellow-400 rounded-full left-2 animate-[stomp-right_0.5s_ease-in-out_infinite_0.25s]"></div>
                  </div>
                </div>
                <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                  <div className="w-32 h-1 bg-gray-400/50 rounded-full animate-[shake_0.5s_ease-in-out_infinite]"></div>
                </div>
              </>
            )}

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
            {gameState === 'playing' && (
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
          {gameState === 'intro' ? (
            // Title Screen with enhanced fade-in
            <div className={`
              flex flex-col items-center space-y-8
              animate-fade-in
            `}>
              <h1 className={`
                text-4xl font-bold text-center font-comic
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {language === 'es'
                  ? '¡Puedo Saludar, Saltar, Aplaudir y Pisar Fuerte!'
                  : 'I Can Wave, Jump, Clap, and Stomp!'}
              </h1>

              <div className="grid grid-cols-2 gap-8">
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
                    setGameState('playing');
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
          ) : gameState === 'playing' ? (
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
                grid grid-cols-2 gap-8
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
          ) : (
            // Final Screen
            <div className="flex flex-col items-center space-y-8">
              <h2 className={`
                text-4xl font-bold text-center mb-4 font-comic
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {language === 'es' 
                  ? '¡Fantástico! ¿Qué puedes hacer TÚ?' 
                  : 'Amazing! What can YOU do?'}
              </h2>

              <Character action="wave" index={0} />

              <p className={`
                text-xl text-center
                ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
              `}>
                {language === 'es'
                  ? '¡Muéstrame tus movimientos favoritos!'
                  : 'Show me your favorite moves!'}
              </p>

              <div className="flex space-x-4">
                <button
                  onClick={() => {
                    setCurrentAction(0);
                    setScore(0);
                    setGameState('playing');
                  }}
                  className={`
                    px-6 py-3 rounded-xl
                    flex items-center gap-2
                    font-bold text-white
                    transform hover:scale-105
                    transition-all duration-300
                    ${isVibrant
                      ? 'bg-gradient-to-r from-green-500 to-emerald-500'
                      : 'bg-green-600 hover:bg-green-700'
                    }
                    shadow-lg
                  `}
                >
                  <ArrowRight className="w-5 h-5" />
                  <span>{language === 'es' ? 'Jugar de Nuevo' : 'Play Again'}</span>
                </button>

                <button
                  onClick={onExit}
                  className={`
                    px-6 py-3 rounded-xl
                    flex items-center gap-2
                    font-bold
                    transform hover:scale-105
                    transition-all duration-300
                    ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}
                    shadow-lg
                  `}
                >
                  <Home className="w-5 h-5" />
                  <span>{language === 'es' ? 'Menú Principal' : 'Main Menu'}</span>
                </button>
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