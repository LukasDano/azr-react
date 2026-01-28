import type { Time } from '../../static/importantTypes';
import { type CountdownColors, defaultCountdownTheme } from '../../static/themes.ts';

export type StorageKey = 'darkModeActive' | 'countdownColors' | 'colorTheme' | 'overTimeAutomatic' | 'showShortcuts';

export type StorageValue = Time | boolean | string | CountdownColors;

const defaultValues: Record<StorageKey, StorageValue> = {
    darkModeActive: false,
    countdownColors: defaultCountdownTheme,
    colorTheme: 'skyViolet',
    overTimeAutomatic: false,
    showShortcuts: false,
};

export const getStorageValue = (key: StorageKey): StorageValue => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValues[key];
};

export const setStorageValue = (key: StorageKey, value: StorageValue): void => {
    const valAsString = JSON.stringify(value);
    localStorage.setItem(key, valAsString);
};
