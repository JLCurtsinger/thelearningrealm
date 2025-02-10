import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, Send } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface ChatWithGPTGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Animal data with sounds and responses
const animals = [
  {
    id: 'cat',
    image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&h=300',
    sound: { en: 'meow', es: 'miau' },
    name: { en: 'cat', es: 'gato' },
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
    id: 'dog',
    image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=300&h=300',
    sound: { en: 'woof', es: 'guau' },
    name: { en: 'dog', es: 'perro' },
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
    id: 'cow',
    image: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=300&h=300',
    sound: { en: 'moo', es: 'mu' },
    name: { en: 'cow', es: 'vaca' },
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
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentAnimal, setCurrentAnimal] = useState(0);
  const [gameState, setGameState] = useState<'name' | 'sound' | 'celebration'>('name');
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [userInput, setUserInput] = useState('');

  useEffect(() => {
    if (soundEnabled) {
      const initialPrompt = language === 'es' 
        ? "¡Hola! ¿Qué animal es este?"
        : "Hi! What animal is this?";
      setMessages([{ text: initialPrompt, isUser: false }]);
      speakText(initialPrompt, language === 'es' ? 'es-ES' : 'en-US');
    }
  }, []);

  const handleUserInput = () => {
    if (!userInput.trim()) return;

    const animal = animals[currentAnimal];
    const userMessage = { text: userInput, isUser: true };
    setMessages(prev => [...prev, userMessage]);
    setUserInput('');

    setTimeout(() => {
      if (gameState === 'name') {
        const isCorrect = userInput.toLowerCase().includes(
          animal.name[language as keyof typeof animal.name].toLowerCase()
        );

        if (isCorrect) {
          playGameSound('success');
          
          const response = animal.responses.correct[language as keyof typeof animal.responses.correct];
          setMessages(prev => [...prev, { text: response, isUser: false }]);
          speakText(response, language === 'es' ? 'es-ES' : 'en-US');
          
          setGameState('sound');
        } else {
          playGameSound('error');
          
          const tryAgain = language === 'es' ? '¡Inténtalo de nuevo!' : 'Try again!';
          setMessages(prev => [...prev, { text: tryAgain, isUser: false }]);
          speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
        }
      } else if (gameState === 'sound') {
        const animalSound = animal.sound[language as keyof typeof animal.sound];
        const isCorrect = userInput.toLowerCase().includes(animalSound.toLowerCase());

        if (isCorrect) {
          playGameSound('success');
          
          const response = animal.responses.sound[language as keyof typeof animal.responses.sound];
          setMessages(prev => [...prev, { text: response, isUser: false }]);
          speakText(response, language === 'es' ? 'es-ES' : 'en-US');
          
          setScore(score + 1);
          setShowCelebration(true);
          
          setTimeout(() => {
            setShowCelebration(false);
            if (currentAnimal < animals.length - 1) {
              setCurrentAnimal(prev => prev + 1);
              setGameState('name');
              const newPrompt = language === 'es' 
                ? "¿Qué animal es este?"
                : "What animal is this?";
              setMessages([{ text: newPrompt, isUser: false }]);
              speakText(newPrompt, language === 'es' ? 'es-ES' : 'en-US');
            } else {
              const finalMessage = language === 'es'
                ? "¡Felicitaciones! ¡Has completado el juego!"
                : "Congratulations! You've completed the game!";
              setMessages(prev => [...prev, { text: finalMessage, isUser: false }]);
              speakText(finalMessage, language === 'es' ? 'es-ES' : 'en-US');
            }
          }, 2000);
        } else {
          playGameSound('error');
          
          const tryAgain = language === 'es' ? '¡Inténtalo de nuevo!' : 'Try again!';
          setMessages(prev => [...prev, { text: tryAgain, isUser: false }]);
          speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
        }
      }
    }, 500);
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className={`
            flex items-center space-x-2 px-4 py-2 rounded-full
            ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
            shadow-lg
          `}>
            <Star className="w-5 h-5 text-yellow-400" />
            <span className="font-bold">{score}</span>
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
            <div className="relative w-48 h-48 rounded-2xl overflow-hidden shadow-lg">
              <img
                src={animals[currentAnimal].image}
                alt="Animal"
                className="w-full h-full object-cover"
              />
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
                  ${message.isUser
                    ? isVibrant
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white'
                      : 'bg-purple-600 text-white'
                    : isDarkMode
                      ? 'bg-gray-700 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }
                `}>
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="flex gap-4">
            <input
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleUserInput()}
              placeholder={language === 'es' ? "Escribe tu respuesta..." : "Type your answer..."}
              className={`
                flex-1 px-4 py-3 rounded-xl
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
              `}
            >
              <Send className="w-6 h-6" />
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