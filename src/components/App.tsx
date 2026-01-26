import { useContext, useState } from 'react';
import { Toaster } from 'sonner';

import { defaultFloatValue, emptyTimeValue } from '../static/defaultValues';
import type { Time } from '../static/importantTypes';
import {
    calculateGleitzeit,
    calculateIstTime,
    calculateStartEndeTimeDiff,
    createGleitzeitAusgabeFromFloat,
} from '../utils/calculatingTimes';
import { sendInfoMessage, sendWarnMessage } from '../utils/page/notifications';
import { getStorageValue } from '../utils/storage/localStorageManger';
import { getCurrentTime, isDefaultTimeValue, parseTimeToString } from '../utils/typeUtilities/time';
import { Content } from './content/Content';
import { Header } from './content/Header';
import { AppContext, type AppContextValues } from './context/AppContext';
import { SettingContext } from './context/SettingContext';
import type { SettingContextValues } from './context/SettingContext';
import { SettingsModal } from './settings/SettingsModal';

export const App = () => {
    const { darkModeActive } = useContext<SettingContextValues>(SettingContext);
    const { startTime, updateStartTime, updateFloatTime, endTime, updateEndTime } =
        useContext<AppContextValues>(AppContext);

    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);

    const resetTimeValues = (): void => {
        updateStartTime(emptyTimeValue);
        updateFloatTime(defaultFloatValue);
        updateEndTime(emptyTimeValue);
    };

    const sendMsgWithCurrentStats = (): void => {
        if (isDefaultTimeValue(startTime)) {
            sendWarnMessage('Noch keine Zeiten eingetragen');
            return;
        }

        const [diffHours] = calculateStartEndeTimeDiff(startTime, endTime);
        let currentBreak = getStorageValue('breakTime') as Time;
        if (diffHours < 6) currentBreak = [0, 0];

        const currentTime = getCurrentTime();
        const currentIst = calculateIstTime(startTime, currentTime, currentBreak);
        const currentFloat = calculateGleitzeit(currentIst);

        const istStr = parseTimeToString(currentIst);
        const floatStr = createGleitzeitAusgabeFromFloat(currentFloat);

        sendInfoMessage(`Arbeitszeit: ${istStr} | Gleitzeit: ${floatStr}`);
    };

    document.addEventListener('keyup', (evt) => {
        if (evt.ctrlKey && evt.key === 'i') setSettingsOpen(true);
        if (evt.altKey && evt.key === 'c') sendMsgWithCurrentStats();

        if (evt.key === 'F1') {
            evt.preventDefault();
            resetTimeValues();
        }
    });

    return (
        <div className={`${darkModeActive ? 'dark' : 'light'}`}>
            <div className="dark:bg-gray-900 h-screen">
                <SettingsModal isOpen={settingsOpen} onClose={() => setSettingsOpen(false)} />

                <Header
                    openSettings={() => setSettingsOpen(true)}
                    resetAction={resetTimeValues}
                    currentStatsAction={sendMsgWithCurrentStats}
                />

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
