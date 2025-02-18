import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, RefreshCw } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface CountingGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Item types for counting
const ITEMS = [
  { name: 'apple', image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?auto=format&fit=crop&w=150&h=150' },
  { name: 'balloon', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=150&h=150' },
  { name: 'star', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=150&h=150' },
  { name: 'flower', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=150&h=150' }
];

export function CountingGame({ isDarkMode, isVibrant, onExit, language }: CountingGameProps) {
  const [currentItem, setCurrentItem] = useState<typeof ITEMS[0] | null>(null);
  const [itemCount, setItemCount] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [totalQuestions] = useState(5); // Fixed number of questions
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showCorrectNumber, setShowCorrectNumber] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isOptionError, setIsOptionError] = useState(false);
  const [isItemsAnimating, setIsItemsAnimating] = useState(false);

  // Initialize game
  useEffect(() => {
    generateNewRound();
  }, []);

  // Generate a new round
  const generateNewRound = () => {
    setIsTransitioning(true);
    setShowCorrectNumber(false);
    setSelectedOption(null);
    
    // Select random item
    const newItem = ITEMS[Math.floor(Math.random() * ITEMS.length)];
    setCurrentItem(newItem);
    
    // Generate random count (1-5)
    const count = Math.floor(Math.random() * 5) + 1;
    setItemCount(count);
    
    // Generate number options
    let numberOptions = [count];
    while (numberOptions.length < 3) {
      const randomNumber = Math.floor(Math.random() * 5) + 1;
      if (!numberOptions.includes(randomNumber)) {
        numberOptions.push(randomNumber);
      }
    }
    
    // Shuffle options
    numberOptions = numberOptions.sort(() => Math.random() - 0.5);
    setOptions(numberOptions);

    // Speak the prompt
    if (soundEnabled) {
      const prompt = language === 'es'
        ? `¿Cuántos ${newItem.name}s ves?`
        : `How many ${newItem.name}s do you see?`;
      const utterance = new SpeechSynthesisUtterance(prompt);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
      window.speechSynthesis.speak(utterance);
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  // Play sound effect
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

  // Handle number selection
  const handleNumberClick = (number: number) => {
    if (!currentItem) return;
    setSelectedOption(number);

    if (number === itemCount) {
      // Correct answer
      playSound('success');
      setScore(score + 1);
      setShowCorrectNumber(true);
      setIsItemsAnimating(true);
      
      // Celebration voice feedback
      if (soundEnabled) {
        const celebration = language === 'es'
          ? '¡Excelente trabajo!'
          : 'Great job!';
        const utterance = new SpeechSynthesisUtterance(celebration);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
        window.speechSynthesis.speak(utterance);
      }

      setShowCelebration(true);
      
      setTimeout(() => {
        setIsItemsAnimating(false);
        setShowCelebration(false);
        if (questionNumber < totalQuestions) {
          setQuestionNumber(prev => prev + 1);
          generateNewRound();
        }
      }, 2000);
    } else {
      // Wrong answer
      playSound('wrong');
      setIsOptionError(true);
      
      if (soundEnabled) {
        const tryAgain = language === 'es'
          ? 'Inténtalo de nuevo'
          : 'Try again';
        const utterance = new SpeechSynthesisUtterance(tryAgain);
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        utterance.lang = language === 'es' ? 'es-ES' : 'en-US';
        window.speechSynthesis.speak(utterance);
      }

      setTimeout(() => {
        setIsOptionError(false);
        setSelectedOption(null);
      }, 500);
    }
  };

  if (!currentItem) return null;

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
                ? `Pregunta ${questionNumber} de ${totalQuestions}`
                : `Question ${questionNumber} of ${totalQuestions}`}
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
          {/* Prompt */}
          <div className="text-center mb-8">
            <h2 className={`
              text-2xl font-bold font-comic
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
              {language === 'es'
                ? `¿Cuántos ${currentItem.name}s ves?`
                : `How many ${currentItem.name}s do you see?`}
            </h2>
          </div>

          {/* Items Grid */}
          <div className={`
            grid grid-cols-3 gap-4 mb-8
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            {Array.from({ length: itemCount }).map((_, index) => (
              <div
                key={index}
                className={`
                  aspect-square rounded-xl overflow-hidden
                  transform transition-all duration-300
                  ${isItemsAnimating ? 'animate-bounce' : 'hover:scale-105'}
                  shadow-lg
                `}
              >
                <img
                  src={currentItem.image}
                  alt={currentItem.name}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Number Options */}
          <div className="flex justify-center gap-6">
            {options.map((number, index) => (
              <button
                key={index}
                onClick={() => handleNumberClick(number)}
                disabled={showCelebration}
                className={`
                  w-24 h-24 rounded-2xl
                  flex items-center justify-center
                  text-4xl font-bold font-comic text-white
                  transform transition-all duration-300
                  ${isVibrant
                    ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                    : isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-purple-600'
                  }
                  ${selectedOption === number && isOptionError
                    ? 'animate-[shake_0.5s_ease-in-out] border-2 border-red-500'
                    : 'hover:scale-110'
                  }
                  ${number === itemCount && showCorrectNumber
                    ? 'ring-4 ring-green-500 scale-110'
                    : ''
                  }
                  shadow-lg
                  disabled:opacity-50
                `}
              >
                {number}
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