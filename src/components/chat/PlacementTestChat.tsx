import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Sparkles } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { ChatMessage } from './ChatMessage';
import { getPlacementTestResult, savePlacementTestResult, PlacementTestResult } from '../../utils/placementTestStorage';

interface PlacementTestChatProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  onComplete?: (result: PlacementTestResult) => void;
}

const INITIAL_MESSAGE = "Hi! I'm here to help find the perfect learning path for you. Let's start with a few questions to understand your needs better. What's your child's age?";

export function PlacementTestChat({ isDarkMode, isVibrant, onComplete }: PlacementTestChatProps) {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(true);
  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Questions for the placement test
  const questions = [
    "Great! Now, has your child started learning the alphabet yet?",
    "Does your child enjoy interactive games with sound and music?",
    "How comfortable is your child with using digital devices?",
    "What specific skills would you like your child to develop? (e.g., reading, vocabulary, pronunciation)",
    "Last question: How much time can your child typically focus on learning activities?"
  ];

  // Scroll to bottom whenever messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Initialize chat with welcome message
  useEffect(() => {
    if (isOpen) {
      setMessages([{ text: INITIAL_MESSAGE, isBot: true }]);
      setCurrentStep(0);
      setInput('');
    }
  }, [isOpen]);

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSendMessage = async () => {
    if (!input.trim() || !user) return;

    const userMessage = { text: input, isBot: false };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      if (currentStep < questions.length) {
        setMessages(prev => [...prev, { text: questions[currentStep], isBot: true }]);
        setCurrentStep(prev => prev + 1);
      } else {
        // Make API call to OpenAI proxy
        console.log('Making OpenAI API call...'); // Debug log
        const response = await fetch('/.netlify/functions/openaiProxy', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            prompt: INITIAL_MESSAGE,
            responses: messages.map(m => ({ text: m.text, isUser: !m.isBot }))
          })
        });

        if (!response.ok) {
          throw new Error(`API call failed with status: ${response.status}`);
        }

        const data = await response.json();
        console.log('OpenAI API response:', data); // Debug log

        if (data.error) {
          throw new Error(data.error);
        }

        // Create placement test result
        const result: PlacementTestResult = {
          userId: user.uid,
          chatResponse: data.chatResponse,
          lessons: data.lessons,
          completedAt: new Date().toISOString()
        };

        // Save result to IndexedDB
        await savePlacementTestResult(result);
        console.log('Placement test result saved:', result); // Debug log
        
        // Add completion message to chat
        setMessages(prev => [...prev, { text: data.chatResponse, isBot: true }]);
        
        // Notify parent component
        onComplete?.(result);
        
        // Close modal after a delay
        setTimeout(() => setIsOpen(false), 5000);
      }
    } catch (error) {
      console.error('Error during placement test:', error);
      setMessages(prev => [...prev, {
        text: "I'm sorry, there was an error processing your responses. Please try again later.",
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`
        relative w-full max-w-2xl rounded-2xl
        ${isDarkMode ? 'bg-gray-900' : 'bg-white'}
        shadow-2xl
        overflow-hidden
      `}>
        {/* Header */}
        <div className={`
          flex items-center justify-between
          px-6 py-4 border-b
          ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
        `}>
          <div className="flex items-center gap-3">
            <Sparkles className={`
              w-6 h-6
              ${isVibrant
                ? 'text-purple-500'
                : isDarkMode
                  ? 'text-white'
                  : 'text-gray-900'
              }
            `} />
            <h2 className={`
              text-xl font-bold
              ${isDarkMode ? 'text-white' : 'text-gray-900'}
            `}>
              Placement Test
            </h2>
          </div>
          
          <button
            onClick={() => setIsOpen(false)}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Chat Messages */}
        <div className="h-[400px] overflow-y-auto p-4 space-y-4">
          {messages.map((message, index) => (
            <ChatMessage
              key={index}
              message={message.text}
              isBot={message.isBot}
              isDarkMode={isDarkMode}
              isVibrant={isVibrant}
            />
          ))}
          
          {isLoading && (
            <div className="flex justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
            </div>
          )}
          
          {/* Invisible div for scrolling */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className={`
          p-4 border-t
          ${isDarkMode ? 'border-gray-800' : 'border-gray-200'}
        `}>
          <div className="flex gap-4">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your answer..."
              className={`
                flex-1 px-4 py-2 rounded-xl
                ${isDarkMode
                  ? 'bg-gray-800 text-white placeholder-gray-400'
                  : 'bg-gray-100 text-gray-900 placeholder-gray-500'
                }
                focus:outline-none focus:ring-2 focus:ring-purple-500
              `}
            />
            
            <button
              onClick={handleSendMessage}
              disabled={!input.trim() || isLoading}
              className={`
                p-2 rounded-xl
                ${isVibrant
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                  : 'bg-purple-600'
                }
                text-white
                disabled:opacity-50
                transition-all duration-200
                hover:scale-105
              `}
            >
              <Send className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}