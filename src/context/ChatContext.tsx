import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';
import { ChatConfig, Message } from '../types/api';
import { generateGuid } from '../utils/guid';
import { sendMessage as sendMessageService } from '../services/chatService';

interface ChatContextType {
  config: ChatConfig | null;
  messages: Message[];
  conversationId: string;
  isLoading: boolean;
  error: string | null;
  setConfig: (config: ChatConfig) => void;
  sendMessage: (prompt: string) => Promise<void>;
  newConversation: () => void;
  clearError: () => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const useChat = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChat debe ser usado dentro de ChatProvider');
  }
  return context;
};

interface ChatProviderProps {
  children: ReactNode;
}

export const ChatProvider: React.FC<ChatProviderProps> = ({ children }) => {
  const [config, setConfigState] = useState<ChatConfig | null>(() => {
    // Intentar cargar desde localStorage
    const saved = localStorage.getItem('chatConfig');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        return null;
      }
    }
    return null;
  });

  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationId, setConversationId] = useState<string>(generateGuid());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const setConfig = useCallback((newConfig: ChatConfig) => {
    setConfigState(newConfig);
    localStorage.setItem('chatConfig', JSON.stringify(newConfig));
  }, []);

  const sendMessage = useCallback(
    async (prompt: string) => {
      if (!config) {
        setError('Por favor configura el UserId y ServiceURL primero');
        return;
      }

      if (!prompt.trim()) {
        return;
      }

      // Generar nuevo ConversationId para cada request
      const newConversationId = generateGuid();
      setConversationId(newConversationId);

      // Agregar mensaje del usuario
      const userMessage: Message = {
        id: generateGuid(),
        prompt,
        timestamp: new Date(),
        isUser: true,
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);
      setError(null);

      try {
        const response = await sendMessageService(prompt, newConversationId, config);

        const botMessage: Message = {
          id: generateGuid(),
          prompt,
          answer: response.data.answer,
          sqlQueries: response.data.sqlQueries,
          timestamp: new Date(response.data.requestDate),
          isUser: false,
        };

        setMessages((prev) => [...prev, botMessage]);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Error desconocido';
        setError(errorMessage);

        const errorMessageObj: Message = {
          id: generateGuid(),
          prompt,
          timestamp: new Date(),
          isUser: false,
          error: errorMessage,
        };

        setMessages((prev) => [...prev, errorMessageObj]);
      } finally {
        setIsLoading(false);
      }
    },
    [config]
  );

  const newConversation = useCallback(() => {
    setMessages([]);
    setConversationId(generateGuid());
    setError(null);
  }, []);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return (
    <ChatContext.Provider
      value={{
        config,
        messages,
        conversationId,
        isLoading,
        error,
        setConfig,
        sendMessage,
        newConversation,
        clearError,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};

