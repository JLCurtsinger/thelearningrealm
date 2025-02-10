import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { gameContent } from '../../games/gameContent';

const getLetterPairs = (language: string) => {
  return gameContent[language as keyof typeof gameContent].letterPairs;
};

interface FindLetterGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

export function FindLetterGame({ isDarkMode, isVibrant, onExit, language }: FindLetterGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [targetLetter, setTargetLetter] = useState('');
  const [letters, setLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    generateNewRound();
  }, []);

  const generateNewRound = () => {
    const pairs = getLetterPairs(language);
    const pairGroup = pairs[Math.floor(Math.random() * pairs.length)];
    const target = pairGroup[Math.floor(Math.random() * pairGroup.length)];
    
    let gameLetters = [...pairGroup];
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    while (gameLetters.length < 12) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      if (!gameLetters.includes(randomLetter)) {
        gameLetters.push(randomLetter);
      }
    }
    
    gameLetters = gameLetters.sort(() => Math.random() - 0.5);
    
    setTargetLetter(target);
    setLetters(gameLetters);
    setAttempts(0);
    setShowHint(false);
    setIsCorrect(false);

    // Speak the prompt
    if (soundEnabled) {
      speakText(
        language === 'es' 
          ? `Encuentra la letra ${target}`
          : `Find the letter ${target}`,
        language === 'es' ? 'es-ES' : 'en-US'
      );
    }
  };

  const handleLetterClick = (letter: string) => {
    if (isCorrect) return;

    if (letter === targetLetter) {
      setIsCorrect(true);
      setShowCelebration(true);
      setScore(score + 1);
      
      playGameSound('success');
      
      if (soundEnabled) {
        speakText(
          language === 'es'
            ? '¡Excelente trabajo!'
            : 'Great job!',
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
      
      setAttempts(attempts + 1);
      if (attempts + 1 >= 3) {
        setShowHint(true);
      }
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
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

        {/* Game Area */}
        <div className={`
          relative p-8 rounded-3xl
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
          shadow-xl
        `}>
          {/* Target Letter Display */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold mb-2">
              {language === 'es' ? 'Encuentra la letra:' : 'Find the letter:'}
            </h2>
            <div className={`
              inline-block px-8 py-4 rounded-2xl
              ${isVibrant
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                : 'bg-purple-600'
              }
              shadow-lg
            `}>
              <span className="text-6xl font-bold text-white font-comic">
                {targetLetter.toUpperCase()}
              </span>
            </div>
          </div>

          {/* Letters Grid */}
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
            {letters.map((letter, index) => (
              <button
                key={`${letter}-${index}`}
                onClick={() => handleLetterClick(letter)}
                className={`
                  relative aspect-square
                  flex items-center justify-center
                  text-4xl font-bold font-comic
                  rounded-2xl
                  transform hover:scale-105
                  transition-all duration-300
                  ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
                  ${showHint && letter === targetLetter ? 'animate-pulse ring-4 ring-yellow-400' : ''}
                  ${letter === targetLetter && isCorrect ? 'bg-green-500 text-white' : ''}
                  disabled:opacity-50
                `}
                disabled={isCorrect}
              >
                {letter.toUpperCase()}
                
                {letter === targetLetter && showCelebration && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Sound Toggle */}
          <div className="mt-4 flex justify-center">
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