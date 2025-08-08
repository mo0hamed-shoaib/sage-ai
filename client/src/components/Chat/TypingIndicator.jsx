import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const TypingIndicator = ({ className }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={cn("flex w-full justify-start", className)}
        >
            <div className="flex max-w-[80%] items-start space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full text-white text-sm font-medium shadow-lg" style={{
                    background: `linear-gradient(135deg, var(--color-primary) 0%, var(--color-accent) 100%)`
                }}>
                    AI
                </div>

                <div className="rounded-2xl px-4 py-3 shadow-sm" style={{
                    backgroundColor: 'var(--color-aiMessage)',
                    border: `1px solid var(--color-border)`,
                    color: 'var(--color-textPrimary)'
                }}>
                    <div className="flex items-center space-x-2">
                        <div className="flex space-x-1">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    className="w-2 h-2 rounded-full"
                                    style={{ backgroundColor: 'var(--color-textSecondary)' }}
                                    animate={{
                                        scale: [1, 1.2, 1],
                                        opacity: [0.5, 1, 0.5]
                                    }}
                                    transition={{
                                        duration: 1.4,
                                        repeat: Infinity,
                                        delay: i * 0.2
                                    }}
                                />
                            ))}
                        </div>
                        <span className="text-sm" style={{ color: 'var(--color-textSecondary)' }}>SageAI is typing...</span>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

export default TypingIndicator 