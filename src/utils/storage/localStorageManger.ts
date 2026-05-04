import type { Time } from '../../static/importantTypes';
import {
    type BackgroundTheme,
    type ColorTheme,
    type CountdownColors,
    defaultBackgroundTheme,
    defaultColorTheme,
    defaultCountdownTheme,
} from '../../static/themes.ts';

export type StorageKey =
    | 'darkModeActive'
    | 'countdownColors'
    | 'colorTheme'
    | 'overTimeAutomatic'
    | 'showShortcuts'
    | 'toastPosition'
    | 'backgroundTheme';

export type StorageValue = Time | boolean | string | CountdownColors | ColorTheme | BackgroundTheme;

const defaultValues: Record<StorageKey, StorageValue> = {
    darkModeActive: false,
    countdownColors: defaultCountdownTheme,
    colorTheme: defaultColorTheme,
    overTimeAutomatic: false,
    showShortcuts: false,
    toastPosition: 'bottomRight',
    backgroundTheme: defaultBackgroundTheme,
};

export const getStorageValue = (key: StorageKey): StorageValue => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValues[key];
};

export const setStorageValue = (key: StorageKey, value: StorageValue): void => {
    const valAsString = JSON.stringify(value);
    localStorage.setItem(key, valAsString);
};
