import React from 'react'
import ReactDOM from 'react-dom/client'
import Popup from './pages/Popup'
import { ThemeProvider } from '@/components/theme-provider'

const rootElement = document.getElementById('root')

ReactDOM.createRoot(rootElement!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Popup />
    </ThemeProvider>
  </React.StrictMode>,
)
