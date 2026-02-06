import type { FC } from 'react';

type FormInputProps = {
    label: string;
    value: string | number;
    onChange: (val: string) => void;
    type?: 'text' | 'number';
    id?: string;
    min?: number;
    max?: number;
};

export const BaseFormInput: FC<FormInputProps> = ({
    label,
    value,
    onChange,
    id = label.toLowerCase(),
    type = 'text',
    min = 0,
    max,
}) => {
    return (
        <>
            <label htmlFor={id} className="block font-medium mb-1">
                {label}
            </label>
            <input
                id={id}
                name={id}
                type={type}
                value={value}
                onChange={(evt) => onChange(evt.target.value)}
                min={min}
                max={max}
                className="w-full border bg-gray-100 border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                placeholder="..."
                autoComplete="off"
            />
        </>
    );
};
