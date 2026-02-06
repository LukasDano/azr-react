import Tippy from '@tippyjs/react';
import { type FC, type ReactNode, useContext } from 'react';

import { availableDarkThemes, availableLightThemes } from '../../../static/themes';
import { SettingContext, type SettingContextValues } from '../../context/SettingContext';

type HeaderButtonProps = {
    onClick: () => void;
    icon: ReactNode;
    tooltip: string;
};

export const HeaderButton: FC<HeaderButtonProps> = ({ icon, onClick, tooltip }) => {
    const { colorTheme } = useContext<SettingContextValues>(SettingContext);

    const themeClasses = `${availableLightThemes[colorTheme.light]} ${availableDarkThemes[colorTheme.dark]}`;

    return (
        <Tippy content={tooltip}>
            <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow transition ${themeClasses}`}
                onClick={onClick}
            >
                {icon}
            </button>
        </Tippy>
    );
};
