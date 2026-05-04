import Tippy from '@tippyjs/react';
import type { FC, ReactNode } from 'react';
import { useContext } from 'react';

import { getThemeClasses } from '../../../static/themes';
import type { SettingContextValues } from '../../context/SettingContext';
import { SettingContext } from '../../context/SettingContext';

type BaseButtonProps = {
    icon?: ReactNode;
    text?: string;
    tooltip: string;
    onClick: () => void;
};

export const BaseButton: FC<BaseButtonProps> = ({ icon, tooltip, onClick, text }) => {
    const { colorTheme } = useContext<SettingContextValues>(SettingContext);

    return (
        <Tippy content={tooltip}>
            <button
                onClick={onClick}
                className={`flex h-10 items-center justify-center rounded-lg px-4 text-white transition-colors duration-200 ${getThemeClasses(colorTheme)}`}
            >
                {text ?? icon}
            </button>
        </Tippy>
    );
};
