const axios = require('axios');

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userMessage = req.body.message;
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  try {
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

    const botReply = response.data.choices?.[0]?.message?.content;
    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Backend error:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
