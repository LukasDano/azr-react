import type { FC, ReactElement } from "react";

import { useContext } from "react";

import type { SettingContextValues } from "../../context/setting/SettingContext.tsx";

import { getThemeClasses } from "../../../utils/themes";
import { SettingContext } from "../../context/setting/SettingContext.tsx";
import { Tooltip } from "../../library/Tooltip";

type HeaderButtonProps = {
    onClick: () => void;
    icon: ReactElement;
    tooltip: string;
};

export const HeaderButton: FC<HeaderButtonProps> = ({ icon, onClick, tooltip }) => {
    const { colorTheme } = useContext<SettingContextValues>(SettingContext);

    return (
        <Tooltip tooltip={tooltip}>
            <button
                className={`flex items-center gap-2 rounded-lg px-4 py-2 shadow transition ${getThemeClasses(colorTheme)}`}
                onClick={onClick}
            >
                {icon}
            </button>
        </Tooltip>
    );
};
