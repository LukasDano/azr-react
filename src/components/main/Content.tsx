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

    const [endTime, setEndTime] = useState<Time>([0, 0]);

    const breakTime: Time = getStorageValue('breakTime');
    const workTime: Time = getStorageValue('workTime');

    const handleStartTimeChange = (val: Time): void => {
        const workTime = getStorageValue('workTime');
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
        <>
            <TimeInputField label="Arbeitsbeginn" value={startTime} onChange={handleStartTimeChange} />

            <TimeInputField label="Pause" value={breakTime} disabled={true} />

            <TimeInputField label="Arbeitsende" value={endTime} onChange={handleEndUpdate} />

            <TimeInputField
                label="Arbeitszeit"
                value={getStorageValue('workTime')}
                onChange={() => {}}
                disabled={true}
            />

            <FloatTimeInputField label="Gleitzeit" value={floatTime} onChange={handleFloatUpdate} />

            <Countdown end={parseTimeToDate(endTime)} onEnd={() => sendInfoMessage('Ende der Arbeitszeit')} />
        </>
    );
};
