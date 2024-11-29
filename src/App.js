// src/App.js
import React, { useState } from 'react';
import { ChatInterface } from 'llmui';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme';
import CustomMessage from './CustomMessage';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const addMessage = (sender, text) => {
    setMessages((msgs) => [...msgs, { sender, text }]);
  };

  const handleSend = async (userInput) => {
    addMessage('user', userInput);
    setIsLoading(true);

    try {
      const response = await fetch('https://vbejdnajxe.execute-api.us-east-2.amazonaws.com/prod/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: userInput }),
      });

      const data = await response.json();

      if (response.ok) {
        const botReply = data.choices[0].message.content;

        // Add the bot's reply
        addMessage('bot', botReply);
      } else {
        // Handle errors from the API
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      // Add error message
      addMessage('bot', 'Lütfen tekrar deneyin.');
    } finally {
      setIsLoading(false);
    }
  };

  const formattedMessages = messages.map((msg) => ({
    role: msg.sender === 'user' ? 'user' : 'assistant',
    content: msg.text,
  }));

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ChatInterface
        messages={formattedMessages}
        onSendMessage={handleSend}
        isLoading={isLoading}
        placeholder="Mesajınızı yazın..."
        user={{ id: 'user' }}
        renderMessage={(message) => <CustomMessage message={message} />}
      />
    </ThemeProvider>
  );
}

export default App;
