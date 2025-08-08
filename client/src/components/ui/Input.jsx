import React from 'react'
import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../../utils/cn'

const Input = forwardRef(({
    className,
    type = 'text',
    error,
    ...props
}, ref) => {
    return (
        <motion.input
            type={type}
            className={cn(
                "flex h-10 w-full rounded-lg border px-3 py-2 text-sm",
                "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600",
                "placeholder:text-gray-500 dark:placeholder:text-gray-400",
                "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent",
                "disabled:cursor-not-allowed disabled:opacity-50",
                "dark:text-gray-100",
                error && "border-red-500 focus:ring-red-500 dark:border-red-400",
                className
            )}
            ref={ref}
            whileFocus={{ scale: 1.01 }}
            {...props}
        />
    )
})

Input.displayName = 'Input'

export default Input 