import { updateProgressData } from './progressStorage';
import { useAuth } from '../contexts/AuthContext';
import { GameId } from './gamesData';

export interface GameCompletionParams {
  score: number;
  pointsPerScore?: number;
  language: string;
  soundEnabled: boolean;
  playGameSound: (type: 'success' | 'error' | 'click', volume?: number) => void;
  speakText: (text: string, lang: string) => void;
  onExit: () => void;
  gameId: GameId;
}

export const handleGameCompletion = async ({
  score,
  pointsPerScore = 10,
  language,
  soundEnabled,
  playGameSound,
  speakText,
  onExit,
  gameId
}: GameCompletionParams): Promise<void> => {
  try {
    // Play success sound
    playGameSound('success');

    // Play victory speech
    if (soundEnabled) {
      const victoryMessage = language === 'es'
        ? '¡Felicitaciones! ¡Has completado el juego!'
        : 'Congratulations! You have completed the game!';
      speakText(victoryMessage, language === 'es' ? 'es-ES' : 'en-US');
    }

    // Update user progress
    const { user } = useAuth();
    if (user) {
      try {
        await updateProgressData(user.uid, {
          rewardPoints: score * pointsPerScore,
          completedLessons: [gameId]
        });
      } catch (error) {
        console.error('Error updating progress:', error);
      }
    }

    // Return to learning path after delay
    setTimeout(() => {
      onExit();
    }, 5000);
  } catch (error) {
    console.error('Error in game completion:', error);
    // Still exit even if there's an error
    setTimeout(() => {
      onExit();
    }, 5000);
  }
};

// Reusable celebration overlay component
export const GameCompletionOverlay: React.FC<{
  showVictory: boolean;
  showCelebration: boolean;
  score: number;
  pointsPerScore?: number;
  language: string;
  isDarkMode: boolean;
}> = ({
  showVictory,
  showCelebration,
  score,
  pointsPerScore = 10,
  language,
  isDarkMode
}) => {
  if (!showCelebration && !showVictory) return null;

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
      <div className="text-center">
        <h3 className="text-4xl font-bold text-white mb-4">
          {showVictory
            ? language === 'es'
              ? '¡Felicitaciones! 🎉\n¡Has completado el juego!'
              : 'Congratulations! 🎉\nYou completed the game!'
            : language === 'es'
              ? '¡Excelente! 🎉'
              : 'Great Job! 🎉'
          }
        </h3>
        <div className="flex justify-center space-x-4">
          {Array.from({ length: showVictory ? 6 : 3 }).map((_, i) => (
            <Sparkles
              key={i}
              className={`
                w-12 h-12 text-yellow-400
                ${showVictory ? 'animate-float' : 'animate-spin'}
              `}
              style={{
                animationDelay: `${i * 0.2}s`,
                transform: showVictory
                  ? `rotate(${i * 60}deg) translateY(${Math.sin(i) * 20}px)`
                  : 'none'
              }}
            />
          ))}
        </div>
        {showVictory && (
          <p className="text-white text-xl mt-4">
            {language === 'es'
              ? `¡Ganaste ${score * pointsPerScore} puntos!`
              : `You earned ${score * pointsPerScore} points!`}
          </p>
        )}
      </div>
    </div>
  );
};