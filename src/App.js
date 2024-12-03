import React, { useState } from 'react';
import axios from 'axios';

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
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: input }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to send message');
      }
  
      const data = await response.json();
      setConversation((prev) => [
        ...prev,
        { role: 'User', content: input },
        { role: 'Roscoe', content: data.reply },
      ]);
      setInput('');
    } catch (err) {
      console.error('Error sending message:', err);
      setError(err.message || 'An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-4">
      <img src="/roscoe.png" alt="Oracle" className="w-32" />
      <div className="w-full max-w-md">
        <div className="mb-4">
          {conversation.map((msg, index) => (
            <p key={index} className={`my-2 p-2 rounded ${msg.role === 'User' ? 'bg-secondaryBlue' : 'bg-primaryBlue'}`}>
              <b>{msg.role}:</b> {msg.content}
            </p>
          ))}
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {isLoading && <p className="text-gray-500">Loading...</p>}
        <div className="flex">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask Roscoe..."
            className="flex-grow p-2 border rounded-l"
          />
          <button onClick={sendMessage} disabled={isLoading} className="bg-blue-500 text-white px-4 rounded-r">
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
