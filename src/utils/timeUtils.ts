import type { Time } from './importantTypes';

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

    return { hours: hours, minutes: minutes % 60 };
};

export const convertTimeToDate = (time: Time): Date => {
    const date = new Date();

    date.setHours(time.hours);
    date.setMinutes(time.minutes);

    return date;
};
