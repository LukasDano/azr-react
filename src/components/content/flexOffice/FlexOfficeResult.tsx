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
                    <div className="mx-auto flex h-auto flex-col items-center justify-center gap-8 rounded-2xl bg-zinc-400 p-6 text-center shadow-xl sm:h-32 sm:flex-row dark:bg-gray-700">
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-700 text-sm dark:text-gray-300">
                                Berechneter Monat
                            </span>
                            <span className="font-bold text-lg">{formatNumber(calculatedMonth)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-700 text-sm dark:text-gray-300">Arbeitstage</span>
                            <span className="font-bold text-lg">{formatNumber(monthWorkDays)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-700 text-sm dark:text-gray-300">
                                Gearbeitete Tage
                            </span>
                            <span className="font-bold text-lg">{formatNumber(workedDays)}</span>
                        </div>
                        <div className="flex flex-col items-center">
                            <span className="font-semibold text-gray-700 text-sm dark:text-gray-300">
                                Restliche FlexOffice Zeit
                            </span>
                            <span className="font-bold text-lg">{parseTimeToString(restFlexOfficeTime)}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
