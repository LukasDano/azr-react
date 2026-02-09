import type { FC, ReactNode } from 'react';
import { useMemo, useState } from 'react';
import { AppContext, type AppContextValues } from './AppContext.tsx';
import type { FloatTime, Time } from '../../static/importantTypes.ts';
import { getCookie, setCookieUntilMidnight } from '../../utils/storage/cookieManager.ts';

type AppContextProviderProps = {
    children: ReactNode;
};

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    const [startTime, setStartTime] = useState<Time>(getCookie('startTime') as Time);
    const [floatTime, setFloatTime] = useState<FloatTime>(getCookie('floatTime') as FloatTime);
    const [endTime, setEndTime] = useState<Time>(getCookie('endTime') as Time);
    const [breakTime, setBreakTime] = useState<Time>(getCookie('breakTime') as Time);
    const [workTime, setWorkTime] = useState<Time>(getCookie('workTime') as Time);

    const updateStartTime = (val: Time): void => {
        setStartTime(val);
        setCookieUntilMidnight('startTime', val);
    };

    const updateFloatTime = (val: FloatTime): void => {
        setFloatTime(val);
        setCookieUntilMidnight('floatTime', val);
    };

    const updateEndTime = (val: Time): void => {
        setEndTime(val);
        setCookieUntilMidnight('endTime', val);
    };

    const updateBreakTime = (val: Time): void => {
        setBreakTime(val);
        setCookieUntilMidnight('breakTime', val);
    };

    const updateWorkTime = (val: Time): void => {
        setWorkTime(val);
        setCookieUntilMidnight('workTime', val);
    };

    const appContextValues = useMemo<AppContextValues>(
        () => ({
            startTime,
            updateStartTime,
            floatTime,
            updateFloatTime,
            endTime,
            updateEndTime,
            breakTime,
            updateBreakTime,
            workTime,
            updateWorkTime,
        }),
        [startTime, floatTime, endTime, breakTime, workTime],
    );

    return <AppContext.Provider value={appContextValues}>{children}</AppContext.Provider>;
};
