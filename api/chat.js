const axios = require('axios');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userMessage = req.body.message;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
      const prompt = `You are a dog named Roscoe and you work for A Cut Above Uniforms. You are a helpful and friendly dog assistant.`;

      console.log('Received user message:', userMessage); // Log the user message
      console.log('OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Key is present' : 'Key is missing'); // Debug API key

      const response = await axios.post(
        apiUrl,
        {
          model: 'gpt-3.5-turbo', // Use 'gpt-4' if accessible
          messages: [
            { role: 'system', content: prompt },
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

      console.log('Response from OpenAI:', response.data); // Log API response

      const botReply = response.data.choices[0].message.content;
      res.status(200).json({ reply: botReply });
    } catch (error) {
      console.error('Error in /api/chat handler:', error.message); // Log general error message
      if (error.response) {
        console.error('Error response from OpenAI:', error.response.data); // Log OpenAI-specific error details
      }
      res.status(500).json({
        error: 'Internal server error',
        details: error.response?.data || error.message,
      });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}