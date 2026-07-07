import type { FeiertageHamburg } from "../static/importantTypes.ts";

import { isWorkDay } from "./flexOfficeUtility.ts";

/**
 * Berechnet die Anzahl der Arbeitstage für den aktuellen Monat
 *
 * @deprecated Vlt. kann doch die andere Funktion mit der API genutzt werden?!
 *
 * @param month Monat für den gerechnet werden soll
 * @param year Jahr für das gerechnet werden soll
 * @returns Die Anzahl der Arbeitstage für den aktuellen Monat
 */
export const getWorkDaysInMonthOffline = (month: number, year: number): number => {
    const lastDay = new Date(year, month, 0).getDate();

    const holidays = getHamburgHolidays(year);
    const holidayDates = new Set(Object.values(holidays));

    let workDays = 0;

    for (let day = 1; day <= lastDay; day++) {
        if (isWorkDay(day, month, year, holidayDates as any)) workDays++;
    }
    return workDays;
};

/**
 * Berechnet das Osterdatum zu einem gegebenen Jahr
 *
 * @param year Das Jahr in dem man die Feiertage wissen will
 * @returns Ein Objekt mit den Feiertagen
 */
export const getHamburgHolidays = (year: number): FeiertageHamburg => {
    const easterDate = getEasterDate(year);

    return {
        Neujahr: new Date(Date.UTC(year, 0, 1)),
        Karfreitag: new Date(easterDate.getTime() - 2 * 24 * 60 * 60 * 1000),
        Ostermontag: new Date(easterDate.getTime() + 24 * 60 * 60 * 1000),
        TagDerArbeit: new Date(Date.UTC(year, 4, 1)),
        ChristiHimmelfahrt: new Date(easterDate.getTime() + 39 * 24 * 60 * 60 * 1000),
        Pfingstmontag: new Date(easterDate.getTime() + 50 * 24 * 60 * 60 * 1000),
        TagDerDeutschenEinheit: new Date(Date.UTC(year, 9, 3)),
        Reformationstag: new Date(Date.UTC(year, 9, 31)),
        Heiligabend: new Date(Date.UTC(year, 11, 24)),
        ErsterWeihnachtsfeiertag: new Date(Date.UTC(year, 11, 25)),
        ZweiterWeihnachtsfeiertag: new Date(Date.UTC(year, 11, 26)),
        Silvester: new Date(Date.UTC(year, 11, 31))
    };
};

/**
 * Berechnet das Osterdatum zu einem gegebenen Jahr
 *
 * @param year Das Jahr zu in dem man das Osterdatum wissen will
 * @returns Das Osterdatum
 */
const getEasterDate = (year: number): Date => {
    const a = year % 19;
    const b = Math.floor(year / 100);
    const c = year % 100;
    const d = Math.floor(b / 4);
    const e = b % 4;
    const f = Math.floor((b + 8) / 25);
    const g = Math.floor((b - f + 1) / 3);
    const h = (19 * a + b - d - g + 15) % 30;
    const i = Math.floor(c / 4);
    const k = c % 4;
    const l = (32 + 2 * e + 2 * i - h - k) % 7;
    const m = Math.floor((a + 11 * h + 22 * l) / 451);
    const month = Math.floor((h + l - 7 * m + 114) / 31);
    const day = ((h + l - 7 * m + 114) % 31) + 1;
    return new Date(Date.UTC(year, month - 1, day));
};
