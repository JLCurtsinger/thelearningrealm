import React, { useState } from 'react';
import {
  Play,
  Globe2,
  Youtube,
  Volume2,
  Languages,
  Sparkles
} from 'lucide-react';

interface VideoPageProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

export function VideoPage({ isDarkMode, isVibrant, t }: VideoPageProps) {
  const [videoUrl, setVideoUrl] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('es');
  const [isPlaying, setIsPlaying] = useState(false);

  // Function to extract YouTube video ID
  const getYouTubeVideoId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

  // Function to handle video play
  const handlePlay = () => {
    if (videoUrl && getYouTubeVideoId(videoUrl)) {
      setIsPlaying(true);
    }
  };

  // Featured videos data
  const featuredVideos = [
    {
      title: t.videoPage.featuredVideos.abcSong,
      thumbnail: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=800&h=500",
      color: "from-blue-400 via-purple-400 to-pink-400"
    },
    {
      title: t.videoPage.featuredVideos.numbers,
      thumbnail: "https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&h=500",
      color: "from-green-400 via-teal-400 to-blue-400"
    }
  ];

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {!isPlaying ? (
          <>
            {/* Featured Videos Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {featuredVideos.map((video, index) => (
                <button
                  key={index}
                  className={`
                    relative overflow-hidden rounded-3xl aspect-video
                    transform hover:scale-102 transition-all duration-500
                    focus:outline-none focus:ring-4 focus:ring-purple-400
                    group
                  `}
                >
                  {/* Gradient Overlay */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br ${video.color}
                    opacity-40 group-hover:opacity-60 transition-opacity
                  `} />
                  
                  {/* Background Image */}
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  
                  {/* Content */}
                  <div className="relative flex items-center justify-center h-full">
                    <div className="flex flex-col items-center space-y-4">
                      <div className={`
                        w-16 h-16 rounded-full
                        flex items-center justify-center
                        transform group-hover:scale-110 transition-all duration-300
                        ${isVibrant
                          ? `bg-gradient-to-r ${video.color}`
                          : 'bg-white/90'
                        }
                        shadow-lg
                      `}>
                        <Play className={`
                          w-8 h-8
                          ${isVibrant
                            ? 'text-white'
                            : 'text-gray-900'
                          }
                        `} />
                      </div>
                      <h3 className="text-2xl font-bold text-white font-comic drop-shadow-lg">
                        {video.title}
                      </h3>
                    </div>
                  </div>
                </button>
              ))}
            </div>

            {/* Video Input Section */}
            <div className={`
              rounded-3xl p-8 space-y-6
              ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
              shadow-xl
            `}>
              <div className="flex items-center gap-4 mb-8">
                <Youtube className={`w-8 h-8 ${
                  isVibrant
                    ? 'text-red-500'
                    : isDarkMode
                      ? 'text-white'
                      : 'text-gray-900'
                }`} />
                <h2 className="text-2xl font-bold font-comic">
                  {t.videos}
                </h2>
              </div>

              {/* URL Input */}
              <div className="space-y-4">
                <input
                  type="text"
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  placeholder={t.videoPage.urlPlaceholder}
                  className={`
                    w-full px-6 py-4 text-lg rounded-2xl
                    border-2 border-gray-200 dark:border-gray-700
                    focus:border-purple-400 dark:focus:border-purple-400
                    focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                    bg-white dark:bg-gray-900
                    text-gray-900 dark:text-white
                    placeholder-gray-400 dark:placeholder-gray-500
                    transition-all duration-300
                  `}
                />

                {/* Language Selection */}
                <div className="flex flex-wrap gap-4">
                  <select
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    className={`
                      px-6 py-4 text-lg rounded-2xl
                      border-2 border-gray-200 dark:border-gray-700
                      focus:border-purple-400 dark:focus:border-purple-400
                      focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                      bg-white dark:bg-gray-900
                      text-gray-900 dark:text-white
                      transition-all duration-300
                    `}
                  >
                    <option value="es">{t.videoPage.languages.spanish}</option>
                    <option value="fr">{t.videoPage.languages.french}</option>
                    <option value="de">{t.videoPage.languages.german}</option>
                    <option value="it">{t.videoPage.languages.italian}</option>
                  </select>

                  {/* Translate & Play Button */}
                  <button
                    onClick={handlePlay}
                    disabled={!videoUrl}
                    className={`
                      flex-1 flex items-center justify-center gap-3
                      px-8 py-4 text-lg font-bold text-white
                      rounded-2xl transition-all duration-300
                      ${isVibrant
                        ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-red-500'
                        : 'bg-purple-600 hover:bg-purple-700'
                      }
                      disabled:opacity-50 disabled:cursor-not-allowed
                      transform hover:scale-102
                      focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50
                    `}
                  >
                    <Languages className="w-6 h-6" />
                    <span>{t.videoPage.translateAndPlay}</span>
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          // Video Player Section
          <div className={`
            aspect-video rounded-3xl overflow-hidden
            shadow-2xl transition-all duration-500
          `}>
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeVideoId(videoUrl)}?autoplay=1`}
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}