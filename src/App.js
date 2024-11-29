import React, { useState } from 'react';
import { Box, CssBaseline, AppBar, Toolbar, Typography } from '@mui/material';
import ChatWindow from './ChatWindow';
import Input from './Input';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (sender, text) => {
    setMessages((msgs) => [...msgs, { sender, text }]);
  };

  const handleSend = async (userInput) => {
    addMessage('user', userInput);
    addMessage('bot', 'Thinking...');

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await response.json();
      const botReply = data.choices[0].message.content;

      setMessages((msgs) =>
        msgs.map((msg, index) =>
          index === msgs.length - 1 ? { ...msg, text: botReply } : msg
        )
      );
    } catch (error) {
      console.error('Error:', error);
      setMessages((msgs) =>
        msgs.map((msg, index) =>
          index === msgs.length - 1
            ? { ...msg, text: 'Sorry, something went wrong.' }
            : msg
        )
      );
    }
  };

  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">Medical Chat Assistant</Typography>
        </Toolbar>
      </AppBar>
      <Box display="flex" flexDirection="column" height="calc(100vh - 64px)">
        <ChatWindow messages={messages} />
        <Input onSend={handleSend} />
      </Box>
    </>
  );
}

export default App;
