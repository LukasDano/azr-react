import type { FC } from "react";

import { useContext } from "react";

import type { ToastPosition } from "../../utils/notifications.ts";
import type { ThemeType } from "../../utils/themes.ts";
import type { CountdownUnit } from "../content/countdown/CountdownElement.tsx";
import type { SettingContextValues } from "../context/setting/SettingContext.tsx";

import { notificationPositions } from "../../utils/notifications.ts";
import { availableThemes } from "../../utils/themes.ts";
import { SettingContext } from "../context/setting/SettingContext.tsx";
import { MultipleValueSelector } from "../library/inputs/MultipleValueSelector.tsx";
import { ColorPicker } from "./inputs/ColorSelector.tsx";
import { SettingsToggle } from "./inputs/SettingsToggle";

const DesignSettings: FC = () => {
    const {
        darkModeActive,
        updateDarkModeActive,
        countdownColors,
        updateCountdownColors,
        colorTheme,
        updateColorTheme,
        toastPosition,
        updateToastPosition
    } = useContext<SettingContextValues>(SettingContext);

    const handleCountdownColorChange = (key: CountdownUnit, val: string): void => {
        const updatedColors = {
            ...countdownColors,
            [key]: val
        };

        updateCountdownColors(updatedColors);
    };

    const handleThemeChange = (key: ThemeType, val: string): void => {
        const updatedTheme = {
            ...colorTheme,
            [key]: val
        };

        updateColorTheme(updatedTheme);
    };

    return (
        <>
            <SettingsToggle settingName={"DarkMode"} defaultValue={darkModeActive} onToggle={updateDarkModeActive} />

            <MultipleValueSelector
                name={"LightMode Theme"}
                defaultOption={colorTheme.light}
                options={Object.keys(availableThemes)}
                onChange={(val) => handleThemeChange("light", val as string)}
            />

            <MultipleValueSelector
                name={"DarkMode Theme"}
                defaultOption={colorTheme.light}
                options={Object.keys(availableThemes)}
                onChange={(val) => handleThemeChange("dark", val as string)}
            />

            <MultipleValueSelector
                name={"Benachrichtigungsposition"}
                defaultOption={toastPosition}
                options={Object.keys(notificationPositions)}
                onChange={(val) => updateToastPosition(val as ToastPosition)}
            />

            <ColorPicker
                label={"Countdown Farbe für Stunden"}
                color={countdownColors.hours}
                onColorChange={(val) => handleCountdownColorChange("hours", val)}
            />

            <ColorPicker
                label={"Countdown Farbe für Minuten"}
                color={countdownColors.minutes}
                onColorChange={(val) => handleCountdownColorChange("minutes", val)}
            />

            <ColorPicker
                label={"Countdown Farbe für Sekunden"}
                color={countdownColors.seconds}
                onColorChange={(val) => handleCountdownColorChange("seconds", val)}
            />
        </>
    );
};

// oxlint-disable-next-line import/no-default-export
export default DesignSettings;
