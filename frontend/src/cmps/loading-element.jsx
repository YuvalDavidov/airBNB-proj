import React from 'react';
import { CircularProgress, Typography, Box } from '@mui/material';

const LoadingElement = ({ text }) => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="100vh"
      p={3}
    >
      <CircularProgress size={80} />
      <Typography variant="h6" component="div" mt={3} color="primary">
        {text}
      </Typography>
    </Box>
  );
};

export default LoadingElement;