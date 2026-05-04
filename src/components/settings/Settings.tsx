import { Palette, Pickaxe } from 'lucide-react';
import { useContext } from 'react';

import { ColorPicker } from './inputs/ColorSelector.tsx';
import { SettingsToggle } from './inputs/SettingsToggle';
import { SettingsGroup } from './SettingsGroup';
import { availableThemes, type ThemeType } from '../../static/themes';
import type { CountdownUnit } from '../content/countdown/CountdownElement.tsx';
import { DropDownSelect } from '../content/inputs/DropDownSelect.tsx';
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

    return (
        <div className="flex w-full flex-col gap-4 overflow-auto p-4">
            <SettingsGroup title={'Design'} icon={<Palette className={'h-5 w-5'} />} defaultOpen={true}>
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
                <SettingsToggle
                    settingName={'Zeige Shortcuts an'}
                    defaultValue={showShortcuts}
                    onToggle={updateShowShortcuts}
                />
            </SettingsGroup>

            <SettingsGroup title={'Funktionen'} icon={<Pickaxe className={'h-5 w-5'} />} defaultOpen={false}>
                <SettingsToggle
                    settingName={'Nach Arbeitsende automatisch erhöhen'}
                    defaultValue={overTimeAutomatic}
                    onToggle={updateOverTimeAutomatic}
                />
            </SettingsGroup>
        </div>
    );
};
