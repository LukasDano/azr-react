import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { Time } from '../../src/static/importantTypes';

import {
    calculateWeekOverTime,
    parseWeekOverTimeToString,
    parseWeekWorkTimeToString
} from '../../src/utils/weekTimeCalculatingUtility';

vi.mock('./formatting', () => ({
    formatNumber: vi.fn((n: number) => n.toString().padStart(2, '0'))
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe('calculateWeekOverTime', () => {
    it('should return positive overtime when work exceeds 35h30m', () => {
        const weekWorkTime: Time = [40, 0];
        const result = calculateWeekOverTime(weekWorkTime);
        expect(result).toEqual([4, 30]);
    });

    it('should return negative overtime when work is less than 35h30m', () => {
        const weekWorkTime: Time = [32, 0];
        const result = calculateWeekOverTime(weekWorkTime);
        expect(result).toEqual([-3, 30]);
    });

    it('should handle minutes leading to negative remainder correctly', () => {
        const weekWorkTime: Time = [35, 0];
        const result = calculateWeekOverTime(weekWorkTime);
        expect(result).toEqual([-0, 30]);
    });

    it('should return zero overtime for exactly 35h30m', () => {
        expect(calculateWeekOverTime([35, 30])).toEqual([0, 0]);
    });
});

describe('parseWeekWorkTimeToString', () => {
    it('should format a normal time value correctly', () => {
        const result = parseWeekWorkTimeToString([38, 15]);
        expect(result).toBe('38.15 h');
    });

    it('should format single-digit hours and minutes with leading zeros', () => {
        const result = parseWeekWorkTimeToString([5, 5]);
        expect(result).toBe('5.05 h');
    });

    it('should format zero time as 0.0 h', () => {
        const result = parseWeekWorkTimeToString([0, 0]);
        expect(result).toBe('0.0 h');
    });

    it('should handle mixed single- and double-digit formatting', () => {
        const result = parseWeekWorkTimeToString([9, 45]);
        expect(result).toBe('9.45 h');
    });
});

describe('parseWeekOverTimeToString', () => {
    it('should format positive overtime with + sign', () => {
        const result = parseWeekOverTimeToString([3, 45]);
        expect(result).toBe('+3.45 h');
    });

    it('should format negative overtime with - sign and absolute values', () => {
        const result = parseWeekOverTimeToString([-2, -15]);
        expect(result).toBe('-2.15 h');
    });

    it('should format zero overtime as 0.0 h', () => {
        const result = parseWeekOverTimeToString([0, 0]);
        expect(result).toBe('0.0 h');
    });

    it('should prepend zero for small positive hours and minutes', () => {
        const result = parseWeekOverTimeToString([1, 5]);
        expect(result).toBe('+1.5 h');
    });

    it('should use absolute values for negative minutes', () => {
        const result = parseWeekOverTimeToString([-1, -5]);
        expect(result).toBe('-1.5 h');
    });
});
