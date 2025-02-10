import React, { useState, useEffect } from 'react';
import { ArrowLeft, Star, Volume2, Sparkles, RefreshCw } from 'lucide-react';

interface EmotionMatchGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
}

// Emotion data with DiceBear avatars
const EMOTIONS = [
  { name: 'happy', prompt: 'Find the happy face!', seed: 'happy&eyes=happy&mouth=smile' },
  { name: 'sad', prompt: 'Where is the sad face?', seed: 'sad&eyes=cry&mouth=frown' },
  { name: 'surprised', prompt: 'Can you find the surprised face?', seed: 'surprised&eyes=wide&mouth=open' },
  { name: 'sleepy', prompt: 'Who looks sleepy?', seed: 'sleepy&eyes=closed&mouth=sleep' },
  { name: 'excited', prompt: 'Find the excited face!', seed: 'excited&eyes=stars&mouth=laugh' }
];

export function EmotionMatchGame({ isDarkMode, isVibrant, onExit }: EmotionMatchGameProps) {
  const [currentEmotion, setCurrentEmotion] = useState<typeof EMOTIONS[0] | null>(null);
  const [options, setOptions] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Initialize game
  useEffect(() => {
    generateNewRound();
  }, []);

  // Generate a new round
  const generateNewRound = () => {
    // Select random emotion
    const newEmotion = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
    setCurrentEmotion(newEmotion);
    
    // Generate three random emotions for options
    let emotionOptions = [newEmotion.name];
    while (emotionOptions.length < 3) {
      const randomEmotion = EMOTIONS[Math.floor(Math.random() * EMOTIONS.length)];
      if (!emotionOptions.includes(randomEmotion.name)) {
        emotionOptions.push(randomEmotion.name);
      }
    }
    
    // Shuffle options
    emotionOptions = emotionOptions.sort(() => Math.random() - 0.5);
    setOptions(emotionOptions);

    // Speak the prompt
    if (soundEnabled) {
      const utterance = new SpeechSynthesisUtterance(newEmotion.prompt);
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

  // Handle emotion selection
  const handleEmotionClick = (emotion: string) => {
    if (!currentEmotion) return;

    if (emotion === currentEmotion.name) {
      // Correct answer
      playSound('success');
      setScore(score + 1);
      setShowCelebration(true);
      
      // Celebration voice feedback
      if (soundEnabled) {
        const utterance = new SpeechSynthesisUtterance('Great job! You found the ' + currentEmotion.name + ' face!');
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
      }

      // Move to next round after celebration
      setTimeout(() => {
        setShowCelebration(false);
        generateNewRound();
      }, 2000);
    } else {
      // Wrong answer
      playSound('wrong');
      
      if (soundEnabled) {
        const utterance = new SpeechSynthesisUtterance('Try again!');
        utterance.rate = 0.8;
        utterance.pitch = 1.2;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  if (!currentEmotion) return null;

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
          {/* Prompt */}
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
              {currentEmotion.prompt}
            </h2>
          </div>

          {/* Emotion Options */}
          <div className="grid grid-cols-3 gap-6">
            {options.map((emotion, index) => {
              const emotionData = EMOTIONS.find(e => e.name === emotion);
              return (
                <button
                  key={index}
                  onClick={() => handleEmotionClick(emotion)}
                  className={`
                    aspect-square rounded-2xl
                    flex items-center justify-center
                    transform hover:scale-110
                    transition-all duration-300
                    ${isVibrant
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                      : isDarkMode
                        ? 'bg-gray-700'
                        : 'bg-purple-600'
                    }
                    shadow-lg
                    overflow-hidden
                  `}
                >
                  <img
                    src={`https://api.dicebear.com/7.x/bottts/svg?seed=${emotionData?.seed || ''}&backgroundColor=transparent`}
                    alt={emotion}
                    className="w-full h-full p-4"
                  />
                </button>
              );
            })}
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
                  Wonderful! 🎉
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