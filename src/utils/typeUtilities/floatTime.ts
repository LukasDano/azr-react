import type { FloatTime } from '../../static/importantTypes';
import { parseStringToRoundedNumber } from '../formatting';

export const parseFloatTimeToString = (float: FloatTime): string => {
    const sign = float.positive ? '+' : '-';
    const h = float.time.hours.toString();
    const m = String(float.time.minutes).padStart(2, '0');

    return `${sign}${h}.${m}`;
};

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
