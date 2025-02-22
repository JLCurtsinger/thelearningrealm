import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Star, Sparkles, Send, Home } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { useAuth } from '../../contexts/AuthContext';
import { updateProgressData, addCompletedLesson } from '../../utils/progressStorage';

interface ChatWithGPTGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Animal data with sounds, responses, and alternative names
const animals = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&h=300',
    sound: { en: 'meow', es: 'miau' },
    name: { en: 'cat', es: 'gato' },
    alternativeNames: {
      en: ['kitty', 'kitten', 'cats', 'kittie'],
      es: ['gatito', 'gata', 'gatitos', 'gatos']
    },
    alternativeSounds: {
      en: ['meow', 'meows', 'mew', 'purr'],
      es: ['miau', 'maullar', 'ronronear']
    },
    responses: {
      correct: {
        en: "That's right! Can you meow like a cat?",
        es: "¡Correcto! ¿Puedes maullar como un gato?"
      },
      sound: {
        en: "Great meowing! You sound just like a cat!",
        es: "¡Excelente maullido! ¡Suenas igual que un gato!"
      }
    }
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=300&h=300',
    sound: { en: 'woof', es: 'guau' },
    name: { en: 'dog', es: 'perro' },
    alternativeNames: {
      en: ['puppy', 'doggy', 'dogs', 'pup'],
      es: ['perrito', 'perra', 'perritos', 'perros']
    },
    alternativeSounds: {
      en: ['woof', 'bark', 'ruff', 'arf', 'bow wow'],
      es: ['guau', 'ladrar', 'guau guau']
    },
    responses: {
      correct: {
        en: "Yes! Can you bark like a dog?",
        es: "¡Sí! ¿Puedes ladrar como un perro?"
      },
      sound: {
        en: "Wonderful barking! You're a natural!",
        es: "¡Excelente ladrido! ¡Eres un natural!"
      }
    }
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=300&h=300',
    sound: { en: 'moo', es: 'mu' },
    name: { en: 'cow', es: 'vaca' },
    alternativeNames: {
      en: ['calf', 'cattle', 'cows', 'bovine'],
      es: ['vaquita', 'toro', 'vaquitas', 'vacas']
    },
    alternativeSounds: {
      en: ['moo', 'moos', 'mooing'],
      es: ['mu', 'mugir', 'mu mu']
    },
    responses: {
      correct: {
        en: "Correct! Can you moo like a cow?",
        es: "¡Correcto! ¿Puedes mugir como una vaca?"
      },
      sound: {
        en: "Perfect moo! Just like a real cow!",
        es: "¡Perfecto mugido! ¡Igual que una vaca de verdad!"
      }
    }
  }
];

export function ChatWithGPTGame({ isDarkMode, isVibrant, onExit, language }: ChatWithGPTGameProps) {
  const { user } = useAuth();
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const [gameState, setGameState] = useState<'name' | 'sound' | 'celebration'>('name');
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [userInput, setUserInput] = useState('');
  const [isInputError, setIsInputError] = useState(false);
  const [isAnimalAnimating, setIsAnimalAnimating] = useState(false);
  const [showNameOverlay, setShowNameOverlay] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [gameComplete, setGameComplete] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (soundEnabled) {
      const initialPrompt = language === 'es' 
        ? "¿Qué animal es este?"
        : "What animal is this?";
      setMessages([{ text: initialPrompt, isUser: false }]);
      speakText(initialPrompt, language === 'es' ? 'es-ES' : 'en-US');
    }
  }, []);

  // Handle game completion
  const handleGameCompletion = async () => {
    if (!user) return;

    setGameComplete(true);
    playGameSound('success');

    try {
      // Update reward points (10 points per correct answer)
      await updateProgressData(user.uid, {
        rewardPoints: score * 10
      });

      // Mark lesson as completed
      await addCompletedLesson(user.uid, 'chatwithgpt');

      // Play victory sound and speech
      if (soundEnabled) {
        const victoryMessage = language === 'es'
          ? '¡Felicitaciones! ¡Has completado el juego!'
          : 'Congratulations! You have completed the game!';
        setMessages(prev => [...prev, { text: victoryMessage, isUser: false }]);
        speakText(victoryMessage, language === 'es' ? 'es-ES' : 'en-US');
      }

      // Start redirect countdown
      let countdown = 5;
      const timer = window.setInterval(() => {
        countdown--;
        setRedirectTimer(countdown);
        
        if (countdown <= 0) {
          clearInterval(timer);
          onExit(); // Redirect back to learning path
        }
      }, 1000);

    } catch (error) {
      console.error('Error updating progress:', error);
      // Still exit after delay even if progress update fails
      setTimeout(() => {
        onExit();
      }, 5000);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Check if the answer is correct using fuzzy matching
  const isAnswerCorrect = (input: string, animal: typeof animals[0], checkingSound: boolean = false): boolean => {
    const normalizedInput = input.toLowerCase().trim();
    
    if (checkingSound) {
      // Check animal sounds
      const alternativeSounds = animal.alternativeSounds[language as keyof typeof animal.alternativeSounds];
      return alternativeSounds.some(sound => normalizedInput === sound.toLowerCase());
    } else {
      // Check animal names
      const mainName = animal.name[language as keyof typeof animal.name].toLowerCase();
      const alternativeNames = animal.alternativeNames[language as keyof typeof animal.alternativeNames];
      
      // Check exact matches first
      if (normalizedInput === mainName) return true;
      
      // Check alternative names
      if (alternativeNames.some(name => normalizedInput === name.toLowerCase())) return true;
      
      // Check for close matches (simple fuzzy matching)
      const closeMatch = (a: string, b: string) => {
        if (a.length < 3) return a === b;
        if (Math.abs(a.length - b.length) > 2) return false;
        return a.includes(b) || b.includes(a);
      };
      
      return closeMatch(normalizedInput, mainName) ||
             alternativeNames.some(name => closeMatch(normalizedInput, name.toLowerCase()));
    }
  };

  const handleUserInput = () => {
    if (!userInput.trim()) return;

    const animal = animals[currentAnimal];
    const inputValue = userInput; // Store input value before clearing
    setUserInput(''); // Clear input immediately

    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      if (gameState === 'name') {
        const isCorrect = isAnswerCorrect(inputValue, animal);

        if (isCorrect) {
          playGameSound('success');
          setIsAnimalAnimating(true);
          setShowNameOverlay(true);
          inputRef.current?.classList.add('animate-success-pulse');
          
          const response = animal.responses.correct[language as keyof typeof animal.responses.correct];
          setMessages(prev => [...prev, { text: response, isUser: false }]);
          speakText(response, language === 'es' ? 'es-ES' : 'en-US');
          
          setGameState('sound');
          setAttempts(0);
          
          setTimeout(() => {
            setIsAnimalAnimating(false);
            inputRef.current?.classList.remove('animate-success-pulse');
          }, 1000);
        } else {
          playGameSound('error');
          setIsInputError(true);
          setAttempts(prev => prev + 1);
          inputRef.current?.classList.add('animate-shake');
          
          let tryAgainMessage = language === 'es' ? '¡Inténtalo de nuevo!' : 'Try again!';
          
          // Show hint after 3 attempts
          if (attempts >= 2) {
            const correctName = animal.name[language as keyof typeof animal.name];
            tryAgainMessage = language === 'es'
              ? `Pista: Es un "${correctName}"`
              : `Hint: It's a "${correctName}"`;
            setUserInput(correctName); // Auto-fill the correct answer
          }
          
          setMessages(prev => [...prev, { text: tryAgainMessage, isUser: false }]);
          speakText(tryAgainMessage, language === 'es' ? 'es-ES' : 'en-US');
          
          setTimeout(() => {
            setIsInputError(false);
            inputRef.current?.classList.remove('animate-shake');
          }, 500);
        }
      } else if (gameState === 'sound') {
        const isCorrect = isAnswerCorrect(inputValue, animal, true);

        if (isCorrect) {
          playGameSound('success');
          setIsAnimalAnimating(true);
          
          const response = animal.responses.sound[language as keyof typeof animal.responses.sound];
          setMessages(prev => [...prev, { text: response, isUser: false }]);
          speakText(response, language === 'es' ? 'es-ES' : 'en-US');
          
          setScore(score + 1);
          setShowCelebration(true);
          
          setTimeout(() => {
            setIsAnimalAnimating(false);
            setShowCelebration(false);
            if (currentAnimal < animals.length - 1) {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentAnimal(prev => prev + 1);
                setGameState('name');
                setShowNameOverlay(false);
                const newPrompt = language === 'es' 
                  ? "¿Qué animal es este?"
                  : "What animal is this?";
                setMessages([{ text: newPrompt, isUser: false }]);
                speakText(newPrompt, language === 'es' ? 'es-ES' : 'en-US');
                setIsTransitioning(false);
              }, 500);
            } else {
              handleGameCompletion();
            }
          }, 2000);
        } else {
          playGameSound('error');
          setIsInputError(true);
          setAttempts(prev => prev + 1);
          inputRef.current?.classList.add('animate-shake');
          
          let tryAgainMessage = language === 'es' ? '¡Inténtalo de nuevo!' : 'Try again!';
          
          // Show hint after 3 attempts
          if (attempts >= 2) {
            const correctSound = animal.sound[language as keyof typeof animal.sound];
            tryAgainMessage = language === 'es'
              ? `Pista: Hace "${correctSound}"`
              : `Hint: It goes "${correctSound}"`;
            setUserInput(correctSound); // Auto-fill the correct answer
          }
          
          setMessages(prev => [...prev, { text: tryAgainMessage, isUser: false }]);
          speakText(tryAgainMessage, language === 'es' ? 'es-ES' : 'en-US');
          
          setTimeout(() => {
            setIsInputError(false);
            inputRef.current?.classList.remove('animate-shake');
          }, 500);
        }
      }
    }, 500);
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            {/* Progress Indicator */}
            <div className={`
              px-4 py-2 rounded-full font-bold
              ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
              shadow-lg
            `}>
              {language === 'es' 
                ? `Animal ${currentAnimal + 1} de ${animals.length}`
                : `Animal ${currentAnimal + 1} of ${animals.length}`}
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
          {/* Animal Image */}
          <div className="flex justify-center mb-8">
            <div className={`
              relative w-48 h-48 rounded-2xl overflow-hidden shadow-lg
              transition-opacity duration-500
              ${isTransitioning ? 'opacity-0' : 'opacity-100'}
              ${isAnimalAnimating ? 'animate-bounce' : ''}
            `}>
              <img
                src={animals[currentAnimal].image}
                alt="Animal"
                className="w-full h-full object-cover"
              />
              {showNameOverlay && (
                <div className={`
                  absolute bottom-0 left-0 right-0
                  bg-black/50 backdrop-blur-sm
                  text-white text-center py-2 font-bold
                  transform transition-all duration-300
                  ${showNameOverlay ? 'translate-y-0' : 'translate-y-full'}
                `}>
                  {animals[currentAnimal].name[language as keyof typeof animals[0]['name']]}
                </div>
              )}
            </div>
          </div>

          {/* Chat Messages */}
          <div className="mb-8 space-y-4 max-h-60 overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`
                  flex ${message.isUser ? 'justify-end' : 'justify-start'}
                `}
              >
                <div className={`
                  max-w-[80%] px-4 py-2 rounded-xl
                  transform transition-all duration-300
                  hover:scale-102
                  ${message.isUser
                    ? isVibrant
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg'
                      : 'bg-purple-600 text-white shadow-lg'
                    : isDarkMode
                      ? 'bg-gray-700 text-white shadow-md'
                      : 'bg-gray-100 text-gray-900 shadow-md'
                  }
                `}>
                  {message.text}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} /> {/* Scroll anchor */}
          </div>

          {/* Input Area */}
          <div className="flex gap-4">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
              placeholder={language === 'es' ? "Escribe tu respuesta..." : "Type your answer..."}
              className={`
                flex-1 px-4 py-3 rounded-xl
                transition-all duration-300
                ${isDarkMode
                  ? 'bg-gray-700 text-white placeholder-gray-400'
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                }
                focus:outline-none focus:ring-2 focus:ring-purple-400
              `}
            />
            <button
              onClick={handleUserInput}
              className={`
                p-3 rounded-xl
                ${isVibrant
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                  : 'bg-purple-600'
                }
                text-white
                transform hover:scale-105
                transition-all duration-300
                shadow-lg
              `}
            >
              <Send className="w-6 h-6" />
            </button>
          </div>

          {/* Celebration Overlay */}
          {(showCelebration || gameComplete) && (
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
                  <>
                    <p className="text-white text-xl mt-4">
                      {language === 'es'
                        ? `¡Ganaste ${score * 10} puntos!`
                        : `You earned ${score * 10} points!`}
                    </p>
                    {redirectTimer !== null && (
                      <p className="text-white text-lg mt-2">
                        {language === 'es'
                          ? `Volviendo al menú en ${redirectTimer}...`
                          : `Returning to menu in ${redirectTimer}...`}
                      </p>
                    )}
                    <button
                      onClick={onExit}
                      className={`
                        mt-6 px-6 py-3 rounded-xl
                        flex items-center gap-2 mx-auto
                        font-bold text-white
                        transform hover:scale-105
                        transition-all duration-300
                        ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100 text-gray-900'}
                        shadow-lg
                      `}
                    >
                      <Home className="w-5 h-5" />
                      <span>{language === 'es' ? 'Volver al Menú' : 'Return to Menu'}</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}