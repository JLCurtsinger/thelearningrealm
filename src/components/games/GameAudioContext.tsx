import React, { createContext, useContext, useState, useEffect } from 'react';
import { playSound, speak } from '../../utils/audioManager';

interface GameAudioContextType {
  soundEnabled: boolean;
  toggleSound: () => void;
  playGameSound: (type: 'success' | 'error' | 'click', volume?: number) => void;
  speakText: (text: string, lang: string) => void;
  isSpeaking: boolean;
}

const GameAudioContext = createContext<GameAudioContextType>({
  soundEnabled: true,
  toggleSound: () => {},
  playGameSound: () => {},
  speakText: () => {},
  isSpeaking: false
});

export function GameAudioProvider({ children }: { children: React.ReactNode }) {
  const [soundEnabled, setSoundEnabled] = useState(() => {
    const saved = localStorage.getItem('soundEnabled');
    return saved ? JSON.parse(saved) : true;
  });
  const [isSpeaking, setIsSpeaking] = useState(false);

  useEffect(() => {
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));
  }, [soundEnabled]);

  const toggleSound = () => setSoundEnabled(!soundEnabled);

  const playGameSound = (type: 'success' | 'error' | 'click', volume = 0.3) => {
    if (!soundEnabled) return;
    playSound(type, volume);
  };

  const speakText = (text: string, lang: string) => {
    if (!soundEnabled) return;
    
    // Allow new speech even if currently speaking
    speak(text, lang, () => setIsSpeaking(false));
    setIsSpeaking(true);
  };

  return (
    <GameAudioContext.Provider value={{ 
      soundEnabled, 
      toggleSound, 
      playGameSound, 
      speakText,
      isSpeaking 
    }}>
      {children}
    </GameAudioContext.Provider>
  );
}

export const useGameAudio = () => {
  const context = useContext(GameAudioContext);
  if (!context) {
    throw new Error('useGameAudio must be used within a GameAudioProvider');
  }
  return context;
};