import React, { useState } from 'react';
import { Cloud, Moon, Waves as Wave, Sun, Sparkles } from 'lucide-react';

interface CalmingScenesProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

// Animation options for Visual Relaxation
const animations = [
  {
    name: 'waves',
    title: { en: 'Ocean Waves', es: 'Olas del Mar' },
    gradient: 'from-blue-400 to-blue-600',
    elements: [
      { type: 'wave', count: 3, baseDelay: 0 },
      { type: 'cloud', count: 2, baseDelay: 2 }
    ]
  },
  {
    name: 'garden',
    title: { en: 'Peaceful Garden', es: 'Jardín Tranquilo' },
    gradient: 'from-green-400 to-emerald-600',
    elements: [
      { type: 'butterfly', count: 5, baseDelay: 0 },
      { type: 'flower', count: 3, baseDelay: 1 }
    ]
  },
  {
    name: 'night',
    title: { en: 'Starry Night', es: 'Noche Estrellada' },
    gradient: 'from-indigo-900 to-purple-900',
    elements: [
      { type: 'star', count: 20, baseDelay: 0 },
      { type: 'firefly', count: 8, baseDelay: 1 }
    ]
  }
];

export function CalmingScenes({ isDarkMode, isVibrant, t }: CalmingScenesProps) {
  const [currentAnimation, setCurrentAnimation] = useState(0);

  return (
    <div className="relative w-full h-full min-h-[500px]">
      {/* Background */}
      <div className={`
        absolute inset-0 transition-opacity duration-1000
        bg-gradient-to-b ${animations[currentAnimation].gradient}
      `}>
        {/* Dynamic Scene Elements */}
        {animations[currentAnimation].elements.map((element, elementIndex) => (
          Array.from({ length: element.count }).map((_, index) => {
            const delay = element.baseDelay + (index * 0.5);
            const randomPosition = {
              top: `${Math.random() * 80 + 10}%`,
              left: `${Math.random() * 80 + 10}%`,
            };

            switch (element.type) {
              case 'wave':
                return (
                  <Wave
                    key={`wave-${elementIndex}-${index}`}
                    className="absolute w-24 h-24 text-white/20 animate-float"
                    style={{
                      ...randomPosition,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              case 'cloud':
                return (
                  <Cloud
                    key={`cloud-${elementIndex}-${index}`}
                    className="absolute w-32 h-32 text-white/30 animate-float"
                    style={{
                      ...randomPosition,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              case 'star':
                return (
                  <Stars
                    key={`star-${elementIndex}-${index}`}
                    className="absolute w-4 h-4 text-yellow-200 animate-twinkle"
                    style={{
                      ...randomPosition,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              case 'firefly':
                return (
                  <Sparkles
                    key={`firefly-${elementIndex}-${index}`}
                    className="absolute w-3 h-3 text-yellow-300/70 animate-float"
                    style={{
                      ...randomPosition,
                      animationDelay: `${delay}s`,
                    }}
                  />
                );
              case 'butterfly':
                return (
                  <div
                    key={`butterfly-${elementIndex}-${index}`}
                    className="absolute w-6 h-6 animate-float"
                    style={{
                      ...randomPosition,
                      animationDelay: `${delay}s`,
                    }}
                  >
                    <span className="block w-full h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-60" />
                  </div>
                );
              case 'flower':
                return (
                  <Sun
                    key={`flower-${elementIndex}-${index}`}
                    className="absolute w-8 h-8 text-yellow-400/70 animate-spin-slow"
                    style={{
                      ...randomPosition,
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

      {/* Scene Title */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <h3 className="text-2xl font-bold text-white text-center drop-shadow-lg">
          {animations[currentAnimation].title[t.language as keyof typeof animations[0]['title']]}
        </h3>
      </div>

      {/* Scene Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
        {animations.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentAnimation(index)}
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