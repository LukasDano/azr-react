import type { Time } from '../../static/importantTypes';
import { roundNumber } from '../formatting';

export const getCurrentTime = (): Time => {
    const date = new Date();

    return {
        hours: date.getHours(),
        minutes: date.getMinutes(),
    };
};

export const addTimes = (a: Time, b: Time): Time => {
    const minutes = a.minutes + b.minutes;
    const hours = a.hours + b.hours + minutes / 60;

    return { hours: roundNumber(hours), minutes: roundNumber(minutes % 60) };
};

export const cleanTime = (time: Time): Time => {
    const val = { ...time };

    while (val.minutes > 60) {
        val.hours++;
        val.minutes = val.minutes - 60;
    }

    return val;
};

export const parseTimeToDate = (time: Time): Date => {
    const date = new Date();

    date.setHours(time.hours);
    date.setMinutes(time.minutes);

    return date;
};

export const parseTimeToString = (time: Time): string => {
    const h = String(time.hours).padStart(2, '0');
    const m = String(time.minutes).padStart(2, '0');
    return `${h}:${m}`;
};

export const parseStringToTime = (timeAsString: string): Time => {
    const [newH, newMin] = timeAsString.split(':');

    return {
        hours: Number.parseInt(newH, 10),
        minutes: Number.parseInt(newMin, 10),
    };
};

export const isValidTime = (time: Time): boolean => {
    const { hours, minutes } = time;

    return (
        typeof hours === "number" &&
        typeof minutes === "number" &&
        !isNaN(hours) &&
        !isNaN(minutes) &&
        hours >= 0 &&
        hours < 24 &&
        minutes >= 0 &&
        minutes < 60
    );
};
