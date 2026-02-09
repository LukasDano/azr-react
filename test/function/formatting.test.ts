import { describe, expect, it } from 'vitest';
import { formatNumber, parseStringToRoundedNumber, roundNumber } from '../../src/utils/formatting';

describe('parseStringToRoundedNumber', () => {
    it('should parse and round a numeric string to integer by default', () => {
        const result = parseStringToRoundedNumber('123.9');
        // parseInt -> 123, .toFixed(0) -> "123", parseInt -> 123
        expect(result).toBe(123);
    });

    it('should round to the given number of digits', () => {
        const result = parseStringToRoundedNumber('42', 2);
        expect(result).toBe(42); // since 42 -> 42.00 -> parseInt("42") = 42
    });

    it('should handle strings representing negative numbers', () => {
        const result = parseStringToRoundedNumber('-5.67');
        expect(result).toBe(-5);
    });

    it('should return NaN for invalid numeric strings', () => {
        const result = parseStringToRoundedNumber('abc');
        expect(Number.isNaN(result)).toBe(true);
    });
});

describe('roundNumber', () => {
    it('should round down properly', () => {
        const result = roundNumber(4.4);
        expect(result).toBe(4);
    });

    it('should round up properly', () => {
        const result = roundNumber(4.6);
        expect(result).toBe(5);
    });

    it('should handle negative numbers', () => {
        const result = roundNumber(-2.8);
        expect(result).toBe(-3);
    });

    it('should round to specific digits (but still parseInt)', () => {
        const result = roundNumber(12.567, 2);
        // 12.57 -> parseInt("12") = 12
        expect(result).toBe(12);
    });
});

describe('formatNumber', () => {
    it('should prepend a 0 for single-digit positive numbers', () => {
        expect(formatNumber(5)).toBe('05');
    });

    it('should not prepend a 0 for numbers >= 10', () => {
        expect(formatNumber(10)).toBe('10');
    });

    it('should correctly format zero', () => {
        expect(formatNumber(0)).toBe('00');
    });

    it('should return negative numbers unchanged', () => {
        expect(formatNumber(-3)).toBe('-3');
    });
});
