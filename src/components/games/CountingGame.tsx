import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, RefreshCw } from 'lucide-react';

interface CountingGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
}

// Item types for counting
const ITEMS = [
  { name: 'apple', image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?auto=format&fit=crop&w=150&h=150' },
  { name: 'balloon', image: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?auto=format&fit=crop&w=150&h=150' },
  { name: 'star', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=150&h=150' },
  { name: 'flower', image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?auto=format&fit=crop&w=150&h=150' }
];

export function CountingGame({ isDarkMode, isVibrant, onExit }: CountingGameProps) {
  const [currentItem, setCurrentItem] = useState<typeof ITEMS[0] | null>(null);
  const [itemCount, setItemCount] = useState(0);
  const [options, setOptions] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initialize game
  useEffect(() => {
    generateNewRound();
  }, []);

  // Generate a new round
  const generateNewRound = () => {
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
      const utterance = new SpeechSynthesisUtterance(`How many ${newItem.name}s do you see?`);
      utterance.rate = 0.8;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
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

    if (number === itemCount) {
      // Correct answer
      playSound('success');
      setScore(score + 1);
      setShowCelebration(true);
      
      // Count out loud
      if (soundEnabled) {
        let count = 1;
        const countInterval = setInterval(() => {
          const utterance = new SpeechSynthesisUtterance(count.toString());
          utterance.rate = 0.8;
          utterance.pitch = 1.2;
          window.speechSynthesis.speak(utterance);
          
          if (count === itemCount) {
            clearInterval(countInterval);
            setTimeout(() => {
              const celebrationUtterance = new SpeechSynthesisUtterance(`Yes! There are ${itemCount} ${currentItem.name}s!`);
              celebrationUtterance.rate = 0.8;
              celebrationUtterance.pitch = 1.2;
              window.speechSynthesis.speak(celebrationUtterance);
            }, 1000);
          }
          count++;
        }, 800);
      }

      // Move to next round after celebration
      setTimeout(() => {
        setShowCelebration(false);
        generateNewRound();
      }, itemCount * 800 + 3000);
    } else {
      // Wrong answer
      playSound('wrong');
      
      if (soundEnabled) {
        const utterance = new SpeechSynthesisUtterance('Try counting again!');
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
      }
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
          {/* Items Grid */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {Array.from({ length: itemCount }).map((_, index) => (
              <div
                key={index}
                className={`
                  aspect-square rounded-xl overflow-hidden
                  transform hover:scale-105
                  transition-all duration-300
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
                className={`
                  w-24 h-24 rounded-2xl
                  flex items-center justify-center
                  text-4xl font-bold font-comic text-white
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
                  Perfect! 🎉
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