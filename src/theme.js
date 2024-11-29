// src/theme.js
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0d47a1', // Deep blue for user messages
    },
    secondary: {
      main: '#1565c0', // Lighter blue for assistant messages
    },
    background: {
      default: '#e3f2fd', // Light blue background
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export default theme;
