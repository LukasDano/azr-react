import type { Time, TimeBalance } from "../importantTypes.ts";

import { emptyTimeValue } from "../defaultValues.ts";
import { formatNumber } from "../formatting";

export const getCurrentTime = (): Time => {
    const date = new Date();
    return [date.getHours(), date.getMinutes()];
};

export const cleanTime = (time: Time): Time => {
    let [hours, mins] = time;

    while (mins >= 60) {
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
    const [newH, newMin] = timeAsString.split(":");
    return [Number.parseInt(newH, 10), Number.parseInt(newMin, 10)];
};

export const isValidTime = (time: Time): boolean => {
    const [hours, minutes] = time;

    return !Number.isNaN(hours) && !Number.isNaN(minutes) && hours >= 0 && hours < 24 && minutes >= 0 && minutes < 60;
};

export const isDefaultTimeValue = (time: Time): boolean => {
    return isSameTime(time, emptyTimeValue);
};

export const getLaterTime = (timeOne: Time, timeTwo: Time): Time => {
    for (let i = 0; i < Math.min(timeOne.length, timeTwo.length); i++) {
        if (timeOne[i] < timeTwo[i]) return timeTwo;
        if (timeOne[i] > timeTwo[i]) return timeOne;
    }

    return timeOne.length >= timeTwo.length ? timeOne : timeTwo;
};

export const isSameTime = (timeA: Time, timeB: Time): boolean => {
    const [hoursA, minutesA] = timeA;
    const [hoursB, minutesB] = timeB;

    return hoursA === hoursB && minutesA === minutesB;
};

export const getTimeBalanceFor = (time: Time): TimeBalance => {
    const [hours, mins] = time;

    const totalMinutes = hours * 60 + mins;

    if (totalMinutes > 0) return "positiv";
    else if (totalMinutes < 0) return "negativ";
    else return "neutral";
};

/**
 * Konvertiert Minuten in Stunden und Minuten
 *
 * @param minutes Die Minuten, die konvertiert werden sollen
 * @returns Die Minuten im Time Format
 */
export const minutesToTime = (minutes: number): Time => {
    let hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    if (remainingMinutes < 0) hours++;

    return [hours, remainingMinutes];
};

/**
 * Prüft, ob ein Time Value unter 0 ist.
 * Wenn der Wert nicht unter 0 ist, wird die Zeit einfach wieder zurückgegeben.
 * Wenn der Wert unter 0 ist, wird der Wert für 0 Stunden und 0 Minuten zurückgegeben.
 *
 * @param time Die Zeit, die geprüft werden soll
 * @returns "time" oder 0 Stunden und 0 Minuten
 */
export const checkIfTimeIsBelowZero = (time: Time): Time => {
    const [hours, mins] = time;

    if (hours < 0 || mins < 0) return [0, 0];
    return time;
};

export const newTime = ({ hours = 0, minutes = 0 }: { hours?: number; minutes?: number }): Time => [hours, minutes];

export const isSmallerTime = (timeA: Time, timeB: Time): boolean => {
    const [hoursA, minutesA] = timeA;
    const [hoursB, minutesB] = timeB;

    return hoursA === hoursB && minutesA === minutesB;
};
