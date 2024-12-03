const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userMessage = req.body.message;
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  console.log('Received user message:', userMessage); // Log user input

  if (!userMessage) {
    console.error('No message provided in request body.');
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Missing OpenAI API Key');
    }

    console.log('Sending request to OpenAI API...');
    const response = await axios.post(
      apiUrl,
      {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a friendly assistant.' },
          { role: 'user', content: userMessage },
        ],
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );

    console.log('Response from OpenAI:', response.data);

    const botReply = response.data.choices?.[0]?.message?.content;
    if (!botReply) {
      throw new Error('No reply received from OpenAI');
    }

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Error in backend:', error.message);

    // Log detailed error if available
    if (error.response) {
      console.error('OpenAI API Error Response:', error.response.data);
    }

    res.status(500).json({
      error: 'Internal server error',
      details: error.response?.data || error.message,
    });
  }
}
