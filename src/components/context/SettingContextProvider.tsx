import type { FC, ReactNode } from 'react';
import { useMemo, useState } from 'react';

import type { CountdownColors } from '../../static/themes.ts';
import { getStorageValue, setStorageValue } from '../../utils/storage/localStorageManger.ts';
import { SettingContext, type SettingContextValues } from './SettingContext.tsx';

type SettingContextProviderProps = {
    children: ReactNode;
};

export const SettingContextProvider: FC<SettingContextProviderProps> = ({ children }) => {
    const [darkModeActive, setDarkModeActive] = useState<boolean>(getStorageValue('darkModeActive') as boolean);
    const [countdownColors, setCountdownColors] = useState<CountdownColors>(
        getStorageValue('countdownColors') as CountdownColors,
    );

    const updateDarkModeActive = (val: boolean): void => {
        setDarkModeActive(val);
        setStorageValue('darkModeActive', val);
    };

    const updateCountdownColors = (val: CountdownColors): void => {
        setCountdownColors(val);
        setStorageValue('countdownColors', val);
    };

    const settingContextValues = useMemo<SettingContextValues>(
        () => ({
            darkModeActive,
            updateDarkModeActive,
            countdownColors,
            updateCountdownColors,
        }),
        [darkModeActive, countdownColors],
    );

    return <SettingContext.Provider value={settingContextValues}>{children}</SettingContext.Provider>;
};
