import type { FC } from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

import { CountdownElement, type CountdownUnit } from './CountdownElement.tsx';
import type { CountdownColors } from '../../../static/themes.ts';
import { defaultCountdownTheme } from '../../../static/themes.ts';

type CountdownTime = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

type CountdownElementConfig = {
    value: number;
    max: number;
    key: keyof CountdownTime;
};

type CountdownProps = {
    end: Date;
    onEnd?: () => void;
    showLabels?: boolean;
    colorTheme?: CountdownColors;
    showDays?: boolean;
};

export const Countdown: FC<CountdownProps> = ({
    end,
    onEnd,
    showLabels = true,
    colorTheme = defaultCountdownTheme,
    showDays = false,
}) => {
    const [time, setTime] = useState<CountdownTime>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

    const getTimeLeft = useCallback((endMs: number) => {
        const now = Date.now();
        let delta = Math.max(0, Math.floor((endMs - now) / 1000));
        const days = Math.floor(delta / 86400);
        delta -= days * 86400;
        const hours = Math.floor(delta / 3600);
        delta -= hours * 3600;
        const minutes = Math.floor(delta / 60);
        delta -= minutes * 60;
        const seconds = delta;
        return { days, hours, minutes, seconds };
    }, []);

    const update = useCallback(
        (endMs: number) => {
            const left = getTimeLeft(endMs);
            setTime(left);

            if (endMs <= Date.now()) {
                onEnd?.();
                if (intervalRef.current) {
                    clearInterval(intervalRef.current);
                    intervalRef.current = null;
                }
            }
        },
        [getTimeLeft, onEnd],
    );

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        // eslint-disable-next-line react-hooks/set-state-in-effect
        update(end.getTime());

        if (end.getTime() > Date.now()) {
            intervalRef.current = setInterval(() => {
                update(end.getTime());
            }, 1000);
        }

        return () => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [end, update]);

    const createCountdownElements = (time: CountdownTime): CountdownElementConfig[] => {
        return [
            { value: time.days, max: 99, key: 'days' },
            { value: time.hours, max: 24, key: 'hours' },
            { value: time.minutes, max: 60, key: 'minutes' },
            { value: time.seconds, max: 60, key: 'seconds' },
        ];
    };

    return (
        <div className="mx-auto flex h-32 w-2/3 items-center justify-center gap-6 rounded-2xl bg-zinc-400 p-6 shadow-xl dark:bg-gray-800">
            {createCountdownElements(time)
                .filter((unit) => (showDays ? true : unit.key !== 'days'))
                .map((unit) => (
                    <CountdownElement
                        key={unit.key}
                        color={colorTheme[unit.key]}
                        unit={unit.key as CountdownUnit}
                        value={unit.value}
                        showLabel={showLabels}
                    />
                ))}
        </div>
    );
};
