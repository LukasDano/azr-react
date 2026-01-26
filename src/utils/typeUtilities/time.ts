import { emptyTimeValue } from '../../static/defaultValues.ts';
import type { Time } from '../../static/importantTypes';
import { formatNumber } from '../formatting';

export const getCurrentTime = (): Time => {
    const date = new Date();
    return [date.getHours(), date.getMinutes()];
};

export const cleanTime = (time: Time): Time => {
    let [hours, mins] = time;

    while (mins > 60) {
        hours++;
        mins = mins - 60;
    }

    return [hours, mins];
};

export const parseTimeToDate = (time: Time): Date => {
    const date = new Date();

    date.setHours(time[0]);
    date.setMinutes(time[1]);

    return date;
};

export const parseTimeToString = (time: Time): string => {
    return `${formatNumber(time[0])}:${formatNumber(time[1])}`;
};

export const parseStringToTime = (timeAsString: string): Time => {
    const [newH, newMin] = timeAsString.split(':');
    return [Number.parseInt(newH, 10), Number.parseInt(newMin, 10)];
};

export const isValidTime = (time: Time): boolean => {
    const [hours, minutes] = time;

    return !Number.isNaN(hours) && !Number.isNaN(minutes) && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
};

export const isDefaultTimeValue = (time: Time): boolean => {
    const [defaultHours, defaultMinutes] = emptyTimeValue;
    const [compareHours, compareMinutes] = time;

    return defaultHours === compareHours && defaultMinutes === compareMinutes;
};
