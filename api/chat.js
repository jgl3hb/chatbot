const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const userMessage = req.body.message;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
      const prompt = `You are the Oracle from the Matrix. Wise and insightful, you speak in a mysterious yet understanding manner. A user is asking you questions, and you respond as the Oracle would.`;

      const response = await axios.post(apiUrl, {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: userMessage }
        ]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`         
        }
      });

      const botReply = response.data.choices[0].message.content;
      res.send({ reply: botReply });
    } catch (error) {
      console.error(error);
      res.status(500).send({ error: 'An error occurred' });
    }
  } else {
    res.status(405).send({ error: 'Method not allowed' });
  }
};
