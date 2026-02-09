import type { FC } from 'react';
import type { Time, TimeBalance } from '../../../static/importantTypes.ts';
import { getTimeBalanceFor } from '../../../utils/typeUtilities/time.ts';
import { parseWeekOverTimeToString, parseWeekWorkTimeToString } from '../../../utils/weekTimeCalculatingUtility.ts';

type WeekTimeResultProps = {
    show: boolean;
    weekWorkTime: Time;
    weekOverTime: Time;
};

export const WeekTimeResult: FC<WeekTimeResultProps> = ({ show, weekWorkTime, weekOverTime }) => {
    const generateOverTimeColor = (): string => {
        const result = getTimeBalanceFor(weekOverTime);

        const colorClasses: Record<TimeBalance, string> = {
            positiv: 'text-emerald-600 dark:emerlad-emerald-400',
            neutral: 'text-blue-700 dark:text-blue-400',
            negativ: 'text-rose-600 dark:rose-blue-500',
        };

        return colorClasses[result];
    };

    return (
        <>
            {show && (
                <div className="flex w-full justify-center">
                    <div className="bg-zinc-400 dark:bg-gray-700 flex flex-col sm:flex-row items-center justify-center gap-8 p-6 rounded-2xl shadow-xl w-2/3 mx-auto h-auto sm:h-32 text-center">
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Arbeitszeit</span>
                            <span className="text-lg font-bold">{parseWeekWorkTimeToString(weekWorkTime)}</span>
                        </div>

                        <div className="flex flex-col items-center">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Gleitzeit</span>
                            <span className={`text-lg font-bold ${generateOverTimeColor()}`}>
                                {parseWeekOverTimeToString(weekOverTime)}
                            </span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
