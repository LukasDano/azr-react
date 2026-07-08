import type { FC } from "react";

import { useCallback, useContext, useEffect } from "react";

import type { FloatTime, Time } from "../../utils/importantTypes.ts";
import type { CountdownColors } from "../../utils/themes.ts";
import type { AppContextValues } from "../context/AppContext.tsx";
import type { SettingContextValues } from "../context/SettingContext.tsx";

import {
    defaultBreakTime,
    defaultFloatForSixHourMode,
    defaultFloatValue,
    defaultWorkTime,
    defaultWorkTimeForSixHourMode,
    emptyTimeValue
} from "../../utils/defaultValues.ts";
import {
    calculateGleitzeit,
    calculateIncreasedValue,
    calculateIstTime,
    calculateNormalEnd,
    calculateOptimizedEnd,
    roundTimeForFloat
} from "../../utils/calculatingTimes.ts";
import { sendNotification } from "../../utils/notifications.ts";
import { getStorageValue } from "../../utils/storage/localStorageManger.ts";
import { parseFloatTimeFromRawTimeValues } from "../../utils/typeUtilities/floatTime.ts";
import {
    getCurrentTime,
    getLaterTime,
    isDefaultTimeValue,
    isSameTime,
    parseTimeToDate
} from "../../utils/typeUtilities/time.ts";
import { AppContext } from "../context/AppContext.tsx";
import { SettingContext } from "../context/SettingContext.tsx";
import { Countdown } from "./countdown/Countdown.tsx";
import { FloatTimeInputField } from "./inputs/FloatTimeInputField.tsx";
import { TimeInputField } from "./inputs/TimeInputField.tsx";

const Calculator: FC = () => {
    const {
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
    } = useContext<AppContextValues>(AppContext);

    const { overTimeAutomatic } = useContext<SettingContextValues>(SettingContext);

    const handleStartTimeChange = (val: Time): void => {
        const endTime = calculateNormalEnd(val, breakTime, workTime);

        updateStartTime(val);
        handleEndUpdate(endTime);
        updateFloatTime(defaultFloatValue);
    };

    const handleEndUpdate = (val: Time): void => {
        updateEndTime(val);

        const ist = calculateIstTime(startTime, val, breakTime);
        const float = calculateGleitzeit(ist);
        const parsed = parseFloatTimeFromRawTimeValues(float);
        updateFloatTime(parsed);

        if (!isSameTime(defaultWorkTimeForSixHourMode, getLaterTime(ist, defaultWorkTimeForSixHourMode))) {
            updateBreakTime(defaultBreakTime);
            updateWorkTime(defaultWorkTime);
        }
    };

    const handleFloatUpdate = useCallback(
        (val: FloatTime): void => {
            const normalEnd = calculateNormalEnd(startTime, breakTime, defaultWorkTime);
            const endForFloat = roundTimeForFloat(normalEnd, val);
            const optimized = calculateOptimizedEnd(endForFloat);

            updateEndTime(optimized);
            updateFloatTime(val);
        },
        [startTime, breakTime, updateEndTime, updateFloatTime]
    );

    const handleWorkTimeEnd = (): void => {
        if (!overTimeAutomatic) {
            sendNotification({ lvl: "INFO", msg: "Ende der Arbeitszeit" });
            return;
        }

        const currentTime = getCurrentTime();
        const laterTime = getLaterTime(endTime, currentTime);

        if (isSameTime(laterTime, currentTime)) {
            sendNotification({ lvl: "INFO", msg: "Deine Arbeitszeit ist vorbei" });
            sendNotification({ lvl: "INFO", msg: "Arbeitszeit wird automatisch erhöht" });

            const increased = calculateIncreasedValue(floatTime);
            const updatedValue = parseFloatTimeFromRawTimeValues(increased);

            handleEndUpdate(currentTime);
            handleFloatUpdate(updatedValue);
        }
    };

    useEffect(() => {
        const floatForBreakTime = isSameTime(breakTime, defaultBreakTime)
            ? defaultFloatValue
            : defaultFloatForSixHourMode;

        if (!isSameTime(startTime, emptyTimeValue)) handleFloatUpdate(floatForBreakTime);
    }, [breakTime, startTime, handleFloatUpdate]);

    return (
        <div className={"mx-auto w-full max-w-3xl px-4 py-8"}>
            <div className={"mb-8 flex flex-col items-stretch justify-center gap-4 lg:flex-row"}>
                <div className={"flex-1"}>
                    <TimeInputField label={"Arbeitsbeginn"} value={startTime} onChange={handleStartTimeChange} />
                </div>
                <div className={"flex-1"}>
                    <TimeInputField label={"Arbeitsende"} value={endTime} onChange={handleEndUpdate} />
                </div>
            </div>

            <div className={"mb-8 flex flex-col justify-center gap-4 sm:flex-row"}>
                <div className={"mx-auto max-w-xs flex-1 sm:mx-0"}>
                    <TimeInputField label={"Pause"} value={breakTime} disabled={true} />
                </div>
                <div className={"mx-auto max-w-xs flex-1 sm:mx-0"}>
                    <TimeInputField label={"Arbeitszeit"} value={workTime} disabled={true} />
                </div>
                <div className={"mx-auto max-w-xs flex-1 sm:mx-0"}>
                    <FloatTimeInputField
                        label={"Gleitzeit"}
                        value={floatTime}
                        onChange={handleFloatUpdate}
                        onClick={handleFloatUpdate}
                    />
                </div>
            </div>

            <div className={"pt-4"}>
                <Countdown
                    end={parseTimeToDate(endTime)}
                    colorTheme={getStorageValue("countdownColors") as CountdownColors}
                    onEnd={() => {
                        if (!isDefaultTimeValue(endTime)) handleWorkTimeEnd();
                    }}
                />
            </div>
        </div>
    );
};

// oxlint-disable-next-line import/no-default-export
export default Calculator;
