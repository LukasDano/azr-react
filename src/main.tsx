import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { name, version } from '../package.json';
import { App } from './components/App.tsx';
import { AppContextProvider } from './components/context/AppContextProvider.tsx';
import { SettingContextProvider } from './components/context/SettingContextProvider.tsx';
import './index.css';

document.addEventListener('DOMContentLoaded', () => {
    console.info(`${name} v${version}`);
});

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <AppContextProvider>
            <SettingContextProvider>
                <App />
            </SettingContextProvider>
        </AppContextProvider>
    </StrictMode>,
);
