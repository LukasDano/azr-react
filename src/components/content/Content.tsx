import { useContext, useState } from 'react';

import { defaultFloatValue } from '../../static/defaultValues.ts';
import type { FloatTime, Time } from '../../static/importantTypes';
import {
    calculateGleitzeit,
    calculateIstTime,
    calculateNormalEnd,
    calculateOptimizedEnd,
    roundTimeForFloat,
} from '../../utils/calculatingTimes';
import { sendInfoMessage } from '../../utils/page/notifications';
import { getStorageValue } from '../../utils/storage/localStorageManger';
import { parseFloatTimeFromRawTimeValues } from '../../utils/typeUtilities/floatTime';
import { parseTimeToDate } from '../../utils/typeUtilities/time';
import { AppContext, type AppContextValues } from '../context/AppContext';
import { Countdown } from './Countdown';
import { FloatTimeInputField } from './inputs/FloatTimeInputField';
import { TimeInputField } from './inputs/TimeInputField';

export const Content = () => {
    const { startTime, updateStartTime, floatTime, updateFloatTime } = useContext<AppContextValues>(AppContext);

    const breakTime = getStorageValue('breakTime') as Time;
    const workTime = getStorageValue('workTime') as Time;

    const [endTime, setEndTime] = useState<Time>(getInitialEndTime());

    function getInitialEndTime(): Time {
        const isDefaultStartTime = startTime[0] === 0 && startTime[1] === 0;
        return isDefaultStartTime ? [0, 0] : calculateNormalEnd(startTime, breakTime, workTime);
    }

    const handleStartTimeChange = (val: Time): void => {
        const endTime = calculateNormalEnd(val, breakTime, workTime);

        updateStartTime(val);
        handleEndUpdate(endTime);
        updateFloatTime(defaultFloatValue);
    };

    const handleEndUpdate = (val: Time): void => {
        setEndTime(val);

        const ist = calculateIstTime(startTime, val, breakTime);
        const float = calculateGleitzeit(ist);
        const parsed = parseFloatTimeFromRawTimeValues(float);
        updateFloatTime(parsed);
    };

    const handleFloatUpdate = (val: FloatTime): void => {
        const normalEnd = calculateNormalEnd(startTime, breakTime, workTime);
        const endForFloat = roundTimeForFloat(normalEnd, val);
        const optimized = calculateOptimizedEnd(endForFloat);

        setEndTime(optimized);
        updateFloatTime(val);
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
                    onEnd={() => {
                        if (startTime[0] !== 0 && startTime[1] !== 0) sendInfoMessage('Ende der Arbeitszeit');
                    }}
                />
            </div>
        </div>
    );
};
