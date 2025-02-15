const fetch = require("node-fetch");

exports.handler = async (event) => {
  // Debug logging for API key
  console.log('OpenAI API Key present:', !!process.env.VITE_OPENAI_API_KEY);
  console.log('OpenAI API Key length:', process.env.VITE_OPENAI_API_KEY?.length);
  console.log('OpenAI API Key prefix:', process.env.VITE_OPENAI_API_KEY?.substring(0, 7));

  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method not allowed" }),
    };
  }

  try {
    const { prompt, responses } = JSON.parse(event.body);

    if (!prompt) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Prompt is required" }),
      };
    }

    // Log request payload
    console.log('Making OpenAI request with:', {
      prompt: prompt.substring(0, 50) + '...',
      responsesCount: responses?.length
    });

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VITE_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You must respond with valid JSON matching this exact structure:
{
  "chatResponse": "string",
  "lessons": [
    {"id":"game-id","title":"string","description":"string","targetSkills":["string"],"difficultyLevel":"beginner|intermediate|advanced","icon":"string","component":"string"},
    {"id":"game-id","title":"string","description":"string","targetSkills":["string"],"difficultyLevel":"beginner|intermediate|advanced","icon":"string","component":"string"}
  ]
}
CRITICAL RULES:
- Exactly 2 lessons, no more, no less
- No extra keys or text outside JSON
- Valid game IDs only: findletter, lettermatching, phoneticsound, wordbuilder, counting, shapesorter, emotionmatch, chatwithgpt, whatamiwearing, wheresmytoy
- Valid difficulty levels only: beginner, intermediate, advanced
Any violation makes the response invalid.`
          },
          {
            role: "user",
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000
      }),
    });

    // Log response status
    console.log('OpenAI API response status:', response.status);

    if (!response.ok) {
      // Log error response
      const errorText = await response.text();
      console.error('OpenAI API error response:', errorText);
      throw new Error(`OpenAI API responded with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received:', JSON.stringify(data, null, 2));

    let result;

    try {
      // Clean and parse the response
      const content = data.choices[0].message.content;
      console.log('Raw content from OpenAI:', content);
      console.warn('Attempting to parse AI response. Content length:', content.length);
      
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      console.log('Cleaned content:', cleanContent);
      console.warn('Content after cleaning. Length:', cleanContent.length);
      
      result = JSON.parse(cleanContent);
      console.log('Parsed result:', result);
      console.warn('Successfully parsed JSON. Starting validation...');

      // Validate response structure and provide fallback if invalid
      if (!result.chatResponse) {
        console.warn('Fallback triggered: Missing chatResponse field');
        console.warn('Received structure:', Object.keys(result).join(', '));
        throw new Error('Missing chatResponse field');
      }

      if (!Array.isArray(result.lessons)) {
        console.warn('Fallback triggered: lessons is not an array');
        console.warn('Lessons type:', typeof result.lessons);
        throw new Error('lessons must be an array');
      }

      // Validate number of lessons
      if (result.lessons.length !== 2) {
        console.warn('Fallback triggered: Wrong number of lessons');
        console.warn('Found lessons:', result.lessons.length);
        throw new Error('Response must contain exactly 2 lessons');
      }

      // Validate each lesson
      const validGameIds = [
        'findletter', 'lettermatching', 'phoneticsound', 'wordbuilder',
        'counting', 'shapesorter', 'emotionmatch', 'chatwithgpt',
        'whatamiwearing', 'wheresmytoy'
      ];

      const validDifficulties = ['beginner', 'intermediate', 'advanced'];

      // Component mapping dictionary
      const componentMap = {
        findletter: 'FindLetterGame',
        lettermatching: 'LetterMatchingGame',
        phoneticsound: 'PhoneticSoundGame',
        wordbuilder: 'WordBuilderGame',
        counting: 'CountingGame',
        shapesorter: 'ShapeSorterGame',
        emotionmatch: 'EmotionMatchGame',
        chatwithgpt: 'ChatWithGPTGame',
        whatamiwearing: 'WhatAmIWearingGame',
        wheresmytoy: 'WheresMyToyGame'
      };

      result.lessons.forEach((lesson, index) => {
        console.warn(`Validating lesson ${index + 1}...`);
        
        // Check required fields
        const requiredFields = ['id', 'title', 'description', 'targetSkills', 'difficultyLevel', 'component'];
        const missingFields = requiredFields.filter(field => !lesson[field]);
        
        if (missingFields.length > 0) {
          console.warn('Fallback triggered: Missing required fields in lesson', index + 1);
          console.warn('Missing fields:', missingFields.join(', '));
          throw new Error(`Lesson ${index + 1} missing fields: ${missingFields.join(', ')}`);
        }

        if (!Array.isArray(lesson.targetSkills)) {
          console.warn('Fallback triggered: targetSkills is not an array in lesson', index + 1);
          console.warn('targetSkills type:', typeof lesson.targetSkills);
          throw new Error(`Lesson ${index + 1} targetSkills must be an array`);
        }

        // Validate game ID
        if (!validGameIds.includes(lesson.id)) {
          console.warn('Fallback triggered: Invalid game ID in lesson', index + 1);
          console.warn('Received ID:', lesson.id);
          console.warn('Valid IDs:', validGameIds.join(', '));
          throw new Error(`Invalid game ID: ${lesson.id}`);
        }

        // Validate difficulty level
        if (!validDifficulties.includes(lesson.difficultyLevel)) {
          console.warn('Fallback triggered: Invalid difficulty level in lesson', index + 1);
          console.warn('Received difficulty:', lesson.difficultyLevel);
          console.warn('Valid difficulties:', validDifficulties.join(', '));
          throw new Error(`Invalid difficulty level: ${lesson.difficultyLevel}`);
        }

        // Map component name using dictionary
        const mappedComponent = componentMap[lesson.id];
        if (!mappedComponent) {
          console.warn('Fallback triggered: No known component for', lesson.id);
          console.warn('Available components:', Object.keys(componentMap).join(', '));
          throw new Error(`Unknown component for ${lesson.id}`);
        }
        
        // Update component name and log the change
        if (lesson.component !== mappedComponent) {
          console.warn('Updating component name in lesson', index + 1);
          console.warn('Original:', lesson.component);
          console.warn('Mapped to:', mappedComponent);
          lesson.component = mappedComponent;
        }
      });

      console.warn('All validations passed successfully!');

    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError);
      console.warn("Fallback triggered due to:", parseError.message);
      console.warn("Original AI response:", data.choices[0].message.content);
      
      // Provide fallback response
      result = {
        chatResponse: "We're sorry, but we couldn't process your request right now. Please try again later.",
        lessons: [
          {
            id: "lettermatching",
            title: "Letter Matching",
            description: "Match letters with pictures that start with that letter",
            targetSkills: ["letters", "phonics", "letter-sound-correspondence", "vocabulary"],
            difficultyLevel: "beginner",
            icon: "lettermatching",
            component: "LetterMatchingGame"
          },
          {
            id: "counting",
            title: "Counting Adventure",
            description: "Learn to count objects and recognize numbers",
            targetSkills: ["numbers", "counting", "quantity-recognition", "decision-making"],
            difficultyLevel: "beginner",
            icon: "counting",
            component: "CountingGame"
          }
        ]
      };
    }

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error in OpenAI proxy:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ 
        error: "Error communicating with OpenAI API",
        details: error.message 
      }),
    };
  }
};