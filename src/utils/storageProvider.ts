import type { Time } from "./importantTypes";

type StorageKey = 'startTime';

type StorageValue = Time;

const defaultValues: Record<StorageKey, StorageValue> = {
    startTime: { hours: 0, minutes: 0 },
};

export const getStorageValue = (key: StorageKey): StorageValue => {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : defaultValues[key];
};

export const setStorageValue = (key: StorageKey, value: StorageValue): void => {
    const valAsString = JSON.stringify(value);
    localStorage.setItem(key, valAsString);
};