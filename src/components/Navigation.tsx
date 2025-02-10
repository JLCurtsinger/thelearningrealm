import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import {
  Sun,
  Moon,
  Rainbow,
  Gamepad2,
  Video,
  Leaf,
  UserCircle,
  Map,
  Menu,
  X,
  UserPlus,
  LogOut,
  Sparkles
} from 'lucide-react';

interface NavIconProps {
  icon: React.ReactNode;
  tooltip: string;
  onClick?: () => void;
}

function NavIcon({ icon, tooltip, onClick }: NavIconProps) {
  return (
    <button
      onClick={onClick}
      className="group relative p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
      title={tooltip}
    >
      <div className="transform hover:scale-110 transition-transform">
        {icon}
      </div>
      <span className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
        {tooltip}
      </span>
    </button>
  );
}

interface MobileNavButtonProps {
  icon: React.ReactNode;
  text: string;
  onClick?: () => void;
  isDarkMode: boolean;
}

function MobileNavButton({ icon, text, onClick, isDarkMode }: MobileNavButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`
        w-full flex items-center px-3 py-2 rounded-lg
        text-base font-medium
        ${isDarkMode
          ? 'text-gray-300 hover:bg-gray-700 hover:text-white'
          : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }
        transition-colors duration-200
      `}
    >
      {icon}
      <span className="ml-3">{text}</span>
    </button>
  );
}

interface NavigationProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  language: string;
  t: any;
  showAuthModal: boolean;
  onToggleVibrant: () => void;
  onToggleLanguage: () => void;
  onToggleDarkMode: () => void;
  onShowAuthModal: () => void;
  onNavigate: (page: string) => void;
}

export function Navigation({
  isDarkMode,
  isVibrant,
  language,
  t,
  showAuthModal,
  onToggleVibrant,
  onToggleLanguage,
  onToggleDarkMode,
  onShowAuthModal,
  onNavigate
}: NavigationProps) {
  const { user, signOut } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle navigation with menu close
  const handleNavigation = (page: string) => {
    onNavigate(page);
    setIsMobileMenuOpen(false);
  };

  const getGradientClasses = (defaultColor: string = 'text-gray-900') => {
    if (isVibrant) {
      return 'bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent';
    }
    return isDarkMode ? 'text-white' : defaultColor;
  };

  const getIconColor = (rainbowColor: string) => {
    if (isVibrant) return rainbowColor;
    return isDarkMode ? 'text-white' : 'text-gray-900';
  };

  const UserProfileButton = () => (
    <div className="flex items-center space-x-2">
      <div className={`
        w-8 h-8 rounded-full
        flex items-center justify-center
        ${isVibrant
          ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
          : 'bg-purple-600'
        }
        text-white font-bold
      `}>
        {user?.displayName?.[0]?.toUpperCase() || user?.email?.[0]?.toUpperCase() || 'U'}
      </div>
      <div className="hidden sm:block">
        <div className={`text-sm font-medium ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {user?.displayName || user?.email?.split('@')[0]}
        </div>
      </div>
    </div>
  );

  return (
    <nav className={`fixed w-full shadow-lg z-50 ${
      isDarkMode 
        ? 'bg-gray-900/70 backdrop-blur-md' 
        : isVibrant
          ? 'bg-white/70 backdrop-blur-md'
          : 'bg-white'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex-shrink-0 flex items-center">
            <h1 
              onClick={() => handleNavigation('home')}
              className={`
                text-2xl md:text-3xl font-extrabold font-comic
                ${getGradientClasses('text-gray-900')}
                transform hover:scale-105 transition-transform cursor-pointer
                flex items-center gap-2
              `}
            >
              {t.title}
              <Sparkles className={`
                w-6 h-6
                ${isVibrant
                  ? 'text-yellow-400'
                  : isDarkMode
                    ? 'text-yellow-400'
                    : 'text-yellow-500'
                }
                animate-pulse
              `} />
            </h1>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <NavIcon 
              icon={<Gamepad2 className={getIconColor("text-blue-500")} />} 
              tooltip={t.gamesAndPuzzles}
              onClick={() => handleNavigation('games')}
            />
            <NavIcon 
              icon={<Video className={getIconColor("text-purple-500")} />} 
              tooltip={t.videos}
              onClick={() => handleNavigation('videos')}
            />
            <NavIcon 
              icon={<Leaf className={getIconColor("text-green-500")} />} 
              tooltip={t.takeABreak}
              onClick={() => handleNavigation('break')}
            />
            <NavIcon 
              icon={<UserCircle className={getIconColor("text-orange-500")} />} 
              tooltip={t.parentDashboard}
              onClick={() => handleNavigation('dashboard')}
            />
            <NavIcon 
              icon={<Map className={getIconColor("text-pink-500")} />} 
              tooltip={t.learningPath}
              onClick={() => handleNavigation('learning')}
            />
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden sm:flex items-center space-x-4">
              <button
                onClick={onToggleVibrant}
                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  isVibrant ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
                title={t.toggleColorMode}
              >
                <Rainbow className={`w-5 h-5 ${isVibrant ? 'text-purple-500' : isDarkMode ? 'text-white' : 'text-gray-900'}`} />
              </button>
              
              <button
                onClick={onToggleLanguage}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold"
                title={t.switchLanguage}
              >
                <span className={getGradientClasses('text-gray-900')}>
                  {language === 'en' ? 'ES' : 'EN'}
                </span>
              </button>

              <button
                onClick={onToggleDarkMode}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                title={t.toggleDarkMode}
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className={`w-5 h-5 ${isVibrant ? 'text-purple-600' : 'text-gray-900'} hover:text-purple-600 transition-colors`} />
                )}
              </button>

              {!user ? (
                <button
                  onClick={onShowAuthModal}
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              ) : (
                <div className="flex items-center space-x-4">
                  <UserProfileButton />
                  <button
                    onClick={signOut}
                    className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            >
              {isMobileMenuOpen ? (
                <X className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`} />
              )}
            </button>
          </div>
        </div>

        <div className={`
          md:hidden
          transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}
          overflow-hidden
        `}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {user && (
              <div className="px-3 py-2 mb-4">
                <UserProfileButton />
              </div>
            )}

            <MobileNavButton
              icon={<Gamepad2 className="w-5 h-5" />}
              text={t.gamesAndPuzzles}
              onClick={() => handleNavigation('games')}
              isDarkMode={isDarkMode}
            />
            <MobileNavButton
              icon={<Video className="w-5 h-5" />}
              text={t.videos}
              onClick={() => handleNavigation('videos')}
              isDarkMode={isDarkMode}
            />
            <MobileNavButton
              icon={<Leaf className="w-5 h-5" />}
              text={t.takeABreak}
              onClick={() => handleNavigation('break')}
              isDarkMode={isDarkMode}
            />
            <MobileNavButton
              icon={<UserCircle className="w-5 h-5" />}
              text={t.parentDashboard}
              onClick={() => handleNavigation('dashboard')}
              isDarkMode={isDarkMode}
            />
            <MobileNavButton
              icon={<Map className="w-5 h-5" />}
              text={t.learningPath}
              onClick={() => handleNavigation('learning')}
              isDarkMode={isDarkMode}
            />

            <div className="flex items-center justify-around py-4 border-t border-gray-200 dark:border-gray-700">
              <button
                onClick={() => {
                  onToggleVibrant();
                  setIsMobileMenuOpen(false);
                }}
                className={`p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ${
                  isVibrant ? 'bg-gray-100 dark:bg-gray-800' : ''
                }`}
              >
                <Rainbow className={`w-5 h-5 ${isVibrant ? 'text-purple-500' : isDarkMode ? 'text-white' : 'text-gray-900'}`} />
              </button>
              
              <button
                onClick={() => {
                  onToggleLanguage();
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-bold"
              >
                <span className={getGradientClasses('text-gray-900')}>
                  {language === 'en' ? 'ES' : 'EN'}
                </span>
              </button>

              <button
                onClick={() => {
                  onToggleDarkMode();
                  setIsMobileMenuOpen(false);
                }}
                className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                {isDarkMode ? (
                  <Sun className="w-5 h-5 text-yellow-400" />
                ) : (
                  <Moon className={`w-5 h-5 ${isVibrant ? 'text-purple-600' : 'text-gray-900'}`} />
                )}
              </button>
            </div>

            <div className="px-3 py-2 border-t border-gray-200 dark:border-gray-700">
              {!user ? (
                <button
                  onClick={() => {
                    onShowAuthModal();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700"
                >
                  <UserPlus className="w-5 h-5" />
                  <span>Sign In</span>
                </button>
              ) : (
                <button
                  onClick={() => {
                    signOut();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg text-gray-600 hover:text-gray-900"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Sign Out</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}