import type { FC } from 'react';
import { useState } from 'react';

import { defaultQuote, emptyTimeValue, flexOfficeQuoten } from '../../../static/defaultValues';
import type { Time } from '../../../static/importantTypes';
import {
    calculateFlexOfficeStats,
    currentMonthName,
    findYearForMonthWithSixMonthRange,
    getMonthNumberFromMonthString,
    getWorkDaysInMonthFromAPI,
    months,
} from '../../../utils/flexOfficeUtility';
import {
    type FlexOfficeCookieKeys,
    getMonthValueOfFlexOfficeCookie,
    setFlexOfficeCookie,
} from '../../../utils/storage/flexOfficeCookieManager';
import { checkIfTimeIsBelowZero } from '../../../utils/typeUtilities/time';
import { BaseFormInput } from '../inputs/BaseValueIntput';
import { DropDownSelect } from '../inputs/DropDownSelect';
import { BaseButton } from '../miscellaneous/BaseButton';
import { BaseModal } from '../miscellaneous/BaseModal';
import { FlexOfficeResult } from './FlexOfficeResult';

type FlexOfficeCalculatorProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const FlexOfficeCalculator: FC<FlexOfficeCalculatorProps> = ({ isOpen, onClose }) => {
    const [showResult, setShowResult] = useState<boolean>(false);

    const [offDays, setOffDays] = useState<number>(getValueForKeyFromCookie('offDays'));
    const [flexHours, setFlexHours] = useState<number>(getValueForKeyFromCookie('flexHours'));
    const [flexMins, setFlexMins] = useState<number>(getValueForKeyFromCookie('flexMins'));
    const [selectedFlexQuote, setSelectedFlexQuote] = useState<number>(defaultQuote);
    const [selectedMonth, setSelectedMonth] = useState<string>(currentMonthName);
    const [workDays, setWorkDays] = useState<number>(0);
    const [restFlexTime, setRestFlexTime] = useState<Time>(emptyTimeValue);

    function getValueForKeyFromCookie(key: FlexOfficeCookieKeys, monthStr: string = currentMonthName): number {
        const cookieForMonth = getMonthValueOfFlexOfficeCookie(monthStr);
        return cookieForMonth[key];
    }

    const caluclateMaxDaysForMonthByString = (monthStr: string): number => {
        const monthNum = getMonthNumberFromMonthString(monthStr) as number;
        const year = findYearForMonthWithSixMonthRange(monthNum);

        return new Date(year, monthNum, 0).getDate();
    };

    const handleCalculate = async (): Promise<void> => {
        const flexTime: Time = [flexHours, flexMins];
        const selectedMonthNum = getMonthNumberFromMonthString(selectedMonth) as number;
        const year = findYearForMonthWithSixMonthRange(selectedMonthNum);

        const workDaysInMonth = await getWorkDaysInMonthFromAPI(selectedMonthNum, year);
        let restFlexTimeThisMonth = await calculateFlexOfficeStats(
            offDays,
            flexTime,
            selectedFlexQuote,
            selectedMonthNum,
            year,
        );
        restFlexTimeThisMonth = checkIfTimeIsBelowZero(restFlexTimeThisMonth);

        setWorkDays(workDaysInMonth);
        setRestFlexTime(restFlexTimeThisMonth);

        setFlexOfficeCookie(selectedMonth, offDays, [flexHours, flexMins]);
    };

    return (
        <BaseModal modalTitle={'Flexofficerechner'} isOpen={isOpen} onClose={onClose}>
            <div className="flex flex-col gap-6">
                <div className="flex flex-col space-y-4 w-full">
                    <DropDownSelect
                        name={'Quote'}
                        options={flexOfficeQuoten.map((q) => `${q}%`)}
                        defaultOption={`${selectedFlexQuote}%`}
                        onChange={(val) => setSelectedFlexQuote(Number.parseInt(val?.split('%')[0] as string))}
                    />

                    <DropDownSelect
                        name={'Monat'}
                        options={months}
                        defaultOption={currentMonthName}
                        onChange={(val) => {
                            const newMonthName = val?.split(' ')[0] as string;

                            setSelectedMonth(newMonthName);
                            setOffDays(getValueForKeyFromCookie('offDays', newMonthName));
                            setFlexHours(getValueForKeyFromCookie('flexHours', newMonthName));
                            setFlexMins(getValueForKeyFromCookie('flexMins', newMonthName));
                        }}
                    />

                    <div className="flex flex-row space-x-4 w-full">
                        <div className="flex-1">
                            <BaseFormInput
                                type={'number'}
                                label={'Abwesenheitstage'}
                                value={offDays}
                                onChange={(val) => setOffDays(Number.parseInt(val))}
                                max={caluclateMaxDaysForMonthByString(selectedMonth)}
                            />
                        </div>

                        <div className="flex-1">
                            <BaseFormInput
                                type={'number'}
                                label={'Monats Stunden'}
                                value={flexHours}
                                onChange={(val) => setFlexHours(Number.parseInt(val))}
                            />
                        </div>

                        <div className="flex-1">
                            <BaseFormInput
                                type={'number'}
                                label={'Monats Minuten'}
                                value={flexMins}
                                onChange={(val) => setFlexMins(Number.parseInt(val))}
                                max={60}
                            />
                        </div>
                    </div>

                    <FlexOfficeResult
                        show={showResult}
                        calculatedMonth={getMonthNumberFromMonthString(selectedMonth) as number}
                        monthWorkDays={workDays}
                        workedDays={workDays - offDays}
                        restFlexOfficeTime={restFlexTime}
                    />

                    <div className="flex w-full justify-center items-center">
                        <BaseButton
                            text="Berechnen"
                            tooltip="Flexoffice Zeit berechnen"
                            onClick={async () => {
                                await handleCalculate();
                                setShowResult(true);
                            }}
                        />
                    </div>
                </div>
            </div>
        </BaseModal>
    );
};
