import type { FloatTime, Time, WeekTime } from './importantTypes.ts';

export const defaultFloatValue: FloatTime = [1, 0, 4];
export const defaultFloatForSixHourMode: FloatTime = [-1, 1, 6];

export const emptyTimeValue: Time = [0, 0];
export const defaultWorkTime: Time = [7, 6];
export const defaultWorkTimeForSixHourMode: Time = [6, 0];
export const defaultBreakTime: Time = [0, 30];
export const defaultWeekWorkTime: Time = [35, 30];

export const defaultWeekTime: WeekTime = {
    mo: emptyTimeValue,
    tu: emptyTimeValue,
    we: emptyTimeValue,
    th: emptyTimeValue,
    fr: emptyTimeValue,
};
