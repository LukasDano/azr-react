import type { FC } from "react";

import type { Time } from "../../../utils/importantTypes";

import { formatNumber } from "../../../utils/formatting";
import { parseTimeToString } from "../../../utils/typeUtilities/time";

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
    restFlexOfficeTime
}) => {
    return (
        <>
            {show && (
                <div className={"flex w-full justify-center"}>
                    <div
                        className={
                            "mx-auto flex h-auto flex-col items-center justify-center gap-8 rounded-2xl bg-zinc-400 p-6 text-center shadow-xl sm:h-32 sm:flex-row dark:bg-gray-700"
                        }
                    >
                        <div className={"flex flex-col items-center"}>
                            <span className={"text-sm font-semibold text-gray-700 dark:text-gray-300"}>
                                {"Berechneter Monat\r"}
                            </span>
                            <span className={"text-lg font-bold"}>{formatNumber(calculatedMonth)}</span>
                        </div>
                        <div className={"flex flex-col items-center"}>
                            <span className={"text-sm font-semibold text-gray-700 dark:text-gray-300"}>
                                {"Arbeitstage"}
                            </span>
                            <span className={"text-lg font-bold"}>{formatNumber(monthWorkDays)}</span>
                        </div>
                        <div className={"flex flex-col items-center"}>
                            <span className={"text-sm font-semibold text-gray-700 dark:text-gray-300"}>
                                {"Gearbeitete Tage\r"}
                            </span>
                            <span className={"text-lg font-bold"}>{formatNumber(workedDays)}</span>
                        </div>
                        <div className={"flex flex-col items-center"}>
                            <span className={"text-sm font-semibold text-gray-700 dark:text-gray-300"}>
                                {"Restliche FlexOffice Zeit\r"}
                            </span>
                            <span className={"text-lg font-bold"}>{parseTimeToString(restFlexOfficeTime)}</span>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
