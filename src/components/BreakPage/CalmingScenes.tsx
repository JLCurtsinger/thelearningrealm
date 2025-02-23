import React, { useState, useCallback } from 'react';
import { Cloud, Moon, Waves as Wave, Sun, Sparkles } from 'lucide-react';

interface CalmingScenesProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

// Animation options with enhanced configurations
const animations = [
  {
    name: 'waves',
    title: { en: 'Ocean Waves', es: 'Olas del Mar' },
    gradient: 'from-blue-400 to-blue-600',
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
    gradient: 'from-green-400 to-emerald-600',
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
      }
    ]
  },
  {
    name: 'night',
    title: { en: 'Starry Night', es: 'Noche Estrellada' },
    gradient: 'from-indigo-900 to-purple-900',
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
      }
    ]
  }
];

export function CalmingScenes({ isDarkMode, isVibrant, t }: CalmingScenesProps) {
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

  // Generate random position within constraints
  const getRandomPosition = (xRange: [number, number], yRange: [number, number]) => {
    const x = Math.random() * (xRange[1] - xRange[0]) + xRange[0];
    const y = Math.random() * (yRange[1] - yRange[0]) + yRange[0];
    return { x, y };
  };

  return (
    <div 
      className="relative w-full h-full min-h-[500px] overflow-hidden rounded-3xl"
      onClick={handleSceneClick}
    >
      {/* Background with smooth gradient transition */}
      <div className={`
        absolute inset-0 transition-all duration-1000
        bg-gradient-to-b ${animations[currentAnimation].gradient}
      `} />

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

          switch (element.type) {
            case 'wave':
              return (
                <Wave
                  key={`wave-${elementIndex}-${index}`}
                  className={`
                    absolute w-24 h-24 text-white/20
                    transition-all duration-300
                    hover:scale-110 hover:text-white/30
                    cursor-pointer
                  `}
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
                  className={`
                    absolute w-32 h-32 text-white/30
                    transition-all duration-300
                    hover:scale-110 hover:text-white/40
                    cursor-pointer
                  `}
                  style={{
                    animation: `${uniqueAnimation} ${element.duration} ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            case 'star':
              return (
                <div
                  key={`star-${elementIndex}-${index}`}
                  className={`
                    absolute w-4 h-4
                    transition-all duration-300
                    hover:scale-150 hover:text-yellow-200
                    cursor-pointer
                  `}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    animation: `twinkle ${element.duration} ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                  }}
                >
                  <Sparkles className="w-full h-full text-yellow-200" />
                </div>
              );
            case 'firefly':
              return (
                <div
                  key={`firefly-${elementIndex}-${index}`}
                  className={`
                    absolute w-3 h-3
                    transition-all duration-300
                    hover:scale-150 hover:opacity-100
                    cursor-pointer
                  `}
                  style={{
                    animation: `${uniqueAnimation} ${element.duration} ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                  }}
                >
                  <Sparkles className="w-full h-full text-yellow-300/70" />
                </div>
              );
            case 'butterfly':
              return (
                <div
                  key={`butterfly-${elementIndex}-${index}`}
                  className={`
                    absolute w-6 h-6
                    transition-all duration-300
                    hover:scale-150
                    cursor-pointer
                  `}
                  style={{
                    animation: `${uniqueAnimation} ${element.duration} ease-in-out infinite`,
                    animationDelay: `${delay}s`,
                  }}
                >
                  <div className="w-full h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-60" />
                </div>
              );
            case 'flower':
              return (
                <Sun
                  key={`flower-${elementIndex}-${index}`}
                  className={`
                    absolute w-8 h-8 text-yellow-400/70
                    transition-all duration-300
                    hover:scale-125 hover:text-yellow-400
                    cursor-pointer
                  `}
                  style={{
                    left: `${pos.x}%`,
                    top: `${pos.y}%`,
                    animation: `spin-slow ${element.duration} linear infinite`,
                    animationDelay: `${delay}s`,
                  }}
                />
              );
            default:
              return null;
          }
        })
      ))}

      {/* Scene Title */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <h3 className="text-2xl font-bold text-white text-center drop-shadow-lg">
          {animations[currentAnimation].title[language as keyof typeof animations[0]['title']]}
        </h3>
      </div>

      {/* Scene Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {animations.map((_, index) => (
          <button
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentAnimation(index);
            }}
            className={`
              w-3 h-3 rounded-full transition-all duration-300
              ${currentAnimation === index
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
              }
            `}
          />
        ))}
      </div>
    </div>
  );
}