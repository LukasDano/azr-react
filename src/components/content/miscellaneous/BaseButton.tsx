import Tippy from '@tippyjs/react';
import { type FC, type ReactNode, useContext } from 'react';

import { availableDarkThemes, availableLightThemes } from '../../../static/themes';
import { SettingContext, type SettingContextValues } from '../../context/SettingContext';

type BaseButtonProps = {
    icon?: ReactNode;
    text?: string;
    tooltip: string;
    onClick: () => void;
};

export const BaseButton: FC<BaseButtonProps> = ({ icon, tooltip, onClick, text }) => {
    const { colorTheme } = useContext<SettingContextValues>(SettingContext);
    const themeClasses = `${availableLightThemes[colorTheme.light]} ${availableDarkThemes[colorTheme.dark]}`;

    return (
        <Tippy content={tooltip}>
            <button
                onClick={onClick}
                className={`flex items-center justify-center h-10 px-4 text-white rounded-lg transition-colors duration-200 ${themeClasses}`}
            >
                {text ?? icon}
            </button>
        </Tippy>
    );
};
