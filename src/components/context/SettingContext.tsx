import { createContext } from 'react';

import type { CountdownColors } from '../../static/themes';

export type SettingContextValues = {
    darkModeActive: boolean;
    updateDarkModeActive: (val: boolean) => void;
    countdownColors: CountdownColors;
    updateCountdownColors: (val: CountdownColors) => void;
};

export const SettingContext = createContext<SettingContextValues>({} as SettingContextValues);
