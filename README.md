<div align="center">
  <img src="client/public/sage-ai-logo.png" alt="SageAI Logo" width="120" height="120">
  
  # SageAI
  
  **Your Intelligent AI Assistant**
  
  *A powerful, modern AI assistant that combines chat, image generation, and file analysis in one beautiful interface.*
  
  [![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/sage-ai)
  
  <!-- Tech Stack Badges -->
  ![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
  ![Node.js](https://img.shields.io/badge/Node.js-18+-339933?style=for-the-badge&logo=node.js&logoColor=white)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
  ![Express.js](https://img.shields.io/badge/Express.js-4.18-000000?style=for-the-badge&logo=express&logoColor=white)
  ![Vite](https://img.shields.io/badge/Vite-5.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)
  
  <!-- AI & API Badges -->
  ![OpenAI](https://img.shields.io/badge/OpenAI-API-412991?style=for-the-badge&logo=openai&logoColor=white)
  ![Groq](https://img.shields.io/badge/Groq-Llama_3.3_70B-FF6B35?style=for-the-badge&logo=meta&logoColor=white)
  ![Hugging Face](https://img.shields.io/badge/Hugging_Face-Transformers-FFD21E?style=for-the-badge&logo=huggingface&logoColor=black)
  
  <!-- Status Badges -->
  ![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)
  ![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
  ![Build Status](https://img.shields.io/badge/Build-Passing-brightgreen?style=for-the-badge)
  
</div>

---

## 🌟 Features Overview

<table>
<tr>
<td width="50%">

### 🤖 **AI Capabilities**
- 💬 **Intelligent Chat** - Groq's Llama 3.3 70B
- 🎨 **Image Generation** - Stable Diffusion models
- 📄 **File Analysis** - OpenAI Assistant API
- 🧠 **Multi-Model Support** - Seamless switching

### 🎨 **Visual Design**
- 🌙 **Dark/Light Mode** - System preference detection
- ✨ **Modern UI** - Glassmorphism & gradients
- 🎭 **Smooth Animations** - Framer Motion powered
- 📱 **Responsive Design** - All screen sizes

</td>
<td width="50%">

### 💬 **Chat Features**
- ⚡ **Real-time Chat** - Instant messaging
- 🔧 **Message Actions** - Copy, edit, delete
- 📎 **File Upload** - Drag & drop support
- 🎤 **Voice Recording** - Visual interface
- 📝 **Auto-resize Input** - Smart textarea
- 🔢 **Character Count** - Real-time tracking

### 🧭 **Navigation & UX**
- 📂 **Collapsible Sidebar** - Space-efficient
- 📚 **Chat History** - Searchable with timestamps
- 🔔 **Toast Notifications** - Beautiful feedback
- ⌨️ **Keyboard Shortcuts** - Productivity focused

</td>
</tr>
</table>

---

## 🏗️ Architecture & Tech Stack

<details>
<summary><b>🎨 Frontend Technologies</b></summary>

| Technology | Version | Purpose |
|------------|---------|---------|
| **React** | 18.2.0 | Modern UI framework with hooks |
| **Vite** | 5.0 | Lightning-fast build tool |
| **TypeScript** | 5.0 | Type-safe JavaScript |
| **Tailwind CSS** | 3.3 | Utility-first CSS framework |
| **Framer Motion** | 10.0 | Smooth animations and transitions |
| **Lucide React** | Latest | Beautiful icon library |

</details>

<details>
<summary><b>⚙️ Backend Technologies</b></summary>

| Technology | Version | Purpose |
|------------|---------|---------|
| **Node.js** | 18+ | Server-side JavaScript runtime |
| **Express.js** | 4.18 | Fast, unopinionated web framework |
| **Vercel Functions** | Latest | Serverless API deployment |
| **Multer** | Latest | File upload handling |

</details>

<details>
<summary><b>🤖 AI Services Integration</b></summary>

| Service | Model/API | Purpose |
|---------|-----------|---------|
| **Groq** | Llama 3.3 70B | Ultra-fast LLM inference |
| **OpenAI** | GPT-4 & Assistants | Advanced AI models & file analysis |
| **Hugging Face** | Stable Diffusion | State-of-the-art image generation |

</details>

---

## 📁 Project Structure

```
🏗️ SageAI/
├── 📁 client/                    # React frontend application
│   ├── 📁 src/
│   │   ├── 📁 components/        # React components
│   │   │   ├── 📁 Chat/          # Chat interface components
│   │   │   ├── 📁 Layout/        # Layout & structure
│   │   │   ├── 📁 Sidebar/       # Navigation components
│   │   │   └── 📁 ui/            # Reusable UI components
│   │   ├── 📁 context/           # React Context providers
│   │   ├── 📁 config/            # Configuration files
│   │   ├── 📁 utils/             # Utility functions
│   │   └── 📄 index.css          # Global styles
│   └── 📁 public/                # Static assets & logo
├── 📁 server/                    # Express.js backend
│   ├── 📁 uploads/               # File upload directory
│   └── 📄 index.js               # Main server file
├── 📁 api/                       # Vercel serverless functions
│   ├── 📄 chat.js                # Chat API endpoint
│   ├── 📄 generate-image.js      # Image generation API
│   ├── 📄 image-models.js        # Available models API
│   ├── 📄 upload.js              # File upload API
│   └── 📄 package.json           # API dependencies
├── 📁 scripts/                   # Build & deployment scripts
├── 📄 vercel.json               # Vercel deployment config
├── 📄 package.json              # Root dependencies
└── 📄 README.md                 # This documentation
```

---

## 🚀 Quick Start Guide

### 📋 Prerequisites

Before you begin, ensure you have:

- **Node.js 18+** installed
- API keys from the following services:
  - 🔑 **Groq API** - For intelligent chat responses
  - 🔑 **Hugging Face API** - For AI image generation
  - 🔑 **OpenAI API** - For file analysis *(optional)*

### ⚡ Installation & Setup

<details>
<summary><b>Step 1: Clone & Install</b></summary>

```bash
# Clone the repository
git clone https://github.com/your-username/sage-ai.git
cd sage-ai

# Install all dependencies
npm run install:all
```

</details>

<details>
<summary><b>Step 2: Environment Configuration</b></summary>

Create a `.env` file in the root directory:

```bash
# 🔑 Required API Keys
GROQ_API_KEY=your_groq_api_key_here
HUGGING_FACE_API_KEY=your_hugging_face_api_key_here

# 🔑 Optional (for file uploads)
OPENAI_API_KEY=your_openai_api_key_here
OPENAI_ASSISTANT_ID=your_openai_assistant_id_here

# 🌐 Optional (for production)
NODE_ENV=development
PORT=5001
```

</details>

<details>
<summary><b>Step 3: Start Development</b></summary>

```bash
# Start both client and server
npm run dev

# Or start separately:
npm run dev:client    # Frontend on port 3000
npm run dev:server    # Backend on port 5001
```

🎉 **Open your browser to `http://localhost:3000`**

</details>

### 🏗️ Production Build

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 🌐 Deployment Options

<div align="center">

### **One-Click Deployment**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/your-username/sage-ai)

*Automatically deploys with environment variable setup*

</div>

<details>
<summary><b>🔧 Manual Deployment Steps</b></summary>

1. **Prepare for deployment:**
   ```bash
   npm run build
   ```

2. **Set environment variables** in your hosting platform

3. **Deploy the built files** to your preferred hosting service

4. **Configure API routes** for serverless functions

</details>

---

## 🎯 Usage & Features

<table>
<tr>
<td width="33%">

### 💬 **Chat Interface**
- Type messages and get AI responses
- Upload files for analysis
- Copy/edit/delete messages
- View conversation history
- Real-time typing indicators

</td>
<td width="33%">

### 🎨 **Image Generation**
- Click the image icon in chat
- Describe your desired image
- Choose from multiple AI models
- Download generated images
- View generation history

</td>
<td width="33%">

### ⚙️ **Customization**
- Toggle between light/dark themes
- Collapsible sidebar navigation
- Keyboard shortcuts support
- Responsive design
- Accessible interface

</td>
</tr>
</table>

### ⌨️ **Keyboard Shortcuts**

| Shortcut | Action |
|----------|--------|
| `Enter` | Send message |
| `Shift + Enter` | New line in input |
| `Escape` | Close modals |
| `Ctrl/Cmd + K` | Quick actions *(coming soon)* |

---

## 🎨 Design System

<details>
<summary><b>🌈 Color Palette</b></summary>

| Mode | Primary | Secondary | Accent | Background |
|------|---------|-----------|--------|------------|
| **Light** | `#3B82F6` | `#6B7280` | `#8B5CF6` | `#FFFFFF` |
| **Dark** | `#60A5FA` | `#9CA3AF` | `#A78BFA` | `#111827` |

</details>

<details>
<summary><b>📝 Typography</b></summary>

- **Font Family:** Inter (Google Fonts)
- **Weights:** 300, 400, 500, 600, 700
- **Responsive scaling:** Mobile-first approach
- **Line Heights:** Optimized for readability

</details>

<details>
<summary><b>✨ Animation System</b></summary>

- **Micro-interactions:** Hover effects, button presses
- **Page transitions:** Smooth fade-ins and slides
- **Loading states:** Spinning indicators and typing animations
- **Motion prefers:** Respects user motion preferences

</details>

---

## 🗺️ Roadmap

<details>
<summary><b>✅ Completed (v1.0)</b></summary>

- [x] Complete UI/UX design system
- [x] Groq API integration for chat
- [x] Hugging Face image generation
- [x] OpenAI file analysis
- [x] Responsive design
- [x] Dark/Light theme system
- [x] Vercel deployment setup
- [x] File upload functionality

</details>

<details>
<summary><b>🔄 In Progress (v1.1)</b></summary>

- [ ] User authentication system
- [ ] Database integration
- [ ] Real-time collaboration
- [ ] Enhanced mobile experience

</details>

<details>
<summary><b>🎯 Planned Features</b></summary>

**v1.2 - Enhanced Experience**
- [ ] Voice recording & speech-to-text
- [ ] Code syntax highlighting
- [ ] Markdown rendering support
- [ ] Plugin architecture

**v2.0 - Advanced Features**
- [ ] Multi-language support
- [ ] Native mobile apps
- [ ] Advanced AI model switching
- [ ] Custom AI model training

</details>

---

## 🤝 Contributing

We welcome contributions from developers of all skill levels!

### 🚀 **Getting Started**

1. **Fork** the repository
2. **Clone** your fork locally
3. **Create** a feature branch
4. **Make** your changes
5. **Test** thoroughly
6. **Submit** a Pull Request

### 📋 **Contribution Guidelines**

- Follow the existing code style
- Write clear commit messages
- Add tests for new features
- Update documentation as needed
- Be respectful in discussions

### 🐛 **Reporting Issues**

Found a bug? Please create an issue with:
- Clear description of the problem
- Steps to reproduce
- Expected vs actual behavior
- Browser and OS information
- Screenshots if applicable

---

## 📄 License & Support

<div align="center">

![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**This project is licensed under the MIT License**

*See the [LICENSE](LICENSE) file for details*

### 🌟 **Show Your Support**

If you find SageAI helpful, please consider:
- ⭐ **Starring** this repository
- 🐛 **Reporting** issues you encounter
- 💡 **Suggesting** new features
- 🤝 **Contributing** to the codebase

### 📞 **Get Help**

- 📖 **Documentation:** Check this README
- 🐛 **Issues:** Use GitHub Issues
- 💬 **Discussions:** Join GitHub Discussions
- 📧 **Contact:** Open an issue for support

</div>

---

<div align="center">
  
  ## 💖 **Made with Love**
  
  **SageAI** is crafted with passion by developers who believe in the power of AI to enhance human productivity and creativity.
  
  *Join us in building the future of AI-powered assistance!*
  
  **[⭐ Star this repo](https://github.com/your-username/sage-ai)** • **[🐛 Report Bug](https://github.com/your-username/sage-ai/issues)** • **[💡 Request Feature](https://github.com/your-username/sage-ai/issues)**
  
</div>