import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { cn } from '../../utils/cn'

const ThemeSwitcher = ({ className }) => {
    const { currentTheme, switchTheme, getCurrentTheme, themes } = useTheme()
    const [isOpen, setIsOpen] = React.useState(false)
    const currentThemeData = getCurrentTheme()

    // Determine if theme is light or dark
    const isLightTheme = (themeId) => {
        const lightThemes = ['minimalist', 'sunset']
        return lightThemes.includes(themeId)
    }

    return (
        <div className={cn("relative", className)}>
            <motion.button
                onClick={() => setIsOpen(!isOpen)}
                className={cn(
                    "flex items-center justify-between px-3 py-2 rounded-lg border transition-all duration-200",
                    "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-800",
                    "min-w-[120px]",
                    "shadow-sm hover:shadow-md"
                )}
                style={{
                    backgroundColor: isLightTheme(currentTheme) ?
                        `color-mix(in srgb, ${currentThemeData.colors.primary} 15%, white)` :
                        'var(--color-surface)',
                    borderColor: isLightTheme(currentTheme) ?
                        `color-mix(in srgb, ${currentThemeData.colors.primary} 25%, transparent)` :
                        'var(--color-border)',
                    color: isLightTheme(currentTheme) ?
                        `color-mix(in srgb, ${currentThemeData.colors.primary} 70%, black)` :
                        'var(--color-textPrimary)'
                }}
                whileHover={{
                    scale: 1.02,
                    backgroundColor: isLightTheme(currentTheme) ?
                        `color-mix(in srgb, ${currentThemeData.colors.primary} 25%, white)` :
                        undefined
                }}
                whileTap={{ scale: 0.98 }}
                aria-label="Switch theme"
            >
                <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium" style={{
                        color: isLightTheme(currentTheme) ?
                            `color-mix(in srgb, ${currentThemeData.colors.primary} 70%, black)` :
                            'var(--color-textPrimary)'
                    }}>
                        Theme
                    </span>
                    <div className="flex items-center space-x-1">
                        {/* Primary color dot */}
                        <div
                            className="w-3 h-3 rounded-full shadow-sm"
                            style={{
                                backgroundColor: currentThemeData.colors.primary,
                                border: isLightTheme(currentTheme) ? '2px solid white' : 'none'
                            }}
                        />
                        {/* Accent color dot */}
                        <div
                            className="w-3 h-3 rounded-full shadow-sm"
                            style={{
                                backgroundColor: currentThemeData.colors.accent,
                                border: isLightTheme(currentTheme) ? '2px solid white' : 'none'
                            }}
                        />
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="w-4 h-4" style={{
                        color: isLightTheme(currentTheme) ?
                            `color-mix(in srgb, ${currentThemeData.colors.primary} 70%, black)` :
                            'var(--color-textSecondary)'
                    }} />
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg z-50 overflow-hidden"
                    >
                        {themes.map((theme) => (
                            <motion.button
                                key={theme.id}
                                onClick={() => {
                                    switchTheme(theme.id)
                                    setIsOpen(false)
                                }}
                                className={cn(
                                    "w-full flex items-center p-3 text-left transition-colors duration-200",
                                    "hover:bg-gray-50 dark:hover:bg-gray-700",
                                    currentTheme === theme.id && "bg-blue-50 dark:bg-blue-900/20 border-r-2 border-blue-500"
                                )}
                                whileHover={{ backgroundColor: 'rgba(0,0,0,0.05)' }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <div className="flex items-center space-x-3">
                                    <span className="text-sm font-medium" style={{
                                        color: isLightTheme(currentTheme) && !isLightTheme(theme.id) ? '#ffffff' :
                                            isLightTheme(theme.id) ? '#ffffff' : 'var(--color-textPrimary)'
                                    }}>
                                        {theme.name}
                                    </span>
                                    <div className="flex items-center space-x-1">
                                        {/* Primary color dot */}
                                        <div
                                            className="w-3 h-3 rounded-full shadow-sm"
                                            style={{
                                                backgroundColor: theme.colors.primary,
                                                border: isLightTheme(theme.id) ? '2px solid white' : 'none'
                                            }}
                                        />
                                        {/* Accent color dot */}
                                        <div
                                            className="w-3 h-3 rounded-full shadow-sm"
                                            style={{
                                                backgroundColor: theme.colors.accent,
                                                border: isLightTheme(theme.id) ? '2px solid white' : 'none'
                                            }}
                                        />
                                    </div>
                                </div>
                            </motion.button>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40"
                        onClick={() => setIsOpen(false)}
                    />
                )}
            </AnimatePresence>
        </div>
    )
}

export default ThemeSwitcher 