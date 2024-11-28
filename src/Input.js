// src/Input.js
import React, { useState } from 'react';

function Input({ onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="input-form">
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Lütfen mesajınızı girin..."
      />
      <button type="submit">Send</button>
    </form>
  );
}

export default Input;
