import type { FC } from "react";

import { useQuery } from "@tanstack/react-query";
import { Info } from "lucide-react";
import { useState } from "react";

import type { FlexOfficeResultContainer } from "../../../utils/flexOfficeUtility";
import type { Time } from "../../../utils/importantTypes";

import { defaultQuote, flexOfficeQuoten } from "../../../utils/defaultValues";
import {
    calculateFlexOfficeStats,
    calculateMaxDaysForMonthByString,
    currentMonthName,
    emtpyFlexOfficeResultContainer,
    findYearForMonthWithSixMonthRange,
    getMonthNumberFromMonthString,
    getValueForKeyFromCookie,
    getWorkDaysInMonthFromAPI,
    months,
    setFlexOfficeCookie
} from "../../../utils/flexOfficeUtility";
import { checkIfTimeIsBelowZero } from "../../../utils/typeUtilities/time";
import { BaseButton } from "../../library/BaseButton";
import { BaseModal } from "../../library/BaseModal";
import { BaseFormInput } from "../../library/inputs/BaseValueIntput";
import { MultipleValueSelector } from "../../library/inputs/MultipleValueSelector.tsx";
import { Tooltip } from "../../library/Tooltip";
import { FlexOfficeResult } from "./FlexOfficeResult";

type FlexOfficeCalculatorProps = {
    isOpen: boolean;
    onClose: () => void;
};

const FlexOfficeCalculator: FC<FlexOfficeCalculatorProps> = ({ isOpen, onClose }) => {
    const [showResult, setShowResult] = useState<boolean>(false);

    const [offDays, setOffDays] = useState<number>(getValueForKeyFromCookie("offDays"));
    const [flexHours, setFlexHours] = useState<number>(getValueForKeyFromCookie("flexHours"));
    const [flexMins, setFlexMins] = useState<number>(getValueForKeyFromCookie("flexMins"));

    const [selectedFlexQuote, setSelectedFlexQuote] = useState<number>(defaultQuote);
    const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthName);

    const handleCalculate = async (): Promise<FlexOfficeResultContainer> => {
        const flexTime: Time = [flexHours, flexMins];
        const selectedMonthNum = getMonthNumberFromMonthString(selectedMonth) as number;
        const year = findYearForMonthWithSixMonthRange(selectedMonthNum);

        const workDaysInMonth = await getWorkDaysInMonthFromAPI(selectedMonthNum, year);
        let restFlexTimeThisMonth = await calculateFlexOfficeStats(
            offDays,
            flexTime,
            selectedFlexQuote,
            selectedMonthNum,
            year
        );
        restFlexTimeThisMonth = checkIfTimeIsBelowZero(restFlexTimeThisMonth);

        setFlexOfficeCookie(selectedMonth, offDays, [flexHours, flexMins]);

        setShowResult(true);

        return {
            calculatedMonth: getMonthNumberFromMonthString(selectedMonth) as number,
            monthWorkDays: workDaysInMonth,
            workedDays: workDaysInMonth - offDays,
            restFlexOfficeTime: restFlexTimeThisMonth
        };
    };

    const { data, isLoading, isError } = useQuery({
        queryKey: ["handleCalculate"],
        queryFn: handleCalculate,
        enabled: showResult
    });

    return (
        <BaseModal modalTitle={"Flex-Office-Rechner"} isOpen={isOpen} onClose={onClose}>
            <div className={"flex flex-col gap-6"}>
                <div className={"flex w-full flex-col space-y-4"}>
                    <MultipleValueSelector
                        name={"Quote"}
                        tooltipHint={"Anteil der im Flex-Office erbracht werden darf"}
                        options={flexOfficeQuoten.map((q) => `${q}%`)}
                        defaultOption={`${selectedFlexQuote}%`}
                        onChange={(val) => setSelectedFlexQuote(Number.parseInt(val?.split("%")[0] as string, 10))}
                    />

                    <MultipleValueSelector
                        name={"Monat"}
                        options={months}
                        defaultOption={currentMonthName}
                        onChange={(val) => {
                            const newMonthName = val?.split(" ")[0] as string;

                            setSelectedMonth(newMonthName);
                            setOffDays(getValueForKeyFromCookie("offDays", newMonthName));
                            setFlexHours(getValueForKeyFromCookie("flexHours", newMonthName));
                            setFlexMins(getValueForKeyFromCookie("flexMins", newMonthName));
                        }}
                    />

                    <div className={"flex w-full flex-row space-x-4"}>
                        <div className={"flex-1"}>
                            <BaseFormInput
                                label={"Abwesenheitstage"}
                                id={"Abwesenheitstage"}
                                type={"number"}
                                value={offDays}
                                onChange={(val) => setOffDays(Number.parseInt(val, 10))}
                                max={calculateMaxDaysForMonthByString(selectedMonth)}
                            />
                        </div>

                        <div className={"flex-1"}>
                            <BaseFormInput
                                id={"Monats Stunden"}
                                label={
                                    <div className={"flex flex-row items-center justify-center gap-2"}>
                                        <span>{"Monats Stunden"}</span>
                                        <Tooltip tooltip={"Flex-Office Stunden diesen Monat"}>
                                            <Info className={"h-5 w-5"} />
                                        </Tooltip>
                                    </div>
                                }
                                type={"number"}
                                value={flexHours}
                                onChange={(val) => setFlexHours(Number.parseInt(val, 10))}
                            />
                        </div>

                        <div className={"flex-1"}>
                            <BaseFormInput
                                id={"Monats Minuten"}
                                label={
                                    <div className={"flex flex-row items-center justify-center gap-2"}>
                                        <span>{"Monats Minuten"}</span>
                                        <Tooltip tooltip={"Flex-Office Minuten diesen Monat"}>
                                            <Info className={"h-5 w-5"} />
                                        </Tooltip>
                                    </div>
                                }
                                type={"number"}
                                value={flexMins}
                                onChange={(val) => setFlexMins(Number.parseInt(val, 10))}
                                max={60}
                            />
                        </div>
                    </div>

                    {showResult && (
                        <FlexOfficeResult
                            result={data ?? emtpyFlexOfficeResultContainer}
                            isLoading={isLoading}
                            isError={isError}
                        />
                    )}

                    <div className={"flex w-full items-center justify-center"}>
                        <BaseButton
                            text={"Berechnen"}
                            tooltip={"Flex-Office Zeit berechnen"}
                            onClick={handleCalculate}
                        />
                    </div>
                </div>
            </div>
        </BaseModal>
    );
};

// oxlint-disable-next-line import/no-default-export
export default FlexOfficeCalculator;
