import { GamepadIcon, Music, Cloud, Palette, Calculator, Shapes, Smile, MessageCircle, Shirt, ToyBrick, Gamepad2, Clover, Waves } from 'lucide-react';

export interface GameData {
  id: string;
  title: string;
  description: string;
  icon: any; // Lucide icon component
  color: string;
  darkColor: string;
  lightColor: string;
  component: string;
}

export const mainGames: GameData[] = [
  {
    id: 'lettermatching',
    title: 'Letter Matching',
    description: 'Match letters with pictures',
    icon: GamepadIcon,
    color: "from-blue-400 via-purple-400 to-pink-400",
    darkColor: "from-blue-500/30 via-purple-500/30 to-pink-500/30",
    lightColor: "from-blue-100 via-purple-50 to-pink-50",
    component: "LetterMatchingGame"
  },
  {
    id: 'phonics',
    title: 'Phonics Sound Match',
    description: 'Match sounds to letters',
    icon: Music,
    color: "from-green-400 via-emerald-400 to-teal-400",
    darkColor: "from-green-500/30 via-emerald-500/30 to-teal-500/30",
    lightColor: "from-green-100 via-emerald-50 to-teal-50",
    component: "PhoneticSoundGame"
  },
  {
    id: 'wordbuilder',
    title: 'Word Builder',
    description: 'Build simple words',
    icon: Palette,
    color: "from-yellow-400 via-orange-400 to-red-400",
    darkColor: "from-yellow-500/30 via-orange-500/30 to-red-500/30",
    lightColor: "from-yellow-100 via-orange-50 to-red-50",
    component: "WordBuilderGame"
  },
  {
    id: 'findletter',
    title: 'Find the Letter',
    description: 'Spot hidden letters',
    icon: Cloud,
    color: "from-purple-400 via-indigo-400 to-blue-400",
    darkColor: "from-purple-500/30 via-indigo-500/30 to-blue-500/30",
    lightColor: "from-purple-100 via-indigo-50 to-blue-50",
    component: "FindLetterGame"
  },
  {
    id: 'bubblepop',
    title: '🫧 Bubble Pop Counting',
    description: 'Pop bubbles in numerical order',
    icon: Waves,
    color: "from-cyan-400 via-blue-400 to-indigo-400",
    darkColor: "from-cyan-500/30 via-blue-500/30 to-indigo-500/30",
    lightColor: "from-cyan-100 via-blue-50 to-indigo-50",
    component: "BubblePopGame"
  }
];

export const additionalGames: GameData[] = [
  {
    id: 'counting',
    title: 'Counting Adventure',
    description: 'Learn to count objects',
    icon: Calculator,
    color: "from-blue-400 via-indigo-400 to-violet-400",
    darkColor: "from-blue-500/30 via-indigo-500/30 to-violet-500/30",
    lightColor: "from-blue-100 via-indigo-50 to-violet-50",
    component: "CountingGame"
  },
  {
    id: 'shapesorter',
    title: 'Shape Sorter',
    description: 'Sort and identify shapes',
    icon: Shapes,
    color: "from-green-400 via-teal-400 to-cyan-400",
    darkColor: "from-green-500/30 via-teal-500/30 to-cyan-500/30",
    lightColor: "from-green-100 via-teal-50 to-cyan-50",
    component: "ShapeSorterGame"
  },
  {
    id: 'emotionmatch',
    title: 'Emotion Match',
    description: 'Match emotions with expressions',
    icon: Smile,
    color: "from-yellow-400 via-amber-400 to-orange-400",
    darkColor: "from-yellow-500/30 via-amber-500/30 to-orange-500/30",
    lightColor: "from-yellow-100 via-amber-50 to-orange-50",
    component: "EmotionMatchGame"
  },
  {
    id: 'chatwithgpt',
    title: 'Chat with Animals',
    description: 'Learn animal names and sounds',
    icon: MessageCircle,
    color: "from-purple-400 via-fuchsia-400 to-pink-400",
    darkColor: "from-purple-500/30 via-fuchsia-500/30 to-pink-500/30",
    lightColor: "from-purple-100 via-fuchsia-50 to-pink-50",
    component: "ChatWithGPTGame"
  },
  {
    id: 'whatamiwearing',
    title: 'What am I Wearing?',
    description: 'Learn clothing items and colors',
    icon: Shirt,
    color: "from-red-400 via-rose-400 to-pink-400",
    darkColor: "from-red-500/30 via-rose-500/30 to-pink-500/30",
    lightColor: "from-red-100 via-rose-50 to-pink-50",
    component: "WhatAmIWearingGame"
  },
  {
    id: 'wheresmytoy',
    title: "Where's My Toy?",
    description: 'Find hidden toys',
    icon: ToyBrick,
    color: "from-cyan-400 via-sky-400 to-blue-400",
    darkColor: "from-cyan-500/30 via-sky-500/30 to-blue-500/30",
    lightColor: "from-cyan-100 via-sky-50 to-blue-50",
    component: "WheresMyToyGame"
  },
  {
    id: 'icandoitall',
    title: 'I Can Do It All!',
    description: 'Practice all actions',
    icon: Gamepad2,
    color: "from-emerald-400 via-green-400 to-lime-400",
    darkColor: "from-emerald-500/30 via-green-500/30 to-lime-500/30",
    lightColor: "from-emerald-100 via-green-50 to-lime-50",
    component: "ICanDoItAllGame"
  },
  {
    id: 'icanmove',
    title: 'I Can Move!',
    description: 'Learn about movements',
    icon: Clover,
    color: "from-violet-400 via-purple-400 to-fuchsia-400",
    darkColor: "from-violet-500/30 via-purple-500/30 to-fuchsia-500/30",
    lightColor: "from-violet-100 via-purple-50 to-fuchsia-50",
    component: "ICanMoveGame"
  }
];