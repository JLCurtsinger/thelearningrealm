// Game content for different languages
export const gameContent = {
  en: {
    letterMatching: {
      pairs: [
        { word: 'Apple', letter: 'A', image: 'https://images.unsplash.com/photo-1579613832125-5d34a13ffe2a?auto=format&fit=crop&w=300&h=300' },
        { word: 'Ball', letter: 'B', image: 'https://images.unsplash.com/photo-1510697963685-53101e615777?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' },
        { word: 'Cat', letter: 'C', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&h=300' },
        { word: 'Dog', letter: 'D', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=300&h=300' },
        { word: 'Elephant', letter: 'E', image: 'https://images.unsplash.com/photo-1557050543-4d5f4e07ef46?auto=format&fit=crop&w=300&h=300' }
      ],
      celebrations: {
        success: "Fantastic! 🎉",
        letterFound: (letter: string, word: string) => `"${letter}" is for "${word}"!`
      }
    },
    wordBuilder: {
      words: [
        { word: 'CAT', image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=200&h=200' },
        { word: 'DOG', image: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=200&h=200' },
        { word: 'SUN', image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?auto=format&fit=crop&w=200&h=200' },
        { word: 'HAT', image: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8?auto=format&fit=crop&w=200&h=200' }
      ],
      celebrations: {
        success: "Wonderful! 🎉",
        wordBuilt: (word: string) => `You built the word "${word}"!`
      }
    },
    phonetics: [
      { letter: 'B', sound: 'buh', example: 'ball', color: 'from-blue-400 to-blue-600' },
      { letter: 'D', sound: 'duh', example: 'dog', color: 'from-green-400 to-green-600' },
      { letter: 'F', sound: 'fuh', example: 'fish', color: 'from-yellow-400 to-yellow-600' },
      { letter: 'M', sound: 'mmm', example: 'moon', color: 'from-purple-400 to-purple-600' }
    ],
    letterPairs: [
      ['b', 'd', 'p', 'q'],
      ['m', 'n', 'w'],
      ['i', 'l', 't'],
      ['a', 'e', 'o']
    ],
    celebrations: {
      success: "Great job! 🎉",
      tryAgain: "Try again!",
      letterSound: (letter: string, sound: string) => `Correct! ${letter} says ${sound}!`
    }
  },
  es: {
    letterMatching: {
      pairs: [
        { word: 'Árbol', letter: 'A', image: 'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=300&h=300' },
        { word: 'Barco', letter: 'B', image: 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?auto=format&fit=crop&w=300&h=300' },
        { word: 'Casa', letter: 'C', image: 'https://images.unsplash.com/photo-1518780664697-55e3ad937233?auto=format&fit=crop&w=300&h=300' },
        { word: 'Dedo', letter: 'D', image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?auto=format&fit=crop&w=300&h=300' },
        { word: 'Estrella', letter: 'E', image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=300&h=300' }
      ],
      celebrations: {
        success: "¡Fantástico! 🎉",
        letterFound: (letter: string, word: string) => `"${letter}" es para "${word}"!`
      }
    },
    wordBuilder: {
      words: [
        { word: 'SOL', image: 'https://images.unsplash.com/photo-1575881875475-31023242e3f9?auto=format&fit=crop&w=200&h=200' },
        { word: 'PAN', image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=200&h=200' },
        { word: 'LUZ', image: 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?auto=format&fit=crop&w=200&h=200' },
        { word: 'MAR', image: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=200&h=200' }
      ],
      celebrations: {
        success: "¡Maravilloso! 🎉",
        wordBuilt: (word: string) => `¡Has construido la palabra "${word}"!`
      }
    },
    phonetics: [
      { letter: 'B', sound: 'be', example: 'barco', color: 'from-blue-400 to-blue-600' },
      { letter: 'D', sound: 'de', example: 'dedo', color: 'from-green-400 to-green-600' },
      { letter: 'F', sound: 'efe', example: 'foca', color: 'from-yellow-400 to-yellow-600' },
      { letter: 'M', sound: 'eme', example: 'mesa', color: 'from-purple-400 to-purple-600' }
    ],
    letterPairs: [
      ['b', 'v', 'd', 'p'],
      ['m', 'n', 'ñ'],
      ['i', 'í', 'y'],
      ['a', 'á', 'e', 'é']
    ],
    celebrations: {
      success: "¡Muy bien! 🎉",
      tryAgain: "¡Inténtalo de nuevo!",
      letterSound: (letter: string, sound: string) => `¡Correcto! ${letter} dice ${sound}!`
    }
  }
};