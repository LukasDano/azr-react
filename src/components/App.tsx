import type { FC } from "react";

import { useHotkey } from "@tanstack/react-hotkeys";
import { lazy, Suspense, useContext, useState } from "react";
import { Flip, ToastContainer } from "react-toastify";

import type { AppContextValues } from "./context/AppContext";
import type { SettingContextValues } from "./context/SettingContext";

import {
    calculateGleitzeit,
    calculateIstTime,
    calculateStartEndeTimeDiff,
    createGleitzeitAusgabeFromFloat
} from "../utils/calculatingTimes";
import { defaultBreakTime, defaultFloatValue, defaultWorkTime, emptyTimeValue } from "../utils/defaultValues.ts";
import { notificationPositions, sendNotification } from "../utils/notifications.ts";
import { getBackgroundTheme } from "../utils/themes.ts";
import { getCurrentTime, isDefaultTimeValue, parseTimeToString } from "../utils/typeUtilities/time";
import { ErrorBoundary } from "./boundaries/ErrorBoundary.tsx";
import { PanelErrorBoundary } from "./boundaries/PanelErrorBoundary.tsx";
import { Header } from "./content/header/Header";
import { AppContext } from "./context/AppContext";
import { SettingContext } from "./context/SettingContext";
import { BaseModal } from "./library/BaseModal.tsx";
import { Loader } from "./library/Loader.tsx";
import { Settings } from "./settings/Settings";

const Calculator = lazy(() => import("./content/Calculator.tsx"));
const FlexOfficeCalculator = lazy(() => import("./content/flexOffice/FlexOfficeCalculator.tsx"));
const WeekTimeCalculator = lazy(() => import("./content/weekTime/WeekTimeCalculator.tsx"));

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
            sendNotification({ lvl: "WARN", msg: "Noch keine Zeiten eingetragen" });
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

        sendNotification({ lvl: "INFO", msg: `Arbeitszeit: ${istStr} | Gleitzeit: ${floatStr}` });
    };

    useHotkey({ key: "i", alt: true }, () => setSettingsOpen(true), { requireReset: true });
    useHotkey({ key: "w", alt: true }, () => setWeekTimeOpen(true), { requireReset: true });
    useHotkey({ key: "h", alt: true }, () => setFlexOfficeOpen(true), { requireReset: true });
    useHotkey({ key: "c", alt: true }, sendMsgWithCurrentStats, { requireReset: true });
    useHotkey({ key: "F1" }, resetTimeValues, { requireReset: true, preventDefault: true });

    return (
        <div id={"azr-react-app"} className={darkModeActive ? "dark" : "light"}>
            <ToastContainer
                position={notificationPositions[toastPosition]}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={true}
                draggable={true}
                pauseOnHover={true}
                theme={"colored"}
                transition={Flip}
                className={"font-medium"}
            />

            <div className={`h-screen ${getBackgroundTheme(backgroundTheme).appBg}`}>
                <BaseModal
                    modalTitle={"Settings"}
                    size={"md"}
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
                        key={weekTimeOpen ? "open" : "closed"}
                        isOpen={weekTimeOpen}
                        onClose={() => setWeekTimeOpen(false)}
                    />
                </Suspense>

                <Suspense fallback={<Loader />}>
                    <FlexOfficeCalculator
                        key={flexOfficeOpen ? "open" : "closed"}
                        isOpen={flexOfficeOpen}
                        onClose={() => setFlexOfficeOpen(false)}
                    />
                </Suspense>

                <Suspense fallback={<Loader />}>
                    <Calculator />
                </Suspense>
            </div>
        </div>
    );
};
