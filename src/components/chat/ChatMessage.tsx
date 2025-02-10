import React from 'react';
import { Bot, User } from 'lucide-react';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  isDarkMode: boolean;
  isVibrant: boolean;
}

export function ChatMessage({ message, isBot, isDarkMode, isVibrant }: ChatMessageProps) {
  return (
    <div className={`
      flex items-start gap-4 p-4 rounded-xl
      ${isBot
        ? isDarkMode
          ? 'bg-gray-800'
          : 'bg-gray-100'
        : 'bg-transparent'
      }
    `}>
      <div className={`
        flex-shrink-0 w-8 h-8 rounded-full
        flex items-center justify-center
        ${isBot
          ? isVibrant
            ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
            : 'bg-purple-600'
          : isDarkMode
            ? 'bg-gray-700'
            : 'bg-gray-200'
        }
      `}>
        {isBot ? (
          <Bot className="w-5 h-5 text-white" />
        ) : (
          <User className="w-5 h-5 text-gray-600" />
        )}
      </div>
      
      <div className={`
        flex-1
        ${isDarkMode ? 'text-white' : 'text-gray-900'}
      `}>
        {message}
      </div>
    </div>
  );
}