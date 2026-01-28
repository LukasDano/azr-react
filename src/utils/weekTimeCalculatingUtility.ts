import { defaultWeekWorkTime } from '../static/defaultValues';
import type { Time } from '../static/importantTypes';

/**
 * Rechnet die Gleitzeit für diese Woche aus
 *
 * @param weekWorkTime Gesamt Arbeitszeit einer Woche
 * @returns Die Überstunden der gesamten Woche in Stunden und Minuten
 */
export const calculateWeekOverTime = (weekWorkTime: Time): Time => {
    const [sollHours, sollMins] = defaultWeekWorkTime;
    const [workHours, workMins] = weekWorkTime;

    const totalWorkMinutes = workHours * 60 + workMins;
    const totalSollMinutes = sollHours * 60 + sollMins;

    const diff = totalWorkMinutes - totalSollMinutes;

    const sign = diff < 0 ? -1 : 1;
    const absDiff = Math.abs(diff);

    const hours = Math.trunc(absDiff / 60) * sign;
    const mins = absDiff % 60;

    return [hours, mins];
};

/**
 * Formatiert die Arbeitszeit der Woche
 *
 * @param weekTime Die Arbeitszeit der Woche
 * @return Arbeitszeit als lesbarer `string`
 */
export const parseWeekWorkTimeToString = (weekTime: Time): string => {
    let [weekHours, weekMins] = weekTime;
    let weekTimeAusgabe;

    let weekHoursStr: string;
    let weekMinsStr: string;

    if (weekHours && weekMins) {
        weekHours = Math.abs(weekHours);
        weekMins = Math.abs(weekMins);

        if (weekMins < 10 && weekMins >= 0) {
            weekHoursStr = weekHours.toString();
            weekMinsStr = '0' + weekMins;
        } else {
            weekHoursStr = weekHours.toString();
            weekMinsStr = weekMins.toString();
        }

        weekTimeAusgabe = weekHoursStr + '.' + weekMinsStr + ' h';
    } else weekTimeAusgabe = '0.0 h';

    return weekTimeAusgabe;
};

/**
 * Formatiert die Arbeits- bzw. die Gleitzeit der Woche
 *
 * @param weekOverTime Die Gleitzeit der Woche
 * @return Gleitzeit als lesbarer String
 */
export const parseWeekOverTimeToString = (weekOverTime: Time): string => {
    const [weekOverTimeHours, weekOverTimeMins] = weekOverTime;
    let weekOverTimeAusgabe;

    let weekOverTimeHoursStr: string;
    let weekOverTimeMinsStr: string;

    if (weekOverTimeHours <= 9 && weekOverTimeHours > 0) {
        weekOverTimeHoursStr = '0' + weekOverTimeHours;
    }

    if (weekOverTimeMins <= 9 && weekOverTimeHours > 0) {
        weekOverTimeMinsStr = '0' + weekOverTimeMins;
    }

    if (weekOverTimeHours < 0 || weekOverTimeMins < 0) {
        weekOverTimeHoursStr = Math.abs(weekOverTimeHours).toString();
        weekOverTimeMinsStr = Math.abs(weekOverTimeMins).toString();

        weekOverTimeAusgabe = '-' + weekOverTimeHoursStr + '.' + weekOverTimeMinsStr + ' h';
    } else if (weekOverTimeHours > 0 || weekOverTimeMins > 0)
        weekOverTimeAusgabe = '+' + weekOverTimeHours + '.' + weekOverTimeMins + ' h';
    else weekOverTimeAusgabe = '0.0 h';

    return weekOverTimeAusgabe;
};
