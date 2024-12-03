export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const userMessage = req.body.message;
  const apiUrl = 'https://api.openai.com/v1/chat/completions';

  console.log('Received user message:', userMessage); // Debugging input

  if (!userMessage) {
    console.error('No message provided in request body.');
    return res.status(400).json({ error: 'Message is required' });
  }

  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('Missing OpenAI API Key');
    }

    console.log('Sending request to OpenAI API...');
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: 'You are a friendly assistant.' },
          { role: 'user', content: userMessage },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('OpenAI API Error:', errorData);
      return res.status(response.status).json({ error: 'Failed to fetch OpenAI response', details: errorData });
    }

    const data = await response.json();
    const botReply = data.choices?.[0]?.message?.content;

    if (!botReply) {
      throw new Error('No reply received from OpenAI');
    }

    res.status(200).json({ reply: botReply });
  } catch (error) {
    console.error('Error in backend:', error.message);
    res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
