import { createContext } from 'react';
import type { ColorTheme, CountdownColors } from '../../static/themes';

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
};

export const SettingContext = createContext<SettingContextValues>({} as SettingContextValues);
