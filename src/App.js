// src/App.js
import React, { useState } from 'react';
import ChatWindow from './ChatWindow';
import Input from './Input';
import './App.css';
import ScrollToTop from './ScrollToTop';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (sender, text) => {
    setMessages((msgs) => [...msgs, { sender, text }]);
  };

  const handleSend = async (userInput) => {
    addMessage('user', userInput);
    addMessage('assistant', 'Araştırıyorum...');

    try {
      const response = await fetch('https://vbejdnajxe.execute-api.us-east-2.amazonaws.com/prod/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await response.json();
      const assistantReply = data.choices[0].message.content;

      setMessages((msgs) =>
        msgs.map((msg, index) =>
          index === msgs.length - 1 ? { ...msg, text: assistantReply } : msg
        )
      );
    } catch (error) {
      console.error('Error:', error);
      setMessages((msgs) =>
        msgs.map((msg, index) =>
          index === msgs.length - 1
            ? { ...msg, text: 'Üzgünüm, hata oldu...' }
            : msg
        )
      );
    }
  };

  return (
    <div className="app">
    <div className="chat-container">
    <ChatWindow messages={messages} />
    <Input onSend={handleSend} />
    <ScrollToTop />
    </div>
    </div>
  );
}

export default App;

