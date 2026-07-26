import type { FC, ReactElement } from "react";

import { useContext } from "react";

import type { SettingContextValues } from "../../context/setting/SettingContext";

import { getThemeClasses } from "../../../utils/themes";
import { SettingContext } from "../../context/setting/SettingContext";
import { Tooltip } from "../../library/Tooltip";

type HeaderLinkButtonProps = {
    icon: ReactElement;
    tooltip: string;
    url: string;
    openInNewTab?: boolean;
};

export const HeaderLinkButton: FC<HeaderLinkButtonProps> = ({ icon, url, tooltip, openInNewTab }) => {
    const { colorTheme } = useContext<SettingContextValues>(SettingContext);

    return (
        <Tooltip tooltip={tooltip}>
            <a href={url} target={openInNewTab ? "_blank" : "_self"} rel={"noreferrer noopener"}>
                <button
                    className={`flex items-center gap-2 rounded-lg px-4 py-2 shadow transition ${getThemeClasses(colorTheme)}`}
                >
                    {icon}
                </button>
            </a>
        </Tooltip>
    );
};
