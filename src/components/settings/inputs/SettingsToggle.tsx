import { type FC, useContext, useState } from 'react';
import { availableDarkThemes, availableLightThemes } from '../../../static/themes';
import { sendInfoMessage } from '../../../utils/page/notifications';
import { SettingContext, type SettingContextValues } from '../../context/SettingContext';

type SettingsToggleProps = {
    onToggle: (value: boolean) => void;
    defaultValue: boolean;
    settingName: string;
    description?: string;
};

export const SettingsToggle: FC<SettingsToggleProps> = ({ settingName, onToggle, description = '', defaultValue }) => {
    const { colorTheme } = useContext<SettingContextValues>(SettingContext);

    const [value, setValue] = useState<boolean>(defaultValue);

    const themeClasses = `${availableLightThemes[colorTheme.light]} ${availableDarkThemes[colorTheme.dark]}`;

    const handleToggle = () => {
        const newValue = !value;
        setValue(newValue);
        onToggle(newValue);
        sendInfoMessage(`"${settingName}" was turned ${newValue ? 'on' : 'off'}.`);
    };

    return (
        <div className="flex items-center justify-between py-2">
            <div className="flex flex-col">
                <span className="font-medium text-gray-900 dark:text-gray-100">{settingName}</span>
                <span className="text-sm text-gray-500 dark:text-gray-300">{description}</span>
            </div>

            <button
                type="button"
                onClick={handleToggle}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                    value ? themeClasses : 'bg-gray-300'
                }`}
                role="switch"
                aria-checked={value}
                aria-label={settingName}
            >
                <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-300 ${
                        value ? 'translate-x-6' : 'translate-x-1'
                    }`}
                />
            </button>
        </div>
    );
};
