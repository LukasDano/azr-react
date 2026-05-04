import type { Time } from '../../static/importantTypes';
import type { ColorTheme, CountdownColors } from '../../static/themes.ts';
import { defaultColorTheme, defaultCountdownTheme } from '../../static/themes.ts';
import { notificationPositions } from '../page/notifications.ts';

export type StorageKey =
    | 'darkModeActive'
    | 'countdownColors'
    | 'colorTheme'
    | 'overTimeAutomatic'
    | 'showShortcuts'
    | 'toastPosition';

export type StorageValue = Time | boolean | string | CountdownColors | ColorTheme;

const defaultValues: Record<StorageKey, StorageValue> = {
    darkModeActive: false,
    countdownColors: defaultCountdownTheme,
    colorTheme: defaultColorTheme,
    overTimeAutomatic: false,
    showShortcuts: false,
    toastPosition: notificationPositions.bottomRight,
};

export const getStorageValue = (key: StorageKey): StorageValue => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValues[key];
};

export const setStorageValue = (key: StorageKey, value: StorageValue): void => {
    const valAsString = JSON.stringify(value);
    localStorage.setItem(key, valAsString);
};
