import type { FC, KeyboardEvent } from 'react';

import type { FloatTime } from '../../../static/importantTypes';
import { calculateDecreasedValue, calculateIncreasedValue } from '../../../utils/calculatingTimes';
import {
    isValidFloatTimeValue as isValidFloatTimeStr,
    parseFloatTimeFromRawTimeValues,
    parseFloatTimeToString,
    parseStringToFloatTime,
} from '../../../utils/typeUtilities/floatTime';

type FloatTimeInputFieldProps = {
    label: string;
    value: FloatTime;
    onChange: (val: FloatTime) => void;
    onClick: (val: FloatTime) => void;
};

export const FloatTimeInputField: FC<FloatTimeInputFieldProps> = ({ label, value, onChange, onClick }) => {
    const handleChange = (val: string) => {
        if (!isValidFloatTimeStr(val)) return;

        const time = parseStringToFloatTime(val);
        if (time) onChange(time);
    };

    const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
        let updatedValue: FloatTime;

        if (evt.key === 'ArrowUp') {
            evt.preventDefault();
            const increased = calculateIncreasedValue(value);
            updatedValue = parseFloatTimeFromRawTimeValues(increased);

            onChange(updatedValue);
        } else if (evt.key === 'ArrowDown') {
            evt.preventDefault();
            const decreased = calculateDecreasedValue(value);
            updatedValue = parseFloatTimeFromRawTimeValues(decreased);

            onChange(updatedValue);
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700 dark:text-white">{label}</label>

            <input
                type="text"
                value={parseFloatTimeToString(value)}
                onChange={(evt) => handleChange(evt.target.value)}
                onClick={() => onClick(value)}
                onKeyDown={handleKeyDown}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            />
        </div>
    );
};
