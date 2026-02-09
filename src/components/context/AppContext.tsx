import { createContext } from 'react';
import type { FloatTime, Time } from '../../static/importantTypes';

export type AppContextValues = {
    startTime: Time;
    updateStartTime: (val: Time) => void;
    floatTime: FloatTime;
    updateFloatTime: (val: FloatTime) => void;
    endTime: Time;
    updateEndTime: (val: Time) => void;
    breakTime: Time;
    updateBreakTime: (val: Time) => void;
    workTime: Time;
    updateWorkTime: (val: Time) => void;
};

export const AppContext = createContext<AppContextValues>({} as AppContextValues);
