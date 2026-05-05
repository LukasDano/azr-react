import { useContext, useMemo, useState } from 'react';

import { ColorPicker } from './inputs/ColorSelector.tsx';
import { SettingsToggle } from './inputs/SettingsToggle';
import type { SettingId } from './settingConfig.tsx';
import { settingsConfig, settingTabs, settingTabsByName } from './settingConfig.tsx';
import { name, version } from '../../../package.json';
import { type BackgroundTheme, type ColorTheme, getBackgroundTheme, type ThemeType } from '../../static/themes';
import { SettingsError } from '../../utils/errors/SettingsError.ts';
import type { ToastPosition } from '../../utils/page/notifications.ts';
import { sendErrorMessage } from '../../utils/page/notifications.ts';
import type { CountdownUnit } from '../content/countdown/CountdownElement.tsx';
import { DropDownSelect } from '../content/inputs/DropDownSelect.tsx';
import { TabBar } from '../content/miscellaneous/TabBar.tsx';
import { SettingContext, type SettingContextValues } from '../context/SettingContext';

type SettingValue = boolean | string | ColorTheme | ToastPosition;

export const Settings = () => {
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
        updateBackgroundTheme,
    } = useContext<SettingContextValues>(SettingContext);

    const [activeTabId, setActiveTabId] = useState<number>(settingTabsByName.Design.id);
    const [error, setError] = useState<SettingsError | null>(null);

    const handleCountdownColorChange = (key: CountdownUnit, val: string) => {
        if (typeof key === 'undefined')
            setError(
                new SettingsError(
                    'Invalid CountdownUnit',
                    `Tried to call handleCountdownColorChange() without a valid CountdownUnit .`
                )
            );

        const updatedColors = {
            ...countdownColors,
            [key]: val,
        };

        updateCountdownColors(updatedColors);
    };

    const handleThemeChange = (key: ThemeType, val: string): void => {
        if (typeof key === 'undefined')
            setError(
                new SettingsError('Invalid ThemeType', `Tried to call handleThemeChange() without a valid ThemeType .`)
            );

        const updatedTheme = {
            ...colorTheme,
            [key]: val,
        };

        updateColorTheme(updatedTheme);
    };

    const handleBackgroundTheme = (val: BackgroundTheme | 'light'): void => {
        if (val === 'light') updateDarkModeActive(false);
        else {
            updateDarkModeActive(true);
            updateBackgroundTheme(val);
        }
    };

    const findValueById = (id: SettingId): SettingValue => {
        const getBgTheme = (): BackgroundTheme | 'light' => {
            if (!darkModeActive) return 'light';
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
            backgroundTheme: getBgTheme(),
        };

        try {
            return settingKeyValueMap[id];
        } catch (err) {
            setError(new SettingsError('Invalid SettingId', `Failed to find a value for the id: ${id}.`));

            throw err;
        }
    };

    const executeFunctionById = (id: SettingId, val: SettingValue, funcParamKey: string | null = null): void => {
        switch (id) {
            case 'countdownHours':
                handleCountdownColorChange(funcParamKey as CountdownUnit, val as string);
                break;
            case 'countdownMinutes':
                handleCountdownColorChange(funcParamKey as CountdownUnit, val as string);
                break;
            case 'countdownSeconds':
                handleCountdownColorChange(funcParamKey as CountdownUnit, val as string);
                break;
            case 'lightModeTheme':
                handleThemeChange(funcParamKey as ThemeType, val as string);
                break;
            case 'darkModeTheme':
                handleThemeChange(funcParamKey as ThemeType, val as string);
                break;
            case 'notificationPosition':
                updateToastPosition(val as ToastPosition);
                break;
            case 'displayShortcuts':
                updateShowShortcuts(val as boolean);
                break;
            case 'overtimeAutomatic':
                updateOverTimeAutomatic(val as boolean);
                break;
            case 'backgroundTheme':
                handleBackgroundTheme(val as 'light' | BackgroundTheme);
                break;
            default:
                setError(
                    new SettingsError('Invalid SettingId', `Failed to find a function to execute for the id: ${id}.`)
                );
                return;
        }
    };

    if (error) throw error;

    const settingsContainerClasses = useMemo(
        () => `flex flex-col rounded-2xl bg-gray-200 p-4 shadow-sm ${getBackgroundTheme(backgroundTheme).settingsBg}`,
        [backgroundTheme]
    );

    return (
        <div className="flex h-full w-full flex-col gap-4 overflow-auto p-4">
            <div className="flex w-full justify-center">
                <TabBar tabs={settingTabs} activeTabId={activeTabId} onTabChange={setActiveTabId} />
            </div>

            <div className={`gap-4 ${settingsContainerClasses}`}>
                {settingsConfig.map((stg) => {
                    if (stg.tabId !== activeTabId) return null;

                    if (stg.component === 'SettingsToggle')
                        return (
                            <SettingsToggle
                                key={stg.id}
                                settingName={stg.name}
                                defaultValue={findValueById(stg.id) as boolean}
                                onToggle={(val) => executeFunctionById(stg.id, val)}
                            />
                        );
                    else if (stg.component === 'DropDownSelect') {
                        if (stg.options && stg.options.length === 0) {
                            sendErrorMessage(`No options found for: ${stg.name}`);
                            return null;
                        }

                        return (
                            <DropDownSelect
                                key={stg.id}
                                name={stg.name}
                                defaultOption={findValueById(stg.id) as string}
                                options={stg.options || []}
                                onChange={(val) => executeFunctionById(stg.id, val as string, stg.funcParamKey)}
                            />
                        );
                    } else if (stg.component === 'ColorPicker')
                        return (
                            <ColorPicker
                                key={stg.id}
                                label={stg.name}
                                color={findValueById(stg.id) as string}
                                onColorChange={(val) => executeFunctionById(stg.id, val as string, stg.funcParamKey)}
                            />
                        );
                    else return null;
                })}
            </div>

            <div className={settingsContainerClasses}>
                <div className="flex flex-col items-center">
                    <span className="font-bold text-gray-900 text-xl dark:text-gray-100">{name}</span>
                    <span className="text-gray-500 text-sm dark:text-gray-300">Version {version}</span>
                </div>
            </div>
        </div>
    );
};
