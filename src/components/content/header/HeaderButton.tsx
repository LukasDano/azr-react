import Tippy from '@tippyjs/react';
import { type FC, type ReactNode, useContext } from 'react';

import { availableThemes } from '../../../static/themes';
import type { SettingContextValues } from '../../context/SettingContext';
import { SettingContext } from '../../context/SettingContext';

type HeaderButtonProps = {
    onClick: () => void;
    icon: ReactNode;
    tooltip: string;
};

export const HeaderButton: FC<HeaderButtonProps> = ({ icon, onClick, tooltip }) => {
    const { colorTheme } = useContext<SettingContextValues>(SettingContext);

    const themeClasses = `${availableThemes[colorTheme.light].light} ${availableThemes[colorTheme.dark].dark}`;

    return (
        <Tippy content={tooltip}>
            <button
                className={`flex items-center gap-2 rounded-lg px-4 py-2 shadow transition ${themeClasses}`}
                onClick={onClick}
            >
                {icon}
            </button>
        </Tippy>
    );
};
