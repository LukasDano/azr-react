import type { FC } from "react";

import { useCallback, useContext, useEffect } from "react";

import type { FloatTime, Time } from "../../utils/importantTypes.ts";
import type { AppContextValues } from "../context/app/AppContext.tsx";
import type { SettingContextValues } from "../context/setting/SettingContext.tsx";

import {
    calculateGleitzeit,
    calculateIncreasedValue,
    calculateIstTime,
    calculateNormalEnd,
    calculateOptimizedEnd,
    roundTimeForFloat
} from "../../utils/calculatingTimes.ts";
import { defaultFloatValue, defaultWorkTime, emptyTimeValue } from "../../utils/defaultValues.ts";
import { sendNotification } from "../../utils/notifications.ts";
import { parseFloatTimeFromRawTimeValues } from "../../utils/typeUtilities/floatTime.ts";
import {
    getCurrentTime,
    getLaterTime,
    isDefaultTimeValue,
    isSameTime,
    parseTimeToDate
} from "../../utils/typeUtilities/time.ts";
import { AppContext } from "../context/app/AppContext.tsx";
import { SettingContext } from "../context/setting/SettingContext.tsx";
import { FloatTimeInputField } from "../library/inputs/FloatTimeInputField.tsx";
import { TimeInputField } from "../library/inputs/TimeInputField.tsx";
import { Countdown } from "./countdown/Countdown.tsx";

type CalculatorProps = {
    updateKey: number;
};

const Calculator: FC<CalculatorProps> = ({ updateKey }) => {
    const { startTime, updateStartTime, floatTime, updateFloatTime, endTime, updateEndTime, breakTime, workTime } =
        useContext<AppContextValues>(AppContext);

    const { overTimeAutomatic, countdownColors } = useContext<SettingContextValues>(SettingContext);

    const handleEndUpdate = useCallback(
        (val: Time): void => {
            updateEndTime(val);

            const ist = calculateIstTime(startTime, val, breakTime);
            const float = calculateGleitzeit(ist);
            const parsed = parseFloatTimeFromRawTimeValues(float);
            updateFloatTime(parsed);
        },
        [startTime, breakTime, updateEndTime, updateFloatTime]
    );

    const handleBreakTimeChange = useCallback((): void => {
        const endTime = calculateNormalEnd(startTime, breakTime, workTime);
        const optimizedEnd = calculateOptimizedEnd(endTime);

        handleEndUpdate(optimizedEnd);
        updateFloatTime(defaultFloatValue);
    }, [startTime, breakTime, workTime, updateFloatTime, handleEndUpdate]);

    const handleStartTimeChange = useCallback(
        (val: Time): void => {
            const endTime = calculateNormalEnd(val, breakTime, workTime);

            updateStartTime(val);
            handleEndUpdate(endTime);
            updateFloatTime(defaultFloatValue);
        },
        [breakTime, workTime, updateStartTime, handleEndUpdate, updateFloatTime]
    );

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
        if (!isSameTime(startTime, emptyTimeValue)) handleStartTimeChange(startTime);
    }, [startTime, updateKey, handleStartTimeChange]);

    useEffect(() => {
        if (!isSameTime(startTime, emptyTimeValue)) handleBreakTimeChange();
    }, [startTime, breakTime, handleBreakTimeChange]);

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
                    colorTheme={countdownColors}
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
