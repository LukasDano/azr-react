import type { FC } from "react";

import type { Time } from "../../../utils/importantTypes";

import { cleanTime, parseStringToTime, parseTimeToString } from "../../../utils/typeUtilities/time";

type TimeInputFieldProps = {
    label: string;
    value: Time;
    onChange?: (val: Time) => void;
    disabled?: boolean;
    className?: string;
};

export const TimeInputField: FC<TimeInputFieldProps> = ({ label, value, onChange, disabled = false, className }) => {
    const handleChange = (val: string): void => {
        const time = parseStringToTime(val);
        const cleaned = cleanTime(time);

        if (onChange) onChange(cleaned);
    };

    return (
        <div className={`flex flex-col gap-1 ${className}`}>
            <label className={"text-sm font-medium text-slate-700 dark:text-white"}>{label}</label>

            <input
                id={`${label}-time-input`}
                aria-label={label}
                type={"time"}
                value={parseTimeToString(value)}
                onChange={(evt) => handleChange(evt.target.value)}
                className={`rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 shadow-sm transition outline-none focus:border-sky-500 focus:ring-2 focus:ring-sky-500/30 ${disabled ? "cursor-not-allowed bg-gray-200 opacity-50" : "bg-white"}`}
                disabled={disabled}
            />
        </div>
    );
};
