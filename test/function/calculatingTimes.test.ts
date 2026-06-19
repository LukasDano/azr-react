import type { FloatTime, Time } from '../../src/static/importantTypes.ts';

import { defaultBreakTime, defaultWorkTime } from '../../src/static/defaultValues.ts';
import {
    calculateDecreasedValue,
    calculateEndForFloat,
    calculateGleitzeit,
    calculateIncreasedValue,
    calculateIstSollTimeDiff,
    calculateIstTime,
    calculateNormalEnd,
    calculateOptimizedEnd,
    calculateStartEndeTimeDiff,
    calculateTimeToAddForEndWithNegativeFloat,
    calculateTimeToAddForEndWithPositiveFloat,
    calculateWorkTime,
    createGleitzeitAusgabeFromFloat,
    roundEnd,
    roundStart,
    roundTimeForFloat
} from '../../src/utils/calculatingTimes.ts';
import * as storage from '../../src/utils/storage/localStorageManger.ts';
import { isValidTime } from '../../src/utils/typeUtilities/time.ts';

describe('calculateStartEndeTimeDiff', () => {
    it('should return the correct difference when end time is after start time', () => {
        const startTime: Time = [10, 30];
        const endTime: Time = [12, 45];
        const result = calculateStartEndeTimeDiff(startTime, endTime);
        expect(result).toEqual([2, 15]);
    });

    it('should handle negative minute difference correctly', () => {
        const startTime: Time = [10, 45];
        const endTime: Time = [12, 30];
        const result = calculateStartEndeTimeDiff(startTime, endTime);
        expect(result).toEqual([1, 45]);
    });

    it('should handle same start and end time', () => {
        const startTime: Time = [10, 30];
        const endTime: Time = [10, 30];
        const result = calculateStartEndeTimeDiff(startTime, endTime);
        expect(result).toEqual([0, 0]);
    });

    it('should handle hours difference only', () => {
        const startTime: Time = [8, 0];
        const endTime: Time = [15, 0];
        const result = calculateStartEndeTimeDiff(startTime, endTime);
        expect(result).toEqual([7, 0]);
    });
});

describe('calculateIstSollTimeDiff', () => {
    it('correct difference less then an hour negativ', () => {
        const workTime: Time = [6, 30];
        const sollTime: Time = [7, 6];
        const result = calculateIstSollTimeDiff(workTime, sollTime);
        expect(result).toEqual([0, 36, false]);
    });

    it('correct difference less then an hour positiv', () => {
        const workTime: Time = [8, 0];
        const sollTime: Time = [7, 6];
        const result = calculateIstSollTimeDiff(workTime, sollTime);
        expect(result).toEqual([0, 54, true]);
    });

    it('correct difference more then an hour negativ', () => {
        const workTime: Time = [5, 30];
        const sollTime: Time = [7, 6];
        const result = calculateIstSollTimeDiff(workTime, sollTime);
        expect(result).toEqual([-1, 36, false]);
    });

    it('correct difference more then an hour positiv', () => {
        const workTime: Time = [8, 50];
        const sollTime: Time = [7, 6];
        const result = calculateIstSollTimeDiff(workTime, sollTime);
        expect(result).toEqual([1, 44, true]);
    });
});

describe('calculateWorkTime', () => {
    it('correct default with default values', () => {
        const diffTime: Time = [7, 36];
        const pauseTime: Time = [0, 30];
        const result = calculateWorkTime(diffTime, pauseTime);
        expect(result).toEqual([7, 6]);
    });
});

describe('calculateNormalEnd', () => {
    it('return the correct with default values', () => {
        const startTime: Time = [7, 7];
        const pauseTime: Time = [0, 30];
        const sollTime: Time = [7, 6];
        const result = calculateNormalEnd(startTime, pauseTime, sollTime);
        expect(result).toEqual([14, 43]);
    });
});

describe('calculateIstTime', () => {
    it('return the correct with default values', () => {
        const startTime: Time = [7, 7];
        const endTime: Time = [14, 43];
        const pauseTime: Time = [0, 30];
        const result = calculateIstTime(startTime, endTime, pauseTime);
        expect(result).toEqual([7, 10]);
    });
});

describe('calculateGleitzeit', () => {
    vi.spyOn(storage, 'getStorageValue').mockImplementation((key: any) => {
        if (key === 'workTime') return defaultWorkTime;
        else if (key === 'breakTime') return defaultBreakTime;
        else return [0, 0];
    });

    it('return correct with default values', () => {
        const istTime: Time = [7, 10];
        const result = calculateGleitzeit(istTime);
        expect(result).toEqual([0, 4]);
    });

    it('return correct with negativ values', () => {
        const istTime: Time = [7, 5];
        const result = calculateGleitzeit(istTime);
        expect(result).toEqual([0, -1]);
    });
});

describe('roundStart', () => {
    it('return correct value with more than 5', () => {
        const startTime: Time = [7, 7];
        const result = roundStart(startTime);
        expect(result).toEqual([7, 5]);
    });

    it('return correct with less than 5', () => {
        const startTime: Time = [7, 13];
        const result = roundStart(startTime);
        expect(result).toEqual([7, 10]);
    });

    it('return correct with 0', () => {
        const startTime: Time = [7, 10];
        const result = roundStart(startTime);
        expect(result).toEqual([7, 10]);
    });

    it('return correct with 5', () => {
        const startTime: Time = [7, 25];
        const result = roundStart(startTime);
        expect(result).toEqual([7, 25]);
    });
});

describe('roundEnd', () => {
    it('return correct value with more than 5', () => {
        const startTime: Time = [15, 18];
        const result = roundEnd(startTime);
        expect(result).toEqual([15, 20]);
    });

    it('return correct with less than 5', () => {
        const startTime: Time = [15, 22];
        const result = roundEnd(startTime);
        expect(result).toEqual([15, 25]);
    });

    it('return correct with 0', () => {
        const startTime: Time = [15, 20];
        const result = roundEnd(startTime);
        expect(result).toEqual([15, 20]);
    });

    it('return correct with 5', () => {
        const startTime: Time = [15, 25];
        const result = roundEnd(startTime);
        expect(result).toEqual([15, 25]);
    });
});

describe('calculateEndForFloat', () => {
    it('return correct with default values', () => {
        const normalEnd: Time = [15, 28];
        const float: FloatTime = [1, 0, 4];
        const result = calculateEndForFloat(normalEnd, float);
        expect(result).toEqual([15, 28]);
    });

    it('return correct with positive float', () => {
        const normalEnd: Time = [15, 28];
        const float: FloatTime = [1, 0, 14];
        const result = calculateEndForFloat(normalEnd, float);
        expect(result).toEqual([15, 38]);
    });

    it('return correct with negative float', () => {
        const normalEnd: Time = [15, 28];
        const float: FloatTime = [-1, 0, -1];
        const result = calculateEndForFloat(normalEnd, float);
        expect(result).toEqual([15, 23]);
    });
});

describe('calculateTimeToAddForEndWithPositiveFloat', () => {
    it('return correct with default values', () => {
        const float: FloatTime = [1, 0, 4];
        const result = calculateTimeToAddForEndWithPositiveFloat(float);
        expect(result).toEqual([0, 0]);
    });

    it('return correct with positive float', () => {
        const float: FloatTime = [1, 0, 14];
        const result = calculateTimeToAddForEndWithPositiveFloat(float);
        expect(result).toEqual([0, 10]);
    });
});

describe('calculateTimeToAddForEndWithNegativeFloat', () => {
    it('return correct with less than 10', () => {
        const float: FloatTime = [-1, 0, 1];
        const result = calculateTimeToAddForEndWithNegativeFloat(float);
        expect(result).toEqual([0, 5]);
    });

    it('return correct with more than 10', () => {
        const float: FloatTime = [-1, 0, 11];
        const result = calculateTimeToAddForEndWithNegativeFloat(float);
        expect(result).toEqual([0, 15]);
    });
});

describe('calculateOptimizedEnd', () => {
    it('correct when less then 5 mins', () => {
        const endTime: Time = [15, 34];
        const result = calculateOptimizedEnd(endTime);
        expect(result).toEqual([15, 31]);
    });

    it('correct when more then 5 mins', () => {
        const endTime: Time = [15, 38];
        const result = calculateOptimizedEnd(endTime);
        expect(result).toEqual([15, 36]);
    });
});

describe('roundTimeForFloat', () => {
    it('correct with positiv values', () => {
        const normalEnd: Time = [15, 34];
        const floatTime: FloatTime = [1, 0, 34];
        const result = roundTimeForFloat(normalEnd, floatTime);
        expect(result).toEqual([16, 4]);
    });

    it('correct with negativ values', () => {
        const normalEnd: Time = [15, 34];
        const floatTime: FloatTime = [-1, 0, 16];
        const result = roundTimeForFloat(normalEnd, floatTime);
        expect(result).toEqual([15, 14]);
    });
});

describe('calculateIncreasedValue', () => {
    it('correct with small positiv values', () => {
        const floatTime: FloatTime = [1, 0, 4];
        const result = calculateIncreasedValue(floatTime);
        expect(result).toEqual([0, 9]);
    });

    it('correct with bigger positiv values', () => {
        const floatTime: FloatTime = [1, 0, 39];
        const result = calculateIncreasedValue(floatTime);
        expect(result).toEqual([0, 44]);
    });

    it('correct with small negativ values', () => {
        const floatTime: FloatTime = [-1, 0, 6];
        const result = calculateIncreasedValue(floatTime);
        expect(result).toEqual([0, -1]);
    });

    it('correct with bigger negativ values', () => {
        const floatTime: FloatTime = [-1, 1, 26];
        const result = calculateIncreasedValue(floatTime);
        expect(result).toEqual([-1, -21]);
    });

    it('correct transition from neagtiv to positiv', () => {
        const floatTime: FloatTime = [-1, 0, 1];
        const result = calculateIncreasedValue(floatTime);
        expect(result).toEqual([0, 4]);
    });
});

describe('calculateDecreasedValue', () => {
    it('correct with small positiv values', () => {
        const floatTime: FloatTime = [1, 0, 9];
        const result = calculateDecreasedValue(floatTime);
        expect(result).toEqual([0, 4]);
    });

    it('correct with bigger positiv values', () => {
        const floatTime: FloatTime = [1, 0, 44];
        const result = calculateDecreasedValue(floatTime);
        expect(result).toEqual([0, 39]);
    });

    it('correct with small negativ values', () => {
        const floatTime: FloatTime = [-1, 0, 1];
        const result = calculateDecreasedValue(floatTime);
        expect(result).toEqual([0, -6]);
    });

    it('correct with bigger negativ values', () => {
        const floatTime: FloatTime = [-1, 1, 21];
        const result = calculateDecreasedValue(floatTime);
        expect(result).toEqual([-1, -26]);
    });

    it('correct transition from positiv to negativ', () => {
        const floatTime: FloatTime = [-1, 0, 4];
        const result = calculateDecreasedValue(floatTime);
        expect(result).toEqual([0, -1]);
    });
});

describe('createGleitzeitAusgabeFromFloat', () => {
    it('correct with default values', () => {
        const float: Time = [0, 4];
        const result = createGleitzeitAusgabeFromFloat(float);
        expect(result).toEqual('+0.04');
    });

    it('correct with higher positiv values', () => {
        const float: Time = [1, 26];
        const result = createGleitzeitAusgabeFromFloat(float);
        expect(result).toEqual('+1.26');
    });

    it('correct with negativ values', () => {
        const float: Time = [-0, -1];
        const result = createGleitzeitAusgabeFromFloat(float);
        expect(result).toEqual('-0.01');
    });

    it('correct with lower negativ values', () => {
        const float: Time = [-1, -6];
        const result = createGleitzeitAusgabeFromFloat(float);
        expect(result).toEqual('-1.06');
    });
});

describe('isValidTime', () => {
    it('correct with two numbers', () => {
        const float: Time = [12, 21];
        const result = isValidTime(float);
        expect(result).toEqual(true);
    });

    it('correct with NaN', () => {
        const time: Time = [12, NaN];
        const result = isValidTime(time);
        expect(result).toEqual(false);
    });
});
