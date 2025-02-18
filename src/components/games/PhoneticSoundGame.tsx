import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, Play, RefreshCw } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { gameContent } from '../../games/gameContent';

const getLetterSounds = (language: string) => {
  return gameContent[language as keyof typeof gameContent].phonetics;
};

interface PhoneticSoundGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

export function PhoneticSoundGame({ isDarkMode, isVibrant, onExit, language }: PhoneticSoundGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentSound, setCurrentSound] = useState<typeof getLetterSounds extends (lang: string) => (infer T)[] ? T : never | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isOptionError, setIsOptionError] = useState(false);
  const [isLetterAnimating, setIsLetterAnimating] = useState(false);
  const [showLetterOverlay, setShowLetterOverlay] = useState(false);

  useEffect(() => {
    generateNewRound();
  }, []);

  const generateNewRound = () => {
    setIsTransitioning(true);
    setShowHint(false);
    setSelectedOption(null);
    setAttempts(0);
    setShowLetterOverlay(false);
    
    const sounds = getLetterSounds(language);
    const newSound = sounds[Math.floor(Math.random() * sounds.length)];
    setCurrentSound(newSound);
    
    let newOptions = [newSound.letter];
    while (newOptions.length < 3) {
      const randomSound = sounds[Math.floor(Math.random() * sounds.length)];
      if (!newOptions.includes(randomSound.letter)) {
        newOptions.push(randomSound.letter);
      }
    }
    
    newOptions = newOptions.sort(() => Math.random() - 0.5);
    setOptions(newOptions);

    setTimeout(() => {
      setIsTransitioning(false);
      playLetterSound();
    }, 300);
  };

  const playLetterSound = () => {
    if (!currentSound || !soundEnabled) return;
    
    setIsPlaying(true);
    
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `${currentSound.letter} says ${currentSound.sound}, as in ${currentSound.example}`;
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
    
    utterance.onend = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const handleLetterClick = (letter: string) => {
    if (!currentSound) return;
    setSelectedOption(letter);

    if (letter === currentSound.letter) {
      playGameSound('success');
      setScore(score + 1);
      setShowCelebration(true);
      setIsLetterAnimating(true);
      setShowLetterOverlay(true);
      
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
        }
      }, 2000);
    } else {
      playGameSound('error');
      setIsOptionError(true);
      
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
        setIsOptionError(false);
        setSelectedOption(null);
      }, 500);
    }
  };

  if (!currentSound) return null;

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
          {/* Sound Button */}
          <div className="flex justify-center mb-12">
            <button
              onClick={playLetterSound}
              disabled={isPlaying}
              className={`
                relative w-32 h-32 rounded-full
                ${isVibrant
                  ? `bg-gradient-to-r ${currentSound.color}`
                  : isDarkMode
                    ? 'bg-gray-700'
                    : 'bg-purple-600'
                }
                transform transition-all duration-300
                hover:scale-110
                disabled:opacity-50
                shadow-lg
                ${isPlaying ? 'animate-pulse' : ''}
              `}
            >
              <Play className={`
                w-16 h-16 mx-auto text-white
                ${isPlaying ? 'opacity-50' : 'opacity-100'}
              `} />
              
              {/* Target Letter Overlay */}
              {showLetterOverlay && (
                <div className={`
                  absolute inset-0 flex items-center justify-center
                  bg-black/50 backdrop-blur-sm rounded-full
                  text-4xl font-bold text-white font-comic
                  transform transition-all duration-300
                `}>
                  {currentSound.letter}
                </div>
              )}
            </button>
          </div>

          {/* Letter Options */}
          <div className={`
            grid grid-cols-3 gap-6
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            {options.map((letter, index) => (
              <button
                key={index}
                onClick={() => handleLetterClick(letter)}
                className={`
                  aspect-square rounded-2xl
                  flex items-center justify-center
                  text-4xl font-bold font-comic text-white
                  transform transition-all duration-300
                  ${isVibrant
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                    : isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-purple-600'
                  }
                  ${selectedOption === letter && isOptionError
                    ? 'animate-[shake_0.5s_ease-in-out] border-2 border-red-500'
                    : 'hover:scale-110'
                  }
                  ${letter === currentSound.letter && showHint
                    ? 'ring-4 ring-yellow-400 animate-pulse'
                    : ''
                  }
                  shadow-lg
                `}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Controls */}
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