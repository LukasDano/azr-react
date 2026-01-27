import { defaultBreakTime, defaultWorkTime } from '../../static/defaultValues.ts';
import type { Time } from '../../static/importantTypes';
import { type CountdownColors, defaultCountdownTheme } from '../../static/themes.ts';

export type StorageKey =
    | 'breakTime'
    | 'workTime'
    | 'darkModeActive'
    | 'countdownColors'
    | 'colorTheme'
    | 'overTimeAutomatic';

export type StorageValue = Time | boolean | string | CountdownColors;

const defaultValues: Record<StorageKey, StorageValue> = {
    breakTime: defaultBreakTime,
    workTime: defaultWorkTime,
    darkModeActive: false,
    countdownColors: defaultCountdownTheme,
    colorTheme: 'skyViolet',
    overTimeAutomatic: false,
};

export const getStorageValue = (key: StorageKey): StorageValue => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValues[key];
};

export const setStorageValue = (key: StorageKey, value: StorageValue): void => {
    const valAsString = JSON.stringify(value);
    localStorage.setItem(key, valAsString);
};
