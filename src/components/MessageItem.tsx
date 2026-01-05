import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Alert,
} from '@mui/material';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types/api';
import { SqlQueriesPanel } from './SqlQueriesPanel';

interface MessageItemProps {
  message: Message;
}

export const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
  if (message.isUser) {
    return (
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          mb: 2,
        }}
      >
        <Paper
          elevation={1}
          sx={{
            p: 2,
            maxWidth: '70%',
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
          }}
        >
          <Typography variant="body1">{message.prompt}</Typography>
        </Paper>
      </Box>
    );
  }

  // Mensaje del bot
  if (message.error) {
    return (
      <Box sx={{ mb: 2 }}>
        <Alert severity="error">{message.error}</Alert>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'flex-start',
        mb: 2,
      }}
    >
      <Paper
        elevation={1}
        sx={{
          p: 2,
          maxWidth: '70%',
          bgcolor: 'background.paper',
        }}
      >
        {message.answer && (
          <Box
            sx={{
              '& p': { margin: '0.5em 0' },
              '& table': {
                borderCollapse: 'collapse',
                width: '100%',
                margin: '1em 0',
              },
              '& th, & td': {
                border: '1px solid #ddd',
                padding: '8px',
                textAlign: 'left',
              },
              '& th': {
                backgroundColor: '#f2f2f2',
                fontWeight: 'bold',
              },
              '& code': {
                backgroundColor: '#f4f4f4',
                padding: '2px 4px',
                borderRadius: '3px',
                fontFamily: 'monospace',
              },
              '& pre': {
                backgroundColor: '#f4f4f4',
                padding: '10px',
                borderRadius: '4px',
                overflow: 'auto',
              },
            }}
          >
            <ReactMarkdown>{message.answer}</ReactMarkdown>
          </Box>
        )}

        {message.sqlQueries && message.sqlQueries.length > 0 && (
          <SqlQueriesPanel sqlQueries={message.sqlQueries} />
        )}
      </Paper>
    </Box>
  );
};

