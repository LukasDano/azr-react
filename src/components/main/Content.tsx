import { useContext } from 'react';

import type { Time } from '../../static/importantTypes';
import { calculateCurrentNormalEnd, calculateNormalEnd } from '../../utils/calculatingTimes';
import { setCookie } from '../../utils/storage/cookieManager';
import { getStorageValue } from '../../utils/storage/localStorageManger';
import { parseTimeToDate } from '../../utils/typeUtilities/time';
import { AppContext, type AppContextValues } from '../context/AppContext';
import { Countdown } from './Countdown';
import { FloatTimeInputField } from './FloatTimeInputField';
import { TimeInputField } from './TimeInputField';

export const Content = () => {
    const { startTime, updateStartTime, floatTime, updateFloatTime } = useContext<AppContextValues>(AppContext);

    const handleStartTimeChange = (val: Time): void => {
        const breakTime = getStorageValue('breakTime');
        const workTime = getStorageValue('workTime');
        const endTime = calculateNormalEnd(val, breakTime, workTime);

        updateStartTime(val);
        setCookie('endTime', endTime);
    };

    return (
        <>
            <TimeInputField label="Arbeitsbeginn" value={startTime} onChange={(val) => handleStartTimeChange(val)} />

            <TimeInputField label="Pause" value={getStorageValue('breakTime')} onChange={() => {}} disabled={true} />

            <TimeInputField label="Arbeitsende" value={calculateCurrentNormalEnd(startTime)} onChange={() => {}} />

            <TimeInputField
                label="Arbeitszeit"
                value={getStorageValue('workTime')}
                onChange={() => {}}
                disabled={true}
            />

            <FloatTimeInputField label="Gleitzeit" value={floatTime} onChange={updateFloatTime} disabled={true} />

            <Countdown end={parseTimeToDate(calculateCurrentNormalEnd(startTime))} />
        </>
    );
};
