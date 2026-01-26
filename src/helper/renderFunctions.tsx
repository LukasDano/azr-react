import type { JSX } from 'react';

export const renderCircle = (
    percent: number,
    color: string = '#1abc9c',
    thickness: number = 3, // ToDo als Setting umsetzen
): JSX.Element => (
    <svg className="w-16 h-16" viewBox="0 0 36 36">
        <circle className="opacity-20" cx="18" cy="18" r="16" stroke={color} strokeWidth={thickness} fill="none" />
        <circle
            className="transition-all duration-200"
            cx="18"
            cy="18"
            r="16"
            stroke={color}
            strokeWidth={thickness}
            fill="none"
            strokeDasharray={100}
            strokeDashoffset={100 - percent}
            strokeLinecap="round"
        />
    </svg>
);
