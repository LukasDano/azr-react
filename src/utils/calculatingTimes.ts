import type { Time } from '../static/importantTypes';
import { getStorageValue } from './storage/localStorageManger';

export const calculateNormalEnd = (start: Time, pause: Time, soll: Time): Time => {
    let endHours = start.hours + pause.hours + soll.hours;
    let endMins = start.minutes + pause.minutes + soll.minutes;

    if (endHours >= 24) endHours = endHours - 24;

    // Wenn Start-Minuten + Pausen-Minuten + Soll-Minuten >= 120 sind
    if (endMins >= 120) {
        endMins = endMins - 120;
        endHours += 2;
    }

    // Wenn Start-Minuten + Pausen-Minuten + Soll-Minuten >= 60 sind
    if (endMins >= 60) {
        endMins = endMins - 60;
        endHours++;
    }

    return { hours: endHours, minutes: endMins };
};

export const calculateCurrentNormalEnd = (start: Time): Time => {
    const breakTime = getStorageValue('breakTime');
    const workTime = getStorageValue('workTime');

    return calculateNormalEnd(start, breakTime, workTime);
};
