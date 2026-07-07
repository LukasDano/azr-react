import type { FC, ReactNode } from "react";

import Tippy from "@tippyjs/react";
import { useContext } from "react";

import type { SettingContextValues } from "../../context/SettingContext";

import { getThemeClasses } from "../../../static/themes";
import { SettingContext } from "../../context/SettingContext";

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
