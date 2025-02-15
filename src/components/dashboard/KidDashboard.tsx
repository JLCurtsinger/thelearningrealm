import React, { useEffect, useState } from 'react';
import {
  Trophy,
  Clock,
  Star,
  User,
  Sparkles,
  BookOpen,
  Timer,
  Crown,
  GraduationCap
} from 'lucide-react';
import { useGameAudio } from '../games/GameAudioContext';
import { useDashboard } from '../../contexts/DashboardContext';
import { getProgressData, updateScreenTime } from '../../utils/progressStorage';
import { useAuth } from '../../contexts/AuthContext';

// Kid Mode information cards with enhanced visuals
const INFO_CARDS = [
  {
    id: 'profile',
    icon: User,
    mainIcon: GraduationCap,
    color: 'from-purple-400 via-pink-400 to-red-400',
    darkColor: 'from-purple-500/30 via-pink-500/30 to-red-500/30',
    lightColor: 'from-purple-100 via-pink-50 to-red-50',
    getTitle: (name: string) => name,
    getValue: () => '',
    titleKey: 'profile',
    bgPattern: 'radial-gradient(circle at 50% 50%, rgba(255,255,255,0.1) 0%, transparent 60%)'
  },
  {
    id: 'progress',
    icon: Star,
    mainIcon: BookOpen,
    color: 'from-blue-400 via-cyan-400 to-teal-400',
    darkColor: 'from-blue-500/30 via-cyan-500/30 to-teal-500/30',
    lightColor: 'from-blue-100 via-cyan-50 to-teal-50',
    getTitle: (t: any) => t.dashboard.learningProgress,
    getValue: (completed: number, total: number) => `${completed}/${total}`,
    titleKey: 'progress',
    bgPattern: 'radial-gradient(circle at 30% 70%, rgba(255,255,255,0.1) 0%, transparent 50%)'
  },
  {
    id: 'playtime',
    icon: Clock,
    mainIcon: Timer,
    color: 'from-green-400 via-emerald-400 to-teal-400',
    darkColor: 'from-green-500/30 via-emerald-500/30 to-teal-500/30',
    lightColor: 'from-green-100 via-emerald-50 to-teal-50',
    getTitle: (t: any) => t.dashboard.screenTime,
    getValue: (minutes: number) => {
      const hours = Math.floor(minutes / 60);
      const mins = minutes % 60;
      return `${hours}h ${mins}m`;
    },
    titleKey: 'playtime',
    bgPattern: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.1) 0%, transparent 50%)'
  },
  {
    id: 'rewards',
    icon: Trophy,
    mainIcon: Crown,
    color: 'from-yellow-400 via-orange-400 to-red-400',
    darkColor: 'from-yellow-500/30 via-orange-500/30 to-red-500/30',
    lightColor: 'from-yellow-100 via-orange-50 to-red-50',
    getTitle: (t: any) => t.dashboard.rewards,
    getValue: (points: number) => points.toString(),
    titleKey: 'rewards',
    bgPattern: 'radial-gradient(circle at 20% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)'
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
    setActiveCard,
    setShowCelebration,
    displayedLessons
  } = useDashboard();
  const { user } = useAuth();
  const { speakText } = useGameAudio();
  const [progressData, setProgressData] = useState<any>(null);

  // Load progress data
  useEffect(() => {
    const loadProgress = async () => {
      if (user) {
        const data = await getProgressData(user.uid);
        setProgressData(data);
      }
    };
    loadProgress();
  }, [user]);

  // Update screen time every minute
  useEffect(() => {
    if (user) {
      const interval = setInterval(async () => {
        await updateScreenTime(user.uid);
        const updatedData = await getProgressData(user.uid);
        setProgressData(updatedData);
      }, 60000); // 1 minute

      return () => clearInterval(interval);
    }
  }, [user]);

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
          const completed = progressData?.completedLessons?.length || 0;
          const total = displayedLessons?.length || 0;
          speechText = `${t.dashboard.learningProgress}: ${completed} ${t.dashboard.of} ${total}`;
          break;
        case 'playtime':
          const hours = Math.floor((progressData?.screenTimeToday || 0) / 60);
          const mins = (progressData?.screenTimeToday || 0) % 60;
          speechText = `${t.dashboard.screenTime}: ${hours} ${t.dashboard.hours} ${mins} ${t.dashboard.minutes}`;
          break;
        case 'rewards':
          speechText = `${t.dashboard.rewards}: ${progressData?.rewardPoints || 0} ${t.dashboard.points}`;
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
            bg-gradient-to-br
            ${isDarkMode ? card.darkColor : card.lightColor}
            group-hover:opacity-80
            transition-opacity
          `} />

          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-30"
            style={{ backgroundImage: card.bgPattern }}
          />

          {/* Glowing Effect */}
          <div className={`
            absolute inset-0
            bg-gradient-to-br ${card.color}
            opacity-0 group-hover:opacity-20
            transition-opacity
            blur-xl
          `} />

          {/* Content */}
          <div className="relative flex flex-col items-center justify-center h-full space-y-6">
            {/* Main Icon with Animation */}
            <div className="relative">
              <card.mainIcon className={`
                w-24 h-24
                ${isVibrant
                  ? 'text-white'  // Fallback color for Rainbow Mode
                  : isDarkMode
                    ? 'text-white'
                    : 'text-gray-900'
                }
                animate-float
                drop-shadow-lg
                ${isVibrant ? 'opacity-90' : 'opacity-100'}
              `} />
              
              {/* Secondary Icon */}
              <card.icon className={`
                absolute -bottom-2 -right-2
                w-12 h-12
                ${isVibrant
                  ? 'text-white'  // Fallback color for Rainbow Mode
                  : isDarkMode
                    ? 'text-white/75'
                    : 'text-gray-900/75'
                }
                animate-pulse
                ${isVibrant ? 'opacity-75' : 'opacity-100'}
              `} />
            </div>

            <div className="text-center space-y-2">
              <h3 className={`
                text-3xl md:text-4xl font-extrabold font-comic tracking-wide
                ${isVibrant
                  ? 'bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent'
                  : isDarkMode
                    ? 'text-white'
                    : 'text-gray-900'
                }
                transform hover:scale-110 transition-transform
                drop-shadow-lg
                leading-tight
              `}>
                {card.id === 'profile'
                  ? card.getTitle(selectedChild)
                  : card.getTitle(t)}
              </h3>

              {card.id !== 'profile' && (
                <p className={`
                  text-2xl md:text-3xl font-bold font-comic tracking-wider
                  ${isVibrant
                    ? 'bg-gradient-to-r from-white via-white to-white bg-clip-text text-transparent'
                    : isDarkMode
                      ? 'text-gray-300'
                      : 'text-gray-600'
                  }
                  transform hover:scale-110 transition-transform
                  drop-shadow
                  mt-2
                `}>
                  {card.id === 'progress'
                    ? card.getValue(progressData?.completedLessons?.length || 0, displayedLessons?.length || 0)
                    : card.id === 'playtime'
                      ? card.getValue(progressData?.screenTimeToday || 0)
                      : card.getValue(progressData?.rewardPoints || 0)}
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
                  ${isVibrant ? 'text-white' : 'text-yellow-400'}
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
