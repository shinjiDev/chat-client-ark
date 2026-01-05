import React from 'react';
import {
  Box,
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Container,
  Snackbar,
  Alert,
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import { useChat } from '../context/ChatContext';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';

export const ChatScreen: React.FC = () => {
  const { config, newConversation, error, clearError } = useChat();

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
      }}
    >
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            Chat Client
            {config?.useMock && (
              <Typography
                component="span"
                variant="caption"
                sx={{
                  ml: 2,
                  bgcolor: 'warning.main',
                  color: 'warning.contrastText',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                MODO MOCK
              </Typography>
            )}
          </Typography>
          <Typography variant="body2" sx={{ mr: 2 }}>
            {config?.userId} | {config?.useMock ? 'Mock Mode' : config?.serviceUrl}
          </Typography>
          <IconButton
            color="inherit"
            onClick={newConversation}
            title="Nueva conversación"
          >
            <RefreshIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container
        maxWidth="lg"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          height: 'calc(100vh - 64px)',
          p: 0,
        }}
      >
        <MessageList />
        <MessageInput />
      </Container>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={clearError}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={clearError} severity="error" sx={{ width: '100%' }}>
          {error}
        </Alert>
      </Snackbar>
    </Box>
  );
};


