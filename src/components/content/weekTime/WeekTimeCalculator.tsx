import { type FC, useEffect, useState } from 'react';

import { WeekTimeResult } from './WeekTimeResult.tsx';
import { emptyTimeValue } from '../../../static/defaultValues.ts';
import type { Time, WeekDay, WeekTime } from '../../../static/importantTypes.ts';
import { getCookie, setCookieUntilEndOfWeek } from '../../../utils/storage/cookieManager.ts';
import { parseWeekTimeToTime } from '../../../utils/typeUtilities/weekTime.ts';
import { calculateWeekOverTime } from '../../../utils/weekTimeCalculatingUtility.ts';
import { TimeInputField } from '../inputs/TimeInputField.tsx';
import { BaseButton } from '../miscellaneous/BaseButton.tsx';
import { BaseModal } from '../miscellaneous/BaseModal.tsx';

type WeekTimeCalculatorProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const WeekTimeCalculator: FC<WeekTimeCalculatorProps> = ({ isOpen, onClose }) => {
    const [weekTime, setWeekTime] = useState<WeekTime>(getCookie('weekTime') as WeekTime);
    const [weekWorkTime, setWeekWorkTime] = useState<Time>(emptyTimeValue);
    const [weekOverTime, setWeekOverTime] = useState<Time>(emptyTimeValue);
    const [showResult, setShowResult] = useState<boolean>(false);

    useEffect(() => {
        setCookieUntilEndOfWeek('weekTime', weekTime);
    }, [weekTime]);

    const handleWeekTimeChange = (key: WeekDay, val: Time) => {
        const upadtedWeekTime = {
            ...weekTime,
            [key]: val,
        };

        setWeekTime(upadtedWeekTime);
        if (showResult) setShowResult(false);

        const weekTimeAsTime = parseWeekTimeToTime(upadtedWeekTime);
        setWeekOverTime(calculateWeekOverTime(weekTimeAsTime));
        setWeekWorkTime(weekTimeAsTime);
    };

    return (
        <BaseModal modalTitle={'Wochenzeitrechner'} isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col space-y-4 w-full">
                    <div className="flex w-full gap-4">
                        <TimeInputField
                            label="Montag"
                            value={weekTime.mo}
                            onChange={(val) => handleWeekTimeChange('mo', val)}
                            className="flex-1"
                        />
                        <TimeInputField
                            label="Dienstag"
                            value={weekTime.tu}
                            onChange={(val) => handleWeekTimeChange('tu', val)}
                            className="flex-1"
                        />
                    </div>

                    <div className="flex w-full gap-4">
                        <TimeInputField
                            label="Mittwoch"
                            value={weekTime.we}
                            onChange={(val) => handleWeekTimeChange('we', val)}
                            className="flex-1"
                        />
                        <TimeInputField
                            label="Donnerstag"
                            value={weekTime.th}
                            onChange={(val) => handleWeekTimeChange('th', val)}
                            className="flex-1"
                        />
                        <TimeInputField
                            label="Freitag"
                            value={weekTime.fr}
                            onChange={(val) => handleWeekTimeChange('fr', val)}
                            className="flex-1"
                        />
                    </div>

                    <WeekTimeResult show={showResult} weekOverTime={weekOverTime} weekWorkTime={weekWorkTime} />

                    <div className="flex w-full justify-center items-center">
                        <BaseButton
                            text="Berechnen"
                            tooltip="Wochenzeit berechnen"
                            onClick={() => setShowResult(true)}
                        />
                    </div>
                </div>
            </div>
        </BaseModal>
    );
};
