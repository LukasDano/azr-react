import type { FC, ReactNode } from "react";

import { useContext } from "react";

import { getThemeClasses } from "../../utils/themes";
import { SettingContext } from '../context/SettingContext';
import type { SettingContextValues } from '../context/SettingContext';
import { Tooltip } from "./Tooltip";

type BaseButtonProps = {
    icon?: ReactNode;
    text?: string;
    tooltip: string;
    onClick: () => void;
};

export const BaseButton: FC<BaseButtonProps> = ({ icon, tooltip, onClick, text }) => {
    const { colorTheme } = useContext<SettingContextValues>(SettingContext);

    return (
        <Tooltip tooltip={tooltip}>
            <button
                onClick={onClick}
                className={`flex h-10 items-center justify-center rounded-lg px-4 text-white transition-colors duration-200 ${getThemeClasses(colorTheme)}`}
            >
                {text ?? icon}
            </button>
        </Tooltip>
    );
};

type FromFunctionButtonProps = {
    onClick: () => void;
    tooltip?: string;
    icon: ReactNode;
};

export const FromFunctionButton: FC<FromFunctionButtonProps> = ({ onClick, tooltip = "", icon }) => {
    const { colorTheme } = useContext<SettingContextValues>(SettingContext);

    return (
        <Tooltip tooltip={tooltip} animation={"scale"} disabled={tooltip === ""}>
            <button
                onClick={onClick}
                className={`flex h-12 flex-1 items-center justify-center rounded p-2 text-white shadow ${getThemeClasses(colorTheme)}`}
            >
                {icon}
            </button>
        </Tooltip>
    );
};
