import { useContext } from 'react';

import type { CountdownUnit } from '../content/Countdown';
import { SettingContext, type SettingContextValues } from '../context/SettingContext';
import { SettingsInput } from './SettingsInput';
import { SettingsToggle } from './SettingsToggle';

export const Settings = () => {
    const { darkModeActive, updateDarkModeActive, countdownColors, updateCountdownColors } =
        useContext<SettingContextValues>(SettingContext);

    const handleCountdownColorChange = (key: CountdownUnit, val: string) => {
        const updatedColors = {
            ...countdownColors,
            [key]: val,
        };

        updateCountdownColors(updatedColors);
    };

    return (
        <div className="flex flex-col gap-4 w-full p-4">
            <SettingsToggle settingName={'Dark Mode'} defaultValue={darkModeActive} onToggle={updateDarkModeActive} />
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
        </div>
    );
};
