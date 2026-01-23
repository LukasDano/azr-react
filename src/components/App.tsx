import { useContext, useState } from 'react';
import { Toaster } from 'sonner';

import { Content } from './content/Content';
import { Header } from './content/Header';
import { SettingContext } from './context/SettingContext';
import type { SettingContextValues } from './context/SettingContext';
import { SettingsModal } from './settings/SettingsModal';

export const App = () => {
    const { darkModeActive } = useContext<SettingContextValues>(SettingContext);

    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    document.addEventListener('keydown', (evt) => {
        if (evt.ctrlKey && evt.key === 'i') setSettingsOpen(true);
    });

    return (
        <div className={`${darkModeActive ? 'dark' : 'light'}`}>
            <div className="dark:bg-gray-900 h-screen">
                <Header openSettings={() => setSettingsOpen(true)} />
                <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />
                <Content />

                <Toaster
                    position="bottom-right"
                    closeButton={true}
                    richColors={true}
                    theme={`${darkModeActive ? 'dark' : 'light'}`}
                />
            </div>
        </div>
    );
};
