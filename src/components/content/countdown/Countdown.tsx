import type { FC } from "react";

import { useCallback, useContext, useEffect, useRef, useState } from "react";

import type { CountdownColors } from "../../../utils/themes.ts";
import type { CountdownTime } from "../../../utils/utils.ts";
import type { SettingContextValues } from "../../context/setting/SettingContext.tsx";

import { defaultCountdownTheme, getBackgroundTheme } from "../../../utils/themes.ts";
import { createCountdownElements } from "../../../utils/utils.ts";
import { SettingContext } from "../../context/setting/SettingContext.tsx";
import { CountdownElement } from "./CountdownElement.tsx";

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
    showDays = false
}) => {
    const { backgroundTheme } = useContext<SettingContextValues>(SettingContext);

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
        [getTimeLeft, onEnd]
    );

    useEffect(() => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }

        update(end.getTime());

        if (end.getTime() > Date.now()) {
            intervalRef.current = setInterval(() => {
                update(end.getTime());
            }, 1000);
        }

        return (): void => {
            if (intervalRef.current) clearInterval(intervalRef.current);
        };
    }, [end, update]);

    return (
        <div
            className={`mx-auto flex h-32 w-2/3 items-center justify-center gap-6 rounded-2xl bg-zinc-400 p-6 shadow-xl ${getBackgroundTheme(backgroundTheme).countdownBg}`}
        >
            {createCountdownElements(time)
                .filter((unit) => (showDays ? true : unit.key !== "days"))
                .map((unit) => (
                    <CountdownElement
                        key={unit.key}
                        color={colorTheme[unit.key]}
                        unit={unit.key}
                        value={unit.value}
                        showLabel={showLabels}
                    />
                ))}
        </div>
    );
};
