import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile
} from 'firebase/auth';
import { auth } from '../../lib/firebase';
import { X, Mail, LogIn, UserPlus } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  isDarkMode: boolean;
  isVibrant: boolean;
}

export function AuthModal({ isOpen, onClose, isDarkMode, isVibrant }: AuthModalProps) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      if (isSignUp) {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        if (name && userCredential.user) {
          await updateProfile(userCredential.user, { displayName: name });
        }
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onClose();
    } catch (err: any) {
      let errorMessage = 'An error occurred. Please try again.';
      
      switch (err.code) {
        case 'auth/email-already-in-use':
          errorMessage = 'This email is already registered. Please sign in instead.';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Please enter a valid email address.';
          break;
        case 'auth/weak-password':
          errorMessage = 'Password should be at least 6 characters long.';
          break;
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          errorMessage = 'Invalid email or password.';
          break;
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleAuth = async () => {
    setIsLoading(true);
    setError('');

    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      onClose();
    } catch (err: any) {
      setError('Failed to sign in with Google. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className={`
        relative w-full max-w-md p-8 rounded-3xl
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
        shadow-xl
      `}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Title */}
        <h2 className={`
          text-2xl font-bold mb-6 text-center
          ${isDarkMode ? 'text-white' : 'text-gray-900'}
        `}>
          {isSignUp ? 'Create Account' : 'Sign In'}
        </h2>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Email Form */}
        <form onSubmit={handleEmailAuth} className="space-y-4 mb-6">
          {isSignUp && (
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className={`
                w-full px-4 py-3 rounded-xl
                border-2 transition-colors
                ${isDarkMode
                  ? 'bg-gray-700 border-gray-600 text-white'
                  : 'bg-white border-gray-200 text-gray-900'
                }
                focus:outline-none focus:ring-2 focus:ring-purple-500
              `}
            />
          )}
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className={`
              w-full px-4 py-3 rounded-xl
              border-2 transition-colors
              ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-200 text-gray-900'
              }
              focus:outline-none focus:ring-2 focus:ring-purple-500
            `}
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength={6}
            className={`
              w-full px-4 py-3 rounded-xl
              border-2 transition-colors
              ${isDarkMode
                ? 'bg-gray-700 border-gray-600 text-white'
                : 'bg-white border-gray-200 text-gray-900'
              }
              focus:outline-none focus:ring-2 focus:ring-purple-500
            `}
          />
          <button
            type="submit"
            disabled={isLoading}
            className={`
              w-full py-3 rounded-xl
              flex items-center justify-center gap-2
              font-bold text-white
              ${isVibrant
                ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                : 'bg-purple-600 hover:bg-purple-700'
              }
              disabled:opacity-50
            `}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                {isSignUp ? <UserPlus className="w-5 h-5" /> : <LogIn className="w-5 h-5" />}
                {isSignUp ? 'Create Account' : 'Sign In'}
              </>
            )}
          </button>
        </form>

        {/* Google Auth */}
        <button
          onClick={handleGoogleAuth}
          disabled={isLoading}
          className={`
            w-full py-3 rounded-xl
            flex items-center justify-center gap-2
            font-bold
            ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-gray-100 text-gray-900'}
            hover:opacity-90
            disabled:opacity-50
          `}
        >
          <Mail className="w-5 h-5" />
          Continue with Google
        </button>

        {/* Toggle Sign In/Up */}
        <button
          onClick={() => setIsSignUp(!isSignUp)}
          className={`
            mt-4 w-full text-sm
            ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}
            hover:underline
          `}
        >
          {isSignUp
            ? 'Already have an account? Sign in'
            : "Don't have an account? Create one"}
        </button>
      </div>
    </div>
  );
}