import { createContext } from 'react';

export type SettingContextValues = {
    darkModeActive: boolean;
    updateDarkModeActive: (val: boolean) => void;
    hoursCountdownColor: string;
    updateHoursCountdownColor: (val: string) => void;
    minutesCountdownColor: string;
    updateMinutesCountdownColor: (val: string) => void;
    secondsCountdownColor: string;
    updateSecondsCountdownColor: (val: string) => void;
};

export const SettingContext = createContext<SettingContextValues>({} as SettingContextValues);
