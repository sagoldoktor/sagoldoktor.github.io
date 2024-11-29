// src/App.js
import React, { useState } from 'react';
import { ChatInterface } from 'llmui';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import theme from './theme'; // We'll create a theme in Step 3
import CustomMessage from './CustomMessage';

function App() {
  const [messages, setMessages] = useState([]);

  const addMessage = (sender, text) => {
    setMessages((msgs) => [...msgs, { sender, text }]);
  };

  const handleSend = async (userInput) => {
    addMessage('user', userInput);

    // Show a loading indicator
    addMessage('bot', '');

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

        // Remove the loading indicator and add the bot's reply
        setMessages((msgs) =>
          msgs.map((msg, index) =>
            index === msgs.length - 1 ? { ...msg, text: botReply } : msg
          )
        );
      } else {
        // Handle errors from the API
        throw new Error(data.error || 'Unknown error occurred');
      }
    } catch (error) {
      console.error('Error:', error);
      // Remove the loading indicator and display error message
      setMessages((msgs) =>
        msgs.map((msg, index) =>
          index === msgs.length - 1
            ? { ...msg, text: 'Lütfen tekrar deneyin.' }
            : msg
        )
      );
    }
  };

  // Convert your messages to the format expected by llmui
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
        disableSend={false}
        placeholder="Mesajınızı yazın..."
        user={{ id: 'user' }}
        renderMessage={(message) => <CustomMessage message={message} />}
      />
    </ThemeProvider>
  );
}

export default App;
