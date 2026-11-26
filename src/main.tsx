import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { App } from './App'
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
