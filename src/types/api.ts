export interface ChatRequest {
  Prompt: string;
  ConversationId: string;
}

export interface ChatResponseData {
  prompt: string;
  answer: string;
  tokens: number;
  promptTokens: number;
  completionTokens: number;
  requestDate: string;
  requestId: string;
  suggestedQuestions: string[];
  requestTime: number;
  conversationId: string;
  suggestedPrompt: string;
  sqlQueries: string[];
}

export interface ChatResponse {
  data: ChatResponseData;
  success: boolean;
  message: string;
  _links: Record<string, unknown>;
}

export interface ChatConfig {
  userId: string;
  serviceUrl: string;
  userEmail?: string;
  attachmentUri?: string;
  useMock?: boolean;
}

export interface Message {
  id: string;
  prompt: string;
  answer?: string;
  sqlQueries?: string[];
  timestamp: Date;
  isUser: boolean;
  error?: string;
}

