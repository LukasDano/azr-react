import { useContext, useEffect } from 'react';

import { Countdown } from './countdown/Countdown.tsx';
import { FloatTimeInputField } from './inputs/FloatTimeInputField.tsx';
import { TimeInputField } from './inputs/TimeInputField.tsx';
import {
    defaultBreakTime,
    defaultFloatForSixHourMode,
    defaultFloatValue,
    defaultWorkTime,
    defaultWorkTimeForSixHourMode,
    emptyTimeValue,
} from '../../static/defaultValues.ts';
import type { FloatTime, Time } from '../../static/importantTypes.ts';
import type { CountdownColors } from '../../static/themes.ts';
import {
    calculateGleitzeit,
    calculateIncreasedValue,
    calculateIstTime,
    calculateNormalEnd,
    calculateOptimizedEnd,
    roundTimeForFloat,
} from '../../utils/calculatingTimes.ts';
import { sendInfoMessage } from '../../utils/page/notifications.ts';
import { getStorageValue } from '../../utils/storage/localStorageManger.ts';
import { parseFloatTimeFromRawTimeValues } from '../../utils/typeUtilities/floatTime.ts';
import {
    getCurrentTime,
    getLaterTime,
    isDefaultTimeValue,
    isSameTime,
    parseTimeToDate,
} from '../../utils/typeUtilities/time.ts';
import { AppContext, type AppContextValues } from '../context/AppContext.tsx';
import { SettingContext, type SettingContextValues } from '../context/SettingContext.tsx';

export const Content = () => {
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
        updateWorkTime,
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

    const handleFloatUpdate = (val: FloatTime): void => {
        const normalEnd = calculateNormalEnd(startTime, breakTime, defaultWorkTime);
        const endForFloat = roundTimeForFloat(normalEnd, val);
        const optimized = calculateOptimizedEnd(endForFloat);

        updateEndTime(optimized);
        updateFloatTime(val);
    };

    const handleWorkTimeEnd = (): void => {
        if (!overTimeAutomatic) {
            sendInfoMessage('Ende der Arbeitszeit');
            return;
        }

        const currentTime = getCurrentTime();
        const laterTime = getLaterTime(endTime, currentTime);

        if (isSameTime(laterTime, currentTime)) {
            sendInfoMessage('Deine Arbeitszeit ist vorbei');
            sendInfoMessage('Arbeitszeit wird automatisch erhöht');

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
    }, [breakTime, startTime]);

    return (
        <div className="mx-auto max-w-3xl w-full px-4 py-8">
            <div className="flex flex-col lg:flex-row gap-4 mb-8 justify-center items-stretch">
                <div className="flex-1">
                    <TimeInputField label="Arbeitsbeginn" value={startTime} onChange={handleStartTimeChange} />
                </div>
                <div className="flex-1">
                    <TimeInputField label="Arbeitsende" value={endTime} onChange={handleEndUpdate} />
                </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center">
                <div className="flex-1 max-w-xs mx-auto sm:mx-0">
                    <TimeInputField label="Pause" value={breakTime} disabled={true} />
                </div>
                <div className="flex-1 max-w-xs mx-auto sm:mx-0">
                    <TimeInputField label="Arbeitszeit" value={workTime} disabled={true} />
                </div>
                <div className="flex-1 max-w-xs mx-auto sm:mx-0">
                    <FloatTimeInputField
                        label="Gleitzeit"
                        value={floatTime}
                        onChange={handleFloatUpdate}
                        onClick={handleFloatUpdate}
                    />
                </div>
            </div>

            <div className="pt-4">
                <Countdown
                    end={parseTimeToDate(endTime)}
                    colorTheme={getStorageValue('countdownColors') as CountdownColors}
                    onEnd={() => {
                        if (!isDefaultTimeValue(endTime)) handleWorkTimeEnd();
                    }}
                />
            </div>
        </div>
    );
};
