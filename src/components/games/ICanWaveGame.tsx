import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, XCircle } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface ICanWaveGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

const actions = [
  {
    correct: {
      id: 'waving',
      image: 'https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif',
      text: { en: 'waving', es: 'saludando' }
    },
    incorrect: {
      id: 'clapping',
      image: 'https://media.giphy.com/media/3o7qDEq2bMbcbPRQ2c/giphy.gif',
      text: { en: 'clapping', es: 'aplaudiendo' }
    }
  },
  {
    correct: {
      id: 'waving2',
      image: 'https://media.giphy.com/media/3o7TKMt1VVNkHV2PaE/giphy.gif',
      text: { en: 'waving', es: 'saludando' }
    },
    incorrect: {
      id: 'jumping',
      image: 'https://media.giphy.com/media/3oKIPavRPgJYaNI97W/giphy.gif',
      text: { en: 'jumping', es: 'saltando' }
    }
  }
];

export function ICanWaveGame({ isDarkMode, isVibrant, onExit, language }: ICanWaveGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentPair, setCurrentPair] = useState(0);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (soundEnabled) {
      speakText(
        language === 'es' 
          ? '¿Quién está saludando?' 
          : 'Who is waving?',
        language === 'es' ? 'es-ES' : 'en-US'
      );
    }
  }, [currentPair]);

  const handleImageClick = (isCorrect: boolean) => {
    if (isCorrect) {
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
        setCurrentPair((prev) => (prev + 1) % actions.length);
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
          {/* Question */}
          <h2 className={`
            text-2xl font-bold text-center mb-8
            ${isDarkMode ? 'text-white' : 'text-gray-900'}
          `}>
            {language === 'es' ? '¿Quién está saludando?' : 'Who is waving?'}
          </h2>

          {/* Images Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[actions[currentPair].correct, actions[currentPair].incorrect]
              .sort(() => Math.random() - 0.5)
              .map((action, index) => (
                <button
                  key={index}
                  onClick={() => handleImageClick(action.id.includes('waving'))}
                  className={`
                    relative aspect-video rounded-2xl overflow-hidden
                    transform hover:scale-105 transition-all duration-300
                    focus:outline-none focus:ring-4 focus:ring-purple-400
                    shadow-lg
                  `}
                >
                  <img
                    src={action.image}
                    alt={action.text[language as keyof typeof action.text]}
                    className="w-full h-full object-cover"
                  />
                </button>
            ))}
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