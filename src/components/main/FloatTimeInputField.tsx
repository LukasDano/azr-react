import type { FC } from 'react';

import type { FloatTime } from '../../static/importantTypes';
import { parseFloatTimeToString, parseStringToFloatTime } from '../../utils/typeUtilities/floatTime';

type FloatTimeInputFieldProps = {
    label: string;
    value: FloatTime;
    onChange: (val: FloatTime) => void;
    disabled: boolean;
};

export const FloatTimeInputField: FC<FloatTimeInputFieldProps> = ({ label, value, onChange, disabled }) => {
    const handleChange = (val: string) => {
        const time = parseStringToFloatTime(val);
        onChange(time);
    };

    return (
        <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-slate-700">{label}</label>

            <input
                type="text"
                value={parseFloatTimeToString(value)}
                onChange={(evt) => handleChange(evt.target.value)}
                className="rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm outline-none transition focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30"
                disabled={disabled}
            />
        </div>
    );
};
