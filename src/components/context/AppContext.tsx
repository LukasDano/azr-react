import { createContext } from 'react';
import type { Time } from '../../utils/importantTypes';

export type AppContextValues = {
    startTime: Time;
    updateStartTime: (val: Time) => void;
};

export const AppContext = createContext<AppContextValues>({} as AppContextValues);