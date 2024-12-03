const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userMessage = req.body.message;
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  console.log('User message received:', userMessage); // Debugging input

  try {
    // Ensure OpenAI API Key is present
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Missing OpenAI API Key');
    }

    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo', // Ensure this model is available to your account
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: userMessage },
        ],
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        },
      }
    );

    console.log('Response from OpenAI:', response.data); // Debugging API response

    const botReply = response.data.choices?.[0]?.message?.content;
    if (!botReply) {
      throw new Error('No reply received from OpenAI');
    }

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Error in backend:', error.message);

    if (error.response) {
      console.error('OpenAI API Error Response:', error.response.data); // Log specific OpenAI errors
    }

    res.status(500).json({
      error: 'Internal server error',
      details: error.response?.data || error.message,
    });
  }
}
