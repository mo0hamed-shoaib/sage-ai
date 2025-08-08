# SageAI - Beautiful AI Assistant Interface

A stunning, modern AI assistant interface built with React, Vite, and Tailwind CSS. Features a beautiful dark/light mode toggle, smooth animations, and premium UX design.

## ✨ Features

### 🎨 **Visual Design**

- **Dark/Light Mode**: Seamless theme switching with system preference detection
- **Modern UI**: Glassmorphism effects, gradients, and subtle shadows
- **Smooth Animations**: Framer Motion powered micro-interactions
- **Responsive Design**: Works perfectly on all screen sizes
- **Custom Scrollbars**: Beautiful scrollbars for both light and dark modes

### 💬 **Chat Features**

- **Real-time Chat**: Instant message sending with typing indicators
- **Message Actions**: Copy, edit, and delete messages
- **File Upload**: Drag & drop file attachments with visual feedback
- **Voice Recording**: Visual voice recording interface (UI ready)
- **Auto-resize Input**: Smart textarea that grows with content
- **Character Count**: Real-time character counting

### 🧭 **Navigation & UX**

- **Collapsible Sidebar**: Space-efficient navigation
- **Chat History**: Searchable chat history with timestamps
- **Toast Notifications**: Beautiful feedback for user actions
- **Loading States**: Elegant loading spinners and indicators
- **Keyboard Shortcuts**: Enter to send, Shift+Enter for new line

### 🎯 **Advanced Features**

- **Welcome Screen**: Beautiful onboarding with suggestion cards
- **Message Bubbles**: Distinct styling for user vs AI messages
- **Avatar System**: Gradient avatars for user and AI
- **Status Indicators**: Online/offline and typing states
- **Focus Management**: Proper accessibility and keyboard navigation

## 🚀 Tech Stack

- **Framework**: React 18 with Vite
- **Styling**: Tailwind CSS with custom dark mode
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API
- **Utilities**: clsx, tailwind-merge

## 📁 Project Structure

```
src/
├── components/
│   ├── ui/                 # Reusable UI components
│   │   ├── Button.jsx
│   │   ├── Input.jsx
│   │   ├── LoadingSpinner.jsx
│   │   ├── ThemeToggle.jsx
│   │   └── Toast.jsx
│   ├── Chat/              # Chat-related components
│   │   ├── ChatArea.jsx
│   │   ├── MessageBubble.jsx
│   │   ├── TypingIndicator.jsx
│   │   └── InputArea.jsx
│   ├── Sidebar/           # Sidebar components
│   │   └── Sidebar.jsx
│   └── Layout/            # Layout components
│       └── MainLayout.jsx
├── context/               # React Context providers
│   ├── ThemeContext.jsx
│   └── ToastContext.jsx
├── utils/                 # Utility functions
│   └── cn.js
└── assets/               # Static assets
```

## 🎨 Design System

### Color Palette

- **Light Mode**: Clean whites, grays, and blue accents
- **Dark Mode**: Deep grays, blues, and purple gradients
- **Accent Colors**: Blue-500 to Purple-600 gradients

### Typography

- **Font**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700
- **Sizes**: Responsive text scaling

### Animations

- **Micro-interactions**: Hover effects, button presses
- **Page Transitions**: Smooth fade-ins and slide animations
- **Loading States**: Spinning indicators and typing animations

## 🛠️ Getting Started

1. **Install Dependencies**

   ```bash
   npm install
   ```

2. **Start Development Server**

   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

## 🎯 Usage

### Theme Toggle

Click the sun/moon icon in the sidebar to switch between light and dark modes.

### Creating Chats

- Click "New Chat" in the sidebar
- Or start typing in the input area

### Message Actions

- Hover over messages to see action buttons
- Copy, edit, or delete messages
- File uploads supported

### Keyboard Shortcuts

- `Enter`: Send message
- `Shift + Enter`: New line
- `Escape`: Close modals

## 🔧 Customization

### Adding New Themes

Extend the `ThemeContext.jsx` to add custom color schemes.

### Custom Animations

Modify Framer Motion animations in component files.

### Styling

Use Tailwind classes and custom CSS in `index.css`.

## 🚀 Next Steps

- [ ] Backend API integration
- [ ] OpenAI API connection
- [ ] User authentication
- [ ] Database persistence
- [ ] Real-time features
- [ ] Voice recording implementation
- [ ] Code syntax highlighting
- [ ] Markdown rendering

## 📱 Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for your own AI assistant!
