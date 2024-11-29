// src/Input.js
import React, { useState } from 'react';
import './App.css';

function Input({ onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Mesajınızı girin..."
      />
      <IconButton type="submit" color="primary">
        <SendIcon />
      </IconButton>
    </form>
  );
}

export default Input;
