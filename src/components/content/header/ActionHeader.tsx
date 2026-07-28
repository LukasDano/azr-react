import type { FC } from "react";

import { CalendarDays, ClockFading, HouseWifi, Calculator, BrushCleaning } from "lucide-react";
import { useContext } from "react";

import type { SettingContextValues } from "../../context/setting/SettingContext.tsx";

import { SettingContext } from "../../context/setting/SettingContext.tsx";
import { HeaderButton } from "./HeaderButton";

type ActionHeaderProps = {
    currentStatsAction: () => void;
    resetPageAction: () => void;
    openWeekTimeAction: () => void;
    openFlexOfficeAction: () => void;
    resetInputs: () => void;
};

export const ActionHeader: FC<ActionHeaderProps> = ({
    currentStatsAction,
    resetPageAction,
    openWeekTimeAction,
    openFlexOfficeAction,
    resetInputs
}) => {
    const { showShortcuts } = useContext<SettingContextValues>(SettingContext);

    return (
        <nav
            className={"sticky top-0 z-39 flex justify-center rounded-b-xl border-b border-slate-500 bg-zinc-600 p-2 shadow-sm dark:border-slate-900 dark:bg-gray-700"}
        >
            <div className={"flex flex-wrap items-center justify-center gap-5"}>
                <HeaderButton
                    icon={<CalendarDays className={"h-6 w-6"} />}
                    tooltip={`Wochenzeitrechner öffnen ${showShortcuts ? "[alt + w]" : ""}`}
                    onClick={openWeekTimeAction}
                />
                <HeaderButton
                    icon={<HouseWifi className={"h-6 w-6"} />}
                    tooltip={`Flex-Office Rechner ${showShortcuts ? "[alt + h]" : ""}`}
                    onClick={openFlexOfficeAction}
                />
                <HeaderButton
                    icon={<ClockFading className={"h-6 w-6"} />}
                    tooltip={`Werte wenn jetzt ausgetragen wird ${showShortcuts ? "[alt + c]" : ""}`}
                    onClick={currentStatsAction}
                />
                <HeaderButton
                    icon={<Calculator className={"h-6 w-6"} />}
                    tooltip={`Neu berechnen ${showShortcuts ? "[F2]" : ""}`}
                    onClick={resetInputs}
                />
                <HeaderButton
                    icon={<BrushCleaning className={"h-6 w-6"} />}
                    tooltip={`Eingaben leeren ${showShortcuts ? "[F1]" : ""}`}
                    onClick={resetPageAction}
                />
            </div>
        </nav>
    );
};
