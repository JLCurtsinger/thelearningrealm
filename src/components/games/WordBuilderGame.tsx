import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface WordBuilderGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Word data with images and translations
const words = [
  {
    word: 'CAT',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&h=300',
    translations: {
      en: 'cat',
      es: 'gato'
    }
  },
  {
    word: 'DOG',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=300&h=300',
    translations: {
      en: 'dog',
      es: 'perro'
    }
  },
  {
    word: 'SUN',
    image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?auto=format&fit=crop&w=300&h=300',
    translations: {
      en: 'sun',
      es: 'sol'
    }
  }
];

export function WordBuilderGame({ isDarkMode, isVibrant, onExit, language }: WordBuilderGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentWord, setCurrentWord] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [availableLetters, setAvailableLetters] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    generateNewWord();
  }, []);

  const generateNewWord = () => {
    setSelectedLetters([]);
    const word = words[currentWord].word;
    
    // Always include all letters needed for the word
    let letters = word.split('');
    
    // Add some random letters for variety
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const wordLetters = new Set(letters);
    while (letters.length < 8) {
      const randomLetter = alphabet[Math.floor(Math.random() * alphabet.length)];
      // Don't add duplicate letters
      if (!wordLetters.has(randomLetter)) {
        letters.push(randomLetter);
        wordLetters.add(randomLetter);
      }
    }
    
    // Shuffle letters
    letters = letters.sort(() => Math.random() - 0.5);
    setAvailableLetters(letters);

    // Speak the prompt
    if (soundEnabled) {
      const prompt = language === 'es'
        ? `¿Puedes deletrear ${words[currentWord].translations.es}?`
        : `Can you spell ${words[currentWord].translations.en}?`;
      speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
    }
  };

  const handleLetterClick = (letter: string, index: number) => {
    playGameSound('click');
    
    // Add letter to selected letters
    setSelectedLetters([...selectedLetters, letter]);
    
    // Remove letter from available letters
    const newAvailable = [...availableLetters];
    newAvailable.splice(index, 1);
    setAvailableLetters(newAvailable);

    // Check if word is complete
    const newWord = [...selectedLetters, letter].join('');
    if (newWord.length === words[currentWord].word.length) {
      if (newWord === words[currentWord].word) {
        // Correct word
        playGameSound('success');
        
        if (soundEnabled) {
          const celebration = language === 'es'
            ? '¡Excelente trabajo!'
            : 'Great job!';
          speakText(celebration, language === 'es' ? 'es-ES' : 'en-US');
        }

        setScore(score + 1);
        setShowCelebration(true);
        
        setTimeout(() => {
          setShowCelebration(false);
          if (currentWord < words.length - 1) {
            setCurrentWord(prev => prev + 1);
            generateNewWord();
          }
        }, 2000);
      } else {
        // Wrong word
        playGameSound('error');
        
        if (soundEnabled) {
          const tryAgain = language === 'es'
            ? 'Inténtalo de nuevo'
            : 'Try again';
          speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
        }

        setShowError(true);
        setTimeout(() => {
          setShowError(false);
          setSelectedLetters([]);
          generateNewWord();
        }, 1000);
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
          {/* Word Image */}
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={words[currentWord].image}
                alt={words[currentWord].translations[language as keyof typeof words[0]['translations']]}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Word Building Area */}
          <div className="mb-8">
            <div className="flex justify-center space-x-4">
              {words[currentWord].word.split('').map((_, index) => (
                <div
                  key={`slot-${index}`}
                  className={`
                    w-16 h-16 rounded-xl
                    flex items-center justify-center
                    text-3xl font-bold font-comic
                    border-4 border-dashed
                    ${isDarkMode ? 'border-gray-600' : 'border-gray-300'}
                    ${selectedLetters[index] ? (isDarkMode ? 'bg-gray-700' : 'bg-gray-100') : ''}
                  `}
                >
                  {selectedLetters[index] || ''}
                </div>
              ))}
            </div>
          </div>

          {/* Available Letters */}
          <div className="flex justify-center flex-wrap gap-4">
            {availableLetters.map((letter, index) => (
              <button
                key={`letter-${index}`}
                onClick={() => handleLetterClick(letter, index)}
                className={`
                  w-16 h-16 rounded-xl
                  flex items-center justify-center
                  text-3xl font-bold font-comic text-white
                  transform hover:scale-110
                  transition-all duration-300
                  ${isVibrant
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                    : isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-purple-600'
                  }
                  shadow-lg
                `}
              >
                {letter}
              </button>
            ))}
          </div>

          {/* Controls */}
          <div className="flex justify-center mt-8">
            <button
              onClick={generateNewWord}
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
                p-3 rounded-full ml-4
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

          {/* Error Overlay */}
          {showError && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-500/30 rounded-3xl">
              <div className="text-center">
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