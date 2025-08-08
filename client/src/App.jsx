import React from 'react'
import MainLayout from './components/Layout/MainLayout'
import { ThemeProvider } from './context/ThemeContext'
import { ToastProvider } from './context/ToastContext'

function App() {
  return (
    <ThemeProvider>
      <ToastProvider>
        <MainLayout />
      </ToastProvider>
    </ThemeProvider>
  )
}

export default App
