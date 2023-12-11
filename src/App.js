import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);

  const sendMessage = async () => {
    const response = await fetch('http://localhost:3001/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message: input })
    });
    const data = await response.json();
    setConversation([...conversation, { role: 'User', content: input }, { role: 'Oracle', content: data.reply }]);
    setInput('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">GPT Oracle</h1>
      <div className="flex w-full max-w-md">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border-2 border-gray-300 rounded-l"
          placeholder="Type your message..."
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">
          Send
        </button>
      </div>
      <div className="mb-4 flex flex-col items-center w-full max-w-md">
        {conversation.map((msg, index) => (
          <p key={index} className={`self-${msg.role === 'user' ? 'end' : 'start'} bg-${msg.role === 'user' ? 'blue-300' : 'green-300'} p-2 rounded my-1`}>
            <b>{msg.role}:</b> {msg.content}
          </p>
        ))}
      </div>
    </div>
  );
}


export default App;