import React, { useState } from 'react';
import { Send, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';

interface ContactPageProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

export function ContactPage({ isDarkMode, isVibrant, t }: ContactPageProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowError(false);

    try {
      const response = await fetch('https://formspree.io/f/xwpvbpoe', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setShowSuccess(true);
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setShowSuccess(false), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      setShowError(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-3xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl font-bold mb-6 font-comic ${
            isVibrant
              ? 'bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 bg-clip-text text-transparent'
              : isDarkMode
                ? 'text-white'
                : 'text-gray-900'
          }`}>
            Contact the Creators! <Sparkles className="inline-block w-8 h-8 text-yellow-400 animate-spin" />
          </h1>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
            Have a question, an idea, or just want to say hi? We'd love to hear from you! Send us a message below.
          </p>
        </div>

        {/* Contact Form */}
        <div className={`
          relative p-8 rounded-3xl
          ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
          shadow-xl
          transform hover:scale-102 transition-all duration-500
        `}>
          {/* Gradient Border Effect */}
          <div className={`
            absolute inset-0 rounded-3xl -z-10 blur opacity-50
            ${isVibrant
              ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
              : isDarkMode
                ? 'bg-purple-500/30'
                : 'bg-purple-200'
            }
          `} />

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Your Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className={`
                  w-full px-4 py-3 rounded-xl
                  border-2 transition-colors duration-300
                  ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                  }
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${isVibrant ? 'focus:border-transparent' : ''}
                `}
                placeholder="Enter your name"
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Your Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className={`
                  w-full px-4 py-3 rounded-xl
                  border-2 transition-colors duration-300
                  ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                  }
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${isVibrant ? 'focus:border-transparent' : ''}
                `}
                placeholder="Enter your email"
              />
            </div>

            {/* Message Input */}
            <div>
              <label
                htmlFor="message"
                className={`block text-sm font-medium mb-2 ${
                  isDarkMode ? 'text-gray-300' : 'text-gray-700'
                }`}
              >
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                required
                value={formData.message}
                onChange={handleChange}
                rows={6}
                className={`
                  w-full px-4 py-3 rounded-xl
                  border-2 transition-colors duration-300
                  ${isDarkMode
                    ? 'bg-gray-700 border-gray-600 text-white'
                    : 'bg-white border-gray-200 text-gray-900'
                  }
                  focus:outline-none focus:ring-2 focus:ring-purple-500
                  ${isVibrant ? 'focus:border-transparent' : ''}
                  resize-none
                `}
                placeholder="Type your message here..."
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`
                w-full py-4 px-6 rounded-xl
                font-bold text-white
                transform hover:scale-105
                transition-all duration-300
                disabled:opacity-50 disabled:cursor-not-allowed
                ${isVibrant
                  ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                  : 'bg-purple-600 hover:bg-purple-700'
                }
                flex items-center justify-center gap-2
              `}
            >
              {isSubmitting ? (
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send Message
                </>
              )}
            </button>
          </form>

          {/* Success Message Overlay */}
          {showSuccess && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-3xl">
              <div className={`
                p-6 rounded-2xl
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                shadow-xl text-center
              `}>
                <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                <h3 className={`text-xl font-bold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                  Message Sent!
                </h3>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Thank you for reaching out. We'll get back to you soon!
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {showError && (
            <div className="mt-4 p-4 rounded-xl bg-red-100 text-red-700 flex items-center gap-2">
              <AlertCircle className="w-5 h-5" />
              <span>Oops! Something went wrong. Please try again later.</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}