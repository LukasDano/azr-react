import { Palette, Pickaxe } from 'lucide-react';
import { useContext } from 'react';

import { availableThemes, type ThemeName } from '../../static/themes';
import type { CountdownUnit } from '../content/miscellaneous/CountdownElement';
import { SettingContext, type SettingContextValues } from '../context/SettingContext';
import { SettingsDropDown } from './inputs/SettingsDropDown';
import { SettingsInput } from './inputs/SettingsInput';
import { SettingsToggle } from './inputs/SettingsToggle';
import { SettingsGroup } from './SettingsGroup';

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
    } = useContext<SettingContextValues>(SettingContext);

    const handleCountdownColorChange = (key: CountdownUnit, val: string) => {
        const updatedColors = {
            ...countdownColors,
            [key]: val,
        };

        updateCountdownColors(updatedColors);
    };

    return (
        <div className="flex flex-col gap-4 w-full p-4">
            <SettingsGroup title={'Design'} icon={<Palette className={'w-5 h-5'} />} defaultOpen={true}>
                <SettingsToggle
                    settingName={'Dark Mode'}
                    defaultValue={darkModeActive}
                    onToggle={updateDarkModeActive}
                />
                <SettingsInput
                    type={'text'}
                    useStringAsColor={true}
                    settingName={'Countdown Frabe für Stunden'}
                    defaultValue={countdownColors.hours}
                    onSubmit={(val) => handleCountdownColorChange('hours', val as string)}
                />
                <SettingsInput
                    type={'text'}
                    useStringAsColor={true}
                    settingName={'Countdown Frabe für Minuten'}
                    defaultValue={countdownColors.minutes}
                    onSubmit={(val) => handleCountdownColorChange('minutes', val as string)}
                />
                <SettingsInput
                    type={'text'}
                    useStringAsColor={true}
                    settingName={'Countdown Frabe für Sekunden'}
                    defaultValue={countdownColors.seconds}
                    onSubmit={(val) => handleCountdownColorChange('seconds', val as string)}
                />
                <SettingsDropDown
                    name={'Theme'}
                    defaultOption={colorTheme}
                    options={Object.keys(availableThemes)}
                    onChange={(val) => updateColorTheme(val as ThemeName)}
                />
            </SettingsGroup>

            <SettingsGroup title={'Funktionen'} icon={<Pickaxe className={'w-5 h-5'} />} defaultOpen={false}>
                <SettingsToggle
                    settingName={'Überstunden automatisch erfassen'}
                    defaultValue={overTimeAutomatic}
                    onToggle={updateOverTimeAutomatic}
                />
            </SettingsGroup>
        </div>
    );
};
