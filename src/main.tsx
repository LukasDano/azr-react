import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { name, version } from '../package.json';
import { App } from './components/App.tsx';
import { ErrorBoundary } from './components/boundaries/ErrorBoundary.tsx';
import { AppContextProvider } from './components/context/AppContextProvider.tsx';
import './index.css';
import { SettingContextProvider } from './components/context/SettingContextProvider.tsx';

document.addEventListener('DOMContentLoaded', () => {
    console.info(`${name} v${version}`);
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ErrorBoundary>
            <AppContextProvider>
                <SettingContextProvider>
                    <App />
                </SettingContextProvider>
            </AppContextProvider>
        </ErrorBoundary>
    </StrictMode>
);
