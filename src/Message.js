import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import PersonIcon from '@mui/icons-material/Person';

function Message({ sender, text }) {
  const isUser = sender === 'user';

  return (
    <Box
      display="flex"
      flexDirection={isUser ? 'row-reverse' : 'row'}
      alignItems="flex-start"
      my={1}
    >
      <Avatar sx={{ bgcolor: isUser ? 'primary.main' : 'secondary.main' }}>
        {isUser ? <PersonIcon /> : <LocalHospitalIcon />}
      </Avatar>
      <Box
        mx={1}
        p={2}
        borderRadius={2}
        bgcolor={isUser ? 'primary.light' : 'grey.200'}
        maxWidth="70%"
      >
        <Typography variant="body1">{text}</Typography>
      </Box>
    </Box>
  );
}

export default Message;
