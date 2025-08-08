import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Sidebar from "../Sidebar/Sidebar";
import ChatArea from "../Chat/ChatArea";
import { useToast } from "../../context/ToastContext";

// ErrorBoundary component for fallback UI
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    // You can log errorInfo here if needed
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-4">
            Something went wrong
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mb-2">
            {this.state.error?.message || "An unexpected error occurred."}
          </p>
          <button
            className="px-4 py-2 bg-blue-600 text-white rounded-lg mt-4"
            onClick={() => window.location.reload()}
          >
            Reload
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

// localStorage keys
const STORAGE_KEYS = {
  CHATS: "sageai_chats",
  CHAT_MESSAGES: "sageai_chat_messages",
  CURRENT_CHAT_ID: "sageai_current_chat_id",
  SIDEBAR_COLLAPSED: "sageai_sidebar_collapsed",
};

// Helper functions for localStorage
const loadFromStorage = (key, defaultValue) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error(`Error loading ${key} from localStorage:`, error);
    return defaultValue;
  }
};

const saveToStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
  }
};

const MainLayout = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() =>
    loadFromStorage(STORAGE_KEYS.SIDEBAR_COLLAPSED, false)
  );
  const [currentChatId, setCurrentChatId] = useState(() =>
    loadFromStorage(STORAGE_KEYS.CURRENT_CHAT_ID, null)
  );
  const [chats, setChats] = useState(() =>
    loadFromStorage(STORAGE_KEYS.CHATS, [])
  );
  const [chatMessages, setChatMessages] = useState(() =>
    loadFromStorage(STORAGE_KEYS.CHAT_MESSAGES, {})
  );
  const [loading, setLoading] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const toast = useToast();

  // Save chats to localStorage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CHATS, chats);
  }, [chats]);

  // Save chat messages to localStorage whenever they change
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CHAT_MESSAGES, chatMessages);
  }, [chatMessages]);

  // Save current chat ID to localStorage whenever it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.CURRENT_CHAT_ID, currentChatId);
  }, [currentChatId]);

  // Save sidebar collapsed state to localStorage whenever it changes
  useEffect(() => {
    saveToStorage(STORAGE_KEYS.SIDEBAR_COLLAPSED, sidebarCollapsed);
  }, [sidebarCollapsed]);

  // Show notification when chats are loaded from storage
  useEffect(() => {
    if (chats.length > 0) {
      toast.success(`${chats.length} chat(s) loaded from memory`);
    }
  }, []); // Only run once on mount

  // Function to clear all stored data
  const clearAllData = () => {
    setShowClearConfirm(true);
  };

  const handleConfirmClearAll = () => {
    setChats([]);
    setChatMessages({});
    setCurrentChatId(null);
    setSidebarCollapsed(false);

    // Clear localStorage
    Object.values(STORAGE_KEYS).forEach((key) => {
      localStorage.removeItem(key);
    });

    setShowClearConfirm(false);
    toast.success("All data cleared successfully");
  };

  const handleImageGenerated = (imageData) => {
    if (!currentChatId) {
      handleNewChat();
      // Wait for new chat to be created
      setTimeout(() => handleImageGenerated(imageData), 100);
      return;
    }

    const imageMessage = {
      id: Date.now().toString(),
      role: "assistant",
      content: imageData,
      type: "image",
      timestamp: new Date().toISOString(),
    };

    // Add image message to current chat
    setChatMessages((prev) => ({
      ...prev,
      [currentChatId]: [...(prev[currentChatId] || []), imageMessage],
    }));

    // Update chat title if this is the first message
    const currentChatMessages = chatMessages[currentChatId] || [];
    if (currentChatMessages.length === 0) {
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? {
              ...chat,
              title: `Generated: ${imageData.prompt.slice(0, 30)}...`,
              updatedAt: new Date().toISOString(),
            }
            : chat
        )
      );
    } else {
      // Update last activity time
      setChats((prev) =>
        prev.map((chat) =>
          chat.id === currentChatId
            ? { ...chat, updatedAt: new Date().toISOString() }
            : chat
        )
      );
    }
  };

  // Get current chat messages
  const currentMessages = currentChatId
    ? chatMessages[currentChatId] || []
    : [];

  const handleNewChat = () => {
    const newChat = {
      id: Date.now().toString(),
      title: "New Chat",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setChats((prev) => [newChat, ...prev]);
    setCurrentChatId(newChat.id);
    // Initialize empty messages for new chat
    setChatMessages((prev) => ({
      ...prev,
      [newChat.id]: [],
    }));
    toast.success("New chat created!");
  };

  const handleSelectChat = (chatId) => {
    setCurrentChatId(chatId);
    // Messages are already stored in chatMessages state
  };

  const handleDeleteChat = (chatId) => {
    setChats((prev) => prev.filter((chat) => chat.id !== chatId));
    // Remove messages for deleted chat
    setChatMessages((prev) => {
      const newMessages = { ...prev };
      delete newMessages[chatId];
      return newMessages;
    });
    if (currentChatId === chatId) {
      setCurrentChatId(null);
    }
    toast.success("Chat deleted successfully");
  };

  const handleSendMessage = async (message, files = []) => {
    if (!currentChatId) {
      handleNewChat();
      // Wait for new chat to be created
      setTimeout(() => handleSendMessage(message, files), 100);
      return;
    }

    const userMessage = {
      id: Date.now().toString(),
      role: "user",
      content: message,
      timestamp: new Date().toISOString(),
      files: files.map((f) => f.name),
    };

    // Add user message to current chat
    setChatMessages((prev) => ({
      ...prev,
      [currentChatId]: [...(prev[currentChatId] || []), userMessage],
    }));

    setLoading(true);

    try {
      let fileIds = [];
      if (files && files.length > 0) {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          toast.info(`Uploading file: ${file.name}`);
          const uploadRes = await fetch("http://localhost:5001/api/upload", {
            method: "POST",
            body: formData,
          });
          if (!uploadRes.ok) {
            toast.error(`Failed to upload file: ${file.name}`);
            continue;
          }
          const uploadData = await uploadRes.json();
          if (uploadData.file_id) {
            fileIds.push(uploadData.file_id);
            toast.success(`File uploaded: ${file.name}`);
          } else {
            toast.error(`No file_id returned for: ${file.name}`);
          }
        }
      }

      // Make API call to Groq backend
      const response = await fetch("http://localhost:5001/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message, file_ids: fileIds }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      const aiMessage = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.response,
        timestamp: new Date().toISOString(),
      };

      // Add AI message to current chat
      setChatMessages((prev) => ({
        ...prev,
        [currentChatId]: [...(prev[currentChatId] || []), aiMessage],
      }));

      // Update chat title with first message
      const currentChatMessages = chatMessages[currentChatId] || [];
      if (currentChatMessages.length === 0) {
        setChats((prev) =>
          prev.map((chat) =>
            chat.id === currentChatId
              ? {
                ...chat,
                title:
                  message.slice(0, 50) + (message.length > 50 ? "..." : ""),
                updatedAt: new Date().toISOString(),
              }
              : chat
          )
        );
      } else {
        // Update last activity time
        setChats((prev) =>
          prev.map((chat) =>
            chat.id === currentChatId
              ? { ...chat, updatedAt: new Date().toISOString() }
              : chat
          )
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error(
        "Failed to send message: " + (error?.message || "Unknown error")
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <ErrorBoundary>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex h-screen"
        style={{ backgroundColor: "var(--color-chatBg)" }}
      >
        {/* Sidebar */}
        <Sidebar
          chats={chats}
          currentChatId={currentChatId}
          onNewChat={handleNewChat}
          onSelectChat={handleSelectChat}
          onDeleteChat={handleDeleteChat}
          onClearAllData={clearAllData}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-h-0">
          {currentChatId ? (
            <ChatArea
              messages={currentMessages}
              loading={loading}
              onSendMessage={handleSendMessage}
              onImageGenerated={handleImageGenerated}
              currentChatId={currentChatId}
            />
          ) : (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <h2
                  className="text-2xl font-semibold mb-4"
                  style={{ color: "var(--color-textPrimary)" }}
                >
                  Welcome to SageAI
                </h2>
                <p
                  className="mb-6"
                  style={{ color: "var(--color-textSecondary)" }}
                >
                  Start a new conversation to begin chatting with your AI
                  assistant.
                </p>
                <button
                  onClick={handleNewChat}
                  className="px-6 py-3 rounded-lg transition-colors"
                  style={{
                    backgroundColor: "var(--color-buttonBg)",
                    color: "white",
                  }}
                >
                  Start New Chat
                </button>
              </div>
            </div>
          )}
        </div>
      </motion.div>

      {/* Clear All Data Confirmation Modal */}
      <AnimatePresence>
        {showClearConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
            onClick={() => setShowClearConfirm(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="p-6 max-w-sm mx-4 rounded-lg"
              style={{
                backgroundColor: "var(--color-surface)",
                border: "1px solid var(--color-border)",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h3
                className="text-lg font-semibold mb-4"
                style={{ color: "var(--color-textPrimary)" }}
              >
                Clear All Data
              </h3>
              <p
                className="text-sm mb-6"
                style={{ color: "var(--color-textSecondary)" }}
              >
                Are you sure you want to clear all chats and data? This action
                cannot be undone and will remove all your conversation history.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowClearConfirm(false)}
                  className="flex-1 px-4 py-2 rounded-lg border transition-colors"
                  style={{
                    backgroundColor: "var(--color-inputBg)",
                    borderColor: "var(--color-border)",
                    color: "var(--color-textPrimary)",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleConfirmClearAll}
                  className="flex-1 px-4 py-2 rounded-lg transition-colors"
                  style={{
                    backgroundColor: "#ef4444",
                    color: "white",
                  }}
                >
                  Clear All
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ErrorBoundary>
  );
};

export default MainLayout;
