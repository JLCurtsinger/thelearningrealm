import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { useAuth } from '../../contexts/AuthContext';
import { updateProgressData, addCompletedLesson } from '../../utils/progressStorage';
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
  const { user } = useAuth();
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [targetLetter, setTargetLetter] = useState('');
  const [letters, setLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [isLetterAnimating, setIsLetterAnimating] = useState(false);
  const [isLetterError, setIsLetterError] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  useEffect(() => {
    generateNewRound();
  }, []);

  // Handle game completion
  const handleGameCompletion = async () => {
    if (!user) return;

    setGameComplete(true);
    playGameSound('success');

    try {
      // Update reward points (10 points per correct letter)
      await updateProgressData(user.uid, {
        rewardPoints: score * 10
      });

      // Mark lesson as completed
      await addCompletedLesson(user.uid, 'findletter');

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

  const generateNewRound = () => {
    setIsTransitioning(true);
    setShowHint(false);
    setIsCorrect(false);
    setSelectedLetter(null);
    setAttempts(0);
    
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
    
    // Ensure a more random-looking grid each time
    gameLetters = gameLetters
      .sort(() => Math.random() - 0.5)
      .map(letter => letter.toLowerCase());
    
    setTargetLetter(target);
    setLetters(gameLetters);

    // Speak the prompt
    if (soundEnabled) {
      const prompt = language === 'es'
        ? `Encuentra la letra ${target}`
        : `Find the letter ${target}`;
      speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleLetterClick = (letter: string) => {
    if (isCorrect || gameComplete) return;
    setSelectedLetter(letter);

    if (letter === targetLetter) {
      setIsCorrect(true);
      setShowCelebration(true);
      setScore(score + 1);
      setIsLetterAnimating(true);
      
      playGameSound('success');
      
      if (soundEnabled) {
        const celebration = language === 'es'
          ? '¡Excelente trabajo!'
          : 'Great job!';
        speakText(celebration, language === 'es' ? 'es-ES' : 'en-US');
      }
      
      setTimeout(() => {
        setIsLetterAnimating(false);
        setShowCelebration(false);
        if (round < totalRounds) {
          setRound(prev => prev + 1);
          generateNewRound();
        } else {
          handleGameCompletion();
        }
      }, 2000);
    } else {
      playGameSound('error');
      setIsLetterError(true);
      
      if (soundEnabled) {
        const tryAgain = language === 'es'
          ? 'Inténtalo de nuevo'
          : 'Try again';
        speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
      }
      
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setShowHint(true);
      }

      setTimeout(() => {
        setIsLetterError(false);
        setSelectedLetter(null);
      }, 500);
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
            {/* Progress Indicator */}
            <div className={`
              px-4 py-2 rounded-full font-bold
              ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
              shadow-lg
            `}>
              {language === 'es'
                ? `Ronda ${round} de ${totalRounds}`
                : `Round ${round} of ${totalRounds}`}
            </div>

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
          <div className="text-center mb-12">
            <h2 className={`
              text-2xl font-bold font-comic
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
              ${isTransitioning ? 'opacity-0' : 'opacity-100'}
              transition-opacity duration-300
            `}>
              {language === 'es'
                ? `Encuentra la letra ${targetLetter.toUpperCase()}`
                : `Find the letter ${targetLetter.toUpperCase()}`}
            </h2>
          </div>

          {/* Letters Grid */}
          <div className={`
            grid grid-cols-3 sm:grid-cols-4 gap-4
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            {letters.map((letter, index) => (
              <button
                key={`${letter}-${index}`}
                onClick={() => handleLetterClick(letter)}
                disabled={isCorrect || gameComplete}
                className={`
                  relative aspect-square
                  flex items-center justify-center
                  text-4xl font-bold font-comic
                  rounded-2xl
                  transform transition-all duration-300
                  ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
                  ${showHint && letter === targetLetter ? 'animate-pulse ring-4 ring-yellow-400' : ''}
                  ${letter === targetLetter && isCorrect ? 'bg-green-500 text-white scale-110' : ''}
                  ${selectedLetter === letter && isLetterError
                    ? 'animate-[shake_0.5s_ease-in-out] border-2 border-red-500'
                    : 'hover:scale-110'
                  }
                  disabled:opacity-50
                  shadow-lg
                `}
              >
                {letter.toUpperCase()}
                
                {letter === targetLetter && isCorrect && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <Sparkles className="w-8 h-8 text-yellow-400 animate-spin" />
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center space-x-4 mt-8">
            <button
              onClick={generateNewRound}
              disabled={gameComplete}
              className={`
                p-3 rounded-full
                ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
                shadow-lg
                transition-transform hover:scale-110
                disabled:opacity-50
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