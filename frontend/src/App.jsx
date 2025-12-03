import React, { useState, useEffect } from 'react';
import ChatInterface from './components/ChatInterface';
import Sidebar from './components/Sidebar';
import { checkHealth, uploadPDF, sendChatMessage, clearKnowledgeBase } from './services/api';
import './App.css';

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Check backend health on mount
    const checkBackend = async () => {
      try {
        await checkHealth();
        setIsConnected(true);
      } catch (error) {
        setIsConnected(false);
        console.error('Backend not connected:', error);
      }
    };

    checkBackend();
    // Check health every 30 seconds
    const interval = setInterval(checkBackend, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleUploadPDF = async (file) => {
    try {
      const result = await uploadPDF(file);
      return result;
    } catch (error) {
      throw error;
    }
  };

  const handleSendMessage = async (query) => {
    if (!isConnected) {
      alert('Backend is not connected. Please start the FastAPI server.');
      return;
    }

    // Add user message immediately
    const userMessage = { role: 'user', content: query };
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Prepare chat history for API
      const chatHistory = messages.map((msg) => ({
        role: msg.role,
        content: msg.content,
      }));

      const response = await sendChatMessage(query, chatHistory);

      // Add assistant message
      const assistantMessage = {
        role: 'assistant',
        content: response.response,
        sources: response.sources || [],
      };
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      // Add error message
      const errorMessage = {
        role: 'assistant',
        content: `Error: ${error.message}`,
        sources: [],
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearKnowledge = async () => {
    try {
      await clearKnowledgeBase();
      // Clear chat messages as well
      setMessages([]);
    } catch (error) {
      throw error;
    }
  };

  return (
    <div className="app">
      <Sidebar
        onUploadPDF={handleUploadPDF}
        onClearKnowledge={handleClearKnowledge}
        isConnected={isConnected}
      />
      <ChatInterface
        messages={messages}
        onSendMessage={handleSendMessage}
        isLoading={isLoading}
      />
    </div>
  );
}

export default App;
