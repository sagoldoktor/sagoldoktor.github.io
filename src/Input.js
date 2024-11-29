import React, { useState } from 'react';
import { Box, TextField, IconButton, Paper } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

function Input({ onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === '') return;
    onSend(text);
    setText('');
  };

  return (
    <Paper component="form" onSubmit={handleSubmit} sx={{ p: '4px', display: 'flex' }}>
      <TextField
        variant="standard"
        placeholder="Type your message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        fullWidth
        InputProps={{ disableUnderline: true }}
        sx={{ ml: 1 }}
      />
      <IconButton type="submit" color="primary">
        <SendIcon />
      </IconButton>
    </Paper>
  );
}

export default Input;
