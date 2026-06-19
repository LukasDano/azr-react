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
    max
}) => {
    return (
        <>
            <label htmlFor={id} className={'mb-1 block font-medium'}>
                {label}
            </label>
            <input
                id={id}
                aria-label={label}
                name={id}
                type={type}
                value={value}
                onChange={(evt) => onChange(evt.target.value)}
                min={min}
                max={max}
                className={
                    'w-full rounded border border-gray-300 bg-gray-100 px-3 py-2 text-black focus:ring-2 focus:ring-blue-500 focus:outline-none'
                }
                placeholder={'...'}
                autoComplete={'off'}
            />
        </>
    );
};
