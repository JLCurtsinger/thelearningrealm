import React, { useEffect, useState } from 'react';
import { Trophy, Clock, Star, User, Sparkles } from 'lucide-react';
import { useGameAudio } from '../games/GameAudioContext';
import { useDashboard } from '../../contexts/DashboardContext';

// Kid Mode information cards
const INFO_CARDS = [
  {
    id: 'profile',
    icon: User,
    color: 'from-purple-400 via-pink-400 to-red-400',
    getTitle: (name: string) => name,
    getValue: () => '',
    titleKey: 'profile'
  },
  {
    id: 'progress',
    icon: Star,
    color: 'from-blue-400 via-cyan-400 to-teal-400',
    getTitle: (t: any) => t.dashboard.learningProgress,
    getValue: (progress: number) => `${progress}%`,
    titleKey: 'progress'
  },
  {
    id: 'playtime',
    icon: Clock,
    color: 'from-green-400 via-emerald-400 to-teal-400',
    getTitle: (t: any) => t.dashboard.screenTime,
    getValue: (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    },
    titleKey: 'playtime'
  },
  {
    id: 'rewards',
    icon: Trophy,
    color: 'from-yellow-400 via-orange-400 to-red-400',
    getTitle: (t: any) => t.dashboard.rewards,
    getValue: (points: number) => points.toString(),
    titleKey: 'rewards'
  }
];

interface KidDashboardProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  language: string;
  t: any;
}

export function KidDashboard({ isDarkMode, isVibrant, language, t }: KidDashboardProps) {
  const {
    selectedChild,
    soundEnabled,
    progressPercentage,
    xpPoints,
    setActiveCard,
    setShowCelebration
  } = useDashboard();
  const { speakText } = useGameAudio();
  const [playTime, setPlayTime] = useState(0);

  // Track play time
  useEffect(() => {
    // Get stored play time or initialize
    const storedTime = localStorage.getItem('playTime');
    const lastDate = localStorage.getItem('lastPlayDate');
    const today = new Date().toDateString();

    if (lastDate !== today) {
      // Reset play time for new day
      setPlayTime(0);
      localStorage.setItem('lastPlayDate', today);
      localStorage.setItem('playTime', '0');
    } else if (storedTime) {
      setPlayTime(parseInt(storedTime, 10));
    }

    // Update play time every minute
    const interval = setInterval(() => {
      setPlayTime(prev => {
        const newTime = prev + 1;
        localStorage.setItem('playTime', newTime.toString());
        return newTime;
      });
    }, 60000); // 1 minute

    return () => clearInterval(interval);
  }, []);

  const handleCardClick = (cardId: string) => {
    setActiveCard(cardId);
    setShowCelebration(true);

    // Prepare speech text based on card type
    let speechText = '';
    const card = INFO_CARDS.find(c => c.id === cardId);
    
    if (card) {
      switch (cardId) {
        case 'profile':
          speechText = selectedChild;
          break;
        case 'progress':
          speechText = `${t.dashboard.learningProgress}: ${progressPercentage}%`;
          break;
        case 'playtime':
          const hours = Math.floor(playTime / 60);
          const mins = playTime % 60;
          speechText = `${t.dashboard.screenTime}: ${hours} ${t.dashboard.hours} ${mins} ${t.dashboard.minutes}`;
          break;
        case 'rewards':
          speechText = `${t.dashboard.rewards}: ${xpPoints} ${t.dashboard.points}`;
          break;
      }

      // Speak the information
      if (soundEnabled && speechText) {
        speakText(speechText, language === 'es' ? 'es-ES' : 'en-US');
      }
    }

    setTimeout(() => {
      setActiveCard(null);
      setShowCelebration(false);
    }, 2000);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {INFO_CARDS.map((card) => (
        <button
          key={card.id}
          onClick={() => handleCardClick(card.id)}
          className={`
            relative p-8 rounded-3xl
            transform hover:scale-105 transition-all duration-500
            focus:outline-none focus:ring-4 focus:ring-purple-400
            shadow-xl
            group
            cursor-pointer
            overflow-hidden
            aspect-square
          `}
        >
          {/* Gradient Background */}
          <div className={`
            absolute inset-0
            bg-gradient-to-br ${card.color}
            opacity-40 group-hover:opacity-60
            transition-opacity duration-500
          `} />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center h-full space-y-6">
            <card.icon className={`
              w-24 h-24
              ${isVibrant
                ? `text-transparent bg-clip-text bg-gradient-to-r ${card.color}`
                : isDarkMode
                  ? 'text-white'
                  : 'text-gray-900'
              }
              animate-float
            `} />

            <div className="text-center space-y-2">
              <h3 className={`
                text-3xl md:text-4xl font-extrabold font-comic tracking-wide
                ${isDarkMode ? 'text-white' : 'text-gray-900'}
                transform hover:scale-110 transition-transform
                ${isVibrant ? 'drop-shadow-lg' : ''}
              `}>
                {card.id === 'profile'
                  ? card.getTitle(selectedChild)
                  : card.getTitle(t)}
              </h3>

              {card.id !== 'profile' && (
                <p className={`
                  text-2xl md:text-3xl font-bold font-comic tracking-wider
                  ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
                  transform hover:scale-110 transition-transform
                  ${isVibrant ? 'drop-shadow' : ''}
                `}>
                  {card.id === 'progress'
                    ? card.getValue(progressPercentage)
                    : card.id === 'playtime'
                      ? card.getValue(playTime)
                      : card.getValue(xpPoints)}
                </p>
              )}
            </div>
          </div>

          {/* Sparkle Effect on Hover */}
          <div className="absolute -inset-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
            {Array.from({ length: 3 }).map((_, i) => (
              <Sparkles
                key={i}
                className={`
                  absolute w-6 h-6
                  text-yellow-400
                  animate-pulse
                `}
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.2}s`
                }}
              />
            ))}
          </div>
        </button>
      ))}
    </div>
  );
}