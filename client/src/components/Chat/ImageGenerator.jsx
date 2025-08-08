import React, { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Image, Download, RefreshCw, Settings, X } from 'lucide-react'
import Button from '../ui/Button'
import { useToast } from '../../context/ToastContext'

const ImageGenerator = ({ onClose, onImageGenerated }) => {
    const [prompt, setPrompt] = useState('')
    const [generatedImage, setGeneratedImage] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [selectedModel, setSelectedModel] = useState('stabilityai/stable-diffusion-xl-base-1.0')
    const [showSettings, setShowSettings] = useState(false)
    const [availableModels, setAvailableModels] = useState([])
    const [showImageGenerator, setShowImageGenerator] = useState(false)
    const [showFullSizeImage, setShowFullSizeImage] = useState(false)
    const textareaRef = useRef(null)
    const toast = useToast()

    // Load available models on component mount
    React.useEffect(() => {
        loadModels()
    }, [])

    const loadModels = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/image-models')
            const data = await response.json()
            setAvailableModels(data.models)
        } catch (error) {
            console.error('Failed to load models:', error)
            toast.error('Failed to load image models')
        }
    }

    const generateImage = async () => {
        if (!prompt.trim()) {
            toast.error('Please enter a prompt')
            return
        }

        setLoading(true)
        setError(null)
        try {
            const response = await fetch('http://localhost:5001/api/generate-image', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    prompt: prompt.trim(),
                    model: selectedModel
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                const errorMessage = errorData.details || errorData.error || 'Failed to generate image'

                // If model is loading, suggest retry
                if (response.status === 503) {
                    setError('Model is loading. Please try again in a few moments.')
                    return
                }

                throw new Error(errorMessage)
            }

            const data = await response.json()
            setGeneratedImage(data)
            setError(null)
            toast.success('Image generated successfully!')

            // Call the callback to add image to chat
            if (onImageGenerated) {
                onImageGenerated(data)
            }
        } catch (error) {
            console.error('Error generating image:', error)

            // Provide more helpful error messages
            let errorMessage = error.message
            if (error.message.includes('Model not found')) {
                errorMessage = 'Selected model is not available. Please try a different model.'
            } else if (error.message.includes('Rate limit')) {
                errorMessage = 'Too many requests. Please wait a moment before trying again.'
            } else if (error.message.includes('timeout')) {
                errorMessage = 'Request timed out. Please try again.'
            }

            setError(errorMessage)
            toast.error('Failed to generate image: ' + errorMessage)
        } finally {
            setLoading(false)
        }
    }

    const retryGeneration = () => {
        setError(null)
        generateImage()
    }

    const downloadImage = () => {
        if (!generatedImage) return

        const link = document.createElement('a')
        link.href = generatedImage.image
        link.download = `generated-image-${Date.now()}.png`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('Image downloaded!')
    }

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            generateImage()
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 flex items-center justify-center z-50"
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl mx-4 rounded-lg overflow-hidden max-h-[90vh] flex flex-col"
                style={{
                    backgroundColor: 'var(--color-surface)',
                    border: '1px solid var(--color-border)'
                }}
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center space-x-2">
                        <Image className="h-5 w-5" style={{ color: 'var(--color-primary)' }} />
                        <h2 className="text-lg font-semibold" style={{ color: 'var(--color-textPrimary)' }}>
                            Generate Image
                        </h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setShowSettings(!showSettings)}
                            className="p-2"
                            style={{ color: 'var(--color-textSecondary)' }}
                        >
                            <Settings className="h-4 w-4" />
                        </Button>
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClose}
                            className="p-2"
                            style={{ color: 'var(--color-textSecondary)' }}
                        >
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                </div>

                {/* Settings Panel */}
                <AnimatePresence>
                    {showSettings && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="border-b overflow-hidden"
                            style={{ borderColor: 'var(--color-border)' }}
                        >
                            <div className="p-4">
                                <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
                                    Image Model
                                </label>
                                <select
                                    value={selectedModel}
                                    onChange={(e) => setSelectedModel(e.target.value)}
                                    className="w-full p-2 rounded-lg border focus:outline-none focus:ring-2 focus:border-transparent"
                                    style={{
                                        backgroundColor: 'var(--color-inputBg)',
                                        border: '1px solid var(--color-inputBorder)',
                                        color: 'var(--color-textPrimary)'
                                    }}
                                >
                                    {availableModels.map((model) => (
                                        <option key={model.id} value={model.id}>
                                            {model.name} - {model.description}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Content */}
                <div className="p-4 flex-1 overflow-y-auto">
                    {/* Prompt Input */}
                    <div className="mb-4">
                        <label className="block text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
                            Describe the image you want to generate
                        </label>
                        <textarea
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyPress={handleKeyPress}
                            placeholder="A beautiful sunset over mountains, digital art style..."
                            className="w-full p-3 rounded-lg border resize-none focus:outline-none focus:ring-2 focus:border-transparent"
                            style={{
                                backgroundColor: 'var(--color-inputBg)',
                                border: '1px solid var(--color-inputBorder)',
                                color: 'var(--color-textPrimary)'
                            }}
                            rows={3}
                            ref={textareaRef}
                        />
                    </div>

                    {/* Generate Button */}
                    <div className="flex justify-center mb-4">
                        <Button
                            onClick={generateImage}
                            disabled={loading || !prompt.trim()}
                            loading={loading}
                            className="px-6"
                            style={{
                                backgroundColor: 'var(--color-buttonBg)',
                                color: 'white'
                            }}
                        >
                            {loading ? (
                                <>
                                    <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                                    Generating...
                                </>
                            ) : (
                                <>
                                    <Image className="h-4 w-4 mr-2" />
                                    Generate Image
                                </>
                            )}
                        </Button>
                    </div>

                    {/* Error Display */}
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 p-3 rounded-lg border"
                            style={{
                                backgroundColor: '#fef2f2',
                                borderColor: '#fca5a5',
                                color: '#dc2626'
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <div className="text-sm">
                                    <strong>Error:</strong> {error}
                                </div>
                                <Button
                                    onClick={retryGeneration}
                                    variant="outline"
                                    size="sm"
                                    className="ml-2"
                                    style={{
                                        borderColor: '#dc2626',
                                        color: '#dc2626'
                                    }}
                                >
                                    <RefreshCw className="h-3 w-3 mr-1" />
                                    Retry
                                </Button>
                            </div>
                        </motion.div>
                    )}

                    {/* Generated Image */}
                    <AnimatePresence>
                        {generatedImage && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="text-center"
                            >
                                <div className="mb-4">
                                    <img
                                        src={generatedImage.image}
                                        alt={generatedImage.prompt}
                                        className="max-w-full h-auto rounded-lg border mx-auto cursor-pointer hover:opacity-90 transition-opacity"
                                        style={{
                                            borderColor: 'var(--color-border)',
                                            maxHeight: '300px',
                                            objectFit: 'contain'
                                        }}
                                        onClick={() => setShowFullSizeImage(true)}
                                        title="Click to view full size"
                                    />
                                </div>

                                <div className="flex justify-center space-x-2">
                                    <Button
                                        onClick={downloadImage}
                                        variant="outline"
                                        size="sm"
                                        className="px-4"
                                    >
                                        <Download className="h-4 w-4 mr-2" />
                                        Download
                                    </Button>
                                    <Button
                                        onClick={() => {
                                            setGeneratedImage(null)
                                            setPrompt('')
                                        }}
                                        variant="outline"
                                        size="sm"
                                        className="px-4"
                                    >
                                        <RefreshCw className="h-4 w-4 mr-2" />
                                        Generate Another
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Tips */}
                    {!generatedImage && (
                        <div className="mt-4 p-3 rounded-lg" style={{ backgroundColor: 'var(--color-inputBg)' }}>
                            <h4 className="text-sm font-medium mb-2" style={{ color: 'var(--color-textPrimary)' }}>
                                💡 Tips for better images:
                            </h4>
                            <ul className="text-xs space-y-1" style={{ color: 'var(--color-textSecondary)' }}>
                                <li>• Be specific about style, colors, and composition</li>
                                <li>• Include artistic styles like "digital art", "oil painting", "photorealistic"</li>
                                <li>• Mention lighting, mood, and perspective</li>
                                <li>• Use descriptive adjectives for better results</li>
                            </ul>
                        </div>
                    )}
                </div>
            </motion.div>

            {/* Full Size Image Modal */}
            <AnimatePresence>
                {showFullSizeImage && generatedImage && (
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
                                    src={generatedImage.image}
                                    alt={generatedImage.prompt}
                                    className="max-w-full max-h-full object-contain rounded-lg"
                                    style={{
                                        border: '1px solid var(--color-border)',
                                        backgroundColor: 'var(--color-surface)'
                                    }}
                                />
                            </div>

                            {/* Image Info */}
                            <div className="absolute bottom-4 left-4 right-4 p-4 rounded-lg"
                                style={{
                                    background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
                                    color: 'white'
                                }}
                            >
                                <p className="text-sm font-medium">{generatedImage.prompt}</p>
                                <p className="text-xs opacity-80 mt-1">Generated with {generatedImage.model}</p>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default ImageGenerator 