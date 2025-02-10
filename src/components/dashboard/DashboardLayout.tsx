import React from 'react';
import { Flame, Star, Sparkles } from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { KidDashboard } from './KidDashboard';
import { ParentDashboard } from './ParentDashboard';
import { PlacementTestChat } from '../chat/PlacementTestChat';

interface DashboardLayoutProps {
  language: string;
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

export function DashboardLayout({ language, isDarkMode, isVibrant, t }: DashboardLayoutProps) {
  const {
    selectedChild,
    isParentMode,
    toggleParentMode,
    learningStreak,
    xpPoints,
    showPlacementTest,
    showCelebration,
    setPlacementTestResult
  } = useDashboard();

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Profile Section */}
        <div className={`rounded-2xl p-6 mb-8 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-xl transition-all duration-300`}>
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative group">
              <div className={`absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity ${
                isVibrant ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400' : 'bg-blue-200'
              }`}></div>
              <div className={`
                relative w-32 h-32 rounded-full
                flex items-center justify-center
                border-4 border-white dark:border-gray-700
                shadow-lg transform hover:scale-105
                transition-transform duration-300
                ${isVibrant
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                  : 'bg-purple-600'
                }
                text-white text-4xl font-bold
              `}>
                {selectedChild[0].toUpperCase()}
              </div>
            </div>
            <div className="flex-grow text-center md:text-left">
              <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                {selectedChild}
              </h2>
              <div className="flex flex-wrap justify-center md:justify-start gap-4">
                <div className="flex items-center gap-2">
                  <Flame className="w-5 h-5 text-orange-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {learningStreak} {t.dashboard.streak}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-5 h-5 text-yellow-500" />
                  <span className="text-gray-600 dark:text-gray-300">
                    {xpPoints} {t.dashboard.xp}
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={toggleParentMode}
                className={`px-6 py-2 rounded-full font-semibold transition-all duration-300 ${
                  isParentMode
                    ? 'bg-purple-600 text-white hover:bg-purple-700'
                    : 'bg-pink-500 text-white hover:bg-pink-600'
                }`}
              >
                {isParentMode ? t.dashboard.kidMode : t.dashboard.parentMode}
              </button>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        {isParentMode ? (
          <ParentDashboard
            isDarkMode={isDarkMode}
            isVibrant={isVibrant}
            t={t}
          />
        ) : (
          <KidDashboard
            isDarkMode={isDarkMode}
            isVibrant={isVibrant}
            language={language}
            t={t}
          />
        )}

        {/* Placement Test Modal */}
        {showPlacementTest && (
          <PlacementTestChat
            isDarkMode={isDarkMode}
            isVibrant={isVibrant}
            onComplete={setPlacementTestResult}
          />
        )}

        {/* Celebration Overlay */}
        {showCelebration && (
          <div className="fixed inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
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
  );
}