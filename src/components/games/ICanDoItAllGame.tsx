import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, Play, Home, ArrowLeft } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { useAuth } from '../../contexts/AuthContext';
import { updateProgressData, addCompletedLesson } from '../../utils/progressStorage';

interface ICanDoItAllGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Different actions with enhanced animations
const actions = [
  {
    id: 'running',
    animation: 'animate-run',
    text: { en: 'running', es: 'corriendo' },
    prompt: { en: 'Who is running?', es: '¿Quién está corriendo?' },
    icon: '🏃'
  },
  {
    id: 'jumping',
    animation: 'animate-jump',
    text: { en: 'jumping', es: 'saltando' },
    prompt: { en: 'Who is jumping?', es: '¿Quién está saltando?' },
    icon: '🦘'
  },
  {
    id: 'spinning',
    animation: 'animate-spin-character',
    text: { en: 'spinning', es: 'girando' },
    prompt: { en: 'Who is spinning?', es: '¿Quién está girando?' },
    icon: '🌀'
  },
  {
    id: 'stomping',
    animation: 'animate-stomp',
    text: { en: 'stomping', es: 'pisando fuerte' },
    prompt: { en: 'Who is stomping?', es: '¿Quién está pisando fuerte?' },
    icon: '👣'
  }
];

export function ICanDoItAllGame({ isDarkMode, isVibrant, onExit, language }: ICanDoItAllGameProps) {
  const { user } = useAuth();
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
  const [gameComplete, setGameComplete] = useState(false);
  const [promptReady, setPromptReady] = useState(false);

  // Initialize game
  useEffect(() => {
    generateNewRound(0);
  }, []);

  // Handle game completion
  const handleGameCompletion = async () => {
    if (!user) return;

    setGameComplete(true);
    playGameSound('success');

    try {
      // Update reward points
      await updateProgressData(user.uid, {
        rewardPoints: score * 10 // 10 points per correct action
      });

      // Mark lesson as completed
      await addCompletedLesson(user.uid, 'icandoitall');

      // Play victory sound and speech
      if (soundEnabled) {
        const victoryMessage = language === 'es'
          ? '¡Felicitaciones! ¡Has completado el juego!'
          : 'Congratulations! You have completed the game!';
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

  // Generate new round with synchronized actions and prompts
  const generateNewRound = (actionIndex: number) => {
    setIsTransitioning(true);
    setPromptReady(false);
    setShowActionLabel(false);
    setSelectedCharacter(null);
    
    // Get target action
    const targetAction = actions[actionIndex];
    
    // Ensure visual transition is complete before speaking prompt
    setTimeout(() => {
      setIsTransitioning(false);
      setPromptReady(true);
      
      // Speak the prompt only after transition and when ready
      if (soundEnabled) {
        const prompt = targetAction.prompt[language as keyof typeof targetAction.prompt];
        speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
      }
    }, 300);
  };

  const handleCharacterClick = (action: string, index: number) => {
    if (gameComplete || !promptReady) return;
    setSelectedCharacter(index);

    const targetAction = actions[currentAction];
    if (action === targetAction.id) {
      playGameSound('success');
      setScore(score + 1);
      setShowCelebration(true);
      setIsCharacterAnimating(true);
      setShowActionLabel(true);
      
      if (soundEnabled) {
        const celebration = language === 'es'
          ? '¡Excelente trabajo!'
          : 'Great job!';
        speakText(celebration, language === 'es' ? 'es-ES' : 'en-US');
      }
      
      setTimeout(() => {
        setIsCharacterAnimating(false);
        setShowCelebration(false);
        if (currentAction < actions.length - 1) {
          const nextAction = (currentAction + 1) % actions.length;
          setCurrentAction(nextAction);
          generateNewRound(nextAction);
        } else {
          handleGameCompletion();
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

  // Enhanced Character component with improved animations
  const Character = ({ action = '', onClick, index }: { action?: string; onClick?: () => void; index: number }) => {
    const actionData = actions.find(a => a.id === action) || actions[0];
    const isCorrect = action === actions[currentAction].id;
    const isSelected = selectedCharacter === index;
    
    return (
      <button
        onClick={onClick}
        disabled={gameComplete || !promptReady}
        className={`
          relative w-48 h-48
          transform transition-all duration-300
          hover:scale-105 focus:outline-none
          ${isSelected && isError ? 'animate-shake' : ''}
          disabled:opacity-50
          ${action === 'jumping' ? 'mt-16' : ''} // Extra space for jumping animation
        `}
      >
        {/* Character Body */}
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
          ${isCorrect && isCharacterAnimating ? actionData.animation : ''}
          ${action === 'spinning' ? actionData.animation : ''} // Always spin for spinning character
          ${action === 'jumping' ? 'animate-jump' : ''} // Always jump for jumping character
        `}>
          {/* Character Face */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="flex space-x-4 mb-4">
              <div className="w-4 h-4 rounded-full bg-white"></div>
              <div className="w-4 h-4 rounded-full bg-white"></div>
            </div>
            <div className="w-8 h-2 bg-white rounded-full"></div>
          </div>

          {/* Running Legs */}
          {action === 'running' && (
            <div className="absolute -bottom-4 w-full">
              <div className="relative h-8">
                <div className="absolute w-6 h-12 bg-yellow-400 rounded-full left-1/3 animate-run-legs"></div>
                <div className="absolute w-6 h-12 bg-yellow-400 rounded-full right-1/3 animate-run-legs" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}

          {/* Jumping Shadow */}
          {action === 'jumping' && (
            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 w-32">
              <div className="h-2 bg-black/20 rounded-full animate-jump-shadow"></div>
            </div>
          )}

          {/* Stomping Feet */}
          {action === 'stomping' && (
            <div className="absolute -bottom-4 w-full">
              <div className="relative h-8">
                <div className="absolute w-8 h-4 bg-yellow-400 rounded-full left-1/4 animate-stomp-feet"></div>
                <div className="absolute w-8 h-4 bg-yellow-400 rounded-full right-1/4 animate-stomp-feet" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          )}

          {/* Action Label */}
          {isCorrect && showActionLabel && (
            <div className={`
              absolute -top-8 left-1/2 transform -translate-x-1/2
              bg-black/50 backdrop-blur-sm
              text-white text-center px-4 py-2 rounded-full
              font-bold text-lg
              transition-opacity duration-300
              flex items-center gap-2
            `}>
              <span>{actionData.icon}</span>
              <span>{actionData.text[language as keyof typeof actionData.text]}</span>
            </div>
          )}
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
            {/* Back Button */}
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
            // Title Screen
            <div className={`
              flex flex-col items-center space-y-8
              animate-fade-in
            `}>
              <h1 className={`
                text-4xl font-bold text-center font-comic
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {language === 'es' ? '¡Puedo Hacer Todo!' : 'I Can Do It All!'}
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
                    setIsStarted(true);
                    setIsTransitioning(false);
                    setPromptReady(true);
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

              {/* Centered Character Grid with Extra Space for Animations */}
              <div className="flex justify-center items-center min-h-[500px] pt-12 md:pt-16">
                <div className={`
                  grid grid-cols-2 gap-8
                  transition-opacity duration-300
                  ${isTransitioning ? 'opacity-0' : 'opacity-100'}
                `}>
                  {actions.map((action, index) => (
                    <Character
                      key={index}
                      action={action.id}
                      onClick={() => handleCharacterClick(action.id, index)}
                      index={index}
                    />
                  ))}
                </div>
              </div>
            </>
          )}

          {/* Celebration Overlay */}
          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white mb-4">
                  {gameComplete
                    ? language === 'es'
                      ? '¡Felicitaciones! 🎉\n¡Has completado el juego!'
                      : 'Congratulations! 🎉\nYou completed the game!'
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