import React, { useRef, useEffect } from 'react';
import { Box } from '@mui/material';
import Message from './Message';

function ChatWindow({ messages }) {
  const chatEndRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <Box
      flex={1}
      p={2}
      overflow="auto"
      display="flex"
      flexDirection="column"
      sx={{ bgcolor: 'background.paper' }}
    >
      {messages.map((msg, index) => (
        <Message key={index} sender={msg.sender} text={msg.text} />
      ))}
      <div ref={chatEndRef} />
    </Box>
  );
}

export default ChatWindow;
