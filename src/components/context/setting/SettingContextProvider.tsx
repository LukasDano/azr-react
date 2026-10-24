import type { FC, ReactNode } from "react";

import { useMemo } from "react";

import type { SettingContextValues } from "./SettingContext.tsx";

import { SettingContext } from "./SettingContext.tsx";

import type { ToastPosition } from "../../../utils/notifications.ts";
import type { ColorTheme, CountdownColors } from "../../../utils/themes.ts";

import { useStorageState } from "../../../utils/storage/storageManger.ts";

type SettingContextProviderProps = {
    children: ReactNode;
};

export const SettingContextProvider: FC<SettingContextProviderProps> = ({ children }) => {
    const [darkModeActive, updateDarkModeActive] = useStorageState<boolean>("azr_darkModeActive");
    const [countdownColors, updateCountdownColors] = useStorageState<CountdownColors>("azr_countdownColors");
    const [colorTheme, updateColorTheme] = useStorageState<ColorTheme>("azr_colorTheme");
    const [overTimeAutomatic, updateOverTimeAutomatic] = useStorageState<boolean>("azr_overTimeAutomatic");
    const [showShortcuts, updateShowShortcuts] = useStorageState<boolean>("azr_showShortcuts");
    const [toastPosition, updateToastPosition] = useStorageState<ToastPosition>("azr_toastPosition");

    const settingContextValues = useMemo<SettingContextValues>(
        () => ({
            darkModeActive,
            updateDarkModeActive,
            countdownColors,
            updateCountdownColors,
            colorTheme,
            updateColorTheme,
            overTimeAutomatic,
            updateOverTimeAutomatic,
            showShortcuts,
            updateShowShortcuts,
            toastPosition,
            updateToastPosition
        }),
        [
            darkModeActive,
            updateDarkModeActive,
            countdownColors,
            updateCountdownColors,
            colorTheme,
            updateColorTheme,
            overTimeAutomatic,
            updateOverTimeAutomatic,
            showShortcuts,
            updateShowShortcuts,
            toastPosition,
            updateToastPosition
        ]
    );

    return <SettingContext.Provider value={settingContextValues}>{children}</SettingContext.Provider>;
};
