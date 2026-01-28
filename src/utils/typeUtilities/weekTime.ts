import type { Time, WeekTime } from '../../static/importantTypes';

/**
 * Erstellt aus der `WeekTime` die `Time`, welche in der Woche gearbeitet wurde.
 *
 * @param weekTime Die Arbeitszeiten jedes Wochentages
 * @returns Die komplette Arbeitszeit in Stunden und Minuten
 */
export const parseWeekTimeToTime = (weekTime: WeekTime): Time => {
    let totalHours = 0;
    let totalMins = 0;

    Object.entries(weekTime).forEach(([_, time]) => {
        totalHours += time[0];
        totalMins += time[1];
    });

    totalHours += Math.floor(totalMins / 60);
    totalMins = totalMins % 60;

    return [totalHours, totalMins];
};
