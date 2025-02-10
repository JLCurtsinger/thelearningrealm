import { useState, useEffect } from 'react';

export function useLanguage() {
  const [language, setLanguage] = useState(() => {
    const saved = localStorage.getItem('language');
    return saved || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  return [language, setLanguage] as const;
}

export function useRainbowMode() {
  const [isVibrant, setIsVibrant] = useState(() => {
    const saved = localStorage.getItem('rainbowMode');
    return saved ? JSON.parse(saved) : true;
  });

  useEffect(() => {
    localStorage.setItem('rainbowMode', JSON.stringify(isVibrant));
  }, [isVibrant]);

  return [isVibrant, setIsVibrant] as const;
}

export function useNavigationScroll(activeView: string) {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, [activeView]);
}