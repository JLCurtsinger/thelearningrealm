import React, { useState, useEffect } from 'react';
import { AuthModal } from "./components/auth/AuthModal";
import { AuthProvider } from "./contexts/AuthContext";
import { GameAudioProvider } from './components/games/GameAudioContext';
import { translations } from './translations';
import { Dashboard } from './components/Dashboard';
import { LearningPath } from './components/LearningPath';
import { VideoPage } from './components/VideoPage';
import { GamesPage } from './components/GamesPage';
import { BreakPage } from './components/BreakPage';
import { ContactPage } from './components/ContactPage';
import { TermsPage } from './components/TermsPage';
import { Navigation } from './components/Navigation';
import { useLanguage, useRainbowMode, useNavigationScroll } from './hooks/useGlobalState';
import {
  navigateToBreakPage,
  navigateToLearningPath,
  navigateToVideoPage,
  navigateToGamesPage,
  navigateToHome,
  navigateToDashboard,
  navigateToContact,
  navigateToTerms
} from './utils/NavigationUtils';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [isVibrant, setIsVibrant] = useRainbowMode();
  const [language, setLanguage] = useLanguage();
  const [activeView, setActiveView] = useState('home');
  const [showDashboard, setShowDashboard] = useState(false);
  const [showLearningPath, setShowLearningPath] = useState(false);
  const [showVideoPage, setShowVideoPage] = useState(false);
  const [showGamesPage, setShowGamesPage] = useState(false);
  const [showBreakPage, setShowBreakPage] = useState(false);
  const [showContactPage, setShowContactPage] = useState(false);
  const [showTermsPage, setShowTermsPage] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authReturnTo, setAuthReturnTo] = useState<string | null>(null);

  const t = translations[language as keyof typeof translations] || translations.en;

  useNavigationScroll(activeView);

  // Debug useEffect to log showBreakPage state changes
  useEffect(() => {
    console.log("Updated showBreakPage state:", showBreakPage);
  }, [showBreakPage]);

  useEffect(() => {
    const handleShowAuthModal = (event: CustomEvent) => {
      setShowAuthModal(true);
      if (event.detail?.returnTo) {
        setAuthReturnTo(event.detail.returnTo);
      }
    };

    window.addEventListener('showAuthModal', handleShowAuthModal as EventListener);
    return () => {
      window.removeEventListener('showAuthModal', handleShowAuthModal as EventListener);
    };
  }, []);

  const resetAllPages = () => {
    setShowDashboard(false);
    setShowLearningPath(false);
    setShowVideoPage(false);
    setShowGamesPage(false);
    setShowBreakPage(false);
    setShowContactPage(false);
    setShowTermsPage(false);
  };

  const handleNavigation = (page: string) => {
    console.log('Navigating to:', page); // Add logging
    console.log('Current state before change:', {
      showBreakPage,
      showDashboard,
      showLearningPath,
      showVideoPage,
      showGamesPage,
      showContactPage,
      showTermsPage
    });
    switch (page) {
      case 'dashboard':
        navigateToDashboard(resetAllPages, setActiveView, setShowDashboard);
        break;
      case 'break':
        setTimeout(() => {
          navigateToBreakPage(resetAllPages, setActiveView, setShowBreakPage);
        }, 10);
        break;
      case 'learning':
        navigateToLearningPath(resetAllPages, setActiveView, setShowLearningPath);
        break;
      case 'videos':
        navigateToVideoPage(resetAllPages, setActiveView, setShowVideoPage);
        break;
      case 'games':
        navigateToGamesPage(resetAllPages, setActiveView, setShowGamesPage);
        break;
      case 'home':
        navigateToHome(resetAllPages, setActiveView);
        break;
      case 'contact':
        navigateToContact(resetAllPages, setActiveView, setShowContactPage);
        break;
      case 'terms':
        navigateToTerms(resetAllPages, setActiveView, setShowTermsPage);
        break;
    }
    console.log('Current state after change:', {
      showBreakPage,
      showDashboard,
      showLearningPath,
      showVideoPage,
      showGamesPage,
      showContactPage,
      showTermsPage
    });
  };

  const handleAuthModalClose = () => {
    setShowAuthModal(false);
    if (authReturnTo) {
      handleNavigation(authReturnTo);
      setAuthReturnTo(null);
    }
  };

  return (
    <AuthProvider>
      <GameAudioProvider>
        <div className={`min-h-screen transition-all duration-150 ${isDarkMode ? 'dark bg-gray-900' : 'bg-gradient-to-br from-blue-100 via-purple-50 to-pink-100'}`}>
          <Navigation
            isDarkMode={isDarkMode}
            isVibrant={isVibrant}
            language={language}
            t={t}
            showAuthModal={showAuthModal}
            onToggleVibrant={() => setIsVibrant(!isVibrant)}
            onToggleLanguage={() => {
              const root = document.documentElement;
              root.style.opacity = '0';
              setTimeout(() => {
                setLanguage(language === 'en' ? 'es' : 'en');
                root.style.opacity = '1';
              }, 150);
            }}
            onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
            onShowAuthModal={() => setShowAuthModal(true)}
            onNavigate={handleNavigation}
          />

          {showDashboard && (
            <Dashboard
              language={language}
              isDarkMode={isDarkMode}
              isVibrant={isVibrant}
              t={t}
            />
          )}

          {showLearningPath && (
            <LearningPath
              isDarkMode={isDarkMode}
              isVibrant={isVibrant}
              t={t}
              language={language}
            />
          )}

          {showVideoPage && (
            <VideoPage
              isDarkMode={isDarkMode}
              isVibrant={isVibrant}
              t={t}
            />
          )}

          {showGamesPage && (
            <GamesPage
              isDarkMode={isDarkMode}
              isVibrant={isVibrant}
              t={t}
              language={language}
            />
          )}

          {showBreakPage && (
            <>
            {console.log("Rendering BreakPage Component")}
            <BreakPage 
              isDarkMode={isDarkMode} 
              isVibrant={isVibrant} t={t} />
            </>
          )}

          {showContactPage && (
            <ContactPage
              isDarkMode={isDarkMode}
              isVibrant={isVibrant}
              t={t}
            />
          )}

          {showTermsPage && (
            <TermsPage
              isDarkMode={isDarkMode}
              isVibrant={isVibrant}
              t={t}
            />
          )}

          {!showDashboard && !showLearningPath && !showVideoPage && !showGamesPage && !showBreakPage && !showContactPage && !showTermsPage && (
            <>
              <main className="pt-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center">
                    <div 
                      onClick={() => handleNavigation('learning')}
                      className="relative w-48 sm:w-64 h-48 sm:h-64 mb-8 group cursor-pointer transform transition-all duration-300 hover:scale-105"
                      role="button"
                      aria-label={t.learningPath}
                      tabIndex={0}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          handleNavigation('learning');
                        }
                      }}
                    >
                      <div className={`absolute inset-0 rounded-full blur-xl opacity-50 group-hover:opacity-75 transition-opacity ${
                        isVibrant ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400' : 'bg-blue-200'
                      } animate-pulse`}></div>
                      
                      <div className="relative w-full h-full">
                        <img
                          src="https://api.dicebear.com/7.x/bottts/svg?seed=happy&backgroundColor=transparent&eyes=happy&mouth=smile"
                          alt={t.mascotAlt}
                          className="w-full h-full object-contain rounded-full shadow-2xl border-4 border-white dark:border-gray-800"
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            target.onerror = null;
                            target.src = "https://api.dicebear.com/7.x/bottts/svg?seed=fallback";
                          }}
                        />
                        <div className="absolute top-1/4 right-1/4 w-1/3 h-1/3">
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="w-full h-full text-purple-500 animate-wave"
                          >
                            <path d="M7 11L12 6L17 11" />
                            <path d="M12 6V18" />
                          </svg>
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 rounded-full ring-4 ring-transparent hover:ring-purple-400 transition-all duration-300"></div>
                    </div>

                    <div className="relative mb-6">
                      <h2 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-6 animate-float">
                        <span className={`inline-block transform hover:scale-105 transition-transform curved-text ${
                          isVibrant 
                            ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent' 
                            : isDarkMode
                              ? 'text-white'
                              : 'text-gray-900'
                        }`}>
                          {t.tagline}
                        </span>
                      </h2>
                    </div>
                    
                    <p className={`text-lg sm:text-xl md:text-2xl mb-12 font-comic animate-float animation-delay-2000 ${
                      isVibrant 
                        ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent'
                        : isDarkMode
                          ? 'text-white'
                          : 'text-gray-900'
                    }`}>
                      {t.subTagline}
                    </p>

                    <button 
                      onClick={() => handleNavigation('learning')}
                      className={`group relative inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-base sm:text-lg font-bold text-white transition-all duration-300 ${
                        isVibrant 
                          ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                          : 'bg-purple-600 hover:bg-purple-700'
                      } rounded-full shadow-lg hover:transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 animate-float animation-delay-4000`}
                    >
                      <span className="relative z-10 font-comic tracking-wider">{t.letsPlay}</span>
                      <div className={`absolute -inset-1 rounded-full blur ${
                        isVibrant 
                          ? 'bg-gradient-to-r from-purple-400 via-pink-400 to-red-400'
                          : 'bg-purple-400'
                      } opacity-70 group-hover:opacity-100 transition-opacity animate-glow`}></div>
                    </button>
                  </div>
                </div>
              </main>

              <footer className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md py-6 sm:py-8">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                    <button
                      onClick={() => handleNavigation('terms')}
                      className={`${
                        isVibrant 
                          ? 'text-gray-700 dark:text-gray-300 hover:text-purple-500' 
                          : 'text-gray-900 dark:text-gray-300 hover:text-purple-500'
                      } transition-colors`}
                    >
                      {t.terms}
                    </button>
                    <button
                      onClick={() => handleNavigation('contact')}
                      className={`${
                        isVibrant 
                          ? 'text-gray-700 dark:text-gray-300 hover:text-pink-500' 
                          : 'text-gray-900 dark:text-gray-300 hover:text-purple-500'
                      } transition-colors`}
                    >
                      {t.contact}
                    </button>
                    <a href="#" className={`${
                      isVibrant 
                        ? 'text-gray-700 dark:text-gray-300 hover:text-blue-500' 
                        : 'text-gray-900 dark:text-gray-300 hover:text-purple-500'
                    } transition-colors`}>{t.help}</a>
                  </div>
                </div>
              </footer>
            </>
          )}

          {showAuthModal && (
            <AuthModal
              isOpen={showAuthModal}
              onClose={handleAuthModalClose}
              isDarkMode={isDarkMode}
              isVibrant={isVibrant}
            />
          )}
        </div>
      </GameAudioProvider>
    </AuthProvider>
  );
}

export default App;