import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { App } from './components/App.tsx';
import { AppContextProvider } from './components/context/AppContextProvider.tsx';
import { SettingContextProvider } from './components/context/SettingContextProvider.tsx';
import { name, version } from '../package.json';
import './index.css';
import { ErrorBoundary } from './components/boundaries/ErrorBoundary.tsx';

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
