import type { FloatTime, FloatTimeSign, Time } from '../../static/importantTypes';

import { formatNumber } from '../formatting';

export const parseFloatTimeToString = (floatTime: FloatTime): string => {
    const [sign, hours, mins] = floatTime;

    const signStr = sign === 1 ? '+' : '-';
    const formatedMins = formatNumber(Math.abs(mins));

    return `${signStr}${Math.abs(hours)}.${formatedMins}`;
};

/**
 * Erstellt ein FloatTime Value aus einem String,
 * wenn kein Wert übergeben wird, wird die UI zurück gesetz und nichts zurückgegeben
 * @param floatStr Die Gleitzeit als String Array
 * @return Die Gleitzeit als FloatTime Value oder nichts, wenn der Parameter ungültig ist
 */
export const parseStringToFloatTime = (floatStr: string): FloatTime | undefined => {
    const floatArray = floatStr.split('');
    let vorzeichen: FloatTimeSign = 1;

    if (floatArray[0] === '-') vorzeichen = -1;

    if (floatArray.length === 5) {
        // Fromat
        // 0,1,2,3,4
        // +,0,.,1,4

        const gleitHours = Number.parseInt(floatArray[1], 10);
        const gleitTens = Number.parseInt(floatArray[3], 10);
        const gleitOnes = Number.parseInt(floatArray[4], 10);

        const gleitMins = gleitTens * 10 + gleitOnes;

        return [vorzeichen, gleitHours, gleitMins];
    }

    return undefined;
};

export const validateFloatString = (floatStr: string): boolean => {
    const validSymbols = new Set(['+', '-', '.', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9']);
    let isValid = true;

    for (const char of floatStr)
        if (!validSymbols.has(char)) {
            isValid = false;
            break;
        }

    return isValid;
};

export const parseFloatTimeFromRawTimeValues = (time: Time): FloatTime => {
    const [floatHours, floatMinutes] = time;
    const sign: FloatTimeSign = floatHours < 0 || floatMinutes < 0 ? -1 : 1;

    return [sign, Math.abs(floatHours), Math.abs(floatMinutes)];
};

export const isValidFloatTimeValue = (floatStr: string): boolean => {
    const floatTime = parseStringToFloatTime(floatStr);
    if (!floatTime) return false;

    const [sign] = floatTime;
    const floatStrParts = floatStr.split('.');

    if (sign !== 1 && sign !== -1) return false;
    else if (sign === 1 && (floatStrParts.at(-1)?.endsWith('4') || floatStrParts.at(-1)?.endsWith('9'))) return true;
    else return !!(sign === -1 && (floatStrParts.at(-1)?.endsWith('1') || floatStrParts.at(-1)?.endsWith('6')));
};
