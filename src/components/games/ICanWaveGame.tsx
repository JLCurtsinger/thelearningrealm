import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, Play, XCircle } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface ICanWaveGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Different waving animations
const WAVE_STYLES = [
  {
    id: 'friendly',
    armStyle: 'w-8 h-2 bg-yellow-400 rounded-full',
    animation: 'animate-wave origin-left',
    position: '-right-4 top-1/2'
  },
  {
    id: 'excited',
    armStyle: 'w-10 h-2 bg-yellow-400 rounded-full',
    animation: 'animate-[wave_1s_ease-in-out_infinite]',
    position: '-right-6 top-1/3'
  },
  {
    id: 'gentle',
    armStyle: 'w-6 h-2 bg-yellow-400 rounded-full',
    animation: 'animate-[wave_1.5s_ease-in-out_infinite]',
    position: '-right-4 top-2/3'
  }
];

export function ICanWaveGame({ isDarkMode, isVibrant, onExit, language }: ICanWaveGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [isStarted, setIsStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showError, setShowError] = useState(false);
  const [currentWaveStyle, setCurrentWaveStyle] = useState(0);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState<number | null>(null);
  const [isCharacterAnimating, setIsCharacterAnimating] = useState(false);
  const [showActionLabel, setShowActionLabel] = useState(false);

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

  const handleCharacterClick = (isWaving: boolean, index: number) => {
    setSelectedCharacter(index);

    if (isWaving) {
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
        if (round < totalRounds) {
          setIsTransitioning(true);
          setTimeout(() => {
            setRound(prev => prev + 1);
            setCurrentWaveStyle((prev) => (prev + 1) % WAVE_STYLES.length);
            setSelectedCharacter(null);
            setIsTransitioning(false);
          }, 300);
        }
      }, 2000);
    } else {
      playGameSound('error');
      setShowError(true);
      
      if (soundEnabled) {
        const tryAgain = language === 'es' 
          ? '¡Inténtalo de nuevo!' 
          : 'Try again!';
        speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
      }

      setTimeout(() => {
        setShowError(false);
        setSelectedCharacter(null);
      }, 1000);
    }
  };

  // Animated character component
  const Character = ({ isWaving = false, onClick, index }: { isWaving?: boolean; onClick?: () => void; index: number }) => {
    const waveStyle = WAVE_STYLES[currentWaveStyle];
    
    return (
      <button
        onClick={onClick}
        disabled={showCelebration}
        className={`
          relative w-48 h-48
          transform transition-all duration-300
          hover:scale-105 focus:outline-none
          ${selectedCharacter === index && showError ? 'animate-[shake_0.5s_ease-in-out]' : ''}
          ${isWaving && isCharacterAnimating ? 'animate-bounce' : ''}
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

            {/* Waving arm with dynamic style */}
            {isWaving && (
              <div className={`absolute ${waveStyle.position}`}>
                <div className={`
                  ${waveStyle.armStyle}
                  ${waveStyle.animation}
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
            // Title Screen with enhanced fade-in
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
            // Game Screen
            <>
              <h2 className={`
                text-2xl font-bold text-center mb-12 font-comic
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
              `}>
                {language === 'es' ? '¿Quién está saludando?' : 'Who is waving?'}
              </h2>

              <div className={`
                grid grid-cols-1 md:grid-cols-2 gap-12 justify-items-center
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