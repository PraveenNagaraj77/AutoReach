// controllers/aiController.js
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config(); // Load environment variables

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

async function generateContent(req, res) {
  const { prompt } = req.body;

  try {
    // Generate content based on the prompt
    const result = await model.generateContent(prompt);

    // Construct a detailed response object
    const responseData = {
      text: result.response.text(), // The generated text
      prompt: prompt, // Echo back the prompt for reference
      timestamp: new Date().toISOString(), // Current timestamp
      success: true // Indicate success
    };

    // Send the JSON response
    res.json(responseData);
  } catch (error) {
    console.error('Error generating content:', error);
    res.status(500).json({ 
      success: false, // Indicate failure
      error: 'Error generating content',
      message: error.message // Include error message for debugging
    });
  }
}

module.exports = { generateContent };
