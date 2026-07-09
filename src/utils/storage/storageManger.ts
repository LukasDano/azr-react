import type { Time } from "../importantTypes.ts";
import type { ColorTheme, CountdownColors } from "../themes.ts";

import { defaultBackgroundTheme, defaultColorTheme, defaultCountdownTheme } from "../themes.ts";

export type StorageKey =
    | "azr_darkModeActive"
    | "azr_countdownColors"
    | "azr_colorTheme"
    | "azr_overTimeAutomatic"
    | "azr_showShortcuts"
    | "azr_toastPosition"
    | "azr_backgroundTheme";

export type StorageValue = Time | boolean | string | CountdownColors | ColorTheme;

const defaultValues: Record<StorageKey, StorageValue> = {
    azr_darkModeActive: false,
    azr_countdownColors: defaultCountdownTheme,
    azr_colorTheme: defaultColorTheme,
    azr_overTimeAutomatic: false,
    azr_showShortcuts: false,
    azr_toastPosition: "bottomRight",
    azr_backgroundTheme: defaultBackgroundTheme
};

export const getStorageValue = (key: StorageKey): StorageValue => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValues[key];
};

export const setStorageValue = (key: StorageKey, value: StorageValue): void => {
    const valAsString = JSON.stringify(value);
    localStorage.setItem(key, valAsString);
};
