const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const userMessage = req.body.message;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';
    try {
      const response = await axios.post(apiUrl, {
        prompt: `You are the Oracle from the Matrix. Answer the user's question: "${userMessage}"`,
        max_tokens: 5000, // Adjust max tokens as needed
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`         
        }
      });

      const botReply = response.data.choices[0].text;
      res.send({ reply: botReply });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'An error occurred' });
    }
  } else {
    res.status(405).send({ error: 'Method not allowed' });
  }
};
