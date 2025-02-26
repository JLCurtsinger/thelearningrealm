import React, { useState, useEffect } from 'react';
import { Volume2, Star, Sparkles, Home, ArrowLeft } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { useAuth } from '../../contexts/AuthContext';
import { updateProgressData, addCompletedLesson } from '../../utils/progressStorage';

interface WheresMyToyGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

// Toy data with translations and reliable images
const toys = [
  {
    id: 'teddy',
    name: { en: 'teddy bear', es: 'oso de peluche' },
    image: 'https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=300&h=300',
    color: 'from-yellow-400 to-yellow-600'
  },
  {
    id: 'ball',
    name: { en: 'colorful ball', es: 'pelota de colores' },
    image: 'https://images.unsplash.com/photo-1510697963685-53101e615777?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D,
    color: 'from-blue-400 to-blue-600'
  },
  {
    id: 'blocks',
    name: { en: 'building blocks', es: 'bloques de construcción' },
    image: 'https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&w=300&h=300',
    color: 'from-red-400 to-red-600'
  },
  {
    id: 'car',
    name: { en: 'toy car', es: 'carro de juguete' },
    image: 'https://images.unsplash.com/photo-1594787318286-3d835c1d207f?auto=format&fit=crop&w=300&h=300',
    color: 'from-green-400 to-green-600'
  },
  {
    id: 'doll',
    name: { en: 'doll', es: 'muñeca' },
    image: 'https://images.unsplash.com/photo-1648217051161-679aba057014?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    color: 'from-pink-400 to-pink-600'
  }
];

export function WheresMyToyGame({ isDarkMode, isVibrant, onExit, language }: WheresMyToyGameProps) {
  const { user } = useAuth();
  const { soundEnabled, toggleSound, playGameSound, speakText } = useGameAudio();
  const [currentToy, setCurrentToy] = useState(0);
  const [displayedToys, setDisplayedToys] = useState<typeof toys>([]);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);
  const [round, setRound] = useState(1);
  const [totalRounds] = useState(5);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedToy, setSelectedToy] = useState<string | null>(null);
  const [isToyAnimating, setIsToyAnimating] = useState(false);
  const [showToyLabel, setShowToyLabel] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [redirectTimer, setRedirectTimer] = useState<number | null>(null);

  // Initialize game
  useEffect(() => {
    generateNewRound();
  }, []);

  // Handle game completion
  const handleGameCompletion = async () => {
    if (!user) return;

    setGameComplete(true);
    playGameSound('success');

    try {
      // Update reward points (10 points per correct toy found)
      await updateProgressData(user.uid, {
        rewardPoints: score * 10
      });

      // Mark lesson as completed
      await addCompletedLesson(user.uid, 'wheresmytoy');

      // Play victory sound and speech
      if (soundEnabled) {
        const victoryMessage = language === 'es'
          ? '¡Felicitaciones! ¡Has encontrado todos los juguetes!'
          : 'Congratulations! You found all the toys!';
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

  // Generate new round with shuffled toys
  const generateNewRound = () => {
    setIsTransitioning(true);
    setShowToyLabel(false);
    setSelectedToy(null);
    
    // Shuffle toys and select 4 random ones (including the target)
    const shuffledToys = [...toys].sort(() => Math.random() - 0.5);
    const selectedToys = shuffledToys.slice(0, 4);
    
    // Ensure target toy is included
    if (!selectedToys.find(toy => toy.id === toys[currentToy].id)) {
      selectedToys[Math.floor(Math.random() * 4)] = toys[currentToy];
    }
    
    // Shuffle the positions again
    setDisplayedToys(selectedToys.sort(() => Math.random() - 0.5));

    // Speak the prompt
    if (soundEnabled) {
      const prompt = language === 'es'
        ? `¿Puedes encontrar el ${toys[currentToy].name.es}?`
        : `Can you find the ${toys[currentToy].name.en}?`;
      speakText(prompt, language === 'es' ? 'es-ES' : 'en-US');
    }

    setTimeout(() => {
      setIsTransitioning(false);
    }, 300);
  };

  const handleToyClick = (toyId: string) => {
    if (gameComplete) return;
    setSelectedToy(toyId);

    if (toyId === toys[currentToy].id) {
      playGameSound('success');
      setScore(score + 1);
      setShowCelebration(true);
      setIsToyAnimating(true);
      setShowToyLabel(true);
      
      if (soundEnabled) {
        const celebration = language === 'es'
          ? '¡Muy bien! ¡Lo encontraste!'
          : 'Great job! You found it!';
        speakText(celebration, language === 'es' ? 'es-ES' : 'en-US');
      }

      setTimeout(() => {
        setIsToyAnimating(false);
        setShowCelebration(false);
        if (round < totalRounds) {
          setRound(prev => prev + 1);
          setCurrentToy((currentToy + 1) % toys.length);
          generateNewRound();
        } else {
          handleGameCompletion();
        }
      }, 2000);
    } else {
      playGameSound('error');
      
      if (soundEnabled) {
        const tryAgain = language === 'es'
          ? '¡Inténtalo de nuevo!'
          : 'Try again!';
        speakText(tryAgain, language === 'es' ? 'es-ES' : 'en-US');
      }

      setTimeout(() => {
        setSelectedToy(null);
      }, 500);
    }
  };

  // Handle back button click
  const handleBackClick = () => {
    // Just call onExit without updating progress or showing celebration
    onExit();
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          {/* Back Button */}
          <button
            onClick={handleBackClick}
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
                ? `Juguete ${round} de ${totalRounds}`
                : `Toy ${round} of ${totalRounds}`}
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
          {/* Instruction Banner */}
          <div className={`
            text-center mb-8 p-4 rounded-xl
            ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
            transition-opacity duration-300
          `}>
            <h2 className={`
              text-2xl font-bold font-comic
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
              {language === 'es'
                ? `¿Puedes encontrar el ${toys[currentToy].name.es}?`
                : `Can you find the ${toys[currentToy].name.en}?`}
            </h2>
          </div>

          {/* Toys Grid */}
          <div className={`
            grid grid-cols-2 gap-6
            transition-opacity duration-300
            ${isTransitioning ? 'opacity-0' : 'opacity-100'}
          `}>
            {displayedToys.map((toy, index) => (
              <button
                key={index}
                onClick={() => handleToyClick(toy.id)}
                disabled={gameComplete}
                className={`
                  aspect-square rounded-2xl overflow-hidden
                  transform transition-all duration-300
                  ${selectedToy === toy.id
                    ? toy.id === toys[currentToy].id
                      ? 'ring-4 ring-green-500 scale-110'
                      : 'ring-4 ring-red-500 animate-[shake_0.5s_ease-in-out]'
                    : 'hover:scale-105'
                  }
                  ${toy.id === toys[currentToy].id && isToyAnimating ? 'animate-bounce' : ''}
                  shadow-lg
                  relative
                `}
              >
                <img
                  src={toy.image}
                  alt={toy.name[language as keyof typeof toy.name]}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.src = "https://images.unsplash.com/photo-1559454403-b8fb88521f11?auto=format&fit=crop&w=300&h=300";
                  }}
                />

                {/* Toy Label */}
                {(showToyLabel && toy.id === toys[currentToy].id) && (
                  <div className={`
                    absolute bottom-0 left-0 right-0
                    bg-black/50 backdrop-blur-sm
                    text-white text-center py-2 font-bold
                    transform transition-all duration-300
                  `}>
                    {toy.name[language as keyof typeof toy.name]}
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Celebration Overlay */}
          {(showCelebration || gameComplete) && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
              <div className="text-center">
                <h3 className="text-4xl font-bold text-white mb-4">
                  {gameComplete
                    ? language === 'es'
                      ? '¡Felicitaciones! 🎉\n¡Has encontrado todos los juguetes!'
                      : 'Congratulations! 🎉\nYou found all the toys!'
                    : language === 'es'
                      ? '¡Muy bien! 🎉'
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
