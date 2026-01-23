import { useContext } from 'react';

import { SettingContext, type SettingContextValues } from '../context/SettingContext';
import { SettingsInput } from './SettingsInput';
import { SettingsToggle } from './SettingsToggle';

export const Settings = () => {
    const {
        darkModeActive,
        updateDarkModeActive,
        hoursCountdownColor,
        updateHoursCountdownColor,
        minutesCountdownColor,
        updateMinutesCountdownColor,
        secondsCountdownColor,
        updateSecondsCountdownColor,
    } = useContext<SettingContextValues>(SettingContext);

    return (
        <div className="flex flex-col gap-4 w-full p-4">
            <SettingsToggle settingName={'Dark Mode'} defaultValue={darkModeActive} onToggle={updateDarkModeActive} />
            <SettingsInput
                type={'text'}
                useStringAsColor={true}
                settingName={'Countdown Frabe für Stunden'}
                defaultValue={hoursCountdownColor}
                onSubmit={(val) => updateHoursCountdownColor(val as string)}
            />
            <SettingsInput
                type={'text'}
                useStringAsColor={true}
                settingName={'Countdown Frabe für Minuten'}
                defaultValue={minutesCountdownColor}
                onSubmit={(val) => updateMinutesCountdownColor(val as string)}
            />
            <SettingsInput
                type={'text'}
                useStringAsColor={true}
                settingName={'Countdown Frabe für Sekunden'}
                defaultValue={secondsCountdownColor}
                onSubmit={(val) => updateSecondsCountdownColor(val as string)}
            />
        </div>
    );
};
