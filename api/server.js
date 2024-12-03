// /home/jgl3hb/hack/chatbot/api/server.js
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const chatRoute = require('./chat');

const app = express();
const port = 3001;

const corsOptions = {
  origin: ['http://localhost:3000', 'https://your-app.vercel.app'], // Include your Vercel URL
  methods: 'GET,POST',
  optionsSuccessStatus: 200
};


// Apply CORS middleware
app.use(cors(corsOptions));

app.use(bodyParser.json());

app.post('/api/chat', chatRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:3001`);
});
