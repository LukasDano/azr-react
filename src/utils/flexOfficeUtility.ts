import type { Time } from "./importantTypes.ts";

import { getMonthName, getValidDateString } from "./dateUtility";
import { emptyTimeValue } from "./defaultValues.ts";
import { getCookie, setCookieForOneYear } from "./storage/cookieManager.ts";
import { minutesToTime } from "./typeUtilities/time";

/**
 * Prüft, ob ein übergebenes Datum ein Arbeitstag ist
 *
 * @param day Das Tages Datum
 * @param month Der Monat
 * @param year Das Jahr
 * @param holidayDates Feiertage des jeweiligen Monats
 */
export const isWorkDay = (day: number, month: number, year: number, holidayDates: Set<string>): boolean => {
    const correctJSDateMonth = month - 1;
    const date = new Date(year, correctJSDateMonth, day);
    const dayOfWeek = date.getDay();
    const dateString = getValidDateString(date);
    const dayIsNotOnWeekend = dayOfWeek !== 0 && dayOfWeek !== 6;

    return dayIsNotOnWeekend && !holidayDates.has(dateString);
};

/**
 * Gibt zusätzliche gewünschte Feiertage zurück
 *
 * @param year Das Jahr in dem die Feiertage stattfinden
 * @return Ein Objekt mit allen hinterlegten Feiertagen
 */
const getAdditionalHolidays = (year: number): Record<string, Date> => {
    return {
        Heiligabend: new Date(Date.UTC(year, 11, 24)),
        Silvester: new Date(Date.UTC(year, 11, 31))
    };
};

/**
 * Liefert die Anzahl der Arbeitstage des laufenden Monats
 *
 * @param month Monat für den gerechnet werden soll
 * @param year Jahr für das gerechnet werden soll
 * @returns Arbeitstage des aktuellen Monats
 */
export const getWorkDaysInMonthFromAPI = async (month: number, year: number): Promise<number> => {
    const lastDay = new Date(year, month, 0).getDate();
    const additionalHolidays = getAdditionalHolidays(year);
    let workDays = 0;

    const baseUrl = "https://openholidaysapi.org/PublicHolidays";
    const paramUrl = "?countryIsoCode=DE&subdivisionCode=DE-HH";
    const fullUrl = `${baseUrl}${paramUrl}&validFrom=${year}-${month}-01&validTo=${year}-${month}-${lastDay}`;

    const response = await fetch(fullUrl);
    const publicHolidays = await response.json();

    const holidayDates = new Set(publicHolidays.map((h: any) => h.startDate.split("T")[0]));

    for (const holidayName in additionalHolidays) {
        const holidayDate = additionalHolidays[holidayName];
        const holidayDateString = holidayDate.toISOString().split("T")[0];
        holidayDates.add(holidayDateString);
    }

    for (let day = 1; day <= lastDay; day++) if (isWorkDay(day, month, year, holidayDates as Set<string>)) workDays++;

    return workDays;
};

/**
 * Rechnet in Prozent den Anteil vom "flexTime" an "workTimeMonth"
 *
 * @param flexTime Die Arbeitszeit, die diesen Monat im Flex office erbracht wurde
 * @param workTimeMonth Die gesamte Arbeitszeit, die diesen Monat erbracht werden muss
 * @returns Den prozentualen Anteil der Zeit im Flex office
 */
const calculatePercentage = (flexTime: Time, workTimeMonth: Time): number => {
    const flexTimeMinutes = flexTime[0] * 60 + flexTime[1];
    const workTimeMonthMinutes = workTimeMonth[0] * 60 + workTimeMonth[1];

    return (flexTimeMinutes / workTimeMonthMinutes) * 100;
};

/**
 * Berechnet die Arbeitszeit, die diesen Monat noch erbracht werden kann,
 * bis die maximalen Prozent erreicht werden
 *
 * @param currentPercentage Die bereits erbrachten Prozent
 * @param targetPercentage Die maximalen Prozent
 * @param workTimeMonth Die zu erbringende Arbeitszeit im Monat
 * @returns Die Zeit, die noch aus dem Flex office erbracht werden kann
 */
const timeLeftToReachPercentage = (currentPercentage: number, targetPercentage: number, workTimeMonth: Time): Time => {
    const workTimeMonthMinutes = workTimeMonth[0] * 60 + workTimeMonth[1];
    const currentMinutes = (workTimeMonthMinutes * currentPercentage) / 100;
    const targetMinutes = (workTimeMonthMinutes * targetPercentage) / 100;

    const remainingMinutes = Math.max(0, targetMinutes - currentMinutes);
    const remainingHours = Math.floor(remainingMinutes / 60);
    const remainingMinutesLeft = Math.round(remainingMinutes % 60);

    return [remainingHours, remainingMinutesLeft];
};

/**
 *  Gibt die Arbeitszeit, die diesen Monat erbracht werden muss, zurück
 *
 * @param daysOff Tage die diesen Monat nicht gearbeitet wurde
 * @param month Monat für den gerechnet werden soll
 * @param year Jahr für das gerechnet werden soll
 * @returns Arbeitszeit des aktuellen Monats
 */
export const getWorkTimePerMonth = async (daysOff: number, month: number, year: number): Promise<Time> => {
    const [workHoursTimePerDay, workMinsTimePerDay] = [7, 6];
    const workDaysInCurrentMonth = await getWorkDaysInMonthFromAPI(month, year);

    const countingDaysForCurrentMonth = workDaysInCurrentMonth - daysOff;
    let workHours = workHoursTimePerDay * countingDaysForCurrentMonth;
    const workMins = workMinsTimePerDay * countingDaysForCurrentMonth;

    const [hoursFromMinutes, remainingMinutes] = minutesToTime(workMins);
    workHours = workHours + hoursFromMinutes;

    return [workHours, remainingMinutes];
};

/**
 * Die Arbeitszeit, die diesen Monat noch im Flex office erbracht werden darf
 *
 * @param daysOff Tage die diesen Monat nicht gearbeitet wurde
 * @param flexTime Zeit die diesen Monat schon im Flex office gearbeitet wurde
 * @param flexOfficeQuote Die maximale Quote, die im Flex office gearbeitet werden darf
 * @param month Monat für den gerechnet werden soll
 * @param year Jahr für das gerechnet werden soll
 * @returns Die restliche Flex office Arbeitszeit diesen Monat
 */
export const calculateFlexOfficeStats = async (
    daysOff: number,
    flexTime: Time,
    flexOfficeQuote: number,
    month: number,
    year: number
): Promise<Time> => {
    const workTimeMonth = await getWorkTimePerMonth(daysOff, month, year);
    const percent = calculatePercentage(flexTime, workTimeMonth);
    return timeLeftToReachPercentage(percent, flexOfficeQuote, workTimeMonth);
};

/**
 * Wenn der Monat dieser oder einer der nächsten 5 ist, wird das Jahr für das nächste Mal gesucht,
 * ist der Monat in den letzten 6 enthalten ist, wird das Jahr vom letzten Mal ausgegeben.
 *
 * @param monthNum Der Monat zu dem das Jahr gesucht ist
 * @return Das Jahr
 */
export const findYearForMonthWithSixMonthRange = (monthNum: number): number => {
    const currentMonth = new Date().getMonth();

    const nextSixMonths = [];
    const lastSixMonths = [];

    for (let i = 0; i <= 5; i++) {
        if (currentMonth + i > 11) nextSixMonths.push(currentMonth + i - 12);

        nextSixMonths.push(currentMonth + i);
    }

    for (let i = 6; i > -1; i--) {
        let lastMonth = currentMonth - i;

        if (lastMonth < 1) lastMonth += 12;
        lastSixMonths.push(lastMonth);
    }

    if (nextSixMonths.includes(monthNum)) return getYearForNextTimeMonth(monthNum);
    else if (lastSixMonths.includes(monthNum)) return getYearForLastTimeMonth(monthNum);
    else return 0;
};

/**
 * Welches Jahr hatten wir als es das letzte Mal dieser Monat war
 * @param  month Der fragliche Monat
 * @return  Das gesuchte Jahr
 */
const getYearForLastTimeMonth = (month: number): number => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    if (currentMonth < month) return currentYear - 1;
    return currentYear;
};

/**
 * Welches Jahr haben wir es das nächste Mal dieser Monat ist
 * @param  month Der fragliche Monat
 * @return  Das Jahr
 */
const getYearForNextTimeMonth = (month: number): number => {
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    if (currentMonth > month) return currentYear + 1;
    return currentYear;
};

export const months = Array.from({ length: 12 }, (_, i) => i + 1).map((m) => {
    const monthName = getMonthName(new Date(0, m, 0));
    return `${monthName} (${findYearForMonthWithSixMonthRange(m)})`;
});

export const currentMonthName = months.find((m) => m.includes(getMonthName(new Date()))) ?? "";

export const getMonthNumberFromMonthString = (monthName: string): number | null => {
    const date = new Date(0, 0, 1);
    for (let i = 0; i < 12; i++) {
        date.setMonth(i);
        if (monthName.toLowerCase().includes(getMonthName(date).toLowerCase())) return i + 1;
    }

    return null;
};

export const calculateMaxDaysForMonthByString = (monthStr: string): number => {
    const monthNum = getMonthNumberFromMonthString(monthStr) as number;
    const year = findYearForMonthWithSixMonthRange(monthNum);

    return new Date(year, monthNum, 0).getDate();
};

export const getValueForKeyFromCookie = (key: FlexOfficeCookieKeys, monthStr: string = currentMonthName): number => {
    const cookieForMonth = getMonthValueOfFlexOfficeCookie(monthStr);
    return cookieForMonth[key];
};

type FlexOfficeCookieKeys = "offDays" | "flexHours" | "flexMins";

export const setFlexOfficeCookie = (month: string, offDays: number, flexTime: Time): void => {
    const flexOfficeCookieList = getCookie("azr_flexOffice") as Record<string, number>[];

    const updatedCookieValue: Record<FlexOfficeCookieKeys, number> = {
        offDays: offDays,
        flexHours: flexTime[0],
        flexMins: flexTime[1]
    };

    const monthNum = getMonthNumberFromMonthString(month) as number;
    flexOfficeCookieList[monthNum] = updatedCookieValue;

    setCookieForOneYear("azr_flexOffice", flexOfficeCookieList);
};

export const getMonthValueOfFlexOfficeCookie = (month: string): Record<FlexOfficeCookieKeys, number> => {
    const flexOfficeCookieList = getCookie("azr_flexOffice") as Record<string, number>[];
    const monthNum = getMonthNumberFromMonthString(month) as number;

    if (flexOfficeCookieList.length <= monthNum)
        return {
            offDays: 0,
            flexHours: 0,
            flexMins: 0
        };

    return flexOfficeCookieList[monthNum];
};

export type FlexOfficeResultContainer = {
    calculatedMonth: number;
    monthWorkDays: number;
    workedDays: number;
    restFlexOfficeTime: Time;
};

export const emtpyFlexOfficeResultContainer: FlexOfficeResultContainer = {
    calculatedMonth: 0,
    monthWorkDays: 0,
    workedDays: 0,
    restFlexOfficeTime: emptyTimeValue
};
