import React from 'react'
import ReactDOM from 'react-dom/client'
import Popup from './pages/Popup'
import { ThemeProvider } from '@/components/theme-provider'

ReactDOM.createRoot(document.body).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <main className="w-[420px] p-3">
        <Popup />
      </main>
    </ThemeProvider>
  </React.StrictMode>
)
