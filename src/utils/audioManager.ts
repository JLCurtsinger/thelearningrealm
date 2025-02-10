// Audio URLs from reliable CDN sources
const AUDIO_URLS = {
  success: 'https://cdn.pixabay.com/download/audio/2022/03/19/audio_805cb3c75d.mp3',
  error: 'https://cdn.pixabay.com/download/audio/2022/03/19/audio_c8c8a73f04.mp3',
  click: 'https://cdn.pixabay.com/download/audio/2022/03/19/audio_1114.mp3'
};

// Audio context and buffer cache
let audioContext: AudioContext | null = null;
const audioBuffers: { [key: string]: AudioBuffer } = {};

// Initialize audio context on first user interaction
const initAudioContext = () => {
  if (!audioContext) {
    audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    // Pre-load all audio files
    Object.entries(AUDIO_URLS).forEach(([key, url]) => {
      fetch(url)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.arrayBuffer();
        })
        .then(arrayBuffer => audioContext!.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
          audioBuffers[key] = audioBuffer;
        })
        .catch(error => {
          console.warn(`Failed to load audio ${key}:`, error);
        });
    });
  }
  return audioContext;
};

// Play sound with fallback
export const playSound = async (type: keyof typeof AUDIO_URLS, volume: number = 0.3) => {
  try {
    const context = initAudioContext();
    
    // If we have the buffer, play it
    if (audioBuffers[type]) {
      const source = context.createBufferSource();
      const gainNode = context.createGain();
      
      source.buffer = audioBuffers[type];
      gainNode.gain.value = volume;
      
      source.connect(gainNode);
      gainNode.connect(context.destination);
      
      source.start(0);
      return;
    }

    // Fallback to Audio element if buffer not loaded
    const audio = new Audio();
    audio.src = AUDIO_URLS[type];
    audio.volume = volume;
    
    // Wait for audio to load before playing
    await new Promise((resolve, reject) => {
      audio.oncanplaythrough = resolve;
      audio.onerror = reject;
      audio.load();
    });
    
    await audio.play();
  } catch (error) {
    console.warn('Audio playback failed:', error);
    // Fallback to browser beep
    try {
      const oscillator = audioContext?.createOscillator();
      const gainNode = audioContext?.createGain();
      
      if (oscillator && gainNode && audioContext) {
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        gainNode.gain.value = volume * 0.1;
        oscillator.frequency.value = type === 'success' ? 880 : 440;
        
        oscillator.start();
        setTimeout(() => oscillator.stop(), 200);
      }
    } catch (error) {
      console.warn('Fallback audio failed:', error);
    }
  }
};

// Speech synthesis with error handling and queue management
let currentUtterance: SpeechSynthesisUtterance | null = null;
let speechQueue: { text: string; lang: string; onComplete?: () => void }[] = [];
let isSpeaking = false;

const processSpeechQueue = () => {
  if (speechQueue.length === 0 || isSpeaking) return;
  
  const { text, lang, onComplete } = speechQueue[0];
  
  // Create new utterance for each speech request
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = lang;
  utterance.rate = 0.9;
  utterance.pitch = 1.1;
  
  utterance.onend = () => {
    isSpeaking = false;
    currentUtterance = null;
    speechQueue.shift();
    if (onComplete) onComplete();
    processSpeechQueue();
  };
  
  utterance.onerror = (event) => {
    console.warn('Speech synthesis error:', event);
    isSpeaking = false;
    currentUtterance = null;
    speechQueue.shift();
    if (onComplete) onComplete();
    processSpeechQueue();
  };
  
  try {
    // Cancel any ongoing speech
    if (window.speechSynthesis.speaking) {
      window.speechSynthesis.cancel();
    }
    
    // Store current utterance and start speaking
    currentUtterance = utterance;
    isSpeaking = true;
    window.speechSynthesis.speak(utterance);
  } catch (error) {
    console.warn('Speech synthesis failed:', error);
    isSpeaking = false;
    currentUtterance = null;
    speechQueue.shift();
    if (onComplete) onComplete();
    processSpeechQueue();
  }
};

export const speak = (text: string, lang: string = 'en-US', onComplete?: () => void) => {
  try {
    // If the same text is currently being spoken, don't add it again
    if (currentUtterance && currentUtterance.text === text) {
      return;
    }
    
    // Add new speech to queue
    speechQueue.push({ text, lang, onComplete });
    
    // Process queue if not already speaking
    if (!isSpeaking) {
      processSpeechQueue();
    }
  } catch (error) {
    console.warn('Speech synthesis failed:', error);
    if (onComplete) onComplete();
  }
};

// Initialize audio context on page load
document.addEventListener('DOMContentLoaded', () => {
  // Create context but don't start it until user interaction
  audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
  audioContext.suspend();
});

// Resume audio context on user interaction
document.addEventListener('click', () => {
  if (audioContext?.state === 'suspended') {
    audioContext.resume();
  }
}, { once: true });

// Clean up speech synthesis when page unloads
window.addEventListener('beforeunload', () => {
  window.speechSynthesis.cancel();
  currentUtterance = null;
  speechQueue = [];
  isSpeaking = false;
});

// Handle visibility change to prevent audio issues
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    window.speechSynthesis.cancel();
    currentUtterance = null;
    isSpeaking = false;
  } else {
    // Resume queue processing when page becomes visible again
    processSpeechQueue();
  }
});