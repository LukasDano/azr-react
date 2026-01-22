import { defaultBreakTime, defaultWorkTime } from '../../static/defaultValues.ts';
import type { Time } from '../../static/importantTypes';

type StorageKey =
    | 'breakTime'
    | 'workTime'
    | 'darkModeActive'
    | 'hoursCountdownColor'
    | 'minutesCountdownColor'
    | 'secondsCountdownColor';

type StorageValue = Time | boolean | string;

const defaultValues: Record<StorageKey, StorageValue> = {
    breakTime: defaultBreakTime,
    workTime: defaultWorkTime,
    darkModeActive: false,
    hoursCountdownColor: '#2980b9',
    minutesCountdownColor: '#8e44ad',
    secondsCountdownColor: '#f39c13',
};

export const getStorageValue = (key: StorageKey): StorageValue => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValues[key];
};

export const setStorageValue = (key: StorageKey, value: StorageValue): void => {
    const valAsString = JSON.stringify(value);
    localStorage.setItem(key, valAsString);
};
