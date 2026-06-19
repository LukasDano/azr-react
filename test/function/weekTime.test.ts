import { describe, expect, it } from 'vitest';

import type { WeekTime } from '../../src/static/importantTypes';

import { parseWeekTimeToTime } from '../../src/utils/typeUtilities/weekTime';

describe('parseWeekTimeToTime', () => {
    it('should correctly sum up hours and minutes of all weekdays', () => {
        const weekTime: WeekTime = {
            mo: [8, 30],
            tu: [7, 45],
            we: [6, 0],
            th: [8, 15],
            fr: [5, 30]
        };
        // Total: 8+7+6+8+5 = 34 hours, 30+45+0+15+30 = 120 mins = +2h
        const result = parseWeekTimeToTime(weekTime);
        expect(result).toEqual([36, 0]);
    });

    it('should handle minute overflow correctly', () => {
        const weekTime: WeekTime = {
            mo: [1, 50],
            tu: [0, 30],
            we: [0, 0],
            th: [0, 0],
            fr: [0, 0]
        };
        // 1h + 0h = 1h, 50 + 30 = 80 mins = +1h20m → 2:20
        const result = parseWeekTimeToTime(weekTime);
        expect(result).toEqual([2, 20]);
    });

    it('should handle minutes exactly adding to 60', () => {
        const weekTime: WeekTime = {
            mo: [4, 30],
            tu: [2, 30],
            we: [0, 0],
            th: [0, 0],
            fr: [0, 0]
        };
        // 4 + 2 = 6h, 30 + 30 = 60 mins = +1h0m → 7:00
        const result = parseWeekTimeToTime(weekTime);
        expect(result).toEqual([7, 0]);
    });

    it('should sum zero times to [0, 0]', () => {
        const weekTime: WeekTime = {
            mo: [0, 0],
            tu: [0, 0],
            we: [0, 0],
            th: [0, 0],
            fr: [0, 0]
        };
        const result = parseWeekTimeToTime(weekTime);
        expect(result).toEqual([0, 0]);
    });

    it('should handle negative values', () => {
        const weekTime: WeekTime = {
            mo: [8, 0],
            tu: [-2, -30],
            we: [0, 0],
            th: [0, 0],
            fr: [0, 0]
        };
        // 8 + (-2) = 6h, 0 + (-30) = -30min → -30/60 = -1h remainder 30min -> [5,30]
        const result = parseWeekTimeToTime(weekTime);
        expect(result).toEqual([5, -30]);
    });
});
