import React, { useState, useEffect, useRef } from 'react';
import { Volume2, Star, ArrowLeft, RefreshCw } from 'lucide-react';
import { useGameAudio } from './GameAudioContext';
import { useAuth } from '../../contexts/AuthContext';
import { updateProgressData, addCompletedLesson } from '../../utils/progressStorage';

interface BubblePopGameProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onExit: () => void;
  language: string;
}

interface Bubble {
  id: number;
  number: number;
  x: number;
  y: number;
  size: number;
  speed: number;
  angle: number;
}

const BUBBLE_COUNT = 10;
const MIN_BUBBLE_SIZE = 60;
const MAX_BUBBLE_SIZE = 80;
const CANVAS_PADDING = 100;

export function BubblePopGame({ isDarkMode, isVibrant, onExit, language }: BubblePopGameProps) {
  const { user } = useAuth();
  const { soundEnabled, toggleSound, playGameSound } = useGameAudio();
  const [score, setScore] = useState(0);
  const [currentNumber, setCurrentNumber] = useState(1);
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [gameComplete, setGameComplete] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number>();
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 600 });

  // Initialize game
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        const container = canvas.parentElement;
        if (container) {
          const { width, height } = container.getBoundingClientRect();
          setCanvasSize({ width, height });
          canvas.width = width * window.devicePixelRatio;
          canvas.height = height * window.devicePixelRatio;
          canvas.style.width = `${width}px`;
          canvas.style.height = `${height}px`;
        }
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();
    generateBubbles();

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  // Generate new bubbles
  const generateBubbles = () => {
    const newBubbles: Bubble[] = [];
    const numbers = Array.from({ length: BUBBLE_COUNT }, (_, i) => i + 1)
      .sort(() => Math.random() - 0.5);

    for (let i = 0; i < BUBBLE_COUNT; i++) {
      const size = Math.random() * (MAX_BUBBLE_SIZE - MIN_BUBBLE_SIZE) + MIN_BUBBLE_SIZE;
      newBubbles.push({
        id: Math.random(),
        number: numbers[i],
        x: Math.random() * (canvasSize.width - size - CANVAS_PADDING) + CANVAS_PADDING / 2,
        y: Math.random() * (canvasSize.height - size - CANVAS_PADDING) + CANVAS_PADDING / 2,
        size,
        speed: Math.random() * 0.5 + 0.5,
        angle: Math.random() * Math.PI * 2
      });
    }
    setBubbles(newBubbles);
    setCurrentNumber(1);
  };

  // Animation loop
  useEffect(() => {
    const animate = () => {
      if (!canvasRef.current) return;
      const ctx = canvasRef.current.getContext('2d');
      if (!ctx) return;

      // Scale context for high DPI displays
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

      // Clear canvas
      ctx.clearRect(0, 0, canvasSize.width, canvasSize.height);

      // Draw underwater background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvasSize.height);
      gradient.addColorStop(0, '#1e40af'); // Deep blue at top
      gradient.addColorStop(1, '#3b82f6'); // Lighter blue at bottom
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvasSize.width, canvasSize.height);

      // Update and draw bubbles
      setBubbles(prevBubbles => 
        prevBubbles.map(bubble => {
          // Update position with floating motion
          let x = bubble.x + Math.cos(bubble.angle) * bubble.speed;
          let y = bubble.y + Math.sin(bubble.angle) * bubble.speed - bubble.speed;
          let angle = bubble.angle;

          // Bounce off walls
          if (x < CANVAS_PADDING / 2 || x > canvasSize.width - CANVAS_PADDING / 2) {
            angle = Math.PI - angle;
            x = x < CANVAS_PADDING / 2 ? CANVAS_PADDING / 2 : canvasSize.width - CANVAS_PADDING / 2;
          }
          if (y < CANVAS_PADDING / 2) {
            y = canvasSize.height - CANVAS_PADDING / 2;
          }
          if (y > canvasSize.height - CANVAS_PADDING / 2) {
            y = CANVAS_PADDING / 2;
          }

          // Draw bubble
          ctx.beginPath();
          ctx.arc(x, y, bubble.size / 2, 0, Math.PI * 2);
          ctx.fillStyle = isVibrant
            ? `rgba(255, 255, 255, 0.3)`
            : `rgba(255, 255, 255, 0.2)`;
          ctx.fill();
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
          ctx.lineWidth = 2;
          ctx.stroke();

          // Draw number
          ctx.font = `${bubble.size / 2}px 'Nunito', sans-serif`;
          ctx.textAlign = 'center';
          ctx.textBaseline = 'middle';
          ctx.fillStyle = '#ffffff';
          ctx.fillText(bubble.number.toString(), x, y);

          return {
            ...bubble,
            x,
            y,
            angle
          };
        })
      );

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [canvasSize, isVibrant]);

  // Handle bubble click/tap
  const handleCanvasClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = ((event.clientX - rect.left) * window.devicePixelRatio);
    const y = ((event.clientY - rect.top) * window.devicePixelRatio);

    // Check collision with bubbles
    bubbles.forEach(bubble => {
      const distance = Math.sqrt(
        Math.pow(x - bubble.x, 2) + Math.pow(y - bubble.y, 2)
      );

      if (distance < bubble.size / 2) {
        if (bubble.number === currentNumber) {
          // Correct bubble popped
          playGameSound('success');
          setBubbles(prevBubbles => 
            prevBubbles.filter(b => b.id !== bubble.id)
          );
          setCurrentNumber(prev => prev + 1);
          setScore(prev => prev + 1);

          // Check if round is complete
          if (currentNumber === BUBBLE_COUNT) {
            handleRoundComplete();
          }
        } else {
          // Wrong bubble clicked
          playGameSound('error');
        }
      }
    });
  };

  // Handle round completion
  const handleRoundComplete = async () => {
    if (!user) return;

    try {
      // Update reward points (10 points per round)
      await updateProgressData(user.uid, {
        rewardPoints: score * 10
      });

      // Mark lesson as completed
      await addCompletedLesson(user.uid, 'bubblepop');

      // Generate new bubbles for next round
      generateBubbles();
    } catch (error) {
      console.error('Error updating progress:', error);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
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
              px-4 py-2 rounded-full font-bold
              ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-gray-900'}
              shadow-lg
            `}>
              {language === 'es'
                ? `Siguiente: ${currentNumber}`
                : `Next: ${currentNumber}`}
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

          <div className="flex items-center space-x-4">
            <button
              onClick={generateBubbles}
              className={`
                p-2 rounded-full
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                shadow-lg
                transition-transform hover:scale-110
              `}
            >
              <RefreshCw className="w-6 h-6" />
            </button>

            <button
              onClick={toggleSound}
              className={`
                p-2 rounded-full
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                shadow-lg
                transition-transform hover:scale-110
              `}
            >
              <Volume2 className={`w-6 h-6 ${soundEnabled ? '' : 'opacity-50'}`} />
            </button>
          </div>
        </div>

        {/* Game Canvas */}
        <div className={`
          relative aspect-video w-full
          rounded-3xl overflow-hidden
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
          shadow-xl
        `}>
          <canvas
            ref={canvasRef}
            onClick={handleCanvasClick}
            className="w-full h-full"
            style={{ touchAction: 'none' }}
          />
        </div>

        {/* Instructions */}
        <div className="mt-8 text-center">
          <p className={`
            text-lg font-medium
            ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
          `}>
            {language === 'es'
              ? 'Toca los números en orden del 1 al 10'
              : 'Pop the bubbles in order from 1 to 10'}
          </p>
        </div>
      </div>
    </div>
  );
}