import React, { useState } from 'react';
import { Globe2, Youtube, Sparkles, Loader2 } from 'lucide-react';

interface VideoPageProps {
  isDarkMode: boolean;
  isVibrant: boolean;
  t: any;
}

// YouTube Shorts data
const YOUTUBE_SHORTS = [
  { id: 'rh6p7lI93xs', title: 'Learn Colors with Animals' },
  { id: '6dYrq2xAb7I', title: 'ABC Song for Kids' },
  { id: 'QNBQho28MSc', title: 'Numbers 1-10' },
  { id: 'yop-o1bIpUs', title: 'Days of the Week' },
  { id: 'k0Sd1v26tZ0', title: 'Basic Shapes' },
  { id: 'Ui21Q0PzEjc', title: 'Farm Animals' },
  { id: '3BlQNdutO_E', title: 'Weather Words' },
  { id: 'HctxGXJOyMA', title: 'Fruits and Vegetables' },
  { id: 'yY-mdm_vUsU', title: 'Transportation Vehicles' }
];

const TRANSLATION_API_URL = 'https://lesson-link-translator.herokuapp.com/translate-video-url';

export function VideoPage({ isDarkMode, isVibrant, t }: VideoPageProps) {
  const [selectedVideo, setSelectedVideo] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [translatedVideoUrl, setTranslatedVideoUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Function to get full YouTube URL from ID
  const getYouTubeUrl = (id: string) => {
    return `https://www.youtube.com/shorts/${id}`;
  };

  // Function to handle video translation
  const translateVideo = async (videoId: string) => {
    setIsTranslating(true);
    setError(null);

    try {
      const response = await fetch(TRANSLATION_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          video_url: getYouTubeUrl(videoId)
        })
      });

      if (!response.ok) {
        throw new Error('Translation failed');
      }

      // Get the blob from the response
      const videoBlob = await response.blob();
      const videoUrl = URL.createObjectURL(videoBlob);
      setTranslatedVideoUrl(videoUrl);
      setIsPlaying(true);

    } catch (err) {
      console.error('Translation error:', err);
      setError('Sorry, there was an error translating the video. Please try again.');
      setIsPlaying(false);
    } finally {
      setIsTranslating(false);
    }
  };

  // Function to handle video selection
  const handleVideoSelect = async (videoId: string) => {
    if (!videoId) return;
    
    setSelectedVideo(videoId);
    await translateVideo(videoId);
  };

  // Cleanup function for blob URLs
  React.useEffect(() => {
    return () => {
      if (translatedVideoUrl) {
        URL.revokeObjectURL(translatedVideoUrl);
      }
    };
  }, [translatedVideoUrl]);

  return (
    <div className="min-h-screen pt-20 pb-8 px-4">
      <div className="max-w-7xl mx-auto space-y-8">
        {!isPlaying ? (
          <>
            {/* Featured Videos Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {YOUTUBE_SHORTS.slice(0, 2).map((video, index) => (
                <button
                  key={index}
                  onClick={() => handleVideoSelect(video.id)}
                  disabled={isTranslating}
                  className={`
                    relative overflow-hidden rounded-3xl aspect-video
                    transform hover:scale-102 transition-all duration-500
                    focus:outline-none focus:ring-4 focus:ring-purple-400
                    group disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  {/* Gradient Overlay */}
                  <div className={`
                    absolute inset-0 bg-gradient-to-br
                    ${index === 0
                      ? 'from-blue-400 via-purple-400 to-pink-400'
                      : 'from-green-400 via-teal-400 to-blue-400'
                    }
                    opacity-40 group-hover:opacity-60 transition-opacity
                  `} />
                  
                  {/* Background Image */}
                  <img
                    src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
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
                          ? `bg-gradient-to-r ${index === 0
                              ? 'from-blue-500 via-purple-500 to-pink-500'
                              : 'from-green-500 via-teal-500 to-blue-500'
                            }`
                          : 'bg-white/90'
                        }
                        shadow-lg
                      `}>
                        <Youtube className={`
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

            {/* Video Selection Section */}
            <div className={`
              rounded-3xl p-8 space-y-6
              ${isDarkMode ? 'bg-gray-800' : 'bg-white'}
              shadow-xl
            `}>
              <div className="flex items-center gap-4 mb-8">
                <Globe2 className={`w-8 h-8 ${
                  isVibrant
                    ? 'text-purple-500'
                    : isDarkMode
                      ? 'text-white'
                      : 'text-gray-900'
                }`} />
                <h2 className="text-2xl font-bold font-comic">
                  {t.videos}
                </h2>
              </div>

              {/* Video Dropdown */}
              <div className="space-y-4">
                <select
                  value={selectedVideo}
                  onChange={(e) => handleVideoSelect(e.target.value)}
                  disabled={isTranslating}
                  className={`
                    w-full px-6 py-4 text-lg rounded-2xl
                    border-2 border-gray-200 dark:border-gray-700
                    focus:border-purple-400 dark:focus:border-purple-400
                    focus:ring-2 focus:ring-purple-400 focus:ring-opacity-50
                    bg-white dark:bg-gray-900
                    text-gray-900 dark:text-white
                    transition-all duration-300
                    appearance-none
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                >
                  <option value="">Click to choose a video</option>
                  {YOUTUBE_SHORTS.map((video) => (
                    <option key={video.id} value={video.id}>
                      {video.title}
                    </option>
                  ))}
                </select>

                {/* Translation Status */}
                {isTranslating && (
                  <div className="flex items-center justify-center gap-2 text-purple-500">
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Translating video...</span>
                  </div>
                )}

                {/* Error Message */}
                {error && (
                  <p className="text-red-500 text-center">{error}</p>
                )}

                {/* Language Note */}
                <p className={`
                  text-sm italic text-center
                  ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}
                `}>
                  Currently only English to Spanish translations are available—more languages coming soon.
                  <Sparkles className="inline-block w-4 h-4 ml-2 text-yellow-400 animate-pulse" />
                </p>
              </div>
            </div>
          </>
        ) : (
          // Video Player Section
          <div className={`
            aspect-video rounded-3xl overflow-hidden
            shadow-2xl transition-all duration-500
          `}>
            {translatedVideoUrl ? (
              <video
                src={translatedVideoUrl}
                controls
                autoPlay
                className="w-full h-full"
                onError={() => {
                  setError('Error playing the translated video');
                  setIsPlaying(false);
                }}
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-purple-500" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
