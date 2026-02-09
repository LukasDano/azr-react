import { StrictMode } from 'react';
import { name, version } from '../package.json';
import { createRoot } from 'react-dom/client';
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
