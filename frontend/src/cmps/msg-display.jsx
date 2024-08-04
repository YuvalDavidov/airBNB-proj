import React from 'react';
import { Box, Typography, Paper } from '@mui/material';

const MessageDisplay = ({ message }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
    >
      <Paper elevation={6} sx={{ padding: 3, borderRadius: 2, bgcolor: '#fff', maxWidth: '80%' }}>
        <Typography variant="h4" component="div" color="primary" gutterBottom>
          Pay attention
        </Typography>
        <Typography variant="body1" component="div" color="textSecondary">
          {message}
        </Typography>
      </Paper>
    </Box>
  );
};

export default MessageDisplay;