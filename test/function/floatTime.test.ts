import { describe, expect, it, vi } from "vitest";

import { formatNumber } from "../../src/utils/formatting";
import {
    isValidFloatTimeValue,
    parseFloatTimeFromRawTimeValues,
    parseFloatTimeToString,
    parseStringToFloatTime,
    validateFloatString
} from "../../src/utils/typeUtilities/floatTime";

vi.mock("../../src/utils/formatting", () => ({
    formatNumber: vi.fn((n: number) => n.toString().padStart(2, "0"))
}));

describe("parseFloatTimeToString", () => {
    it("should correctly convert positive floatTime to string", () => {
        const result = parseFloatTimeToString([1, 2, 15]);
        expect(result).toBe("+2.15");
    });

    it("should correctly convert negative floatTime to string", () => {
        const result = parseFloatTimeToString([-1, 5, 3]);
        expect(result).toBe("-5.03");
    });

    it("should call formatNumber with the correct value", () => {
        parseFloatTimeToString([1, 10, 7]);
        expect(formatNumber).toHaveBeenCalledWith(7);
    });
});

describe("parseStringToFloatTime", () => {
    it("should parse a + formatted string", () => {
        const result = parseStringToFloatTime("+2.30");
        expect(result).toEqual([1, 2, 30]);
    });

    it("should parse a - formatted string", () => {
        const result = parseStringToFloatTime("-4.15");
        expect(result).toEqual([-1, 4, 15]);
    });

    it("should return undefined for invalid format", () => {
        const result = parseStringToFloatTime("+12.30");
        expect(result).toBeUndefined();
    });
});

describe("validateFloatString", () => {
    it("should validate correct string", () => {
        expect(validateFloatString("+2.30")).toBe(true);
    });

    it("should invalidate incorrect string", () => {
        expect(validateFloatString("+2a30")).toBe(false);
    });

    it("should invalidate string with spaces", () => {
        expect(validateFloatString("-2. 0")).toBe(false);
    });
});

describe("parseFloatTimeFromRawTimeValues", () => {
    it("should correctly create FloatTime from positive time", () => {
        const result = parseFloatTimeFromRawTimeValues([3, 15]);
        expect(result).toEqual([1, 3, 15]);
    });

    it("should correctly create FloatTime from negative time", () => {
        const result = parseFloatTimeFromRawTimeValues([-2, -45]);
        expect(result).toEqual([-1, 2, 45]);
    });
});

describe("isValidFloatTimeValue", () => {
    it("should return true for valid + string ending with 4 or 9", () => {
        expect(isValidFloatTimeValue("+2.14")).toBe(true);
        expect(isValidFloatTimeValue("+1.39")).toBe(true);
    });

    it("should return true for valid - string ending with 1 or 6", () => {
        expect(isValidFloatTimeValue("-3.21")).toBe(true);
        expect(isValidFloatTimeValue("-0.46")).toBe(true);
    });

    it("should return false for invalid ending digits", () => {
        expect(isValidFloatTimeValue("+2.13")).toBe(false);
        expect(isValidFloatTimeValue("-1.33")).toBe(false);
    });

    it("should return false for unparsable strings", () => {
        expect(isValidFloatTimeValue("hello")).toBe(false);
    });
});
