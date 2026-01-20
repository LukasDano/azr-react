import type { FloatTime } from '../../static/importantTypes';
import { formatNumber, parseStringToRoundedNumber } from '../formatting';

export const parseFloatTimeToString = (floatVal: FloatTime): string => {
    const floatTime = { ...floatVal.time };

    const sign = floatVal.positive ? '+' : '-';
    const formatedMins = formatNumber(Math.abs(floatTime.minutes));

    return `${sign}${Math.abs(floatTime.hours)}.${formatedMins}`;
}

export const parseStringToFloatTime = (asString: string): FloatTime => {
    const [sign, timeStr] = asString.substring(0, 1);

    const positive = sign === '+';
    const [newH, newMin] = timeStr.split('.');

    return {
        positive,
        time: {
            hours: parseStringToRoundedNumber(newH),
            minutes: parseStringToRoundedNumber(newMin),
        },
    };
};

export const validateFloatString = (floatStr: string): boolean => {
    const validSymbols = ['+', '-', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    let isValid = true;

    for (const char of floatStr)
        if (!validSymbols.includes(char)) {
            isValid = false;
            // ToDo das resten muss noch eingebaut werden
            // if (["n", "a"].includes(char.toLowerCase())) resetPage();
            break;
        }

    return isValid;
};