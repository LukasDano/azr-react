import type { Time } from '../../static/importantTypes';

type StorageKey = 'breakTime' | 'workTime';

type StorageValue = Time;

const defaultValues: Record<StorageKey, StorageValue> = {
    breakTime: { hours: 0, minutes: 30 },
    workTime: { hours: 7, minutes: 6 },
};

export const getStorageValue = (key: StorageKey): StorageValue => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValues[key];
};

export const setStorageValue = (key: StorageKey, value: StorageValue): void => {
    const valAsString = JSON.stringify(value);
    localStorage.setItem(key, valAsString);
};
