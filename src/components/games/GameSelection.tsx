import React from 'react';
import { BubblePopGame } from './BubblePopGame';
import { CountingGame } from './CountingGame';
import { LetterMatchingGame } from './LetterMatchingGame';
import { FindLetterGame } from './FindLetterGame';
import { PhoneticSoundGame } from './PhoneticSoundGame';
import { WordBuilderGame } from './WordBuilderGame';
import { ShapeSorterGame } from './ShapeSorterGame';
import { EmotionMatchGame } from './EmotionMatchGame';
import { ChatWithGPTGame } from './ChatWithGPTGame';
import { WhatAmIWearingGame } from './WhatAmIWearingGame';
import { WheresMyToyGame } from './WheresMyToyGame';
import { ICanMoveGame } from './ICanMoveGame';
import { ICanWaveGame } from './ICanWaveGame';
import { ICanJumpGame } from './ICanJumpGame';
import { ICanClapGame } from './ICanClapGame';
import { ICanStompGame } from './ICanStompGame';
import { ICanDoItAllGame } from './ICanDoItAllGame';

interface GameSelectionProps {
  activeGame: string;
  isDarkMode: boolean;
  isVibrant: boolean;
  language: string;
  onExit: () => void;
}

export function GameSelection({ activeGame, isDarkMode, isVibrant, language, onExit }: GameSelectionProps) {
  const gameComponents: { [key: string]: React.ComponentType<any> } = {
    bubblepop: BubblePopGame,
    counting: CountingGame,
    lettermatching: LetterMatchingGame,
    findletter: FindLetterGame,
    phonics: PhoneticSoundGame,
    wordbuilder: WordBuilderGame,
    shapesorter: ShapeSorterGame,
    emotionmatch: EmotionMatchGame,
    chatwithgpt: ChatWithGPTGame,
    whatamiwearing: WhatAmIWearingGame,
    wheresmytoy: WheresMyToyGame,
    icanmove: ICanMoveGame,
    icanwave: ICanWaveGame,
    icanjump: ICanJumpGame,
    icanclap: ICanClapGame,
    icanstomp: ICanStompGame,
    icandoitall: ICanDoItAllGame
  };

  const GameComponent = gameComponents[activeGame];

  if (!GameComponent) {
    return null;
  }

  return (
    <GameComponent
      isDarkMode={isDarkMode}
      isVibrant={isVibrant}
      onExit={onExit}
      language={language}
    />
  );
}