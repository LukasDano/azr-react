import type { FC } from 'react';

import { useHotkey } from '@tanstack/react-hotkeys';
import { lazy, Suspense, useContext, useState } from 'react';
import { Toaster } from 'sonner';

import type { AppContextValues } from './context/AppContext';
import type { SettingContextValues } from './context/SettingContext';

import { defaultBreakTime, defaultFloatValue, defaultWorkTime, emptyTimeValue } from '../static/defaultValues';
import { getBackgroundTheme } from '../static/themes.ts';
import {
    calculateGleitzeit,
    calculateIstTime,
    calculateStartEndeTimeDiff,
    createGleitzeitAusgabeFromFloat
} from '../utils/calculatingTimes';
import { notificationPositions, sendInfoMessage, sendWarnMessage } from '../utils/page/notifications';
import { getCurrentTime, isDefaultTimeValue, parseTimeToString } from '../utils/typeUtilities/time';
import { ErrorBoundary } from './boundaries/ErrorBoundary.tsx';
import { PanelErrorBoundary } from './boundaries/PanelErrorBoundary.tsx';
import { Header } from './content/header/Header';
import { BaseModal } from './content/miscellaneous/BaseModal';
import { Loader } from './content/miscellaneous/Loader.tsx';
import { AppContext } from './context/AppContext';
import { SettingContext } from './context/SettingContext';
import { Settings } from './settings/Settings';

const Calculator = lazy(() => import('./content/Calculator.tsx'));
const FlexOfficeCalculator = lazy(() => import('./content/flexOffice/FlexOfficeCalculator.tsx'));
const WeekTimeCalculator = lazy(() => import('./content/weekTime/WeekTimeCalculator.tsx'));

export const App: FC = () => {
    const { darkModeActive, toastPosition, backgroundTheme } = useContext<SettingContextValues>(SettingContext);
    const {
        startTime,
        updateStartTime,
        updateFloatTime,
        endTime,
        updateEndTime,
        breakTime,
        updateWorkTime,
        updateBreakTime
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

    useHotkey({ key: 'i', alt: true }, () => setSettingsOpen(true), { requireReset: true });
    useHotkey({ key: 'w', alt: true }, () => setWeekTimeOpen(true), { requireReset: true });
    useHotkey({ key: 'h', alt: true }, () => setFlexOfficeOpen(true), { requireReset: true });
    useHotkey({ key: 'c', alt: true }, sendMsgWithCurrentStats, { requireReset: true });
    useHotkey({ key: 'F1' }, resetTimeValues, { requireReset: true, preventDefault: true });

    return (
        <div className={darkModeActive ? 'dark' : 'light'}>
            <div className={`h-screen ${getBackgroundTheme(backgroundTheme).appBg}`}>
                <BaseModal
                    modalTitle={'Settings'}
                    size={'md'}
                    isOpen={settingsOpen}
                    onClose={() => setSettingsOpen(false)}
                >
                    <ErrorBoundary
                        fallbackNode={(err) => <PanelErrorBoundary title={err.name} description={err.msg} />}
                    >
                        <Settings />
                    </ErrorBoundary>
                </BaseModal>

                <Header
                    openSettings={() => setSettingsOpen(true)}
                    openWeekTime={() => setWeekTimeOpen(true)}
                    openFlexOffice={() => setFlexOfficeOpen(true)}
                    resetAction={resetTimeValues}
                    currentStatsAction={sendMsgWithCurrentStats}
                />

                <Suspense fallback={<Loader />}>
                    <WeekTimeCalculator
                        key={weekTimeOpen ? 'open' : 'closed'}
                        isOpen={weekTimeOpen}
                        onClose={() => setWeekTimeOpen(false)}
                    />
                </Suspense>

                <Suspense fallback={<Loader />}>
                    <FlexOfficeCalculator
                        key={flexOfficeOpen ? 'open' : 'closed'}
                        isOpen={flexOfficeOpen}
                        onClose={() => setFlexOfficeOpen(false)}
                    />
                </Suspense>

                <Suspense fallback={<Loader />}>
                    <Calculator />
                </Suspense>

                <Toaster
                    position={notificationPositions[toastPosition]}
                    closeButton
                    richColors
                    theme={darkModeActive ? 'dark' : 'light'}
                />
            </div>
        </div>
    );
};
