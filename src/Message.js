// src/Message.js
import React from 'react';
import './App.css';

function Message({ sender, text }) {
  const isUser = sender === 'user';

  return (
    <div className={`message ${isUser ? 'user' : 'assistant'}`}>
      <div className="message-content">
        {text}
      </div>
    </div>
  );
}

export default Message;
