import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { handlePreloadError } from './utils/preloadRecovery.js'

// Após um novo deploy, quem estava com o site aberto recarrega uma vez para pegar a versão nova.
window.addEventListener('vite:preloadError', (event) => {
  let storage = null
  try {
    storage = window.sessionStorage
  } catch {
    // storage bloqueado: handlePreloadError não recarrega sozinho
  }
  handlePreloadError(event, { storage, reload: () => window.location.reload() })
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
