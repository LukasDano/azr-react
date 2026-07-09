import type { FC } from "react";

import type { FlexOfficeResultContainer } from "../../../utils/flexOfficeUtility.ts";

import { formatNumber } from "../../../utils/formatting";
import { parseTimeToString } from "../../../utils/typeUtilities/time";
import { PanelErrorBoundary } from "../../boundaries/PanelErrorBoundary.tsx";
import { Loader } from "../../library/Loader.tsx";

type FlexOfficeResultProps = {
    result: FlexOfficeResultContainer;
    isLoading: boolean;
    isError: boolean;
};

export const FlexOfficeResult: FC<FlexOfficeResultProps> = ({ result, isLoading, isError }) => {
    if (isLoading) return <Loader loaderIcon={"scale"} useFullHeight={false} />;

    if (isError)
        return (
            <PanelErrorBoundary
                title={"Flex-Office Fehler"}
                description={
                    "Fehler beim berechnen der Flex-Office Zeiten. Wenn der Fehler weiterhin auftritt bitte ein Ticket anlegen."
                }
            />
        );

    return (
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
                    <span className={"text-lg font-bold"}>{formatNumber(result.calculatedMonth)}</span>
                </div>
                <div className={"flex flex-col items-center"}>
                    <span className={"text-sm font-semibold text-gray-700 dark:text-gray-300"}>{"Arbeitstage"}</span>
                    <span className={"text-lg font-bold"}>{formatNumber(result.monthWorkDays)}</span>
                </div>
                <div className={"flex flex-col items-center"}>
                    <span className={"text-sm font-semibold text-gray-700 dark:text-gray-300"}>
                        {"Gearbeitete Tage\r"}
                    </span>
                    <span className={"text-lg font-bold"}>{formatNumber(result.workedDays)}</span>
                </div>
                <div className={"flex flex-col items-center"}>
                    <span className={"text-sm font-semibold text-gray-700 dark:text-gray-300"}>
                        {"Restliche FlexOffice Zeit\r"}
                    </span>
                    <span className={"text-lg font-bold"}>{parseTimeToString(result.restFlexOfficeTime)}</span>
                </div>
            </div>
        </div>
    );
};
