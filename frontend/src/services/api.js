import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/health');
    return response.data;
  } catch (error) {
    throw new Error('Backend is not responding');
  }
};

// Upload PDF
export const uploadPDF = async (file, onProgress) => {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await api.post('/upload-pdf', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress: (progressEvent) => {
        const percentCompleted = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        if (onProgress) onProgress(percentCompleted);
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.detail || 'Failed to upload PDF');
  }
};

// Send chat message
export const sendChatMessage = async (query, chatHistory = []) => {
  try {
    const response = await api.post('/chat', {
      query,
      chat_history: chatHistory,
    });
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || 'Failed to get response from chatbot'
    );
  }
};

// Clear knowledge base
export const clearKnowledgeBase = async () => {
  try {
    const response = await api.delete('/clear-knowledge-base');
    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.detail || 'Failed to clear knowledge base'
    );
  }
};
