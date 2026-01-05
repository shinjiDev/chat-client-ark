import axios, { AxiosError } from 'axios';
import { ChatRequest, ChatResponse, ChatConfig } from '../types/api';
import { sendMockMessage } from './mockChatService';

/**
 * Envía un mensaje al API de chat
 * @param prompt - El mensaje del usuario
 * @param conversationId - El ID de la conversación (GUID)
 * @param config - Configuración del chat (userId, serviceUrl, etc.)
 * @returns La respuesta del API
 * @throws Error si la petición falla
 */
export async function sendMessage(
  prompt: string,
  conversationId: string,
  config: ChatConfig
): Promise<ChatResponse> {
  // Si el modo mock está activo, usar el servicio mock
  if (config.useMock) {
    return sendMockMessage(prompt, conversationId);
  }

  try {
    const requestBody: ChatRequest = {
      Prompt: prompt,
      ConversationId: conversationId,
    };

    const headers = {
      UserId: config.userId,
      UserEmail: config.userEmail || 'oscar.vivas@arkanosoft.com',
      AttachmentUri: config.attachmentUri || 'localhost',
      'Content-Type': 'application/json',
    };

    // Si estamos en desarrollo y la URL es localhost, usar proxy de Vite
    const isDevelopment = import.meta.env.DEV;
    const isLocalhost = config.serviceUrl.includes('localhost') || config.serviceUrl.includes('127.0.0.1');
    
    let url: string;
    if (isDevelopment && isLocalhost) {
      // Usar proxy de Vite para evitar CORS
      url = `/api/query`;
    } else {
      url = `${config.serviceUrl}/api/query`;
    }

    const response = await axios.post<ChatResponse>(url, requestBody, {
      headers,
    });

    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const axiosError = error as AxiosError<ChatResponse>;
      if (axiosError.response) {
        // El servidor respondió con un código de error
        throw new Error(
          axiosError.response.data?.message ||
            `Error del servidor: ${axiosError.response.status}`
        );
      } else if (axiosError.request) {
        // La petición se hizo pero no hubo respuesta
        throw new Error(
          'No se pudo conectar con el servidor. Verifica que la URL sea correcta y que el servicio esté corriendo.'
        );
      }
    }
    throw new Error(
      error instanceof Error ? error.message : 'Error desconocido al enviar el mensaje'
    );
  }
}

