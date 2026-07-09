import type { FC, ReactNode } from "react";

import { useMemo } from "react";

import type { FloatTime, Time } from "../../../utils/importantTypes.ts";
import type { AppContextValues } from "./AppContext.tsx";

import { useCookieState } from "../../../utils/storage/cookieManager.ts";
import { AppContext } from "./AppContext.tsx";

type AppContextProviderProps = {
    children: ReactNode;
};

export const AppContextProvider: FC<AppContextProviderProps> = ({ children }) => {
    const [startTime, updateStartTime] = useCookieState<Time>({
        key: "azr_startTime",
        cookieSetFn: "setCookieUntilMidnight"
    });

    const [floatTime, updateFloatTime] = useCookieState<FloatTime>({
        key: "azr_floatTime",
        cookieSetFn: "setCookieUntilMidnight"
    });

    const [endTime, updateEndTime] = useCookieState<Time>({
        key: "azr_endTime",
        cookieSetFn: "setCookieUntilMidnight"
    });

    const [breakTime, updateBreakTime] = useCookieState<Time>({
        key: "azr_breakTime",
        cookieSetFn: "setCookieUntilMidnight"
    });

    const [workTime, updateWorkTime] = useCookieState<Time>({
        key: "azr_workTime",
        cookieSetFn: "setCookieUntilMidnight"
    });

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
        [
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
        ]
    );

    return <AppContext.Provider value={appContextValues}>{children}</AppContext.Provider>;
};
