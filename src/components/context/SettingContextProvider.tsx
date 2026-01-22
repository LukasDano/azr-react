import type { FC, ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { getStorageValue, setStorageValue } from '../../utils/storage/localStorageManger.ts';
import { SettingContext, type SettingContextValues } from './SettingContext.tsx';

type SettingContextProviderProps = {
    children: ReactNode;
};

export const SettingContextProvider: FC<SettingContextProviderProps> = ({ children }) => {
    const [darkModeActive, setDarkModeActive] = useState<boolean>(getStorageValue('darkModeActive') as boolean);
    const [hoursCountdownColor, setHoursCountdownColor] = useState<string>(
        getStorageValue('hoursCountdownColor') as string,
    );
    const [minutesCountdownColor, setMinutesCountdownColor] = useState<string>(
        getStorageValue('minutesCountdownColor') as string,
    );
    const [secondsCountdownColor, setSecondsCountdownColor] = useState<string>(
        getStorageValue('secondsCountdownColor') as string,
    );

    const updateDarkModeActive = (val: boolean): void => {
        setDarkModeActive(val);
        setStorageValue('darkModeActive', val);
    };

    const updateHoursCountdownColor = (val: string): void => {
        setHoursCountdownColor(val);
        setStorageValue('hoursCountdownColor', val);
    };

    const updateMinutesCountdownColor = (val: string): void => {
        setMinutesCountdownColor(val);
        setStorageValue('minutesCountdownColor', val);
    };

    const updateSecondsCountdownColor = (val: string): void => {
        setSecondsCountdownColor(val);
        setStorageValue('secondsCountdownColor', val);
    };

    const settingContextValues = useMemo<SettingContextValues>(
        () => ({
            darkModeActive,
            updateDarkModeActive,
            hoursCountdownColor,
            updateHoursCountdownColor,
            minutesCountdownColor,
            updateMinutesCountdownColor,
            secondsCountdownColor,
            updateSecondsCountdownColor,
        }),
        [darkModeActive, hoursCountdownColor, minutesCountdownColor, secondsCountdownColor],
    );

    return <SettingContext.Provider value={settingContextValues}>{children}</SettingContext.Provider>;
};
