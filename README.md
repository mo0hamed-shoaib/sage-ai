<div align="center">
  <img src="client/public/sage-ai-logo.png" alt="SageAI Logo" width="120" height="120">
  <h1>🤖 SageAI</h1>
  <p><strong>Your Intelligent AI Assistant</strong></p>
  <p>A powerful, modern AI assistant that combines chat, image generation, and file analysis in one beautiful interface.</p>
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/sage-ai)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
  [![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
</div>

## ✨ Features

### 🤖 **AI Capabilities**
- **💬 Intelligent Chat**: Powered by Groq's Llama 3.3 70B model for fast, accurate responses
- **🎨 AI Image Generation**: Create stunning images using Hugging Face's Stable Diffusion models
- **📄 File Analysis**: Upload documents and get AI-powered insights using OpenAI's Assistant API
- **🧠 Multi-Model Support**: Seamlessly switch between different AI models and capabilities

### 🎨 **Visual Design**
- **🌙 Dark/Light Mode**: Seamless theme switching with system preference detection
- **✨ Modern UI**: Glassmorphism effects, gradients, and subtle shadows
- **🎭 Smooth Animations**: Framer Motion powered micro-interactions
- **📱 Responsive Design**: Works perfectly on all screen sizes
- **🎨 Custom Scrollbars**: Beautiful scrollbars for both light and dark modes

### 💬 **Chat Features**
- **⚡ Real-time Chat**: Instant message sending with typing indicators
- **🔧 Message Actions**: Copy, edit, and delete messages
- **📎 File Upload**: Drag & drop file attachments with visual feedback
- **🎤 Voice Recording**: Visual voice recording interface (UI ready)
- **📝 Auto-resize Input**: Smart textarea that grows with content
- **🔢 Character Count**: Real-time character counting

### 🧭 **Navigation & UX**
- **📂 Collapsible Sidebar**: Space-efficient navigation
- **📚 Chat History**: Searchable chat history with timestamps
- **🔔 Toast Notifications**: Beautiful feedback for user actions
- **⏳ Loading States**: Elegant loading spinners and indicators
- **⌨️ Keyboard Shortcuts**: Enter to send, Shift+Enter for new line

### 🎯 **Advanced Features**
- **👋 Welcome Screen**: Beautiful onboarding with suggestion cards
- **💭 Message Bubbles**: Distinct styling for user vs AI messages
- **👤 Avatar System**: Gradient avatars for user and AI
- **🟢 Status Indicators**: Online/offline and typing states
- **♿ Focus Management**: Proper accessibility and keyboard navigation

## 🚀 Tech Stack

### 🎨 **Frontend**
- **React 18** - Modern UI framework with hooks
- **Vite** - Lightning-fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Smooth animations and transitions
- **Lucide React** - Beautiful icon library

### ⚙️ **Backend**
- **Node.js** - Server-side JavaScript runtime
- **Express.js** - Fast, unopinionated web framework
- **Vercel Functions** - Serverless API deployment

### 🤖 **AI Services**
- **Groq** - Ultra-fast LLM inference (Llama 3.3 70B)
- **OpenAI** - Advanced AI models and file analysis
- **Hugging Face** - State-of-the-art image generation models

### 🛠️ **Development Tools**
- **TypeScript** - Type-safe JavaScript
- **ESLint** - Code quality and consistency
- **Prettier** - Code formatting
- **Concurrently** - Run multiple commands simultaneously

## 📁 Project Structure

```
SageAI/
├── 📁 client/                 # React frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/     # React components
│   │   │   ├── 📁 Chat/       # Chat-related components
│   │   │   ├── 📁 Layout/     # Layout components
│   │   │   ├── 📁 Sidebar/    # Sidebar components
│   │   │   └── 📁 ui/         # Reusable UI components
│   │   ├── 📁 context/        # React Context providers
│   │   ├── 📁 config/         # Configuration files
│   │   └── 📁 utils/          # Utility functions
│   └── 📁 public/             # Static assets
├── 📁 server/                 # Express.js backend
│   ├── 📁 uploads/            # File upload directory
│   └── index.js               # Main server file
├── 📁 api/                    # Vercel serverless functions
│   ├── chat.js                # Chat API endpoint
│   ├── generate-image.js      # Image generation API
│   ├── image-models.js        # Available models API
│   ├── upload.js              # File upload API
│   └── package.json           # API dependencies
├── 📁 scripts/                # Build and deployment scripts
├── vercel.json               # Vercel deployment config
├── package.json              # Root package.json
└── README.md                 # This file
```

## 🎨 Design System

### 🎨 **Color Palette**
- **🌞 Light Mode**: Clean whites, grays, and blue accents
- **🌙 Dark Mode**: Deep grays, blues, and purple gradients
- **🌈 Accent Colors**: Blue-500 to Purple-600 gradients

### 📝 **Typography**
- **🔤 Font**: Inter (Google Fonts)
- **⚖️ Weights**: 300, 400, 500, 600, 700
- **📏 Sizes**: Responsive text scaling

### ✨ **Animations**
- **🖱️ Micro-interactions**: Hover effects, button presses
- **🔄 Page Transitions**: Smooth fade-ins and slide animations
- **⏳ Loading States**: Spinning indicators and typing animations

## 🛠️ Getting Started

### 📋 **Prerequisites**

- **Node.js 18+** - JavaScript runtime
- **API Keys** for AI services:
  - **Groq API** - For intelligent chat responses
  - **Hugging Face API** - For AI image generation
  - **OpenAI API** - For file analysis (optional)

### 🚀 **Quick Start**

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/sage-ai.git
   cd sage-ai
   ```

2. **Install dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   # Required API Keys
   GROQ_API_KEY=your_groq_api_key_here
   HUGGING_FACE_API_KEY=your_hugging_face_api_key_here
   
   # Optional (for file uploads)
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_ASSISTANT_ID=your_openai_assistant_id_here
   ```

4. **Start development servers**
   ```bash
   npm run dev
   ```
   
   This starts both the client (port 3000) and server (port 5001).

5. **Open your browser**
   
   Navigate to `http://localhost:3000` to see SageAI in action!

### 🏗️ **Build for Production**
```bash
npm run build
```

### 🌐 **Deployment**

**One-click deployment to Vercel:**
[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/sage-ai)

**Manual deployment:** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

## 🎯 Usage Guide

### 💬 **Chat with AI**
- **Start a conversation** - Type your message and press Enter
- **Ask questions** - Get intelligent responses from Groq's Llama 3.3 70B model
- **Upload files** - Attach documents for AI analysis (requires OpenAI API)
- **View history** - Access your chat history from the sidebar

### 🎨 **Generate Images**
- **Click the image icon** in the input area
- **Describe your image** - Be specific for better results
- **Choose models** - Select from Stable Diffusion variants
- **Download images** - Save generated images to your device

### 🎛️ **Interface Controls**
- **🌙 Theme Toggle** - Click the sun/moon icon to switch themes
- **📂 Sidebar** - Collapsible navigation for chat history
- **🔧 Message Actions** - Hover over messages for copy/edit/delete options
- **📎 File Upload** - Drag & drop files for AI analysis

### ⌨️ **Keyboard Shortcuts**
- **`Enter`** - Send message
- **`Shift + Enter`** - New line in input
- **`Escape`** - Close modals and dialogs
- **`Ctrl/Cmd + K`** - Quick actions (coming soon)

## 🔧 Customization

### 🎨 **Adding New Themes**
Extend the `ThemeContext.jsx` to add custom color schemes and themes.

### ✨ **Custom Animations**
Modify Framer Motion animations in component files for unique interactions.

### 🎯 **Styling & Branding**
- Use Tailwind classes and custom CSS in `index.css`
- Replace the logo in `client/public/sage-ai-logo.png`
- Customize colors in the theme configuration

### 🤖 **AI Model Configuration**
- Modify AI models in the API endpoints
- Add new image generation models
- Configure different chat models

## 🚀 Roadmap

### ✅ **Completed Features**
- [x] **Backend API integration** - Full Express.js backend
- [x] **Groq API integration** - Ultra-fast chat responses
- [x] **OpenAI API connection** - File analysis capabilities
- [x] **Hugging Face integration** - AI image generation
- [x] **File upload support** - Document analysis
- [x] **Vercel deployment** - Production-ready deployment
- [x] **Responsive design** - Mobile-friendly interface
- [x] **Dark/Light themes** - Beautiful theme switching

### 🔄 **In Progress**
- [ ] **User authentication** - Secure user accounts
- [ ] **Database persistence** - Chat history storage
- [ ] **Real-time features** - Live collaboration

### 🎯 **Planned Features**
- [ ] **Voice recording** - Speech-to-text input
- [ ] **Code syntax highlighting** - Better code display
- [ ] **Markdown rendering** - Rich text formatting
- [ ] **Multi-language support** - Internationalization
- [ ] **Plugin system** - Extensible architecture
- [ ] **Mobile app** - Native mobile experience

## 📱 Browser Support

- **Chrome 90+** ✅
- **Firefox 88+** ✅
- **Safari 14+** ✅
- **Edge 90+** ✅

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes** and test thoroughly
4. **Commit your changes** (`git commit -m 'Add amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### 🐛 **Reporting Issues**
- Use the GitHub issue tracker
- Provide detailed reproduction steps
- Include browser and OS information

### 💡 **Feature Requests**
- Describe the feature clearly
- Explain the use case
- Consider implementation complexity

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <p>Made with ❤️ by the SageAI team</p>
  <p>If you find this project helpful, please give it a ⭐️!</p>
</div>
