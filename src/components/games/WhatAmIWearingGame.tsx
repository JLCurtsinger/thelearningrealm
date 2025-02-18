import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, Send } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';

interface WhatAmIWearingGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Clothing items with translations and colors
const clothing = [
  {
    id: 'shirt',
    image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=300&h=300',
    name: { en: 'shirt', es: 'camisa' },
    color: { en: 'blue', es: 'azul' },
    responses: {
      nameCorrect: {
        en: "That's right! What color is the shirt?",
        es: "¡Correcto! ¿De qué color es la camisa?"
      },
      colorCorrect: {
        en: "Perfect! It's a blue shirt!",
        es: "¡Perfecto! ¡Es una camisa azul!"
      }
    }
  },
  {
    id: 'pants',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=300&h=300',
    name: { en: 'pants', es: 'pantalones' },
    color: { en: 'black', es: 'negros' },
    responses: {
      nameCorrect: {
        en: "Yes! What color are the pants?",
        es: "¡Sí! ¿De qué color son los pantalones?"
      },
      colorCorrect: {
        en: "Great! They're black pants!",
        es: "¡Genial! ¡Son pantalones negros!"
      }
    }
  },
  {
    id: 'shoes',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=300&h=300',
    name: { en: 'shoes', es: 'zapatos' },
    color: { en: 'red', es: 'rojos' },
    responses: {
      nameCorrect: {
        en: "Correct! What color are the shoes?",
        es: "¡Correcto! ¿De qué color son los zapatos?"
      },
      colorCorrect: {
        en: "Excellent! They're red shoes!",
        es: "¡Excelente! ¡Son zapatos rojos!"
      }
    }
  }
];

export function WhatAmIWearingGame({ isDarkMode, isVibrant, onExit, language }: WhatAmIWearingGameProps) {
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentItem, setCurrentItem] = useState(0);
  const [gameState, setGameState] = useState<'name' | 'color' | 'celebration'>('name');
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([]);
  const [userInput, setUserInput] = useState('');
  const [isInputError, setIsInputError] = useState(false);
  const [isItemAnimating, setIsItemAnimating] = useState(false);
  const [showItemLabel, setShowItemLabel] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (soundEnabled) {
      const initialPrompt = language === 'es' 
        ? "¿Qué prenda de vestir es esta?"
        : "What clothing item is this?";
      setMessages([{ text: initialPrompt, isUser: false }]);
      speakText(initialPrompt, language === 'es' ? 'es-ES' : 'en-US');
    }
  }, []);

  const handleUserInput = () => {
    if (!userInput.trim()) return;

    const item = clothing[currentItem];
    const inputValue = userInput; // Store input value before clearing
    setUserInput(''); // Clear input immediately

    const userMessage = { text: inputValue, isUser: true };
    setMessages(prev => [...prev, userMessage]);

    setTimeout(() => {
      if (gameState === 'name') {
        const isCorrect = inputValue.toLowerCase().includes(
          item.name[language as keyof typeof item.name].toLowerCase()
        );

        if (isCorrect) {
          playGameSound('success');
          setIsItemAnimating(true);
          setShowItemLabel(true);
          
          const response = item.responses.nameCorrect[language as keyof typeof item.responses.nameCorrect];
          setMessages(prev => [...prev, { text: response, isUser: false }]);
          speakText(response, language === 'es' ? 'es-ES' : 'en-US');
          
          setGameState('color');
          
          setTimeout(() => {
            setIsItemAnimating(false);
          }, 1000);
        } else {
          playGameSound('error');
          setIsInputError(true);
          
          const tryAgain = language === 'es' ? '¡Inténtalo de nuevo!' : 'Try again!';
          setMessages(prev => [...prev, { text: tryAgain, isUser: false }]);
          speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
          
          setTimeout(() => setIsInputError(false), 500);
        }
      } else if (gameState === 'color') {
        const isCorrect = inputValue.toLowerCase().includes(
          item.color[language as keyof typeof item.color].toLowerCase()
        );

        if (isCorrect) {
          playGameSound('success');
          setIsItemAnimating(true);
          
          const response = item.responses.colorCorrect[language as keyof typeof item.responses.colorCorrect];
          setMessages(prev => [...prev, { text: response, isUser: false }]);
          speakText(response, language === 'es' ? 'es-ES' : 'en-US');
          
          setScore(score + 1);
          setShowCelebration(true);
          
          setTimeout(() => {
            setIsItemAnimating(false);
            setShowCelebration(false);
            if (currentItem < clothing.length - 1) {
              setIsTransitioning(true);
              setTimeout(() => {
                setCurrentItem(prev => prev + 1);
                setGameState('name');
                setShowItemLabel(false);
                const newPrompt = language === 'es' 
                  ? "¿Qué prenda de vestir es esta?"
                  : "What clothing item is this?";
                setMessages([{ text: newPrompt, isUser: false }]);
                speakText(newPrompt, language === 'es' ? 'es-ES' : 'en-US');
                setIsTransitioning(false);
              }, 500);
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
          setIsInputError(true);
          
          const tryAgain = language === 'es' ? '¡Inténtalo de nuevo!' : 'Try again!';
          setMessages(prev => [...prev, { text: tryAgain, isUser: false }]);
          speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
          
          setTimeout(() => setIsInputError(false), 500);
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
                ? `Prenda ${currentItem + 1} de ${clothing.length}`
                : `Item ${currentItem + 1} of ${clothing.length}`}
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
          {/* Clothing Image */}
          <div className="flex justify-center mb-8">
            <div className={`
              relative w-48 h-48 rounded-2xl overflow-hidden shadow-lg
              transition-opacity duration-500
              ${isTransitioning ? 'opacity-0' : 'opacity-100'}
              ${isItemAnimating ? 'animate-bounce' : ''}
            `}>
              <img
                src={clothing[currentItem].image}
                alt="Clothing item"
                className="w-full h-full object-cover"
              />
              {showItemLabel && (
                <div className={`
                  absolute bottom-0 left-0 right-0
                  bg-black/50 backdrop-blur-sm
                  text-white text-center py-2 font-bold
                  transform transition-all duration-300
                  ${showItemLabel ? 'translate-y-0' : 'translate-y-full'}
                `}>
                  {clothing[currentItem].name[language as keyof typeof clothing[0]['name']]}
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
                transition-all duration-300
                ${isDarkMode
                  ? 'bg-gray-700 text-white placeholder-gray-400'
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                }
                ${isInputError
                  ? 'border-2 border-red-500 animate-[shake_0.5s_ease-in-out]'
                  : 'border-2 border-transparent'
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