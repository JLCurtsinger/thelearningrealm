const fetch = require("node-fetch");

exports.handler = async (event) => {
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

    // Comprehensive skill definitions and assessment criteria
    const skillDefinitions = `
      Available Skills Assessment Categories:

      1. Letters and Phonics:
         - letter-recognition: Ability to identify individual letters
         - phonics: Understanding letter sounds
         - letter-sound-correspondence: Connecting letters to their sounds
         - alphabet-knowledge: Overall familiarity with the alphabet
         - spelling: Ability to spell simple words
         - word-formation: Skill in building words from letters

      2. Numbers and Counting:
         - numbers: Basic number recognition
         - counting: Ability to count objects
         - quantity-recognition: Understanding amounts
         - basic-math: Simple mathematical concepts

      3. Shapes and Spatial Skills:
         - shapes: Recognition of basic shapes
         - spatial-awareness: Understanding position and space
         - visual-discrimination: Ability to distinguish visual differences
         - sorting: Categorizing objects by attributes

      4. Language and Communication:
         - vocabulary: Word knowledge
         - listening: Auditory comprehension
         - pronunciation: Clear speech production
         - conversation: Basic communication skills
         - sound-imitation: Ability to mimic sounds

      5. Motor and Physical Skills:
         - observation: Visual attention and focus
         - decision-making: Making choices
         - motion-recognition: Understanding movement
         - action-sequence: Following movement patterns

      Difficulty Level Criteria:
      - beginner: New learners, needs lots of support, basic concepts
      - intermediate: Some experience, growing independence, complex concepts
      - advanced: Independent learner, challenging content, abstract thinking

      Game Selection Rules:
      1. Choose games that target the child's weakest skill areas
      2. Match difficulty level to child's demonstrated abilities
      3. Select only from available games in the system
      4. Ensure games are appropriate for the child's language level
    `;

    // Construct the assessment prompt
    const assessmentPrompt = `
      You are an early childhood education expert. Based on the following chat responses, assess the child's skills and recommend appropriate learning activities.

      Chat responses: ${JSON.stringify(responses)}

      ${skillDefinitions}

      CRITICAL REQUIREMENTS:
      1. Return ONLY a valid JSON object with this exact structure:
      {
        "chatResponse": "A friendly, encouraging message explaining the recommendations",
        "lessons": [
          {
            "id": "game-id",
            "title": "Exact game title from database",
            "description": "Exact game description",
            "targetSkills": ["skill1", "skill2"],
            "difficultyLevel": "beginner|intermediate|advanced",
            "icon": "game-icon",
            "component": "ExactComponentName"
          }
        ]
      }

      2. Select ONLY from these available games:
         - findletter: Letter recognition and matching
         - lettermatching: Letter-picture correspondence
         - phoneticsound: Letter sounds and pronunciation
         - wordbuilder: Simple word construction
         - counting: Number recognition and counting
         - shapesorter: Shape identification and sorting
         - emotionmatch: Emotional recognition
         - chatwithgpt: Animal vocabulary and sounds
         - whatamiwearing: Clothing and color vocabulary
         - wheresmytoy: Spatial awareness and positions

      3. The response MUST:
         - Include exactly 2 lessons
         - Use only valid game IDs from the list above
         - Match the exact structure of existing games
         - Include appropriate targetSkills from the defined categories
         - Use correct difficulty levels (beginner, intermediate, advanced)
         - Provide a friendly, encouraging chatResponse

      4. DO NOT:
         - Create new or nonexistent games
         - Modify game titles or descriptions
         - Use undefined skills or difficulty levels
         - Include additional text or explanations outside the JSON
    `;

    console.log('Making OpenAI API request...'); // Debug log

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
            content: assessmentPrompt
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
        response_format: { type: "json_object" }  // Enforce JSON response format
      }),
    });

    if (!response.ok) {
      console.error(`OpenAI API error: ${response.status}`); // Debug log
      throw new Error(`OpenAI API responded with status ${response.status}`);
    }

    const data = await response.json();
    console.log('OpenAI API response received:', data); // Debug log

    let result;

    try {
      // Clean and parse the response
      const content = data.choices[0].message.content;
      const cleanContent = content.replace(/```json\n?|\n?```/g, '').trim();
      result = JSON.parse(cleanContent);

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

      console.log('Validated result:', result); // Debug log

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