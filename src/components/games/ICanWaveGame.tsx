import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, Play } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { useAuth } from '../../contexts/AuthContext';
import { updateProgressData, addCompletedLesson } from '../../utils/progressStorage';

interface ICanWaveGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

export function ICanWaveGame({ isDarkMode, isVibrant, onExit, language }: ICanWaveGameProps) {
  const { user } = useAuth();
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showError, setShowError] = useState(false);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [isCharacterAnimating, setIsCharacterAnimating] = useState(false);
  const [showActionLabel, setShowActionLabel] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [promptReady, setPromptReady] = useState(false);

  useEffect(() => {
    if (soundEnabled && !isStarted) {
      speakText(
        language === 'es' 
          ? '¿Puedes saludar como yo?' 
          : 'Can you wave like me?',
        language === 'es' ? 'es-ES' : 'en-US'
      );
    }
  }, [isStarted]);

  const handleGameCompletion = async () => {
    if (!user) return;

    setGameComplete(true);
    playGameSound('success');

    try {
      await updateProgressData(user.uid, {
        rewardPoints: score * 10
      });

      await addCompletedLesson(user.uid, 'icanwave');

      if (soundEnabled) {
        const victoryMessage = language === 'es'
          ? '¡Felicitaciones! ¡Has completado el juego!'
          : 'Congratulations! You have completed the game!';
        speakText(victoryMessage, language === 'es' ? 'es-ES' : 'en-US');
      }

      setTimeout(() => {
        onExit();
        window.location.reload(); // Force refresh to repopulate available games
      }, 3000);
    } catch (error) {
      console.error('Error updating progress:', error);
      setTimeout(() => {
        onExit();
        window.location.reload(); // Force refresh even after error
      }, 3000);
    }
  };

  const handleCharacterClick = (isWaving: boolean, index: number) => {
    if (gameComplete || !promptReady) return;
    setSelectedCharacter(index);

    if (isWaving) {
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
        if (round < totalRounds) {
          setRound(prev => prev + 1);
          setSelectedCharacter(null);
        } else {
          handleGameCompletion();
        }
      }, 2000);
    } else {
      playGameSound('error');
      setShowError(true);
      
      if (soundEnabled) {
        const tryAgain = language === 'es' 
          ? 'Inténtalo de nuevo' 
          : 'Try again';
        speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
      }

      setTimeout(() => {
        setShowError(false);
        setSelectedCharacter(null);
      }, 1000);
    }
  };

  const Character = ({ isWaving = false, onClick, index }: { isWaving?: boolean; onClick?: () => void; index: number }) => (
    <button
      onClick={onClick}
      disabled={showCelebration || gameComplete}
      className={`
        relative w-48 h-48
        transform transition-all duration-300
        hover:scale-105 focus:outline-none
        ${selectedCharacter === index && showError ? 'animate-[shake_0.5s_ease-in-out]' : ''}
        disabled:opacity-50
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
      `}>
        {/* Character Face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="flex space-x-4 mb-4">
            <div className="w-4 h-4 rounded-full bg-white"></div>
            <div className="w-4 h-4 rounded-full bg-white"></div>
          </div>
          <div className="w-8 h-2 bg-white rounded-full"></div>
        </div>

        {/* Waving Arm */}
        {isWaving && (
          <div className="absolute -right-4 top-1/2 -translate-y-1/2">
            <div className={`
              w-8 h-2 bg-yellow-400 rounded-full
              ${isCharacterAnimating ? 'animate-wave' : ''}
            `} />
          </div>
        )}

        {/* Action Label */}
        {isWaving && showActionLabel && (
          <div className={`
            absolute -top-8 left-1/2 transform -translate-x-1/2
            bg-black/50 backdrop-blur-sm
            text-white text-center px-4 py-2 rounded-full
            font-bold text-sm
            transition-opacity duration-300
          `}>
            {language === 'es' ? '¡Saludando!' : 'Waving!'}
          </div>
        )}
      </div>
    </button>
  );

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
              `}>
                {language === 'es'
                  ? `Ronda ${round} de ${totalRounds}`
                  : `Round ${round} of ${totalRounds}`}
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
                {language === 'es' ? '¡Puedo Saludar!' : 'I Can Wave!'}
              </h1>

              <Character isWaving={true} index={0} />

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
              <h2 className={`
                text-2xl font-bold text-center mb-12 font-comic
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {language === 'es' ? '¿Quién está saludando?' : 'Who is waving?'}
              </h2>

              <div className="flex justify-center items-center min-h-[500px]">
                <div className={`
                  grid grid-cols-1 md:grid-cols-2 gap-12
                  transition-opacity duration-300
                  ${isTransitioning ? 'opacity-0' : 'opacity-100'}
                `}>
                  {[true, false]
                    .sort(() => Math.random() - 0.5)
                    .map((isWaving, index) => (
                      <Character
                        key={index}
                        isWaving={isWaving}
                        onClick={() => handleCharacterClick(isWaving, index)}
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