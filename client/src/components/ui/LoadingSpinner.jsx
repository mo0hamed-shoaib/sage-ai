import React from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const LoadingSpinner = ({ size = 'md', className }) => {
    const sizes = {
        sm: 'w-4 h-4',
        md: 'w-6 h-6',
        lg: 'w-8 h-8',
        xl: 'w-12 h-12'
    }

    return (
        <motion.div
            className={cn('relative', sizes[size], className)}
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        >
            <div className="absolute inset-0 rounded-full border-2 border-gray-200 dark:border-gray-700"></div>
            <motion.div
                className="absolute inset-0 rounded-full border-2 border-transparent border-t-blue-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </motion.div>
    )
}

export default LoadingSpinner 