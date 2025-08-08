import React from 'react'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'
import LoadingSpinner from './LoadingSpinner'

const Button = forwardRef(({
    children,
    variant = 'default',
    size = 'default',
    className,
    disabled,
    loading = false,
    ...props
}, ref) => {
    const baseClasses = 'inline-flex items-center justify-center rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const getVariantStyles = () => {
        switch (variant) {
            case 'default':
                return {
                    backgroundColor: 'var(--color-buttonBg)',
                    color: 'white',
                    '--tw-ring-color': 'var(--color-primary)'
                }
            case 'secondary':
                return {
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-textPrimary)',
                    border: '1px solid var(--color-border)',
                    '--tw-ring-color': 'var(--color-textSecondary)'
                }
            case 'ghost':
                return {
                    backgroundColor: 'transparent',
                    color: 'var(--color-textSecondary)',
                    '--tw-ring-color': 'var(--color-primary)'
                }
            case 'outline':
                return {
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-textPrimary)',
                    border: '1px solid var(--color-border)',
                    '--tw-ring-color': 'var(--color-primary)'
                }
            case 'destructive':
                return {
                    backgroundColor: '#ef4444',
                    color: 'white',
                    '--tw-ring-color': '#dc2626'
                }
            default:
                return {
                    backgroundColor: 'var(--color-buttonBg)',
                    color: 'white',
                    '--tw-ring-color': 'var(--color-primary)'
                }
        }
    }

    const sizes = {
        sm: 'h-8 px-3 text-sm',
        default: 'h-10 px-4 py-2',
        lg: 'h-12 px-6 text-lg'
    }

    return (
        <motion.button
            ref={ref}
            className={cn(baseClasses, sizes[size], className)}
            style={getVariantStyles()}
            disabled={disabled || loading}
            whileHover={{
                scale: disabled || loading ? 1 : 1.02,
                backgroundColor: disabled || loading ? undefined :
                    variant === 'default' ? 'var(--color-buttonHover)' :
                        variant === 'secondary' || variant === 'outline' ? 'var(--color-surfaceHover)' :
                            variant === 'ghost' ? 'rgba(0,0,0,0.05)' : undefined
            }}
            whileTap={{ scale: disabled || loading ? 1 : 0.98 }}
            {...props}
        >
            {loading && (
                <LoadingSpinner size="sm" className="mr-2" />
            )}
            {children}
        </motion.button>
    )
})

Button.displayName = 'Button'

export default Button 