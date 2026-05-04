import { useContext, useState } from 'react';

import { ColorPicker } from './inputs/ColorSelector.tsx';
import { SettingsToggle } from './inputs/SettingsToggle';
import { settingTabs } from './settingConfig.tsx';
import { availableThemes, type ThemeType } from '../../static/themes';
import { notificationPositions, type ToastPosition } from '../../utils/page/notifications.ts';
import type { CountdownUnit } from '../content/countdown/CountdownElement.tsx';
import { DropDownSelect } from '../content/inputs/DropDownSelect.tsx';
import { TabBar } from '../content/miscellaneous/TabBar.tsx';
import { SettingContext, type SettingContextValues } from '../context/SettingContext';

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
    } = useContext<SettingContextValues>(SettingContext);

    const handleCountdownColorChange = (key: CountdownUnit, val: string) => {
        const updatedColors = {
            ...countdownColors,
            [key]: val,
        };

        updateCountdownColors(updatedColors);
    };

    const handleThemeChange = (key: ThemeType, val: string) => {
        const updatedTheme = {
            ...colorTheme,
            [key]: val,
        };

        updateColorTheme(updatedTheme);
    };

    const [activeTabId, setActiveTabId] = useState<number>(settingTabs[0].id);

    return (
        <div className="flex w-full flex-col gap-4 overflow-auto p-4">
            <div className="flex w-full justify-center">
                <TabBar tabs={settingTabs} activeTabId={activeTabId} onTabChange={setActiveTabId} />
            </div>

            <div className={'flex flex-col gap-4 rounded-2xl bg-gray-200 p-4 shadow-sm dark:bg-gray-600'}>
                {activeTabId === 0 && (
                    <>
                        <SettingsToggle
                            settingName={'Dark Mode'}
                            defaultValue={darkModeActive}
                            onToggle={updateDarkModeActive}
                        />
                        <ColorPicker
                            label={'Countdown Farbe für Stunden'}
                            color={countdownColors.hours}
                            onColorChange={(val) => handleCountdownColorChange('hours', val)}
                        />
                        <ColorPicker
                            label={'Countdown Farbe für Minuten'}
                            color={countdownColors.minutes}
                            onColorChange={(val) => handleCountdownColorChange('minutes', val)}
                        />
                        <ColorPicker
                            label={'Countdown Farbe für Sekunden'}
                            color={countdownColors.seconds}
                            onColorChange={(val) => handleCountdownColorChange('seconds', val)}
                        />
                        <DropDownSelect
                            name={'Lightmode Theme'}
                            defaultOption={colorTheme.light}
                            options={Object.keys(availableThemes)}
                            onChange={(val) => handleThemeChange('light', val as string)}
                        />
                        <DropDownSelect
                            name={'Darkmode Theme'}
                            defaultOption={colorTheme.dark}
                            options={Object.keys(availableThemes)}
                            onChange={(val) => handleThemeChange('dark', val as string)}
                        />
                        <DropDownSelect
                            name={'Benachrichtigungs Position'}
                            defaultOption={toastPosition}
                            options={Object.keys(notificationPositions)}
                            onChange={(val) => updateToastPosition(val as ToastPosition)}
                        />
                        <SettingsToggle
                            settingName={'Zeige Shortcuts an'}
                            defaultValue={showShortcuts}
                            onToggle={updateShowShortcuts}
                        />
                    </>
                )}

                {activeTabId === 1 && (
                    <SettingsToggle
                        settingName={'Nach Arbeitsende automatisch erhöhen'}
                        defaultValue={overTimeAutomatic}
                        onToggle={updateOverTimeAutomatic}
                    />
                )}
            </div>
        </div>
    );
};
