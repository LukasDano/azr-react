import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/App.tsx';
import { AppContextProvider } from './components/context/AppContextProvider.tsx';
import { SettingContextProvider } from './components/context/SettingContextProvider.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppContextProvider>
            <SettingContextProvider>
                <App />
            </SettingContextProvider>
        </AppContextProvider>
    </StrictMode>,
);
