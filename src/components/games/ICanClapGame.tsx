import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, Play, XCircle } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface ICanClapGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

export function ICanClapGame({ isDarkMode, isVibrant, onExit, language }: ICanClapGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (soundEnabled && !isStarted) {
      speakText(
        language === 'es' 
          ? '¿Puedes aplaudir conmigo?' 
          : 'Can you clap your hands?',
        language === 'es' ? 'es-ES' : 'en-US'
      );
    }
  }, [isStarted]);

  const handleCharacterClick = (isClapping: boolean) => {
    if (isClapping) {
      playGameSound('success');

      if (soundEnabled) {
        speakText(
          language === 'es' 
            ? '¡Excelente trabajo!' 
            : 'Great job!',
          language === 'es' ? 'es-ES' : 'en-US'
        );
      }

      setScore(score + 1);
      setShowCelebration(true);
      setTimeout(() => {
        setShowCelebration(false);
      }, 2000);
    } else {
      playGameSound('error');
      
      if (soundEnabled) {
        speakText(
          language === 'es' 
            ? '¡Inténtalo de nuevo!' 
            : 'Try again!',
          language === 'es' ? 'es-ES' : 'en-US'
        );
      }

      setShowError(true);
      setTimeout(() => setShowError(false), 1000);
    }
  };

  // Animated character component
  const Character = ({ isClapping = false, onClick }: { isClapping?: boolean; onClick?: () => void }) => (
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
      `}>
        {/* Simple character face */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
          <div className="flex space-x-4 mb-4">
            <div className="w-4 h-4 rounded-full bg-white"></div>
            <div className="w-4 h-4 rounded-full bg-white"></div>
          </div>
          <div className="w-8 h-2 bg-white rounded-full"></div>

          {/* Clapping hands animation */}
          {isClapping && (
            <div className="absolute -bottom-4 flex justify-center w-full">
              <div className="relative">
                <div className="absolute w-8 h-8 bg-yellow-400 rounded-full -left-6 animate-[clap_0.5s_ease-in-out_infinite]"></div>
                <div className="absolute w-8 h-8 bg-yellow-400 rounded-full left-2 animate-[clap_0.5s_ease-in-out_infinite_reverse]"></div>
              </div>
            </div>
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
          {!isStarted ? (
            // Title Screen
            <div className="flex flex-col items-center space-y-8">
              <h1 className={`
                text-4xl font-bold text-center
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {language === 'es' ? '¡Puedo Aplaudir!' : 'I Clap My Hands!'}
              </h1>

              <Character isClapping={true} />

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
            // Game Screen
            <>
              <h2 className={`
                text-2xl font-bold text-center mb-12
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {language === 'es' ? '¿Quién está aplaudiendo?' : 'Who is clapping?'}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center">
                {[true, false]
                  .sort(() => Math.random() - 0.5)
                  .map((isClapping, index) => (
                    <Character
                      key={index}
                      isClapping={isClapping}
                      onClick={() => handleCharacterClick(isClapping)}
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