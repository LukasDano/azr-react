import { useContext, useEffect, useState } from 'react';

import type { FloatTime, Time } from '../../static/importantTypes';
import { calculateCurrentNormalEnd, calculateGleitzeit, calculateIstTime, calculateNormalEnd, calculateOptimizedEnd, roundTimeForFloat } from '../../utils/calculatingTimes';
import { getStorageValue } from '../../utils/storage/localStorageManger';
import { parseTimeToDate } from '../../utils/typeUtilities/time';
import { AppContext, type AppContextValues } from '../context/AppContext';
import { Countdown } from './Countdown';
import { TimeInputField } from './inputs/TimeInputField';
import { FloatTimeInputField } from './inputs/FloatTimeInputField';
import { sendInfoMessage } from '../../utils/page/notifications';

export const Content = () => {
    const { startTime, updateStartTime, floatTime, updateFloatTime } = useContext<AppContextValues>(AppContext);

    const [endTime, setEndTime] = useState<Time>({ hours: 0, minutes: 0 });

    const breakTime: Time = getStorageValue("breakTime");

    useEffect(() => {
        setEndTime(calculateCurrentNormalEnd(startTime));
    }, [startTime]);

    const handleStartTimeChange = (val: Time): void => {
        const workTime = getStorageValue('workTime');
        const endTime = calculateNormalEnd(val, breakTime, workTime);

        updateStartTime(val);
        handleEndUpdate(endTime);
    };

    const handleEndUpdate = (val: Time): void => {
        setEndTime(val);

        const ist = calculateIstTime(startTime, val, breakTime);
        const float = calculateGleitzeit(ist);

        updateFloatTime(float);
    };

    const handleFloatUpdate = (val: FloatTime): void => {
        const end = roundTimeForFloat(endTime, val);
        setEndTime(end);

        const optimized = calculateOptimizedEnd(end);
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
                onChange={() => { }}
                disabled={true}
            />

            <FloatTimeInputField label="Gleitzeit" value={floatTime} onChange={handleFloatUpdate} />

            <Countdown end={parseTimeToDate(endTime)} onEnd={() => sendInfoMessage("Ende der Arbeitszeit")} />
        </>
    );
};
