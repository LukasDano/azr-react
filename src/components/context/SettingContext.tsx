import { createContext } from "react";

import type { BackgroundTheme, ColorTheme, CountdownColors } from "../../static/themes";
import type { ToastPosition } from "../../utils/notifications.ts";

export type SettingContextValues = {
    darkModeActive: boolean;
    updateDarkModeActive: (val: boolean) => void;
    countdownColors: CountdownColors;
    updateCountdownColors: (val: CountdownColors) => void;
    colorTheme: ColorTheme;
    updateColorTheme: (val: ColorTheme) => void;
    overTimeAutomatic: boolean;
    updateOverTimeAutomatic: (val: boolean) => void;
    showShortcuts: boolean;
    updateShowShortcuts: (val: boolean) => void;
    toastPosition: ToastPosition;
    updateToastPosition: (val: ToastPosition) => void;
    backgroundTheme: BackgroundTheme;
    updateBackgroundTheme: (val: BackgroundTheme) => void;
};

export const SettingContext = createContext<SettingContextValues>({} as SettingContextValues);
