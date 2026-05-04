import Tippy from '@tippyjs/react';
import { type FC, type ReactNode, useContext } from 'react';

import { getThemeClasses } from '../../../static/themes';
import type { SettingContextValues } from '../../context/SettingContext';
import { SettingContext } from '../../context/SettingContext';

type HeaderButtonProps = {
    onClick: () => void;
    icon: ReactNode;
    tooltip: string;
};

export const HeaderButton: FC<HeaderButtonProps> = ({ icon, onClick, tooltip }) => {
    const { colorTheme } = useContext<SettingContextValues>(SettingContext);

    return (
        <Tippy content={tooltip}>
            <button
                className={`flex items-center gap-2 rounded-lg px-4 py-2 shadow transition ${getThemeClasses(colorTheme)}`}
                onClick={onClick}
            >
                {icon}
            </button>
        </Tippy>
    );
};
