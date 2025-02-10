import { gameContent } from '../../games/gameContent';
import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, Play, RefreshCw } from 'lucide-react';

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
  const [currentSound, setCurrentSound] = useState<typeof getLetterSounds extends (lang: string) => (infer T)[] ? T : never | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [showCelebration, setShowCelebration] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  useEffect(() => {
    generateNewRound();
  }, []);

  const generateNewRound = () => {
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
    setAttempts(0);
    setShowHint(false);
    setIsPlaying(false);
  };

  const playLetterSound = () => {
    if (!currentSound || !soundEnabled) return;
    
    setIsPlaying(true);
    
    const utterance = new SpeechSynthesisUtterance();
    utterance.text = `${currentSound.letter} says ${currentSound.sound}, as in ${currentSound.example}`;
    utterance.rate = 0.8;
    utterance.pitch = 1.2;
    
    utterance.onend = () => setIsPlaying(false);
    
    window.speechSynthesis.speak(utterance);
  };

  const playSound = (type: 'success' | 'wrong') => {
    if (!soundEnabled) return;

    const sounds = {
      success: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_805cb3c75d.mp3',
      wrong: 'https://cdn.pixabay.com/download/audio/2022/03/24/audio_c8c8a73f04.mp3'
    };

    const audio = new Audio(sounds[type]);
    audio.volume = type === 'success' ? 0.3 : 0.2;
    audio.play();
  };

  const handleLetterClick = (letter: string) => {
    if (!currentSound) return;

    if (letter === currentSound.letter) {
      playSound('success');
      setScore(score + 1);
      setShowCelebration(true);
      
      const utterance = new SpeechSynthesisUtterance();
      utterance.text = `Correct! ${currentSound.letter} says ${currentSound.sound}!`;
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);

      setTimeout(() => {
        setShowCelebration(false);
        generateNewRound();
      }, 2000);
    } else {
      playSound('wrong');
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        setShowHint(true);
      }
    }
  };

  if (!currentSound) return null;

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
                transform hover:scale-110
                transition-all duration-300
                disabled:opacity-50
                shadow-lg
              `}
            >
              <Play className={`
                w-16 h-16 mx-auto text-white
                ${isPlaying ? 'animate-pulse' : ''}
              `} />
              {isPlaying && (
                <div className="absolute inset-0 rounded-full border-4 border-white border-t-transparent animate-spin"></div>
              )}
            </button>
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
                  ${showHint && letter === currentSound.letter ? 'animate-pulse ring-4 ring-yellow-400' : ''}
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
              onClick={() => setSoundEnabled(!soundEnabled)}
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
                  Excellent! 🎉
                </h3>
                <p className="text-2xl text-white mb-4">
                  {currentSound.letter} says "{currentSound.sound}"!
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