import type { FC, ReactNode } from "react";

import { useContext } from "react";

import type { SettingContextValues } from "../context/SettingContext";

import { getThemeClasses } from "../../utils/themes";
import { SettingContext } from "../context/SettingContext";
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
