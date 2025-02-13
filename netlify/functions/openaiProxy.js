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
            content: "You are an expert early childhood education AI assistant. Your responses must be in valid JSON format only, with no additional text or explanation."
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

      // Validate response structure
      if (!result.chatResponse || !Array.isArray(result.lessons)) {
        throw new Error('Invalid response structure');
      }

      // Validate number of lessons
      if (result.lessons.length !== 2) {
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

      console.log('Validation passed, returning result');

    } catch (parseError) {
      console.error("JSON Parsing Error:", parseError, "Response:", data);
      return {
        statusCode: 500,
        body: JSON.stringify({ 
          error: "Invalid JSON response from OpenAI",
          details: parseError.message,
          rawResponse: data.choices[0].message.content
        }),
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
