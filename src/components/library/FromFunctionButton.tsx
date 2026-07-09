import type { FC, ReactNode } from "react";

import { useContext } from "react";

import type { SettingContextValues } from "../context/SettingContext.tsx";

import { getThemeClasses } from "../../utils/themes.ts";
import { SettingContext } from "../context/SettingContext.tsx";
import { Tooltip } from "./Tooltip.tsx";

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
