import { formatNumber } from "./formatting";

export const getMonthName = (date: Date, lang: string = "de-DE"): string =>
    date.toLocaleString(lang, { month: "long" });

/**
 * @param date Das zu konvertierende Datum
 * @return Das Datum als validen String
 */
export const getValidDateString = (date: Date): string => {
    const correctedMonth = formatNumber(date.getMonth() + 1);
    const correctedDate = formatNumber(date.getDate());
    return `${date.getFullYear()}-${correctedMonth}-${correctedDate}`;
};
