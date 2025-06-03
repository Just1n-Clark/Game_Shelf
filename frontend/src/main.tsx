import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from './Hooks/darkMode';
import { GameLibraryProvider } from './Contexts/gameLibrary';

import './index.css'
import App from './App.tsx'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <GameLibraryProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <App />
                </BrowserRouter>
            </ThemeProvider>
        </GameLibraryProvider>
    </StrictMode>
)
