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
    prompt: { en: 'Who is waving?', es: '¿Quién está saludando?' }
  },
  {
    id: 'jump',
    animation: 'bounce',
    text: { en: 'jumping', es: 'saltando' },
    prompt: { en: 'Who is jumping?', es: '¿Quién está saltando?' }
  },
  {
    id: 'clap',
    animation: 'clap',
    text: { en: 'clapping', es: 'aplaudiendo' },
    prompt: { en: 'Who is clapping?', es: '¿Quién está aplaudiendo?' }
  },
  {
    id: 'stomp',
    animation: 'stomp',
    text: { en: 'stomping', es: 'pisando fuerte' },
    prompt: { en: 'Who is stomping?', es: '¿Quién está pisando fuerte?' }
  }
];

export function ICanDoItAllGame({ isDarkMode, isVibrant, onExit, language }: ICanDoItAllGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [gameState, setGameState] = useState<'intro' | 'playing' | 'final'>('intro');
  const [currentAction, setCurrentAction] = useState(0);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (soundEnabled && gameState === 'intro') {
      speakIntro();
    }
  }, [gameState]);

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

  const handleActionClick = (selectedAction: string) => {
    if (selectedAction === actions[currentAction].id) {
      playGameSound('success');

      if (soundEnabled) {
        speakText(
          language === 'es' ? '¡Excelente trabajo!' : 'Great job!',
          language === 'es' ? 'es-ES' : 'en-US'
        );
      }

      setScore(score + 1);
      setShowCelebration(true);
      
      setTimeout(() => {
        setShowCelebration(false);
        if (currentAction === actions.length - 1) {
          setGameState('final');
        } else {
          setCurrentAction(prev => prev + 1);
          speakPrompt();
        }
      }, 2000);
    } else {
      playGameSound('error');
      
      if (soundEnabled) {
        speakText(
          language === 'es' ? '¡Inténtalo de nuevo!' : 'Try again!',
          language === 'es' ? 'es-ES' : 'en-US'
        );
      }

      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
    }
  };

  // Animated character component
  const Character = ({ action = '', onClick }: { action?: string; onClick?: () => void }) => (
    <button
      onClick={onClick}
      className={`
        relative w-48 h-48
        transform transition-all duration-300
        hover:scale-105 focus:outline-none
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
        ${action ? `animate-[${action}_0.5s_ease-in-out_infinite]` : ''}
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
        </div>
      </div>
    </button>
  );

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
          {gameState === 'intro' && (
            <div className="flex flex-col items-center space-y-8">
              <h1 className={`
                text-4xl font-bold text-center
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {language === 'es' 
                  ? '¡Puedo Saludar, Saltar, Aplaudir y Pisar Fuerte!' 
                  : 'I Can Wave, Jump, Clap, and Stomp!'}
              </h1>

              <div className="grid grid-cols-2 gap-8">
                {actions.map((action, index) => (
                  <Character key={index} action={action.animation} />
                ))}
              </div>

              <button
                onClick={() => {
                  setGameState('playing');
                  speakPrompt();
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
                `}
              >
                <Play className="w-6 h-6" />
                <span>{language === 'es' ? 'Comenzar' : 'Start'}</span>
              </button>
            </div>
          )}

          {gameState === 'playing' && (
            <>
              <h2 className={`
                text-2xl font-bold text-center mb-12
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {actions[currentAction].prompt[language as keyof typeof actions[0]['prompt']]}
              </h2>

              <div className="grid grid-cols-2 gap-8">
                {actions.map((action, index) => (
                  <Character
                    key={index}
                    action={action.id === actions[currentAction].id ? action.animation : ''}
                    onClick={() => handleActionClick(action.id)}
                  />
                ))}
              </div>
            </>
          )}

          {gameState === 'final' && (
            <div className="flex flex-col items-center space-y-8">
              <h2 className={`
                text-4xl font-bold text-center mb-4
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {language === 'es' 
                  ? '¡Fantástico! ¿Qué puedes hacer TÚ?' 
                  : 'Amazing! What can YOU do?'}
              </h2>

              <Character action="wave" />

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
                    speakPrompt();
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