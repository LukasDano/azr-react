import type { FC, KeyboardEvent } from 'react';
import type { FloatTime } from '../../../static/importantTypes';
import { parseFloatTimeToString, parseStringToFloatTime } from '../../../utils/typeUtilities/floatTime';
import { calculateDecreasedValue, calculateIncreasedValue } from '../../../utils/calculatingTimes';

type FloatTimeInputFieldProps = {
    label: string;
    value: FloatTime;
    onChange: (val: FloatTime) => void;
};

export const FloatTimeInputField: FC<FloatTimeInputFieldProps> = ({ label, value, onChange }) => {
    const handleChange = (val: string) => {
        const time = parseStringToFloatTime(val);
        onChange(time);
    };

    const handleKeyDown = (evt: KeyboardEvent<HTMLInputElement>) => {
        console.warn("PRE: ", JSON.stringify(value));
        let updatedValue: FloatTime;

        if (evt.key === "ArrowUp") {
            evt.preventDefault();
            updatedValue = calculateIncreasedValue(value)

            onChange(updatedValue);
            console.warn("INCREASE: ", JSON.stringify(updatedValue));
        }

        else if (evt.key === "ArrowDown") {
            evt.preventDefault();
            updatedValue = calculateDecreasedValue(value);

            onChange(updatedValue);
            console.warn("DECREASE: ", JSON.stringify(updatedValue));
        }
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">{label}</label>

            <input
                type="text"
                value={parseFloatTimeToString(value)}
                onChange={(evt) => handleChange(evt.target.value)}
                onKeyDown={handleKeyDown}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
            />
        </div>
    );
};
