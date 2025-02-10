import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { gameContent } from '../../games/gameContent';

const getWordPairs = (language: string) => {
  return gameContent[language as keyof typeof gameContent].letterMatching.pairs;
};

const getCelebrations = (language: string) => {
  return gameContent[language as keyof typeof gameContent].letterMatching.celebrations;
};

interface LetterMatchingGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

export function LetterMatchingGame({ isDarkMode, isVibrant, onExit, language }: LetterMatchingGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentPair, setCurrentPair] = useState<(typeof gameContent)[keyof typeof gameContent]['letterMatching']['pairs'][0] | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    generateNewRound();
  }, []);

  const generateNewRound = () => {
    const pairs = getWordPairs(language);
    const newPair = pairs[Math.floor(Math.random() * pairs.length)];
    setCurrentPair(newPair);

    let newOptions = [newPair.letter];
    while (newOptions.length < 3) {
      const randomPair = pairs[Math.floor(Math.random() * pairs.length)];
      if (!newOptions.includes(randomPair.letter)) {
        newOptions.push(randomPair.letter);
      }
    }
    
    newOptions = newOptions.sort(() => Math.random() - 0.5);
    setOptions(newOptions);
    setAttempts(0);
    setShowHint(false);

    // Speak the prompt
    if (soundEnabled) {
      speakText(
        language === 'es'
          ? `¿Qué letra es para ${newPair.word}?`
          : `What letter is for ${newPair.word}?`,
        language === 'es' ? 'es-ES' : 'en-US'
      );
    }
  };

  const handleLetterClick = (letter: string) => {
    if (!currentPair) return;

    if (letter === currentPair.letter) {
      playGameSound('success');
      setScore(score + 1);
      setShowCelebration(true);
      
      if (soundEnabled) {
        const celebrations = getCelebrations(language);
        speakText(
          celebrations.letterFound(currentPair.letter, currentPair.word),
          language === 'es' ? 'es-ES' : 'en-US'
        );
      }

      setTimeout(() => {
        setShowCelebration(false);
        generateNewRound();
      }, 2000);
    } else {
      playGameSound('error');
      
      if (soundEnabled) {
        speakText(
          language === 'es'
            ? 'Inténtalo de nuevo'
            : 'Try again',
          language === 'es' ? 'es-ES' : 'en-US'
        );
      }
      
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setShowHint(true);
      }
    }
  };

  if (!currentPair) return null;

  const celebrations = getCelebrations(language);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
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

        <div className={`
          relative p-8 rounded-3xl
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
          shadow-xl
        `}>
          <div className="flex justify-center mb-8">
            <div className="relative w-64 h-64 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={currentPair.image}
                alt={currentPair.word}
                className="w-full h-full object-cover"
              />
              <div className={`
                absolute bottom-0 left-0 right-0
                p-4 text-center
                bg-black/50 backdrop-blur-sm
                text-white text-2xl font-bold font-comic
              `}>
                {currentPair.word}
              </div>
            </div>
          </div>

          <div className="flex justify-center gap-6">
            {options.map((letter, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(letter)}
                className={`
                  w-24 h-24 rounded-2xl
                  flex items-center justify-center
                  text-4xl font-bold font-comic
                  transform hover:scale-110
                  transition-all duration-300
                  ${isVibrant
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-purple-600 text-white'
                  }
                  ${showHint && letter === currentPair.letter ? 'animate-pulse ring-4 ring-yellow-400' : ''}
                  shadow-lg
                `}
              >
                {letter}
              </button>
            ))}
          </div>

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

          {showCelebration && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white mb-4">
                  {celebrations.success}
                </h3>
                <p className="text-2xl text-white mb-4">
                  {celebrations.letterFound(currentPair.letter, currentPair.word)}
                </p>
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