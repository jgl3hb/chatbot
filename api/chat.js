require('dotenv').config();
const axios = require('axios');

module.exports = async (req, res) => {
  if (req.method === 'POST') {
    const userMessage = req.body.message;
    const apiUrl = 'https://api.openai.com/v1/chat/completions';

    try {
      const response = await axios.post(apiUrl, {
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userMessage }]
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + apiKey 
          
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
