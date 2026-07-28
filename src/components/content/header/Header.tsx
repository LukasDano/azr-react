import type { FC } from "react";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useContext, useState, useMemo } from "react";
import { MdHelpOutline } from "react-icons/md";
import { PiGearDuotone } from "react-icons/pi";

import type { Time } from "../../../utils/importantTypes.ts";
import type { AppContextValues } from "../../context/app/AppContext.tsx";
import type { SettingContextValues } from "../../context/setting/SettingContext.tsx";

import {
    defaultBreakTime,
    defaultWorkTime,
    defaultWorkTimeForSixHourMode,
    emptyTimeValue
} from "../../../utils/defaultValues.ts";
import { isSameTime, newTime, parseStringToTime, parseTimeToString } from "../../../utils/typeUtilities/time";
import { AppContext } from "../../context/app/AppContext.tsx";
import { SettingContext } from "../../context/setting/SettingContext.tsx";
import { SingleValueSelector } from "../../library/inputs/SingleValueSelector.tsx";
import { ActionHeader } from "./ActionHeader";
import { HeaderButton } from "./HeaderButton";
import { HeaderLinkButton } from "./HeaderLinkButton.tsx";

type HeaderProps = {
    openSettings: () => void;
    openWeekTime: () => void;
    openFlexOffice: () => void;
    resetAction: () => void;
    currentStatsAction: () => void;
    resetInputs: () => void;
};

export const Header: FC<HeaderProps> = ({
    openSettings,
    openWeekTime,
    openFlexOffice,
    resetAction,
    currentStatsAction,
    resetInputs
}) => {
    const { showShortcuts } = useContext<SettingContextValues>(SettingContext);
    const { breakTime, updateBreakTime, workTime, updateWorkTime } = useContext<AppContextValues>(AppContext);

    const [actionHeaderOpen, setActionHeaderOpen] = useState<boolean>(false);

    const availableWorkTimes = useMemo<string[]>(
        () => [defaultWorkTime, defaultWorkTimeForSixHourMode].map(parseTimeToString),
        []
    );

    const availableBreakTimes = useMemo<string[]>(() => {
        const lowestBreakMinutes = 30;
        const highestBreakMinutes = 60;

        const result: Time[] = [];

        for (let i: number = lowestBreakMinutes; i < highestBreakMinutes; i++) result.push(newTime({ minutes: i }));

        result.push(newTime({ hours: 1 }));

        return result.map(parseTimeToString);
    }, []);

    const handleWorkTimeModeChange = (workTimeStr: string): void => {
        if (workTimeStr === "06:00") {
            updateWorkTime(defaultWorkTimeForSixHourMode);
            updateBreakTime(emptyTimeValue);
        } else {
            updateWorkTime(defaultWorkTime);
            updateBreakTime(defaultBreakTime);
        }
    };

    const handleBreakTimeChange = (breakTimeStr: string): void => {
        const newBreakTime = parseStringToTime(breakTimeStr);
        updateBreakTime(newBreakTime);
        updateWorkTime(defaultWorkTime);
    };

    return (
        <>
            <nav
                className={
                    "sticky top-0 z-40 flex items-center justify-between border-b border-slate-300 bg-zinc-700 p-4 shadow dark:border-slate-900 dark:bg-gray-800"
                }
            >
                <h1 className={"text-4xl font-bold text-white"}>{"Arbeitszeitrechner"}</h1>

                <div className={"flex flex-wrap items-center justify-end gap-6"}>
                    {isSameTime(workTime, defaultWorkTime) && (
                        <SingleValueSelector
                            name={"Pause"}
                            alwaysHasDarkBackground={true}
                            defaultOption={parseTimeToString(breakTime)}
                            options={availableBreakTimes}
                            onChange={(val) => handleBreakTimeChange(val as string)}
                        />
                    )}

                    <SingleValueSelector
                        name={"Arbeitszeit"}
                        alwaysHasDarkBackground={true}
                        defaultOption={parseTimeToString(workTime)}
                        options={availableWorkTimes}
                        onChange={(val) => handleWorkTimeModeChange(val as string)}
                    />

                    <HeaderLinkButton
                        icon={<MdHelpOutline className={"h-6 w-6"} />}
                        tooltip={"Ticket erstellen"}
                        url={"https://github.com/LukasDano/azr-react/issues"}
                        openInNewTab={true}
                    />
                    <HeaderButton
                        icon={<PiGearDuotone className={"h-6 w-6"} />}
                        tooltip={`Einstellungen ${showShortcuts ? "[alt + i]" : ""}`}
                        onClick={openSettings}
                    />
                    <HeaderButton
                        icon={
                            actionHeaderOpen ? (
                                <ChevronUp className={"h-6 w-6"} />
                            ) : (
                                <ChevronDown className={"h-6 w-6"} />
                            )
                        }
                        tooltip={"Zusätzliche Funktionen"}
                        onClick={() => setActionHeaderOpen(!actionHeaderOpen)}
                    />
                </div>
            </nav>
            {actionHeaderOpen && (
                <ActionHeader
                    currentStatsAction={currentStatsAction}
                    resetPageAction={resetAction}
                    openWeekTimeAction={openWeekTime}
                    openFlexOfficeAction={openFlexOffice}
                    resetInputs={resetInputs}
                />
            )}
        </>
    );
};
