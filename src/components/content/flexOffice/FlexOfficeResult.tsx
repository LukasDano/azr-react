import type { FC } from 'react';

import type { Time } from '../../../static/importantTypes';
import { formatNumber } from '../../../utils/formatting';
import { parseTimeToString } from '../../../utils/typeUtilities/time';

type FlexOfficeResultProps = {
    show: boolean;
    calculatedMonth: number;
    monthWorkDays: number;
    workedDays: number;
    restFlexOfficeTime: Time;
};

export const FlexOfficeResult: FC<FlexOfficeResultProps> = ({
    show,
    calculatedMonth,
    monthWorkDays,
    workedDays,
    restFlexOfficeTime,
}) => {
    return (
        <>
            {show && (
                <div className="flex w-full justify-center">
                    <div className="bg-zinc-400 dark:bg-gray-700 flex flex-col sm:flex-row items-center justify-center gap-8 p-6 rounded-2xl shadow-xl mx-auto h-auto sm:h-32 text-center">
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Berechneter Monat
                            </span>
                            <span className="text-lg font-bold">{formatNumber(calculatedMonth)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Arbeitstage</span>
                            <span className="text-lg font-bold">{formatNumber(monthWorkDays)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Gearbeitete Tage
                            </span>
                            <span className="text-lg font-bold">{formatNumber(workedDays)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                Restliche FlexOffice Zeit
                            </span>
                            <span className="text-lg font-bold">{parseTimeToString(restFlexOfficeTime)}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
