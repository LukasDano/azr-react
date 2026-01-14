import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { App } from './components/App.tsx'
import { AppContextProvider } from './components/context/AppContextProvider.tsx'

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppContextProvider>
            <App />
        </AppContextProvider>
    </StrictMode>,
)
