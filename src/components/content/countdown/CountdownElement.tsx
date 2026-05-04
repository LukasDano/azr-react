import type { FC } from 'react';

import { CountdownCircle } from './CountdownCircle.tsx';

type TimeLabels = {
    days: string;
    hours: string;
    minutes: string;
    seconds: string;
};

export type CountdownUnit = keyof TimeLabels;

type CountdownElementProps = {
    unit: CountdownUnit;
    color: string;
    value: number;
    showLabel?: boolean;
};

export const CountdownElement: FC<CountdownElementProps> = ({ unit, color, value, showLabel = true }) => {
    const maxForUnit: Record<CountdownUnit, number> = {
        days: 365,
        hours: 24,
        minutes: 60,
        seconds: 60,
    };

    const defaultLabels: TimeLabels = {
        days: 'Days',
        hours: 'Hours',
        minutes: 'Minutes',
        seconds: 'Seconds',
    };

    const getPercent = (val: number, max: number) => (val / max) * 100;

    return (
        <div key={unit} className="flex flex-col items-center pr-1 pl-1">
            <div className="relative mb-1 flex items-center justify-center">
                <CountdownCircle percent={getPercent(value, maxForUnit[unit])} color={color} thickness={3} />
                <span className="absolute select-none font-bold font-mono text-2xl text-gray-700 dark:text-gray-400">
                    {value < 10 ? `0${value}` : value}
                </span>
            </div>
            {showLabel && (
                <span className="text-gray-700 text-xs uppercase tracking-widest dark:text-gray-400">
                    {defaultLabels[unit]}
                </span>
            )}
        </div>
    );
};
