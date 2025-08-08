import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react'
import { cn } from '../../utils/cn'
import { useTheme } from '../../context/ThemeContext'

const toastTypes = {
    success: {
        icon: CheckCircle,
        colors: {
            bg: 'rgba(34, 197, 94, 0.1)',
            border: 'rgba(34, 197, 94, 0.3)',
            text: '#15803d',
            icon: '#16a34a'
        }
    },
    error: {
        icon: XCircle,
        colors: {
            bg: 'rgba(239, 68, 68, 0.1)',
            border: 'rgba(239, 68, 68, 0.3)',
            text: '#dc2626',
            icon: '#ef4444'
        }
    },
    info: {
        icon: Info,
        colors: {
            bg: 'rgba(59, 130, 246, 0.1)',
            border: 'rgba(59, 130, 246, 0.3)',
            text: '#2563eb',
            icon: '#3b82f6'
        }
    },
    warning: {
        icon: AlertTriangle,
        colors: {
            bg: 'rgba(245, 158, 11, 0.1)',
            border: 'rgba(245, 158, 11, 0.3)',
            text: '#d97706',
            icon: '#f59e0b'
        }
    }
}

const Toast = ({ message, type = 'info', onClose, duration = 5000 }) => {
    const toastConfig = toastTypes[type]
    const Icon = toastConfig.icon
    const { currentTheme, getCurrentTheme } = useTheme()
    const currentThemeData = getCurrentTheme()

    // Determine if current theme is light
    const isLightTheme = () => {
        const lightThemes = ['minimalist', 'sunset']
        return lightThemes.includes(currentTheme)
    }

    // Adjust colors based on theme
    const getThemeAdjustedColors = () => {
        const baseColors = toastConfig.colors

        if (isLightTheme()) {
            // For light themes, use darker colors for better contrast
            return {
                bg: baseColors.bg,
                border: baseColors.border,
                text: baseColors.text,
                icon: baseColors.icon
            }
        } else {
            // For dark themes, use lighter colors for better contrast
            return {
                bg: baseColors.bg.replace('0.1', '0.15'),
                border: baseColors.border.replace('0.3', '0.4'),
                text: baseColors.text.replace('#', '').match(/.{2}/g).map(hex =>
                    Math.min(255, parseInt(hex, 16) + 40).toString(16).padStart(2, '0')
                ).join(''),
                icon: baseColors.icon.replace('#', '').match(/.{2}/g).map(hex =>
                    Math.min(255, parseInt(hex, 16) + 40).toString(16).padStart(2, '0')
                ).join('')
            }
        }
    }

    const colors = getThemeAdjustedColors()

    return (
        <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.3 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
            className="flex items-center p-4 rounded-lg border shadow-lg max-w-sm backdrop-blur-sm"
            style={{
                backgroundColor: colors.bg,
                borderColor: colors.border,
                color: `#${colors.text}`,
                boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
            }}
        >
            <Icon
                className="h-5 w-5 mr-3 flex-shrink-0"
                style={{ color: `#${colors.icon}` }}
            />
            <span className="text-sm font-medium flex-1">{message}</span>
            <button
                onClick={onClose}
                className="ml-3 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                style={{ color: `#${colors.text}` }}
            >
                <X className="h-4 w-4" />
            </button>
        </motion.div>
    )
}

export default Toast 