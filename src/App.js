// src/App.js
import React, { useState, useEffect } from 'react';
import ChatWindow from './ChatWindow';
import Input from './Input';
import './App.css';
import ScrollToTop from './ScrollToTop';
import { v4 as uuidv4 } from 'uuid';
import { Button } from '@mui/material';

const getUserId = () => {
  let userId = localStorage.getItem('userId');
  if (!userId) {
    userId = uuidv4();
    localStorage.setItem('userId', userId);
  }
  return userId;
};

function App() {
  const userId = getUserId();
  const [messages, setMessages] = useState([]);

  // Load chat history on component mount
  useEffect(() => {
    const savedMessages = localStorage.getItem(`chatHistory_${userId}`);
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    }
  }, [userId]);

  // Save chat history whenever messages change
  useEffect(() => {
    localStorage.setItem(`chatHistory_${userId}`, JSON.stringify(messages));
  }, [messages, userId]);
  
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

    // Define the handleClearChat function
  const handleClearChat = () => {
    // Clear messages from state
    setMessages([]);

    // Optional: Clear messages from localStorage if you're using it
    localStorage.removeItem(`chatHistory_${userId}`);
  };

  return (
    <div className="app">
      <header className="chat-header">
        <h1>Sağol Doktor</h1>
        <button className="clear-chat-button" onClick={handleClearChat}>
          Sohbeti Temizle
        </button>
      </header>
      <div className="chat-container">
        <ChatWindow messages={messages} />
        <Input onSend={handleSend} />
        <ScrollToTop />
      </div>
    </div>
  );
}

export default App;

