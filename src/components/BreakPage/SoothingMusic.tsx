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
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize Web Audio API
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Create Audio Context
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      audioContextRef.current = new AudioContext();
      
      // Create Gain Node for volume control
      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.value = volume;
      gainNode.connect(audioContextRef.current.destination);
      gainNodeRef.current = gainNode;

      // Create audio element
      const audio = new Audio();
      audio.crossOrigin = "anonymous";
      audioRef.current = audio;

      return () => {
        if (audioContextRef.current?.state !== 'closed') {
          audioContextRef.current?.close();
        }
      };
    }
  }, []);

  // Handle track changes
  useEffect(() => {
    if (isPlaying && audioRef.current) {
      loadAndPlayTrack();
    }
  }, [currentTrack]);

  // Update volume
  useEffect(() => {
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = volume;
    }
  }, [volume]);

  // Load and play track
  const loadAndPlayTrack = async () => {
    if (!audioRef.current || !audioContextRef.current || !gainNodeRef.current) return;

    try {
      setIsLoading(true);
      
      // Reset audio element
      audioRef.current.src = audioTracks[currentTrack].url;
      
      // Add error handling for audio loading
      audioRef.current.onerror = (e) => {
        console.error('Error loading audio:', e);
        setIsLoading(false);
        setIsPlaying(false);
      };

      // Create media element source
      const source = audioContextRef.current.createMediaElementSource(audioRef.current);
      source.connect(gainNodeRef.current);

      // Set up event listeners
      audioRef.current.oncanplaythrough = () => {
        setIsLoading(false);
      };

      audioRef.current.onended = () => {
        setCurrentTrack((prev) => (prev + 1) % audioTracks.length);
      };

      // Start playback
      await audioRef.current.play();
      
      // Resume audio context if suspended
      if (audioContextRef.current.state === 'suspended') {
        await audioContextRef.current.resume();
      }
    } catch (error) {
      console.error('Error loading audio:', error);
      setIsLoading(false);
      setIsPlaying(false);
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
          onClick={() => {
            if (isPlaying) {
              audioRef.current?.pause();
              setIsPlaying(false);
            } else {
              loadAndPlayTrack();
              setIsPlaying(true);
            }
          }}
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