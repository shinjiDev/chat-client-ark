import React from 'react';
import { ChatProvider, useChat } from './context/ChatContext';
import { ConfigScreen } from './components/ConfigScreen';
import { ChatScreen } from './components/ChatScreen';

const AppContent: React.FC = () => {
  const { config } = useChat();

  if (!config) {
    return <ConfigScreen />;
  }

  return <ChatScreen />;
};

const App: React.FC = () => {
  return (
    <ChatProvider>
      <AppContent />
    </ChatProvider>
  );
};

export default App;

