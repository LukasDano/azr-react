import type { FC, ReactNode, } from 'react';
import { useState, useMemo } from 'react';

import { getStorageValue, setStorageValue } from '../../utils/storageProvider.ts';
import type { Time } from '../../utils/importantTypes.ts';
import { AppContext, type AppContextValues } from './AppContext.tsx';

type AppContextProviderProps = {
    children: ReactNode;
};

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    const [startTime, setStartTime] = useState<Time>(getStorageValue('startTime'));

    const updateStartTime = (start: Time): void => {
        setStartTime(start);
        setStorageValue("startTime", start);
    };

    const appContextValues = useMemo<AppContextValues>(
        () => ({
            startTime: startTime,
            updateStartTime: updateStartTime
        }), [startTime]);

    return <AppContext.Provider value={appContextValues}>{children}</AppContext.Provider>;
};