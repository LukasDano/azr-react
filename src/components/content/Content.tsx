import { useContext } from 'react';

import { defaultFloatValue } from '../../static/defaultValues.ts';
import type { FloatTime, Time } from '../../static/importantTypes';
import type { CountdownColors } from '../../static/themes.ts';
import {
    calculateGleitzeit,
    calculateIncreasedValue,
    calculateIstTime,
    calculateNormalEnd,
    calculateOptimizedEnd,
    roundTimeForFloat,
} from '../../utils/calculatingTimes';
import { sendInfoMessage } from '../../utils/page/notifications';
import { getStorageValue } from '../../utils/storage/localStorageManger';
import { parseFloatTimeFromRawTimeValues } from '../../utils/typeUtilities/floatTime';
import {
    compareTimes,
    getCurrentTime,
    getLaterTime,
    isDefaultTimeValue,
    parseTimeToDate,
} from '../../utils/typeUtilities/time';
import { AppContext, type AppContextValues } from '../context/AppContext';
import { SettingContext, type SettingContextValues } from '../context/SettingContext.tsx';
import { Countdown } from './Countdown';
import { FloatTimeInputField } from './miscellaneous/FloatTimeInputField.tsx';
import { TimeInputField } from './miscellaneous/TimeInputField.tsx';

export const Content = () => {
    const { startTime, updateStartTime, floatTime, updateFloatTime, endTime, updateEndTime } =
        useContext<AppContextValues>(AppContext);

    const { overTimeAutomatic } = useContext<SettingContextValues>(SettingContext);

    const breakTime = getStorageValue('breakTime') as Time;
    const workTime = getStorageValue('workTime') as Time;

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
    };

    const handleFloatUpdate = (val: FloatTime): void => {
        const normalEnd = calculateNormalEnd(startTime, breakTime, workTime);
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

        if (compareTimes(laterTime, currentTime)) {
            sendInfoMessage('Deine Arbeitszeit ist vorbei');
            sendInfoMessage('Arbeitszeit wird automatisch erhöht');

            const increased = calculateIncreasedValue(floatTime);
            const updatedValue = parseFloatTimeFromRawTimeValues(increased);

            handleEndUpdate(currentTime);
            handleFloatUpdate(updatedValue);
        }
    };

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
