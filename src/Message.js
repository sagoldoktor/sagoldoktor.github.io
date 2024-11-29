// src/Message.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './App.css';

function Message({ sender, text }) {
  const isUser = sender === 'user';

  return (
    <div className={`message ${isUser ? 'user' : 'assistant'}`}>
      <div className="message-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
      </div>
    </div>
  );
}

export default Message;
