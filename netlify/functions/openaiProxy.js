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
        model: "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are an AI that must respond in valid JSON only, with this exact structure:
{
  "chatResponse": "some text",
  "lessons": [
    {
      "id": "game-id",
      "title": "string",
      "description": "string",
      "targetSkills": ["string"],
      "difficultyLevel": "beginner|intermediate|advanced",
      "icon": "string",
      "component": "string"
    },
    {
      "... second lesson ..."
    }
  ]
}
Provide exactly 2 lessons, no extra keys or text outside the JSON.`
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
      
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      console.log('Cleaned content:', cleanContent);
      
      result = JSON.parse(cleanContent);
      console.log('Parsed result:', result);

      // Validate response structure and provide fallback if invalid
      if (!result.chatResponse || !Array.isArray(result.lessons)) {
        console.warn("Response schema invalid, using fallback.");
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
      } else {
        // Validate number of lessons
        if (result.lessons.length !== 2) {
          console.warn("Invalid number of lessons, using fallback");
          throw new Error('Response must contain exactly 2 lessons');
        }

        // Validate each lesson
        const validGameIds = [
          'findletter', 'lettermatching', 'phoneticsound', 'wordbuilder',
          'counting', 'shapesorter', 'emotionmatch', 'chatwithgpt',
          'whatamiwearing', 'wheresmytoy'
        ];

        const validDifficulties = ['beginner', 'intermediate', 'advanced'];

        result.lessons.forEach(lesson => {
          // Check required fields
          if (!lesson.id || !lesson.title || !lesson.description || 
              !Array.isArray(lesson.targetSkills) || !lesson.difficultyLevel || 
              !lesson.component) {
            throw new Error('Invalid lesson structure');
          }

          // Validate game ID
          if (!validGameIds.includes(lesson.id)) {
            throw new Error(`Invalid game ID: ${lesson.id}`);
          }

          // Validate difficulty level
          if (!validDifficulties.includes(lesson.difficultyLevel)) {
            throw new Error(`Invalid difficulty level: ${lesson.difficultyLevel}`);
          }

          // Ensure component name matches convention
          const expectedComponent = lesson.id.split('-')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join('') + 'Game';
          lesson.component = expectedComponent;
        });
      }

      console.log('Validation passed, returning result');

    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError, "Response:", data);
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
