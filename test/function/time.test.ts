import { beforeEach, describe, expect, it, vi } from "vitest";

import { formatNumber } from "../../src/utils/formatting";
import {
    cleanTime,
    getCurrentTime,
    getLaterTime,
    getTimeBalanceFor,
    isDefaultTimeValue,
    isSameTime,
    isValidTime,
    parseStringToTime,
    parseTimeToDate,
    parseTimeToString
} from "../../src/utils/typeUtilities/time";

vi.mock("../../src/utils/formatting", () => ({
    formatNumber: vi.fn((n: number) => n.toString().padStart(2, "0"))
}));

beforeEach(() => {
    vi.clearAllMocks();
});

describe("getCurrentTime", () => {
    it("should return an array with two numbers", () => {
        const result = getCurrentTime();
        expect(result.length).toBe(2);
        expect(typeof result[0]).toBe("number");
        expect(typeof result[1]).toBe("number");
    });

    it("should return current hour and minute", () => {
        const now = new Date();
        const result = getCurrentTime();
        expect(result[0]).toBe(now.getHours());
    });
});

describe("cleanTime", () => {
    it("should normalize minutes above 60", () => {
        const result = cleanTime([2, 130]);
        expect(result).toEqual([4, 10]);
    });

    it("should not change valid times", () => {
        const result = cleanTime([3, 40]);
        expect(result).toEqual([3, 40]);
    });

    it("should handle boundary values properly", () => {
        const result = cleanTime([1, 60]);
        expect(result).toEqual([2, 0]);
    });
});

describe("parseTimeToDate", () => {
    it("should return a Date instance", () => {
        const result = parseTimeToDate([10, 30]);
        // Keep this if the function ever changes!!!
        expect(result instanceof Date).toBe(true);
    });

    it("should set the correct hours and minutes", () => {
        const result = parseTimeToDate([15, 45]);
        expect(result.getHours()).toBe(15);
        expect(result.getMinutes()).toBe(45);
    });
});

describe("parseTimeToString", () => {
    it('should return formatted string "HH:MM"', () => {
        const result = parseTimeToString([7, 5]);
        expect(result).toBe("07:05");
    });

    it("should call formatNumber twice", () => {
        parseTimeToString([9, 45]);
        expect(formatNumber).toHaveBeenCalledTimes(2);
    });
});

describe("parseStringToTime", () => {
    it("should parse valid string to Time array", () => {
        const result = parseStringToTime("13:45");
        expect(result).toEqual([13, 45]);
    });

    it("should handle leading zeros", () => {
        const result = parseStringToTime("08:05");
        expect(result).toEqual([8, 5]);
    });
});

describe("isValidTime", () => {
    it("should validate proper time values", () => {
        expect(isValidTime([10, 30])).toBe(true);
    });

    it("should invalidate hour out of range", () => {
        expect(isValidTime([25, 10])).toBe(false);
    });

    it("should invalidate negative minute", () => {
        expect(isValidTime([10, -5])).toBe(false);
    });
});

describe("isDefaultTimeValue", () => {
    it("should return true for emptyTimeValue", () => {
        expect(isDefaultTimeValue([0, 0])).toBe(true);
    });

    it("should return false for non-default time", () => {
        expect(isDefaultTimeValue([1, 5])).toBe(false);
    });
});

describe("getLaterTime", () => {
    it("should return later hour value", () => {
        const result = getLaterTime([10, 15], [11, 0]);
        expect(result).toEqual([11, 0]);
    });

    it("should return later minute if hours are equal", () => {
        const result = getLaterTime([9, 30], [9, 45]);
        expect(result).toEqual([9, 45]);
    });

    it("should return first if times are same", () => {
        const result = getLaterTime([10, 10], [10, 10]);
        expect(result).toEqual([10, 10]);
    });
});

describe("isSameTime", () => {
    it("should return true for identical times", () => {
        expect(isSameTime([8, 30], [8, 30])).toBe(true);
    });

    it("should return false for different times", () => {
        expect(isSameTime([8, 15], [9, 0])).toBe(false);
    });
});

describe("getTimeBalanceFor", () => {
    it('should return "positiv" for positive time', () => {
        expect(getTimeBalanceFor([2, 30])).toBe("positiv");
    });

    it('should return "negativ" for negative time', () => {
        expect(getTimeBalanceFor([-1, -15])).toBe("negativ");
    });

    it('should return "neutral" for [0, 0]', () => {
        expect(getTimeBalanceFor([0, 0])).toBe("neutral");
    });
});
