import type { FC, ReactNode } from "react";

import { useMemo, useState } from "react";

import type { FloatTime, Time } from "../../utils/importantTypes.ts";
import type { AppContextValues } from "./AppContext.tsx";

import { getCookie, setCookieUntilMidnight } from "../../utils/storage/cookieManager.ts";
import { AppContext } from "./AppContext.tsx";

type AppContextProviderProps = {
    children: ReactNode;
};

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    const [startTime, setStartTime] = useState<Time>(getCookie("azr_startTime") as Time);
    const [floatTime, setFloatTime] = useState<FloatTime>(getCookie("azr_floatTime") as FloatTime);
    const [endTime, setEndTime] = useState<Time>(getCookie("azr_endTime") as Time);
    const [breakTime, setBreakTime] = useState<Time>(getCookie("azr_breakTime") as Time);
    const [workTime, setWorkTime] = useState<Time>(getCookie("azr_workTime") as Time);

    const updateStartTime = (val: Time): void => {
        setStartTime(val);
        setCookieUntilMidnight("azr_startTime", val);
    };

    const updateFloatTime = (val: FloatTime): void => {
        setFloatTime(val);
        setCookieUntilMidnight("azr_floatTime", val);
    };

    const updateEndTime = (val: Time): void => {
        setEndTime(val);
        setCookieUntilMidnight("azr_endTime", val);
    };

    const updateBreakTime = (val: Time): void => {
        setBreakTime(val);
        setCookieUntilMidnight("azr_breakTime", val);
    };

    const updateWorkTime = (val: Time): void => {
        setWorkTime(val);
        setCookieUntilMidnight("azr_workTime", val);
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
            updateWorkTime
        }),
        [startTime, floatTime, endTime, breakTime, workTime]
    );

    return <AppContext.Provider value={appContextValues}>{children}</AppContext.Provider>;
};
