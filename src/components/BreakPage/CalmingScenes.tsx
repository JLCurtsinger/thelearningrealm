import React, { useState, useCallback } from 'react';
import { Cloud, Moon, Waves as Wave, Sun, Sparkles, Wind, Leaf, Umbrella } from 'lucide-react';

interface CalmingScenesProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
  language: string;
}

// Enhanced animation options with more scenes and elements
const animations = [
  {
    name: 'waves',
    title: { en: 'Ocean Waves', es: 'Olas del Mar' },
    gradient: 'from-blue-400 via-cyan-400 to-blue-600',
    elements: [
      { 
        type: 'wave',
        count: 5,
        baseDelay: 0,
        duration: '6s',
        yRange: [-20, 20],
        xRange: [-10, 10]
      },
      { 
        type: 'cloud',
        count: 3,
        baseDelay: 2,
        duration: '8s',
        yRange: [-5, 5],
        xRange: [-20, 20]
      }
    ]
  },
  {
    name: 'garden',
    title: { en: 'Peaceful Garden', es: 'Jardín Tranquilo' },
    gradient: 'from-green-400 via-emerald-400 to-teal-400',
    elements: [
      { 
        type: 'butterfly',
        count: 7,
        baseDelay: 0,
        duration: '4s',
        yRange: [-30, 30],
        xRange: [-20, 20]
      },
      { 
        type: 'flower',
        count: 5,
        baseDelay: 1,
        duration: '10s',
        rotateRange: [-15, 15]
      },
      {
        type: 'leaf',
        count: 4,
        baseDelay: 2,
        duration: '7s',
        yRange: [-25, 25],
        xRange: [-15, 15],
        rotateRange: [-30, 30]
      }
    ]
  },
  {
    name: 'night',
    title: { en: 'Starry Night', es: 'Noche Estrellada' },
    gradient: 'from-indigo-900 via-purple-900 to-blue-900',
    elements: [
      { 
        type: 'star',
        count: 25,
        baseDelay: 0,
        duration: '3s',
        scaleRange: [0.8, 1.2]
      },
      { 
        type: 'firefly',
        count: 12,
        baseDelay: 1,
        duration: '5s',
        yRange: [-40, 40],
        xRange: [-30, 30],
        opacityRange: [0.3, 0.8]
      },
      {
        type: 'moon',
        count: 1,
        baseDelay: 0,
        duration: '15s',
        yRange: [-5, 5],
        xRange: [-5, 5],
        glowColor: 'rgba(255, 255, 255, 0.2)'
      }
    ]
  },
  {
    name: 'rain',
    title: { en: 'Gentle Rain', es: 'Lluvia Suave' },
    gradient: 'from-gray-600 via-gray-700 to-gray-800',
    elements: [
      {
        type: 'raindrop',
        count: 30,
        baseDelay: 0,
        duration: '2s',
        yRange: [100, 120],
        xRange: [-5, 5]
      },
      {
        type: 'umbrella',
        count: 3,
        baseDelay: 1,
        duration: '6s',
        yRange: [-10, 10],
        xRange: [-15, 15]
      }
    ]
  },
  {
    name: 'breeze',
    title: { en: 'Spring Breeze', es: 'Brisa Primaveral' },
    gradient: 'from-pink-400 via-purple-400 to-indigo-400',
    elements: [
      {
        type: 'wind',
        count: 4,
        baseDelay: 0,
        duration: '5s',
        yRange: [-20, 20],
        xRange: [-30, 30]
      },
      {
        type: 'petal',
        count: 15,
        baseDelay: 1,
        duration: '4s',
        yRange: [-30, 30],
        xRange: [-25, 25],
        rotateRange: [-45, 45]
      }
    ]
  }
];

export function CalmingScenes({ isDarkMode, isVibrant, t, language }: CalmingScenesProps) {
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [ripples, setRipples] = useState<Array<{ x: number; y: number; scale: number; opacity: number }>>([]);

  // Handle scene interaction
  const handleSceneClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setRipples(prev => [
      ...prev,
      { x, y, scale: 0, opacity: 1 }
    ]);

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.slice(1));
    }, 2000);
  }, []);

  // Handle scene selection
  const handleSceneSelection = (index: number) => {
    console.log(`Changing scene to index: ${index}, name: ${animations[index].name}`);
    setCurrentAnimation(index);
  };

  // Generate random position within constraints
  const getRandomPosition = (xRange: [number, number], yRange: [number, number]) => {
    const x = Math.random() * (xRange[1] - xRange[0]) + xRange[0];
    const y = Math.random() * (yRange[1] - yRange[0]) + yRange[0];
    return { x, y };
  };

  return (
    <div className="flex flex-col h-full space-y-4">
      {/* Scene Selection - Fixed styling and layout */}
      <div className="flex flex-wrap justify-center gap-3 px-4 py-2">
        {animations.map((anim, index) => (
          <button
            key={index}
            onClick={() => handleSceneSelection(index)}
            className={`
              px-4 py-2 rounded-full
              transition-all duration-300
              ${currentAnimation === index
                ? isVibrant
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white shadow-lg scale-105'
                  : isDarkMode
                    ? 'bg-gray-700 text-white shadow-lg scale-105'
                    : 'bg-purple-600 text-white shadow-lg scale-105'
                : isDarkMode
                  ? 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/70 hover:scale-105'
                  : 'bg-white/70 text-gray-700 hover:bg-white/90 hover:scale-105'
              }
              transform
              font-medium
              whitespace-nowrap
              min-w-[120px]
              flex items-center justify-center
              backdrop-blur-sm
            `}
          >
            {anim.title[language as keyof typeof anim.title]}
          </button>
        ))}
      </div>

      {/* Scene Display */}
      <div 
        className="relative flex-1 rounded-3xl overflow-hidden shadow-xl"
        onClick={handleSceneClick}
      >
        {/* Background with smooth gradient transition */}
        <div 
          className="absolute inset-0 transition-all duration-1000"
          style={{
            background: `linear-gradient(to bottom, ${animations[currentAnimation].gradient.replace('from-', '').replace('via-', '').replace('to-', '').split(' ').map(color => `var(--tw-${color})`).join(', ')})`,
          }}
        />

        {/* Interactive Ripple Effects */}
        {ripples.map((ripple, index) => (
          <div
            key={index}
            className="absolute rounded-full bg-white/20 pointer-events-none"
            style={{
              left: `${ripple.x}%`,
              top: `${ripple.y}%`,
              transform: `translate(-50%, -50%) scale(${ripple.scale})`,
              opacity: ripple.opacity,
              width: '4px',
              height: '4px',
              animation: 'ripple 2s ease-out forwards'
            }}
          />
        ))}

        {/* Dynamic Scene Elements */}
        {animations[currentAnimation].elements.map((element, elementIndex) => (
          Array.from({ length: element.count }).map((_, index) => {
            const delay = element.baseDelay + (index * (2 / element.count));
            const pos = getRandomPosition([-20, 120], [-20, 120]);
            const uniqueAnimation = `float-${elementIndex}-${index}`;

            // Create unique keyframes for each element
            const style = document.createElement('style');
            style.textContent = `
              @keyframes ${uniqueAnimation} {
                0%, 100% { transform: translate(${pos.x}%, ${pos.y}%); }
                50% { transform: translate(
                  ${pos.x + (element.xRange?.[0] || 0)}%,
                  ${pos.y + (element.yRange?.[0] || 0)}%
                ); }
              }
            `;
            document.head.appendChild(style);

            const commonClasses = `
              absolute transition-all duration-300
              hover:scale-125 cursor-pointer
            `;

            switch (element.type) {
              case 'wave':
                return (
                  <Wave
                    key={`wave-${elementIndex}-${index}`}
                    className={`${commonClasses} w-24 h-24 text-white/20`}
                    style={{
                      animation: `${uniqueAnimation} ${element.duration} ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              case 'cloud':
                return (
                  <Cloud
                    key={`cloud-${elementIndex}-${index}`}
                    className={`${commonClasses} w-32 h-32 text-white/30`}
                    style={{
                      animation: `${uniqueAnimation} ${element.duration} ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              case 'star':
                return (
                  <Sparkles
                    key={`star-${elementIndex}-${index}`}
                    className={`${commonClasses} w-4 h-4 text-yellow-200`}
                    style={{
                      left: `${pos.x}%`,
                      top: `${pos.y}%`,
                      animation: `twinkle ${element.duration} ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              case 'firefly':
                return (
                  <div
                    key={`firefly-${elementIndex}-${index}`}
                    className={`${commonClasses} w-3 h-3`}
                    style={{
                      animation: `${uniqueAnimation} ${element.duration} ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  >
                    <Sparkles className="w-full h-full text-yellow-300/70" />
                  </div>
                );
              case 'moon':
                return (
                  <Moon
                    key={`moon-${elementIndex}-${index}`}
                    className={`${commonClasses} w-24 h-24 text-white`}
                    style={{
                      animation: `${uniqueAnimation} ${element.duration} ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                      filter: `drop-shadow(0 0 20px ${element.glowColor})`,
                    }}
                  />
                );
              case 'leaf':
                return (
                  <Leaf
                    key={`leaf-${elementIndex}-${index}`}
                    className={`${commonClasses} w-6 h-6 text-green-400/70`}
                    style={{
                      animation: `${uniqueAnimation} ${element.duration} ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              case 'wind':
                return (
                  <Wind
                    key={`wind-${elementIndex}-${index}`}
                    className={`${commonClasses} w-12 h-12 text-white/30`}
                    style={{
                      animation: `${uniqueAnimation} ${element.duration} ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              case 'petal':
                return (
                  <div
                    key={`petal-${elementIndex}-${index}`}
                    className={`${commonClasses} w-4 h-4 rounded-full bg-pink-300/50`}
                    style={{
                      animation: `${uniqueAnimation} ${element.duration} ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              case 'raindrop':
                return (
                  <div
                    key={`raindrop-${elementIndex}-${index}`}
                    className={`${commonClasses} w-1 h-4 bg-blue-200/30`}
                    style={{
                      animation: `${uniqueAnimation} ${element.duration} linear infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              case 'umbrella':
                return (
                  <Umbrella
                    key={`umbrella-${elementIndex}-${index}`}
                    className={`${commonClasses} w-16 h-16 text-gray-400/50`}
                    style={{
                      animation: `${uniqueAnimation} ${element.duration} ease-in-out infinite`,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              default:
                return null;
            }
          })
        ))}
      </div>
    </div>
  );
}