import React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Copy, Check, MoreVertical, Edit, Trash2, Download, Image, X } from 'lucide-react'
import { cn } from '../../utils/cn'
import Button from '../ui/Button'
import { useToast } from '../../context/ToastContext'

const MessageBubble = ({ message, isUser, timestamp, onEdit, onDelete, type = 'text' }) => {
    const [showActions, setShowActions] = useState(false)
    const [copied, setCopied] = useState(false)
    const [showFullSizeImage, setShowFullSizeImage] = useState(false)
    const toast = useToast()

    const copyToClipboard = async () => {
        try {
            if (type === 'image') {
                // For images, copy the prompt
                const prompt = message.prompt || 'Generated image'
                await navigator.clipboard.writeText(prompt)
                toast.success('Image prompt copied to clipboard!')
            } else {
                await navigator.clipboard.writeText(message)
                toast.success('Message copied to clipboard!')
            }
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Failed to copy text: ', err)
            toast.error('Failed to copy message')
        }
    }

    const downloadImage = () => {
        if (type === 'image' && message.image) {
            const link = document.createElement('a')
            link.href = message.image
            link.download = `generated-image-${Date.now()}.png`
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
            toast.success('Image downloaded!')
        }
    }

    const formatTime = (timestamp) => {
        if (!timestamp) return ''
        const date = new Date(timestamp)
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }

    const renderContent = () => {
        if (type === 'image') {
            return (
                <div className="space-y-3">
                    {message.prompt && (
                        <div className="text-sm leading-relaxed">
                            <strong>Prompt:</strong> {message.prompt}
                        </div>
                    )}
                    {message.image && (
                        <div className="relative">
                            <img
                                src={message.image}
                                alt={message.prompt || 'Generated image'}
                                className="max-w-full h-auto rounded-lg border cursor-pointer hover:opacity-90 transition-opacity"
                                style={{
                                    borderColor: 'var(--color-border)',
                                    maxHeight: '300px',
                                    objectFit: 'contain'
                                }}
                                onClick={() => setShowFullSizeImage(true)}
                                title="Click to view full size"
                            />
                        </div>
                    )}
                </div>
            )
        }

        return (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
                {message}
            </div>
        )
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className={cn(
                "group relative flex w-full",
                isUser ? "justify-end" : "justify-start"
            )}
        >
            <div className="flex max-w-[80%] items-start space-x-3">
                {!isUser && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-medium shadow-lg"
                        style={{
                            background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`
                        }}
                    >
                        {type === 'image' ? <Image className="h-4 w-4" /> : 'AI'}
                    </motion.div>
                )}

                <div className="relative">
                    <motion.div
                        className="rounded-2xl px-4 py-3 shadow-sm"
                        style={{
                            backgroundColor: isUser ? 'var(--color-userMessage)' : 'var(--color-aiMessage)',
                            color: isUser ? 'white' : 'var(--color-textPrimary)',
                            border: isUser ? 'none' : `1px solid var(--color-border)`
                        }}
                        whileHover={{ scale: 1.01 }}
                    >
                        {renderContent()}

                        <div className="mt-2 text-xs opacity-70" style={{
                            color: isUser ? 'rgba(255, 255, 255, 0.7)' : 'var(--color-textSecondary)'
                        }}>
                            {formatTime(timestamp)}
                        </div>
                    </motion.div>

                    {/* Message Actions */}
                    <AnimatePresence>
                        {showActions && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="absolute -top-2 right-0 flex items-center space-x-1 rounded-lg shadow-lg p-1"
                                style={{
                                    backgroundColor: 'var(--color-surface)',
                                    border: `1px solid var(--color-border)`
                                }}
                            >
                                <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={copyToClipboard}
                                    className="h-7 w-7 p-0"
                                    style={{ color: 'var(--color-textSecondary)' }}
                                >
                                    {copied ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                                </Button>
                                {type === 'image' && message.image && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={downloadImage}
                                        className="h-7 w-7 p-0"
                                        style={{ color: 'var(--color-textSecondary)' }}
                                    >
                                        <Download className="h-3 w-3" />
                                    </Button>
                                )}
                                {onEdit && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => onEdit(type === 'image' ? message.prompt : message)}
                                        className="h-7 w-7 p-0"
                                        style={{ color: 'var(--color-textSecondary)' }}
                                    >
                                        <Edit className="h-3 w-3" />
                                    </Button>
                                )}
                                {onDelete && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={onDelete}
                                        className="h-7 w-7 p-0"
                                        style={{ color: '#ef4444' }}
                                    >
                                        <Trash2 className="h-3 w-3" />
                                    </Button>
                                )}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {isUser && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-medium shadow-lg"
                        style={{
                            background: `linear-gradient(135deg, var(--color-accent) 0%, var(--color-primary) 100%)`
                        }}
                    >
                        U
                    </motion.div>
                )}
            </div>

            {/* Action Trigger */}
            <motion.button
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                className="absolute -top-1 right-2 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={() => setShowActions(!showActions)}
                style={{ color: 'var(--color-textSecondary)' }}
            >
                <MoreVertical className="h-4 w-4" />
            </motion.button>

            {/* Full Size Image Modal */}
            <AnimatePresence>
                {showFullSizeImage && type === 'image' && message.image && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 flex items-center justify-center z-[60]"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.9)' }}
                        onClick={() => setShowFullSizeImage(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="relative w-full h-full flex items-center justify-center p-4"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={() => setShowFullSizeImage(false)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center z-10"
                                style={{
                                    backgroundColor: 'var(--color-surface)',
                                    border: '1px solid var(--color-border)',
                                    color: 'var(--color-textPrimary)'
                                }}
                            >
                                <X className="h-4 w-4" />
                            </button>

                            {/* Image Container */}
                            <div className="w-full h-full flex items-center justify-center">
                                <img
                                    src={message.image}
                                    alt={message.prompt || 'Generated image'}
                                    className="max-w-full max-h-full object-contain rounded-lg"
                                    style={{
                                        border: '1px solid var(--color-border)',
                                        backgroundColor: 'var(--color-surface)'
                                    }}
                                />
                            </div>

                            {/* Image Info */}
                            {message.prompt && (
                                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg"
                                    style={{
                                        background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
                                        color: 'white'
                                    }}
                                >
                                    <p className="text-sm font-medium">{message.prompt}</p>
                                    {message.model && (
                                        <p className="text-xs opacity-80 mt-1">Generated with {message.model}</p>
                                    )}
                                </div>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default MessageBubble 