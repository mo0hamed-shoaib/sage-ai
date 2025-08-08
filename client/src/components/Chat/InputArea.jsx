import React from 'react'
import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Send, Paperclip, Mic, X, Image } from 'lucide-react'
import { cn } from '../../utils/cn'
import Button from '../ui/Button'
import { useToast } from '../../context/ToastContext'
import ImageGenerator from './ImageGenerator'

const InputArea = ({ onSend, loading, disabled, onImageGenerated }) => {
    const [input, setInput] = useState('')
    const [isRecording, setIsRecording] = useState(false)
    const [attachedFiles, setAttachedFiles] = useState([])
    const [showImageGenerator, setShowImageGenerator] = useState(false)
    const textareaRef = useRef(null)
    const toast = useToast()

    const handleSend = async () => {
        if (!input.trim() && attachedFiles.length === 0) return
        try {
            await onSend(input, attachedFiles)
            setInput('')
            setAttachedFiles([])
        } catch (err) {
            toast.error('Failed to send message: ' + (err?.message || 'Unknown error'))
        }
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSend()
        }
    }

    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files)
        setAttachedFiles(prev => [...prev, ...files])
        toast.success(`${files.length} file(s) attached`)
    }

    const removeFile = (index) => {
        setAttachedFiles(prev => prev.filter((_, i) => i !== index))
        toast.info('File removed')
    }

    const toggleRecording = () => {
        setIsRecording(!isRecording)
        toast.info(isRecording ? 'Recording stopped' : 'Recording started')
        // TODO: Implement voice recording
    }

    // Auto-resize textarea
    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'
            textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`
        }
    }, [input])

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-t p-4"
            style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)'
            }}
        >
            {/* Attached Files */}
            {attachedFiles.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mb-3 flex flex-wrap gap-2"
                >
                    {attachedFiles.map((file, index) => (
                        <motion.div
                            key={index}
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="flex items-center space-x-2 rounded-lg px-3 py-2 text-sm"
                            style={{
                                backgroundColor: 'var(--color-inputBg)',
                                border: `1px solid var(--color-border)`
                            }}
                        >
                            <Paperclip className="h-4 w-4" style={{ color: 'var(--color-textSecondary)' }} />
                            <span style={{ color: 'var(--color-textPrimary)' }}>{file.name}</span>
                            <button
                                onClick={() => removeFile(index)}
                                style={{ color: 'var(--color-textSecondary)' }}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </motion.div>
                    ))}
                </motion.div>
            )}

            {/* Unified Input Bar */}
            <div className="flex items-center w-full bg-[var(--color-inputBg)] rounded-full px-6 py-3 gap-4 border" style={{ borderColor: 'var(--color-inputBorder)' }}>
                {/* Left Icons/Actions (attach file, image mode) */}
                <div className="flex items-center gap-2">
                    {/* Attach File */}
                    <label className="focus:outline-none cursor-pointer m-0">
                        <input
                            type="file"
                            multiple
                            onChange={handleFileUpload}
                            className="hidden"
                            disabled={disabled || loading}
                        />
                        <Paperclip className="h-6 w-6" style={{ color: 'var(--color-textSecondary)' }} />
                    </label>
                    {/* Image Mode */}
                    <button className="focus:outline-none cursor-pointer" onClick={() => setShowImageGenerator(true)} disabled={disabled || loading}>
                        <Image className="h-6 w-6" style={{ color: 'var(--color-textSecondary)' }} />
                    </button>
                </div>

                {/* Input Field */}
                <textarea
                    ref={textareaRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask anything"
                    disabled={disabled || loading}
                    rows={1}
                    className="flex-1 bg-transparent resize-none outline-none border-none text-base text-[var(--color-textPrimary)] px-3 py-1 min-h-[32px] max-h-[120px] custom-scrollbar"
                    style={{ boxShadow: 'none' }}
                />

                {/* Right Icons/Actions (mic, send) */}
                <div className="flex items-center gap-2">
                    <button
                        onClick={toggleRecording}
                        disabled={disabled || loading}
                        className="focus:outline-none cursor-pointer"
                    >
                        <Mic className="h-6 w-6" style={{ color: isRecording ? '#ef4444' : 'var(--color-textSecondary)' }} />
                    </button>
                    <button
                        onClick={handleSend}
                        disabled={(!input.trim() && attachedFiles.length === 0) || loading}
                        className="focus:outline-none flex items-center justify-center bg-[var(--color-surface)] rounded-full w-10 h-10 cursor-pointer"
                        style={{ color: 'var(--color-textSecondary)' }}
                    >
                        <Send className="h-5 w-5" />
                    </button>
                </div>
            </div>

            {/* Image Generator Modal */}
            {showImageGenerator && (
                <ImageGenerator
                    onClose={() => setShowImageGenerator(false)}
                    onImageGenerated={onImageGenerated}
                />
            )}
        </motion.div>
    )
}

export default InputArea 