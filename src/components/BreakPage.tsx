import React, { useState, useEffect, useRef } from 'react';
import { Music, Cloud, Moon, Waves as Wave, Info, ArrowLeft, Play, Pause, Stars, Sun, Sparkles, Volume2, Palette } from 'lucide-react';

interface BreakPageProps {
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

export function BreakPage({ isDarkMode, isVibrant, t }: BreakPageProps) {
  const [activeActivity, setActiveActivity] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAnimation, setCurrentAnimation] = useState(0);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const [doodleColor, setDoodleColor] = useState('#9C27B0');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null);

  // Main activities data
  const activities = [
    {
      id: 'music',
      title: t.breakPage.activities.music.title,
      icon: Music,
      color: 'from-purple-400 via-pink-400 to-red-400',
      darkColor: 'from-purple-500/30 via-pink-500/30 to-red-500/30',
      lightColor: 'from-purple-50 via-pink-50 to-red-50'
    },
    {
      id: 'visual',
      title: t.breakPage.activities.visual.title,
      icon: Cloud,
      color: 'from-blue-400 via-cyan-400 to-teal-400',
      darkColor: 'from-blue-500/30 via-cyan-500/30 to-teal-500/30',
      lightColor: 'from-blue-50 via-cyan-50 to-teal-50'
    },
    {
      id: 'doodle',
      title: 'Relaxing Doodles',
      icon: Palette,
      color: 'from-pink-400 via-rose-400 to-red-400',
      darkColor: 'from-pink-500/30 via-rose-500/30 to-red-500/30',
      lightColor: 'from-pink-50 via-rose-50 to-red-50'
    }
  ];

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
        // Provide user feedback
        const utterance = new SpeechSynthesisUtterance('Sorry, there was a problem playing the music. Please try again.');
        window.speechSynthesis.speak(utterance);
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
      
      // Provide user feedback
      const utterance = new SpeechSynthesisUtterance('Sorry, there was a problem playing the music. Please try again.');
      window.speechSynthesis.speak(utterance);
    }
  };

  // Drawing functions
  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    setIsDrawing(true);
    setLastPoint({ x, y });
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !lastPoint || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(lastPoint.x, lastPoint.y);
    ctx.lineTo(x, y);
    ctx.strokeStyle = doodleColor;
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.stroke();

    setLastPoint({ x, y });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    setLastPoint(null);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  // Animation options for Visual Relaxation
  const animations = [
    {
      name: 'waves',
      title: t.breakPage.activities.visual.scenes.waves,
      gradient: 'from-blue-400 to-blue-600',
      elements: [
        { type: 'wave', count: 3, baseDelay: 0 },
        { type: 'cloud', count: 2, baseDelay: 2 }
      ]
    },
    {
      name: 'garden',
      title: t.breakPage.activities.visual.scenes.garden,
      gradient: 'from-green-400 to-emerald-600',
      elements: [
        { type: 'butterfly', count: 5, baseDelay: 0 },
        { type: 'flower', count: 3, baseDelay: 1 }
      ]
    },
    {
      name: 'night',
      title: t.breakPage.activities.visual.scenes.night,
      gradient: 'from-indigo-900 to-purple-900',
      elements: [
        { type: 'star', count: 20, baseDelay: 0 },
        { type: 'firefly', count: 8, baseDelay: 1 }
      ]
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Parent Info Banner */}
        <div className={`
          mb-8 p-4 rounded-xl
          ${isDarkMode ? 'bg-gray-800/50' : 'bg-white/50'}
          backdrop-blur-md
        `}>
          <div className="flex items-center gap-2 text-sm">
            <Info className="w-4 h-4" />
            <p className={isDarkMode ? 'text-gray-300' : 'text-gray-600'}>
              Taking breaks is important! These activities help your child relax and reset before their next adventure.
            </p>
          </div>
        </div>

        {activeActivity ? (
          <div className="relative min-h-[calc(100vh-12rem)]">
            <button
              onClick={() => {
                setActiveActivity(null);
                if (audioRef.current) {
                  audioRef.current.pause();
                  setIsPlaying(false);
                }
              }}
              className={`
                absolute top-4 left-4 z-10
                p-2 rounded-full
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                shadow-lg
                transition-transform hover:scale-110
              `}
            >
              <ArrowLeft className="w-6 h-6" />
            </button>

            {/* Activity Content */}
            {activeActivity === 'music' && (
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
            )}

            {activeActivity === 'visual' && (
              <div className="relative w-full h-full min-h-[500px]">
                {/* Background */}
                <div className={`
                  absolute inset-0 transition-opacity duration-1000
                  bg-gradient-to-b ${animations[currentAnimation].gradient}
                `}>
                  {/* Dynamic Scene Elements */}
                  {animations[currentAnimation].elements.map((element, elementIndex) => (
                    Array.from({ length: element.count }).map((_, index) => {
                      const delay = element.baseDelay + (index * 0.5);
                      const randomPosition = {
                        top: `${Math.random() * 80 + 10}%`,
                        left: `${Math.random() * 80 + 10}%`,
                      };

                      switch (element.type) {
                        case 'wave':
                          return (
                            <Wave
                              key={`wave-${elementIndex}-${index}`}
                              className="absolute w-24 h-24 text-white/20 animate-float"
                              style={{
                                ...randomPosition,
                                animationDelay: `${delay}s`,
                              }}
                            />
                          );
                        case 'cloud':
                          return (
                            <Cloud
                              key={`cloud-${elementIndex}-${index}`}
                              className="absolute w-32 h-32 text-white/30 animate-float"
                              style={{
                                ...randomPosition,
                                animationDelay: `${delay}s`,
                              }}
                            />
                          );
                        case 'star':
                          return (
                            <Stars
                              key={`star-${elementIndex}-${index}`}
                              className="absolute w-4 h-4 text-yellow-200 animate-twinkle"
                              style={{
                                ...randomPosition,
                                animationDelay: `${delay}s`,
                              }}
                            />
                          );
                        case 'firefly':
                          return (
                            <Sparkles
                              key={`firefly-${elementIndex}-${index}`}
                              className="absolute w-3 h-3 text-yellow-300/70 animate-float"
                              style={{
                                ...randomPosition,
                                animationDelay: `${delay}s`,
                              }}
                            />
                          );
                        case 'butterfly':
                          return (
                            <div
                              key={`butterfly-${elementIndex}-${index}`}
                              className="absolute w-6 h-6 animate-float"
                              style={{
                                ...randomPosition,
                                animationDelay: `${delay}s`,
                              }}
                            >
                              <span className="block w-full h-full rounded-full bg-gradient-to-r from-pink-400 to-purple-400 opacity-60" />
                            </div>
                          );
                        case 'flower':
                          return (
                            <Sun
                              key={`flower-${elementIndex}-${index}`}
                              className="absolute w-8 h-8 text-yellow-400/70 animate-spin-slow"
                              style={{
                                ...randomPosition,
                                animationDelay: `${delay}s`,
                              }}
                            />
                          );
                        default:
                          return null;
                      }
                    })
                  ))}
                </div>

                {/* Scene Title */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
                  <h3 className="text-2xl font-bold text-white text-center drop-shadow-lg">
                    {animations[currentAnimation].title}
                  </h3>
                </div>
              </div>
            )}

            {activeActivity === 'doodle' && (
              <div className={`
                rounded-3xl p-8
                ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
                shadow-xl
              `}>
                {/* Color Palette */}
                <div className="flex justify-center space-x-4 mb-6">
                  {['#9C27B0', '#2196F3', '#4CAF50', '#FF9800'].map((color) => (
                    <button
                      key={color}
                      onClick={() => setDoodleColor(color)}
                      className={`
                        w-12 h-12 rounded-full
                        ${doodleColor === color ? 'ring-4 ring-purple-400' : ''}
                        transform hover:scale-110
                        transition-all duration-300
                      `}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                  
                  <button
                    onClick={clearCanvas}
                    className={`
                      p-3 rounded-full
                      ${isDarkMode ? 'bg-gray-700' : 'bg-gray-200'}
                      transform hover:scale-110
                      transition-all duration-300
                    `}
                  >
                    <Palette className="w-6 h-6" />
                  </button>
                </div>

                {/* Drawing Canvas */}
                <div
                  className={`
                    relative w-full aspect-[2/1] rounded-2xl overflow-hidden
                    ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}
                  `}
                >
                  <canvas
                    ref={canvasRef}
                    width={800}
                    height={400}
                    onMouseDown={startDrawing}
                    onMouseMove={draw}
                    onMouseUp={stopDrawing}
                    onMouseLeave={stopDrawing}
                    className="absolute inset-0 w-full h-full cursor-crosshair"
                  />
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activities.map((activity) => (
              <button
                key={activity.id}
                onClick={() => setActiveActivity(activity.id)}
                className={`
                  relative p-8 rounded-3xl
                  transform hover:scale-105 transition-all duration-500
                  focus:outline-none focus:ring-4 focus:ring-purple-400
                  shadow-xl
                  group
                  overflow-hidden
                  aspect-square
                `}
              >
                {/* Gradient Background */}
                <div className={`
                  absolute inset-0
                  bg-gradient-to-br
                  ${isDarkMode ? activity.darkColor : activity.lightColor}
                  group-hover:opacity-80
                  transition-opacity
                `} />

                {/* Glowing Effect */}
                <div className={`
                  absolute inset-0
                  bg-gradient-to-br ${activity.color}
                  opacity-0 group-hover:opacity-20
                  transition-opacity
                  blur-xl
                `} />

                {/* Content */}
                <div className="relative flex flex-col items-center justify-center h-full space-y-6">
                  <activity.icon className={`
                    w-24 h-24
                    ${isVibrant
                      ? `text-transparent bg-clip-text bg-gradient-to-r ${activity.color}`
                      : isDarkMode
                        ? 'text-white'
                        : 'text-gray-900'
                    }
                    animate-float
                  `} />

                  <h3 className={`
                    text-2xl font-bold text-center font-comic
                    ${isDarkMode ? 'text-white' : 'text-gray-900'}
                  `}>
                    {activity.title}
                  </h3>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}