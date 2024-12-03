// /home/jgl3hb/hack/chatbot/src/App.js
import React, { useState } from 'react';
import axios from 'axios';
// import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.post('http://localhost:3001/api/chat', { message: input });
      const data = response.data;
      setConversation([...conversation, { role: 'User', content: input }, { role: 'Oracle', content: data.reply }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
      setError('Failed to send message. Please try again later.');
    }
    setIsLoading(false);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      {/* <h1 className="text-2xl font-bold">Ask Roscoe</h1> */}
      <img 
        className="w-32"
        src="/roscoe.png" alt="Oracle" />
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      <div className="mb-4 flex flex-col items-center w-full max-w-md">
        {conversation.map((msg, index) => (
          <p key={index} className={`self-${msg.role.toLowerCase() === 'user' ? 'end' : 'start'} bg-${msg.role.toLowerCase() === 'user' ? 'blue-300' : 'green-300'} p-2 rounded my-1`}>
            <b>{msg.role}:</b> {msg.content}
          </p>
        ))}
      </div>
      <div className="flex w-full max-w-md">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 p-2 border-2 border-gray-300 rounded-l"
          placeholder="Ask Roscoe..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
