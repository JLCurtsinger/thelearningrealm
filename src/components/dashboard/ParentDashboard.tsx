import React from 'react';
import {
  Star,
  Trophy,
  Target,
  Sparkles,
  BookOpen,
  Volume2,
  Bell,
  Brain,
  Users
} from 'lucide-react';
import { useDashboard } from '../../contexts/DashboardContext';
import { useAuth } from '../../contexts/AuthContext';

interface ParentDashboardProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

export function ParentDashboard({ isDarkMode, isVibrant, t }: ParentDashboardProps) {
  const {
    progressPercentage,
    xpPoints,
    nextMilestone,
    soundEnabled,
    setSoundEnabled,
    notificationsEnabled,
    setNotificationsEnabled,
    setShowPlacementTest,
    placementTestResult,
    selectedChild,
    setSelectedChild
  } = useDashboard();

  const { user } = useAuth();

  // Handle placement test button click
  const handlePlacementTestClick = () => {
    if (!user) {
      // Show auth modal if user is not signed in
      const event = new CustomEvent('showAuthModal', {
        detail: {
          message: 'Please sign in or create an account to access the placement test.',
          returnTo: 'dashboard'
        }
      });
      window.dispatchEvent(event);
      return;
    }

    // User is signed in, show placement test
    setShowPlacementTest(true);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column - Progress & Goals */}
      <div className="lg:col-span-2 space-y-8">
        {/* Progress Section */}
        <div className={`rounded-2xl p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <h3 className={`text-2xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {t.dashboard.learningProgress}
          </h3>
          <div className="space-y-6">
            {/* Progress Bar */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {t.dashboard.currentLevelProgress}
                </span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {progressPercentage}%
                </span>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    isVibrant
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                      : 'bg-purple-600'
                  } transition-all duration-300`}
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>

            {/* XP Progress */}
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {t.dashboard.xpToNextReward}
                </span>
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {xpPoints} / {nextMilestone}
                </span>
              </div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <div
                  className={`h-full ${
                    isVibrant
                      ? 'bg-gradient-to-r from-yellow-400 to-yellow-600'
                      : 'bg-yellow-500'
                  }`}
                  style={{ width: `${(xpPoints / nextMilestone) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Upcoming Lessons */}
        <div className={`rounded-2xl p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <h3 className={`text-2xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {t.dashboard.upNext}
          </h3>
          <div className="space-y-4">
            {[
              t.dashboard.lettersAdventure,
              t.dashboard.numberFun,
              t.dashboard.colorsAndShapes
            ].map((lesson, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                } hover:scale-102 transition-transform cursor-pointer`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-full ${
                    isVibrant
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500'
                      : 'bg-purple-600'
                  }`}>
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-bold ${
                      isDarkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {lesson}
                    </h4>
                    <p className={`text-sm ${
                      isDarkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      {t.dashboard.lessonDuration} • {t.dashboard.unlockRewards}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Column - Achievements & Settings */}
      <div className="space-y-8">
        {/* Achievements Section */}
        <div className={`rounded-2xl p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <h3 className={`text-2xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {t.dashboard.achievements}
          </h3>
          <div className="grid grid-cols-2 gap-4">
            {[
              { icon: Star, label: t.dashboard.superReader, color: 'text-yellow-500' },
              { icon: Trophy, label: t.dashboard.mathWizard, color: 'text-purple-500' },
              { icon: Target, label: t.dashboard.focusMaster, color: 'text-red-500' },
              { icon: Sparkles, label: t.dashboard.creativeMind, color: 'text-blue-500' },
            ].map((achievement, index) => (
              <div
                key={index}
                className={`p-4 rounded-xl ${
                  isDarkMode ? 'bg-gray-700' : 'bg-gray-50'
                } text-center`}
              >
                <achievement.icon className={`w-8 h-8 ${achievement.color} mx-auto mb-2`} />
                <span className={`text-sm font-medium ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {achievement.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Settings Panel */}
        <div className={`rounded-2xl p-6 ${
          isDarkMode ? 'bg-gray-800' : 'bg-white'
        } shadow-lg`}>
          <h3 className={`text-2xl font-bold mb-6 ${
            isDarkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {t.dashboard.settings}
          </h3>
          <div className="space-y-4">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              className={`
                w-full flex items-center justify-between p-3 rounded-xl
                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
              `}
            >
              <div className="flex items-center gap-3">
                <Volume2 className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {t.dashboard.soundEffects}
                </span>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors ${
                soundEnabled ? 'bg-green-500' : 'bg-gray-400'
              }`}>
                <div className={`w-6 h-6 rounded-full bg-white transform transition-transform ${
                  soundEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
              </div>
            </button>

            <button
              onClick={() => setNotificationsEnabled(!notificationsEnabled)}
              className={`
                w-full flex items-center justify-between p-3 rounded-xl
                hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
              `}
            >
              <div className="flex items-center gap-3">
                <Bell className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {t.dashboard.notifications}
                </span>
              </div>
              <div className={`w-12 h-6 rounded-full transition-colors ${
                notificationsEnabled ? 'bg-green-500' : 'bg-gray-400'
              }`}>
                <div className={`w-6 h-6 rounded-full bg-white transform transition-transform ${
                  notificationsEnabled ? 'translate-x-6' : 'translate-x-0'
                }`}></div>
              </div>
            </button>

            {/* Placement Test Button */}
            <button
              onClick={handlePlacementTestClick}
              className={`
                w-full flex items-center justify-between p-3 rounded-xl
                ${isVibrant
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 text-white'
                  : 'bg-purple-600 text-white'
                }
                hover:opacity-90 transition-opacity
              `}
            >
              <div className="flex items-center gap-3">
                <Brain className="w-5 h-5" />
                <span>
                  {placementTestResult ? 'Retake Placement Test' : 'Take Placement Test'}
                </span>
              </div>
              <Sparkles className="w-5 h-5 animate-pulse" />
            </button>

            <div className={`
              flex items-center justify-between p-3 rounded-xl
              hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors
            `}>
              <div className="flex items-center gap-3">
                <Users className={isDarkMode ? 'text-gray-400' : 'text-gray-600'} />
                <span className={isDarkMode ? 'text-gray-300' : 'text-gray-700'}>
                  {t.dashboard.switchChild}
                </span>
              </div>
              <select
                value={selectedChild}
                onChange={(e) => setSelectedChild(e.target.value)}
                className={`
                  bg-transparent
                  ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}
                  pr-8
                `}
              >
                <option value={selectedChild}>{selectedChild}</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}