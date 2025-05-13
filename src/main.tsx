import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css' // Uncomment this line if global styles are needed in the future.
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)