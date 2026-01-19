import { createContext } from 'react';

import type { FloatTime, Time } from '../../static/importantTypes';

export type AppContextValues = {
    startTime: Time;
    updateStartTime: (val: Time) => void;
    floatTime: FloatTime;
    updateFloatTime: (val: FloatTime) => void;
};

export const AppContext = createContext<AppContextValues>({} as AppContextValues);
