import React from 'react'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot } from 'lucide-react'
import MessageBubble from './MessageBubble'
import TypingIndicator from './TypingIndicator'
import InputArea from './InputArea'

const ChatArea = ({
    messages = [],
    loading = false,
    onSendMessage,
    onImageGenerated
}) => {
    const messagesEndRef = useRef(null)
    const [showWelcome, setShowWelcome] = useState(true)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages])

    useEffect(() => {
        if (messages.length > 0) {
            setShowWelcome(false)
        }
    }, [messages])

    const handleSend = (message, files = []) => {
        if (!message.trim() && files.length === 0) return
        onSendMessage(message, files)
    }

    const handleEditMessage = (messageId, newContent) => {
        // TODO: Implement message editing
        console.log('Edit message:', messageId, newContent)
    }

    const handleDeleteMessage = (messageId) => {
        // TODO: Implement message deletion
        console.log('Delete message:', messageId)
    }

    return (
        <div className="flex-1 flex flex-col min-h-0" style={{ backgroundColor: 'var(--color-chatBg)' }}>
            {/* Header */}
            <div className="px-6 py-4 border-b" style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)'
            }}>
                <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{
                        background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`
                    }}>
                        <Bot className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold" style={{ color: 'var(--color-textPrimary)' }}>SageAI</h2>
                        <p className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>
                            {loading ? 'Thinking...' : 'Ready to help'}
                        </p>
                    </div>
                </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-6">
                <AnimatePresence>
                    {showWelcome && messages.length === 0 && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="flex flex-col items-center justify-center h-full text-center"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 }}
                                className="mb-6"
                            >
                                <img 
                                    src="/sage-ai-logo.png" 
                                    alt="SageAI" 
                                    className="h-28 w-28 rounded-lg"
                                />
                            </motion.div>

                            <motion.h1
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                className="text-3xl font-bold mb-4"
                                style={{ color: 'var(--color-textPrimary)' }}
                            >
                                Welcome to SageAI
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.4 }}
                                className="text-lg mb-8 max-w-md"
                                style={{ color: 'var(--color-textSecondary)' }}
                            >
                                Your intelligent AI assistant ready to help with any task.
                                Ask me anything!
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl w-full"
                            >
                                {[
                                    "Write a professional email",
                                    "Explain a complex concept",
                                    "Help me brainstorm ideas",
                                    "Review and improve my code"
                                ].map((suggestion, index) => (
                                    <motion.button
                                        key={suggestion}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.6 + index * 0.1 }}
                                        onClick={() => handleSend(suggestion)}
                                        className="p-4 rounded-lg border transition-all duration-200 text-left"
                                        style={{
                                            backgroundColor: 'var(--color-surface)',
                                            borderColor: 'var(--color-border)'
                                        }}
                                    >
                                        <div className="text-sm font-medium mb-1" style={{ color: 'var(--color-textPrimary)' }}>
                                            💡
                                        </div>
                                        <div className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>
                                            {suggestion}
                                        </div>
                                    </motion.button>
                                ))}
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Messages */}
                <div className="space-y-6">
                    <AnimatePresence>
                        {messages.map((message, index) => (
                            <MessageBubble
                                key={message.id || index}
                                message={message.content}
                                isUser={message.role === 'user'}
                                timestamp={message.timestamp}
                                type={message.type || 'text'}
                                onEdit={(newContent) => handleEditMessage(message.id, newContent)}
                                onDelete={() => handleDeleteMessage(message.id)}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Typing Indicator */}
                    {loading && <TypingIndicator />}
                </div>

                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <InputArea
                onSend={handleSend}
                loading={loading}
                disabled={false}
                onImageGenerated={onImageGenerated}
            />
        </div>
    )
}

export default ChatArea 