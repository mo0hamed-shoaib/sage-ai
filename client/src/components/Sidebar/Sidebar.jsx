import React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    Plus,
    MessageSquare,
    Settings,
    User,
    Menu,
    X,
    Search,
    MoreVertical,
    Trash2,
    Pencil
} from 'lucide-react'
import { cn } from '../../utils/cn'
import Button from '../ui/Button'
import ThemeSwitcher from '../ui/ThemeToggle'

const Sidebar = ({
    chats = [],
    currentChatId,
    onNewChat,
    onSelectChat,
    onDeleteChat,
    onClearAllData,
    collapsed = false,
    onToggleCollapse
}) => {
    const [searchQuery, setSearchQuery] = useState('')
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(null)
    const [editingChatId, setEditingChatId] = useState(null)
    const [editValue, setEditValue] = useState('')

    const filteredChats = chats.filter(chat =>
        chat.title?.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const formatDate = (date) => {
        const now = new Date()
        const chatDate = new Date(date)
        const diffTime = Math.abs(now - chatDate)
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

        if (diffDays === 1) return 'Today'
        if (diffDays === 2) return 'Yesterday'
        if (diffDays <= 7) return `${diffDays - 1} days ago`
        return chatDate.toLocaleDateString()
    }

    const handleEditChat = (chat) => {
        setEditingChatId(chat.id)
        setEditValue(chat.title)
    }

    const handleEditChange = (e) => {
        setEditValue(e.target.value)
    }

    const handleEditSubmit = (chat) => {
        if (editValue.trim() && editValue !== chat.title) {
            chat.title = editValue.trim()
            // force update (in real app, update state/DB)
            setEditingChatId(null)
        } else {
            setEditingChatId(null)
        }
    }

    return (
        <motion.div
            initial={false}
            animate={{ width: collapsed ? 80 : 320 }}
            className="flex flex-col relative overflow-hidden h-full"
            style={{
                backgroundColor: 'var(--color-sidebar)',
                borderRight: '1px solid var(--color-border)',
                color: 'var(--color-textPrimary)'
            }}
        >
            {/* Header */}
            <div className={cn(
                collapsed ? 'flex flex-col items-center py-4 gap-4' : 'p-4 flex items-center justify-between'
            )}
                style={{ borderColor: 'var(--color-border)' }}>
                {!collapsed && (
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1 }}
                        className="flex items-center space-x-3"
                    >
                        <img 
                            src="/sage-ai-logo.png" 
                            alt="SageAI" 
                            className="h-10 w-10 rounded-lg"
                        />
                        <ThemeSwitcher />
                    </motion.div>
                )}
                {collapsed && (
                    <motion.div
                        initial={false}
                        animate={{ opacity: 1 }}
                        className="flex flex-col items-center space-y-3"
                    >
                        <img 
                            src="/sage-ai-logo.png" 
                            alt="SageAI" 
                            className="h-8 w-8 rounded-lg"
                        />
                        <ThemeSwitcher className="w-10 h-10 p-0" />
                    </motion.div>
                )}
                <div className={cn(
                    'flex',
                    collapsed ? 'flex-col items-center gap-3 w-full' : 'items-center space-x-2'
                )}>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={onToggleCollapse}
                        className={cn(
                            collapsed ? 'w-10 h-10 p-0' : ''
                        )}
                        style={{ color: 'var(--color-textSecondary)' }}
                        aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                    >
                        {collapsed ? <Menu className="h-5 w-5 mx-auto" /> : <X className="h-5 w-5" />}
                    </Button>
                </div>
            </div>

            {/* New Chat Button */}
            <div className={cn(
                collapsed ? 'flex justify-center py-2' : 'p-4'
            )}>
                <Button
                    onClick={onNewChat}
                    className={cn(
                        'justify-center cursor-pointer',
                        collapsed ? 'w-10 h-10 p-0 text-base' : 'w-full py-2 px-3 text-base',
                        'transition-all duration-150'
                    )}
                    size={collapsed ? 'sm' : 'md'}
                    aria-label="New chat"
                    style={{
                        backgroundColor: 'var(--color-buttonBg)',
                        color: 'white'
                    }}
                >
                    <Plus className="h-4 w-4" />
                    {!collapsed && <span className="ml-2">New Chat</span>}
                </Button>
            </div>

            {/* Search */}
            {!collapsed && (
                <motion.div
                    initial={false}
                    animate={{ opacity: 1 }}
                    className="px-4 mb-4"
                >
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: 'var(--color-textSecondary)' }} />
                        <input
                            type="text"
                            placeholder="Search chats..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:border-transparent"
                            style={{
                                backgroundColor: 'var(--color-inputBg)',
                                border: '1px solid var(--color-inputBorder)',
                                color: 'var(--color-textPrimary)'
                            }}
                        />
                    </div>
                </motion.div>
            )}

            {/* Chat History */}
            {!collapsed && (
                <div className="flex-1 overflow-y-auto">
                    <AnimatePresence initial={false}>
                        {filteredChats.map((chat) => (
                            <motion.div
                                key={chat.id}
                                initial={false}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className={cn(
                                    'group relative flex items-center cursor-pointer transition-colors',
                                    'px-4 py-3'
                                )}
                                style={{
                                    backgroundColor: currentChatId === chat.id ? 'var(--color-primary)' : 'transparent',
                                    color: currentChatId === chat.id ? 'white' : 'var(--color-textPrimary)'
                                }}
                                onClick={() => onSelectChat(chat.id)}
                                title={chat.title || 'New Chat'}
                            >
                                <div className="flex items-center w-full">
                                    <MessageSquare className="flex-shrink-0 h-5 w-5 mr-3" />
                                    <div className="flex-1 min-w-0">
                                        {editingChatId === chat.id ? (
                                            <input
                                                value={editValue}
                                                onChange={handleEditChange}
                                                onBlur={() => handleEditSubmit(chat)}
                                                onKeyDown={e => {
                                                    if (e.key === 'Enter') handleEditSubmit(chat)
                                                    if (e.key === 'Escape') setEditingChatId(null)
                                                }}
                                                autoFocus
                                                className="w-full bg-transparent border-b text-sm font-medium outline-none"
                                                style={{
                                                    borderColor: 'var(--color-primary)',
                                                    color: currentChatId === chat.id ? 'white' : 'var(--color-textPrimary)'
                                                }}
                                            />
                                        ) : (
                                            <div className="text-sm font-medium truncate">
                                                {chat.title || 'New Chat'}
                                            </div>
                                        )}
                                        <div className="text-xs opacity-70 truncate">
                                            {formatDate(chat.updatedAt || chat.createdAt)}
                                        </div>
                                    </div>
                                    {/* Edit & Delete Buttons */}
                                    <div className="flex items-center space-x-2 ml-2">
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={e => {
                                                e.stopPropagation()
                                                handleEditChat(chat)
                                            }}
                                            className="p-0 w-8 h-8 cursor-pointer group/edit hover:bg-[rgba(0,0,0,0.12)]"
                                            style={{ color: '#fff' }}
                                        >
                                            <Pencil className="h-4 w-4 group-hover/edit:text-[var(--color-primary)] transition-colors" style={{ color: '#fff' }} />
                                        </Button>
                                        <Button
                                            size="sm"
                                            variant="ghost"
                                            onClick={e => {
                                                e.stopPropagation()
                                                setShowDeleteConfirm(chat.id)
                                            }}
                                            className="p-0 w-8 h-8 cursor-pointer group/delete hover:bg-[rgba(255,0,0,0.15)]"
                                            style={{ color: '#fff' }}
                                        >
                                            <Trash2 className="h-4 w-4 group-hover/delete:text-red-600 transition-colors" style={{ color: '#fff' }} />
                                        </Button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {filteredChats.length === 0 && (
                        <motion.div
                            initial={false}
                            animate={{ opacity: 1 }}
                            className="px-4 py-8 text-center text-gray-400"
                        >
                            <MessageSquare className="h-12 w-12 mx-auto mb-4 opacity-50" />
                            <p className="text-sm">No chats found</p>
                            {searchQuery && (
                                <p className="text-xs mt-1">Try adjusting your search</p>
                            )}
                        </motion.div>
                    )}
                </div>
            )}

            {/* Footer */}
            <div className={cn(
                collapsed ? 'flex flex-col items-center py-4 gap-4' : 'p-4 flex items-center space-x-3'
            )}
                style={{ borderColor: 'var(--color-border)' }}>
                <div className={cn(
                    'flex items-center w-full',
                    collapsed ? 'flex-col gap-3' : 'space-x-3'
                )}>
                    <div className={cn(
                        'rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center',
                        collapsed ? 'w-12 h-12' : 'w-8 h-8'
                    )}>
                        <User className={cn(
                            'text-white',
                            collapsed ? 'h-6 w-6' : 'h-4 w-4'
                        )} />
                    </div>
                    {!collapsed && (
                        <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium">User</div>
                            <div className="text-xs text-gray-400 truncate">user@example.com</div>
                        </div>
                    )}
                    {!collapsed && onClearAllData && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={onClearAllData}
                            className="w-8 h-8 p-0 cursor-pointer hover:bg-red-100 hover:text-red-600 group/clear"
                            style={{ color: 'var(--color-textSecondary)' }}
                            aria-label="Clear all data"
                            title="Clear all chats and data"
                        >
                            <Trash2 className="h-5 w-5 group-hover/clear:text-red-600 transition-colors" />
                        </Button>
                    )}
                    <Button
                        variant="ghost"
                        size="sm"
                        className={cn(
                            collapsed ? 'w-12 h-12 p-0 mt-2' : 'w-8 h-8 p-0',
                            'cursor-pointer'
                        )}
                        style={{ color: 'var(--color-textSecondary)' }}
                        aria-label="Settings"
                    >
                        <Settings className={cn(
                            collapsed ? 'h-5 w-5' : 'h-5 w-5'
                        )} />
                    </Button>
                </div>
            </div>

            {/* Delete Confirmation Modal */}
            <AnimatePresence>
                {showDeleteConfirm && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex items-center justify-center z-50"
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                        onClick={() => setShowDeleteConfirm(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="p-6 max-w-sm mx-4 rounded-lg"
                            style={{
                                backgroundColor: 'var(--color-surface)',
                                border: '1px solid var(--color-border)'
                            }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <h3 className="text-lg font-semibold mb-4" style={{ color: 'var(--color-textPrimary)' }}>
                                Delete Chat
                            </h3>
                            <p className="text-sm mb-6" style={{ color: 'var(--color-textSecondary)' }}>
                                Are you sure you want to delete this chat? This action cannot be undone.
                            </p>
                            <div className="flex space-x-3">
                                <Button
                                    variant="outline"
                                    onClick={() => setShowDeleteConfirm(null)}
                                    className="flex-1"
                                >
                                    Cancel
                                </Button>
                                <Button
                                    variant="destructive"
                                    onClick={() => {
                                        onDeleteChat(showDeleteConfirm)
                                        setShowDeleteConfirm(null)
                                    }}
                                    className="flex-1"
                                >
                                    Delete
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    )
}

export default Sidebar 