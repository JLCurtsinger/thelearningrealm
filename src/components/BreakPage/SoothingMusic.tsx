import React, { useState, useEffect, useRef } from 'react';
import { Music, Volume2, Play, Pause } from 'lucide-react';
import { useGameAudio } from '../games/GameAudioContext';

interface SoothingMusicProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

// Audio tracks configuration with preload
const audioTracks = [
  {
    name: 'Ocean Waves',
    url: 'https://assets.mixkit.co/music/preview/mixkit-ocean-waves-loop-1196.mp3'
  },
  {
    name: 'Forest Birds',
    url: 'https://assets.mixkit.co/music/preview/mixkit-forest-birds-loop-1242.mp3'
  },
  {
    name: 'Gentle Rain',
    url: 'https://assets.mixkit.co/music/preview/mixkit-rain-and-thunder-loop-1248.mp3'
  }
];

export function SoothingMusic({ isDarkMode, isVibrant, t }: SoothingMusicProps) {
  const { soundEnabled } = useGameAudio();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Initialize audio element
  useEffect(() => {
    const audio = new Audio();
    audio.volume = volume;
    
    // Set up event listeners
    audio.addEventListener('canplaythrough', () => {
      setIsLoading(false);
      if (isPlaying) {
        audio.play().catch(handlePlayError);
      }
    });

    audio.addEventListener('ended', () => {
      setCurrentTrack((prev) => (prev + 1) % audioTracks.length);
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio error:', e);
      handlePlayError(new Error('Failed to load audio'));
    });

    audioRef.current = audio;

    // Cleanup
    return () => {
      audio.pause();
      audio.src = '';
      audio.remove();
    };
  }, []);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Handle track changes
  useEffect(() => {
    if (audioRef.current) {
      loadTrack();
    }
  }, [currentTrack]);

  const handlePlayError = (error: Error) => {
    console.error('Playback error:', error);
    setIsPlaying(false);
    setIsLoading(false);
    setError('Unable to play audio. Please try again.');

    // Clear error after 3 seconds
    setTimeout(() => setError(null), 3000);
  };

  const loadTrack = async () => {
    if (!audioRef.current) return;

    try {
      setIsLoading(true);
      setError(null);
      
      // Set new source
      audioRef.current.src = audioTracks[currentTrack].url;
      
      // Load the audio
      await audioRef.current.load();
      
      // If we were playing, continue playing the new track
      if (isPlaying) {
        try {
          await audioRef.current.play();
        } catch (error) {
          handlePlayError(error as Error);
        }
      }
    } catch (error) {
      handlePlayError(error as Error);
    }
  };

  const togglePlayback = async () => {
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setError(null);
        
        // If no source is set, load the current track
        if (!audioRef.current.src) {
          audioRef.current.src = audioTracks[currentTrack].url;
          await audioRef.current.load();
        }
        
        await audioRef.current.play();
        setIsPlaying(true);
      }
    } catch (error) {
      handlePlayError(error as Error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <div className={`
        w-48 h-48 rounded-full
        flex items-center justify-center
        ${isVibrant
          ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
          : isDarkMode
            ? 'bg-gray-800'
            : 'bg-white'
        }
        shadow-xl
        transform hover:scale-105 transition-all duration-300
        cursor-pointer
        group
        relative
      `}>
        <button
          onClick={togglePlayback}
          disabled={isLoading}
          className="w-24 h-24 text-white hover:scale-110 transition-transform relative disabled:opacity-50"
        >
          {isPlaying ? <Pause className="w-full h-full" /> : <Play className="w-full h-full" />}
        </button>

        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-white border-t-transparent"></div>
          </div>
        )}
      </div>

      {/* Track info */}
      <div className="mt-6 text-center">
        <h3 className={`text-xl font-bold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
          {t.breakPage.activities.music.tracks[
            audioTracks[currentTrack].name.toLowerCase().replace(' ', '') as keyof typeof t.breakPage.activities.music.tracks
          ]}
        </h3>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mt-4 px-4 py-2 rounded-lg bg-red-100 text-red-700 text-sm">
          {error}
        </div>
      )}

      {/* Volume Control */}
      <div className="mt-6 w-64">
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
    </div>
  );
}
