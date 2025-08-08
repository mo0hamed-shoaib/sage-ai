import React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext()

// Theme definitions
export const themes = {
    modern: {
        name: 'Modern & Fresh',
        id: 'modern',
        colors: {
            primary: '#10b981', // emerald green
            primaryHover: '#059669',
            accent: '#f56565', // coral
            accentHover: '#e53e3e',
            sidebar: '#2d3748', // dark charcoal
            chatBg: '#374151', // slightly lighter charcoal
            userMessage: '#10b981', // emerald green
            aiMessage: '#4a5568', // dark gray
            textPrimary: '#ffffff', // white
            textSecondary: '#e2e8f0', // light gray
            border: '#4a5568',
            inputBg: '#4a5568',
            inputBorder: '#6b7280',
            buttonBg: '#10b981',
            buttonHover: '#059669',
            surface: '#2d3748',
            surfaceHover: '#374151'
        }
    },
    ocean: {
        name: 'Deep Ocean',
        id: 'ocean',
        colors: {
            primary: '#1e3a8a', // deep navy blue
            primaryHover: '#1e40af',
            accent: '#ff6b6b', // warm coral
            accentHover: '#ff5252',
            sidebar: '#1e293b', // dark navy
            chatBg: '#334155', // deep blue-gray
            userMessage: '#312e81', // rich indigo
            aiMessage: '#475569', // slate blue
            textPrimary: '#f1f5f9', // light blue-white
            textSecondary: '#cbd5e1', // soft blue-gray
            border: '#475569',
            inputBg: '#475569',
            inputBorder: '#64748b',
            buttonBg: '#1e3a8a',
            buttonHover: '#1e40af',
            surface: '#1e293b',
            surfaceHover: '#334155'
        }
    },
    minimalist: {
        name: 'Clean Minimalist',
        id: 'minimalist',
        colors: {
            primary: '#22c55e', // soft sage green
            primaryHover: '#16a34a',
            accent: '#fb7185', // warm peach
            accentHover: '#f43f5e',
            sidebar: '#fefefe', // warm off-white
            chatBg: '#ffffff', // pure white
            userMessage: '#22c55e', // soft sage
            aiMessage: '#fafaf9', // light cream
            textPrimary: '#1f2937', // deep charcoal
            textSecondary: '#64748b', // warm medium gray
            border: '#e2e8f0',
            inputBg: '#ffffff',
            inputBorder: '#d1d5db',
            buttonBg: '#22c55e',
            buttonHover: '#16a34a',
            surface: '#ffffff',
            surfaceHover: '#f8fafc'
        }
    },
    sunset: {
        name: 'Sunset Blush',
        id: 'sunset',
        colors: {
            primary: '#a855f7', // soft lavender
            primaryHover: '#9333ea',
            accent: '#f97316', // rose gold
            accentHover: '#ea580c',
            sidebar: '#faf5ff', // soft lavender-gray
            chatBg: '#fefbff', // pearl white
            userMessage: '#a855f7', // soft purple
            aiMessage: '#fdf2f8', // blush pink
            textPrimary: '#581c87', // rich plum
            textSecondary: '#6b7280', // soft purple-gray
            border: '#e9d5ff',
            inputBg: '#ffffff',
            inputBorder: '#d8b4fe',
            buttonBg: '#a855f7',
            buttonHover: '#9333ea',
            surface: '#ffffff',
            surfaceHover: '#faf5ff'
        }
    }
}

export const useTheme = () => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error('useTheme must be used within a ThemeProvider')
    }
    return context
}

export const ThemeProvider = ({ children }) => {
    const [currentTheme, setCurrentTheme] = useState(() => {
        const saved = localStorage.getItem('theme')
        if (saved && themes[saved]) {
            return saved
        }
        return 'modern' // default theme
    })

    useEffect(() => {
        const root = window.document.documentElement
        const theme = themes[currentTheme]

        // Apply theme colors as CSS custom properties
        Object.entries(theme.colors).forEach(([key, value]) => {
            root.style.setProperty(`--color-${key}`, value)
        })

        // Set theme class for additional styling
        root.className = `theme-${currentTheme}`

        localStorage.setItem('theme', currentTheme)
    }, [currentTheme])

    const switchTheme = (themeId) => {
        if (themes[themeId]) {
            setCurrentTheme(themeId)
        }
    }

    const getCurrentTheme = () => themes[currentTheme]

    return (
        <ThemeContext.Provider value={{
            currentTheme,
            switchTheme,
            getCurrentTheme,
            themes: Object.values(themes)
        }}>
            {children}
        </ThemeContext.Provider>
    )
} 