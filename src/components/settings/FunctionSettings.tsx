import type { FC } from "react";

import { useContext } from "react";

import type { SettingContextValues } from "../context/setting/SettingContext.tsx";

import { SettingContext } from "../context/setting/SettingContext.tsx";
import { SettingsToggle } from "./inputs/SettingsToggle";

const FunctionSettings: FC = () => {
    const { overTimeAutomatic, updateOverTimeAutomatic, showShortcuts, updateShowShortcuts } =
        useContext<SettingContextValues>(SettingContext);

    return (
        <>
            <SettingsToggle
                settingName={"Shortcuts anzeigen"}
                defaultValue={showShortcuts}
                onToggle={updateShowShortcuts}
            />

            <SettingsToggle
                settingName={"Nach Arbeitsende automatisch erhöhen"}
                defaultValue={overTimeAutomatic}
                onToggle={updateOverTimeAutomatic}
            />
        </>
    );
};

// oxlint-disable-next-line import/no-default-export
export default FunctionSettings;
