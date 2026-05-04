import type { FC } from 'react';

type CountdownCircleProps = {
    percent: number;
    color?: string;
    thickness?: number;
};

export const CountdownCircle: FC<CountdownCircleProps> = ({ percent, color = '#1abc9c', thickness = 3 }) => {
    return (
        <svg className="h-16 w-16" viewBox="0 0 36 36" role={'img'} aria-label={color}>
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
};
