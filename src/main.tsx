import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
// Self-hosted fonts (latin only; the browser fetches a face only when a page needs it).
import '@fontsource-variable/bricolage-grotesque/opsz.css'
import '@fontsource/hanken-grotesk/latin-400.css'
import '@fontsource/hanken-grotesk/latin-500.css'
import '@fontsource/hanken-grotesk/latin-600.css'
import '@fontsource/jetbrains-mono/latin-400.css'
import '@fontsource/jetbrains-mono/latin-500.css'
import './styles.css'

declare global {
  interface Window {
    __vtReady?: boolean
  }
}

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// Production HTML is prerendered (see scripts/prerender.mjs), so hydrate; dev renders fresh.
if (root.firstElementChild) hydrateRoot(root, app)
else createRoot(root).render(app)

window.__vtReady = true
