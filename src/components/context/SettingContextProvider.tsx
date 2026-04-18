import type { FC, ReactNode } from 'react';
import { useMemo, useState } from 'react';

import { SettingContext, type SettingContextValues } from './SettingContext.tsx';
import type { ColorTheme, CountdownColors } from '../../static/themes.ts';
import { getStorageValue, setStorageValue } from '../../utils/storage/localStorageManger.ts';

type SettingContextProviderProps = {
    children: ReactNode;
};

export const SettingContextProvider: FC<SettingContextProviderProps> = ({ children }) => {
    const [darkModeActive, setDarkModeActive] = useState<boolean>(getStorageValue('darkModeActive') as boolean);
    const [countdownColors, setCountdownColors] = useState<CountdownColors>(
        getStorageValue('countdownColors') as CountdownColors,
    );
    const [colorTheme, setColorTheme] = useState<ColorTheme>(getStorageValue('colorTheme') as ColorTheme);
    const [overTimeAutomatic, setOverTimeAutomatic] = useState<boolean>(
        getStorageValue('overTimeAutomatic') as boolean,
    );
    const [showShortcuts, setShowShortcuts] = useState<boolean>(getStorageValue('showShortcuts') as boolean);

    const updateDarkModeActive = (val: boolean): void => {
        setDarkModeActive(val);
        setStorageValue('darkModeActive', val);
    };

    const updateCountdownColors = (val: CountdownColors): void => {
        setCountdownColors(val);
        setStorageValue('countdownColors', val);
    };

    const updateColorTheme = (val: ColorTheme): void => {
        setColorTheme(val);
        setStorageValue('colorTheme', val);
    };

    const updateOverTimeAutomatic = (val: boolean): void => {
        setOverTimeAutomatic(val);
        setStorageValue('overTimeAutomatic', val);
    };

    const updateShowShortcuts = (val: boolean): void => {
        setShowShortcuts(val);
        setStorageValue('showShortcuts', val);
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
        }),
        [darkModeActive, countdownColors, colorTheme, overTimeAutomatic, showShortcuts],
    );

    return <SettingContext.Provider value={settingContextValues}>{children}</SettingContext.Provider>;
};
