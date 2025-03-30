import React, { useState } from 'react';
import { GameList } from './GameList';
import { GameSelection } from './GameSelection';
import { mainGames, additionalGames } from './GameData';

interface GamesPageProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
  language: string;
}

export function GamesPage({ isDarkMode, isVibrant, t, language }: GamesPageProps) {
  const [activeGame, setActiveGame] = useState<string | null>(null);

  // Set up event listener for navigation
  React.useEffect(() => {
    const handleNavigationEvent = (event: Event) => {
      const customEvent = event as CustomEvent;
      if (customEvent.detail?.page === 'games') {
        setActiveGame(null);
      }
    };

    window.addEventListener('navigateTo', handleNavigationEvent);
    return () => window.removeEventListener('navigateTo', handleNavigationEvent);
  }, []);

  // Handle game selection with origin tracking
  const handleGameSelect = (gameId: string) => {
    // Store the origin before starting the game
    sessionStorage.setItem('toyGameOrigin', 'games');
    setActiveGame(gameId);
  };

  if (activeGame) {
    return (
      <GameSelection
        activeGame={activeGame}
        isDarkMode={isDarkMode}
        isVibrant={isVibrant}
        language={language}
        onExit={() => setActiveGame(null)}
      />
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        <GameList
          mainGames={mainGames}
          additionalGames={additionalGames}
          isDarkMode={isDarkMode}
          isVibrant={isVibrant}
          t={t}
          onGameSelect={handleGameSelect}
        />
      </div>
    </div>
  );
}