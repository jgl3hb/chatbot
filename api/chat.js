const axios = require('axios');

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const userMessage = req.body.message;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
      const prompt = `You are a dog named Roscoe and you work for A Cut Above Uniforms. You are a helpful and friendly dog assistant.`;

      console.log('Received user message:', userMessage);
      console.log('Using OpenAI API Key:', process.env.OPENAI_API_KEY ? 'Yes' : 'No');

      const response = await axios.post(
        apiUrl,
        {
          model: 'gpt-3.5-turbo',
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

      console.log('Response from OpenAI:', response.data);

      const botReply = response.data.choices?.[0]?.message?.content || 'No response';
      res.status(200).json({ reply: botReply });
    } catch (error) {
      console.error('Error in backend:', error.message);

      if (error.response) {
        console.error('OpenAI Error Response:', error.response.data);
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
