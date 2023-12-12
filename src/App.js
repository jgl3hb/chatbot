import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [input, setInput] = useState('');
  const [conversation, setConversation] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New loading state

  const sendMessage = async () => {
    setIsLoading(true); // Start loading
    try {
      const response = await axios.post('/api/chat', { message: input });
      const data = response.data;
      setConversation([...conversation, { role: 'User', content: input }, { role: 'Oracle', content: data.reply }]);
      setInput('');
    } catch (error) {
      console.error('Error sending message:', error);
    }
    setIsLoading(false); // Stop loading
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold">Oracle-GPT</h1>
      <p className='mb-4'>Powered by GPT-3.5 Turbo</p>
      <img src="/oracle.jpg" alt="Oracle" />
      <div className="flex w-full max-w-md">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-2 border-2 border-gray-300 rounded-l"
          placeholder='Ask me anything, like "Are we in the Matrix?"'
        />
        <button onClick={sendMessage} className="bg-blue-500 text-white px-4 rounded-r">
          Send
        </button>
      </div>
      {isLoading && <p>Loading...</p>} {/* Loading message */}
      <div className="mb-4 flex flex-col items-center w-full max-w-md">
        {conversation.map((msg, index) => (
          <p key={index} className={`self-${msg.role.toLowerCase() === 'user' ? 'end' : 'start'} bg-${msg.role.toLowerCase() === 'user' ? 'blue-300' : 'green-300'} p-2 rounded my-1`}>
            <b>{msg.role}:</b> {msg.content}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
