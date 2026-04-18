import { useContext, useState } from 'react';
import { Toaster } from 'sonner';

import { Content } from './content/Calculator';
import { FlexOfficeCalculator } from './content/flexOffice/FlexOfficeCalculator.tsx';
import { Header } from './content/header/Header';
import { BaseModal } from './content/miscellaneous/BaseModal';
import { WeekTimeCalculator } from './content/weekTime/WeekTimeCalculator.tsx';
import { AppContext, type AppContextValues } from './context/AppContext';
import type { SettingContextValues } from './context/SettingContext';
import { SettingContext } from './context/SettingContext';
import { Settings } from './settings/Settings';
import { defaultBreakTime, defaultFloatValue, defaultWorkTime, emptyTimeValue } from '../static/defaultValues';
import {
    calculateGleitzeit,
    calculateIstTime,
    calculateStartEndeTimeDiff,
    createGleitzeitAusgabeFromFloat,
} from '../utils/calculatingTimes';
import { sendInfoMessage, sendWarnMessage } from '../utils/page/notifications';
import { getCurrentTime, isDefaultTimeValue, parseTimeToString } from '../utils/typeUtilities/time';

export const App = () => {
    const { darkModeActive } = useContext<SettingContextValues>(SettingContext);
    const {
        startTime,
        updateStartTime,
        updateFloatTime,
        endTime,
        updateEndTime,
        breakTime,
        updateWorkTime,
        updateBreakTime,
    } = useContext<AppContextValues>(AppContext);

    const [settingsOpen, setSettingsOpen] = useState<boolean>(false);
    const [weekTimeOpen, setWeekTimeOpen] = useState<boolean>(false);
    const [flexOfficeOpen, setFlexOfficeOpen] = useState<boolean>(false);

    const resetTimeValues = (): void => {
        updateStartTime(emptyTimeValue);
        updateFloatTime(defaultFloatValue);
        updateEndTime(emptyTimeValue);
        updateWorkTime(defaultWorkTime);
        updateBreakTime(defaultBreakTime);
    };

    const sendMsgWithCurrentStats = (): void => {
        if (isDefaultTimeValue(startTime)) {
            sendWarnMessage('Noch keine Zeiten eingetragen');
            return;
        }

        const [diffHours] = calculateStartEndeTimeDiff(startTime, endTime);
        let currentBreak = breakTime;
        if (diffHours < 6) currentBreak = emptyTimeValue;

        const currentTime = getCurrentTime();
        const currentIst = calculateIstTime(startTime, currentTime, currentBreak);
        const currentFloat = calculateGleitzeit(currentIst);

        const istStr = parseTimeToString(currentIst);
        const floatStr = createGleitzeitAusgabeFromFloat(currentFloat);

        sendInfoMessage(`Arbeitszeit: ${istStr} | Gleitzeit: ${floatStr}`);
    };

    document.addEventListener('keyup', (evt) => {
        if (evt.altKey && evt.key === 'i') setSettingsOpen(true);
        if (evt.altKey && evt.key === 'w') setWeekTimeOpen(true);
        if (evt.altKey && evt.key === 'h') setFlexOfficeOpen(true);
        if (evt.altKey && evt.key === 'c') sendMsgWithCurrentStats();

        if (evt.key === 'F1') {
            evt.preventDefault();
            resetTimeValues();
        }
    });

    return (
        <div className={`${darkModeActive ? 'dark' : 'light'}`}>
            <div className="dark:bg-gray-900 h-screen">
                <BaseModal modalTitle={'Einstellungen'} isOpen={settingsOpen} onClose={() => setSettingsOpen(false)}>
                    <Settings />
                </BaseModal>

                <WeekTimeCalculator
                    key={weekTimeOpen ? 'open' : 'closed'}
                    isOpen={weekTimeOpen}
                    onClose={() => setWeekTimeOpen(false)}
                />

                <FlexOfficeCalculator
                    key={flexOfficeOpen ? 'open' : 'closed'}
                    isOpen={flexOfficeOpen}
                    onClose={() => setFlexOfficeOpen(false)}
                />

                <Header
                    openSettings={() => setSettingsOpen(true)}
                    openWeekTime={() => setWeekTimeOpen(true)}
                    openFlexOffice={() => setFlexOfficeOpen(true)}
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
