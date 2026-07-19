import type { FC } from "react";

import { useContext, useMemo, useState } from "react";

import type { ToastPosition } from "../../utils/notifications.ts";
import type { BackgroundTheme, ColorTheme, ThemeType } from "../../utils/themes.ts";
import type { CountdownUnit } from "../content/countdown/CountdownElement.tsx";
import type { SettingContextValues } from "../context/setting/SettingContext.tsx";
import type { SettingId } from "./settingConfig.tsx";

import { SettingsError } from "../../utils/errors/SettingsError.ts";
import { sendNotification } from "../../utils/notifications.ts";
import { getBackgroundTheme } from "../../utils/themes.ts";
import { getPackageInfos } from '../../utils/utils.ts';
import type { PackageInfos } from '../../utils/utils.ts';
import { SettingContext } from "../context/setting/SettingContext.tsx";
import { MultipleValueSelector } from "../library/inputs/MultipleValueSelector.tsx";
import { TabBar } from "../library/TabBar.tsx";
import { ColorPicker } from "./inputs/ColorSelector.tsx";
import { SettingsToggle } from "./inputs/SettingsToggle";
import { settingsConfig, settingTabs, settingTabsByName } from "./settingConfig.tsx";

type SettingValue = boolean | string | ColorTheme;

export const Settings: FC = () => {
    const {
        darkModeActive,
        updateDarkModeActive,
        countdownColors,
        updateCountdownColors,
        colorTheme,
        updateColorTheme,
        overTimeAutomatic,
        updateOverTimeAutomatic,
        showShortcuts,
        updateShowShortcuts,
        toastPosition,
        updateToastPosition,
        backgroundTheme,
        updateBackgroundTheme
    } = useContext<SettingContextValues>(SettingContext);

    const [activeTabId, setActiveTabId] = useState<number>(settingTabsByName.Design.id);
    const [error, setError] = useState<SettingsError | null>(null);

    const handleCountdownColorChange = (key: CountdownUnit, val: string): void => {
        if (typeof key === "undefined")
            setError(
                new SettingsError(
                    "Invalid CountdownUnit",
                    "Tried to call handleCountdownColorChange() without a valid CountdownUnit ."
                )
            );

        const updatedColors = {
            ...countdownColors,
            [key]: val
        };

        updateCountdownColors(updatedColors);
    };

    const handleThemeChange = (key: ThemeType, val: string): void => {
        if (typeof key === "undefined")
            setError(
                new SettingsError("Invalid ThemeType", "Tried to call handleThemeChange() without a valid ThemeType .")
            );

        const updatedTheme = {
            ...colorTheme,
            [key]: val
        };

        updateColorTheme(updatedTheme);
    };

    const handleBackgroundTheme = (val: BackgroundTheme | "light"): void => {
        if (val === "light") updateDarkModeActive(false);
        else {
            updateDarkModeActive(true);
            updateBackgroundTheme(val);
        }
    };

    const findValueById = (id: SettingId): SettingValue => {
        const getBgTheme = (): BackgroundTheme | "light" => {
            if (!darkModeActive) return "light";
            else return backgroundTheme;
        };

        const settingKeyValueMap: Record<SettingId, SettingValue> = {
            countdownHours: countdownColors.hours,
            countdownMinutes: countdownColors.minutes,
            countdownSeconds: countdownColors.seconds,
            lightModeTheme: colorTheme.light,
            darkModeTheme: colorTheme.dark,
            notificationPosition: toastPosition,
            displayShortcuts: showShortcuts,
            overtimeAutomatic: overTimeAutomatic,
            backgroundTheme: getBgTheme()
        };

        try {
            return settingKeyValueMap[id];
        } catch (err) {
            setError(new SettingsError("Invalid SettingId", `Failed to find a value for the id: ${id}.`));

            throw err;
        }
    };

    const executeFunctionById = (id: SettingId, val: SettingValue, funcParamKey: string | null = null): void => {
        switch (id) {
            case "countdownHours":
                handleCountdownColorChange(funcParamKey as CountdownUnit, val as string);
                break;
            case "countdownMinutes":
                handleCountdownColorChange(funcParamKey as CountdownUnit, val as string);
                break;
            case "countdownSeconds":
                handleCountdownColorChange(funcParamKey as CountdownUnit, val as string);
                break;
            case "lightModeTheme":
                handleThemeChange(funcParamKey as ThemeType, val as string);
                break;
            case "darkModeTheme":
                handleThemeChange(funcParamKey as ThemeType, val as string);
                break;
            case "notificationPosition":
                updateToastPosition(val as ToastPosition);
                break;
            case "displayShortcuts":
                updateShowShortcuts(val as boolean);
                break;
            case "overtimeAutomatic":
                updateOverTimeAutomatic(val as boolean);
                break;
            case "backgroundTheme":
                handleBackgroundTheme(val as "light" | BackgroundTheme);
                break;
            default:
                setError(new SettingsError("Invalid SettingId", `Failed to find a function to execute for this id.`));
                return;
        }
    };

    const packageInfos = useMemo<PackageInfos>(getPackageInfos, []);

    const settingsContainerClasses = useMemo(
        () => `flex flex-col rounded-2xl bg-gray-200 p-4 shadow-sm ${getBackgroundTheme(backgroundTheme).settingsBg}`,
        [backgroundTheme]
    );

    if (error) throw error;

    return (
        <div className={"flex h-full w-full flex-col gap-4 overflow-auto p-4"}>
            <div className={"flex w-full justify-center"}>
                <TabBar tabs={settingTabs} activeTabId={activeTabId} onTabChange={setActiveTabId} />
            </div>

            <div className={`gap-4 ${settingsContainerClasses}`}>
                {settingsConfig.map((stg) => {
                    if (stg.tabId !== activeTabId) return null;

                    if (stg.component === "SettingsToggle")
                        return (
                            <SettingsToggle
                                key={stg.id}
                                settingName={stg.name}
                                defaultValue={findValueById(stg.id) as boolean}
                                onToggle={(val) => executeFunctionById(stg.id, val)}
                            />
                        );
                    else if (stg.component === "DropDownSelect") {
                        if (stg.options && stg.options.length === 0) {
                            sendNotification({ lvl: "ERROR", msg: `Keine Optionen für: ${stg.name}` });
                            return null;
                        }

                        return (
                            <MultipleValueSelector
                                key={stg.id}
                                name={stg.name}
                                defaultOption={findValueById(stg.id) as string}
                                options={stg.options || []}
                                onChange={(val) => executeFunctionById(stg.id, val as string, stg.funcParamKey)}
                            />
                        );
                    } else if (stg.component === "ColorPicker")
                        return (
                            <ColorPicker
                                key={stg.id}
                                label={stg.name}
                                color={findValueById(stg.id) as string}
                                onColorChange={(val) => executeFunctionById(stg.id, val, stg.funcParamKey)}
                            />
                        );
                    else return null;
                })}
            </div>

            <div className={settingsContainerClasses}>
                <div className={"flex flex-col items-center"}>
                    <span className={"text-xl font-bold text-gray-900 dark:text-gray-100"}>
                        {packageInfos.projectName}
                    </span>
                    <span className={"text-sm text-gray-500 dark:text-gray-300"}>
                        {"Version "}
                        {packageInfos.version}
                    </span>
                    <span className={"text-sm text-gray-500 dark:text-gray-300"}>
                        {"TypeScript "}
                        {packageInfos.typeScriptVersion}
                    </span>
                    <span className={"text-sm text-gray-500 dark:text-gray-300"}>
                        {"React "}
                        {packageInfos.reactVersion}
                    </span>
                </div>
            </div>
        </div>
    );
};
