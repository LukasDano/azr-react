import { createContext } from 'react';

import type { CountdownColors, ThemeName } from '../../static/themes';

export type SettingContextValues = {
    darkModeActive: boolean;
    updateDarkModeActive: (val: boolean) => void;
    countdownColors: CountdownColors;
    updateCountdownColors: (val: CountdownColors) => void;
    colorTheme: ThemeName;
    updateColorTheme: (val: ThemeName) => void;
    overTimeAutomatic: boolean;
    updateOverTimeAutomatic: (val: boolean) => void;
};

export const SettingContext = createContext<SettingContextValues>({} as SettingContextValues);
