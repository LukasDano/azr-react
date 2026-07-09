import type { FC, ReactNode } from "react";

import { useMemo, useState } from "react";

import type { ToastPosition } from "../../utils/notifications.ts";
import type { BackgroundTheme, ColorTheme, CountdownColors } from "../../utils/themes.ts";
import type { SettingContextValues } from "./SettingContext.tsx";

import { getStorageValue, setStorageValue } from "../../utils/storage/storageManger.ts";
import { SettingContext } from "./SettingContext.tsx";

type SettingContextProviderProps = {
    children: ReactNode;
};

export const SettingContextProvider: FC<SettingContextProviderProps> = ({ children }) => {
    const [darkModeActive, setDarkModeActive] = useState<boolean>(getStorageValue("azr_darkModeActive") as boolean);
    const [countdownColors, setCountdownColors] = useState<CountdownColors>(
        getStorageValue("azr_countdownColors") as CountdownColors
    );
    const [colorTheme, setColorTheme] = useState<ColorTheme>(getStorageValue("azr_colorTheme") as ColorTheme);
    const [overTimeAutomatic, setOverTimeAutomatic] = useState<boolean>(
        getStorageValue("azr_overTimeAutomatic") as boolean
    );
    const [showShortcuts, setShowShortcuts] = useState<boolean>(getStorageValue("azr_showShortcuts") as boolean);
    const [toastPosition, setToastPosition] = useState<ToastPosition>(
        getStorageValue("azr_toastPosition") as ToastPosition
    );

    const [backgroundTheme, setBackgroundTheme] = useState<BackgroundTheme>(
        getStorageValue("azr_backgroundTheme") as BackgroundTheme
    );

    const updateDarkModeActive = (val: boolean): void => {
        setDarkModeActive(val);
        setStorageValue("azr_darkModeActive", val);
    };

    const updateCountdownColors = (val: CountdownColors): void => {
        setCountdownColors(val);
        setStorageValue("azr_countdownColors", val);
    };

    const updateColorTheme = (val: ColorTheme): void => {
        setColorTheme(val);
        setStorageValue("azr_colorTheme", val);
    };

    const updateOverTimeAutomatic = (val: boolean): void => {
        setOverTimeAutomatic(val);
        setStorageValue("azr_overTimeAutomatic", val);
    };

    const updateShowShortcuts = (val: boolean): void => {
        setShowShortcuts(val);
        setStorageValue("azr_showShortcuts", val);
    };

    const updateToastPosition = (val: ToastPosition): void => {
        setToastPosition(val);
        setStorageValue("azr_toastPosition", val);
    };

    const updateBackgroundTheme = (val: BackgroundTheme): void => {
        setBackgroundTheme(val);
        setStorageValue("azr_backgroundTheme", val);
    };

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
            updateToastPosition,
            backgroundTheme,
            updateBackgroundTheme
        }),
        [darkModeActive, countdownColors, colorTheme, overTimeAutomatic, showShortcuts, toastPosition, backgroundTheme]
    );

    return <SettingContext.Provider value={settingContextValues}>{children}</SettingContext.Provider>;
};
