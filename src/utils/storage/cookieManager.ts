import { defaultFloatValue, emptyTimeValue } from '../../static/defaultValues.ts';
import type { FloatTime, Time } from '../../static/importantTypes';

type CookieKey = 'startTime' | 'floatTime' | 'endTime';

type CookieValue = Time | FloatTime;

const defaultValues: Record<CookieKey, CookieValue> = {
    startTime: emptyTimeValue,
    floatTime: defaultFloatValue,
    endTime: emptyTimeValue,
};

export const deleteCookie = (key: CookieKey): void => {
    document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/';
};

export const getCookie = (key: CookieKey): CookieValue => {
    const cookies = document.cookie.split(';');
    let result;

    for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');

        if (cookieName === key) result = JSON.parse(decodeURIComponent(cookieValue));
    }

    return result || defaultValues[key];
};

export const setCookie = (key: CookieKey, val: CookieValue, expirationDate: Date | undefined = undefined): void => {
    let expires = '';
    const valStr = JSON.stringify(val);

    if (expirationDate instanceof Date) expires = '; expires=' + expirationDate.toUTCString();
    document.cookie = key + '=' + encodeURIComponent(valStr) + expires + '; path=/';
};

export const setCookieFor10Minutes = (key: CookieKey, val: CookieValue): void => {
    const now = new Date();
    const expiresDate = new Date(now.getTime() + 10 * 60 * 1000);

    setCookie(key, val, expiresDate);
};

export const setCookieUntilMidnight = (key: CookieKey, val: CookieValue): void => {
    const now = new Date();
    const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);

    setCookie(key, val, midnight);
};

export const setCookieUntilEndOfWeek = (key: CookieKey, val: CookieValue): void => {
    const now = new Date();
    const endOfWeek = new Date(now);

    const daysUntilSunday = 7 - now.getDay();
    endOfWeek.setDate(now.getDate() + daysUntilSunday);
    endOfWeek.setHours(0, 0, 0, 0);

    setCookie(key, val, endOfWeek);
};

export const setCookieUntilEndOfMonth = (key: CookieKey, val: CookieValue): void => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0, 23, 59, 59);

    setCookie(key, val, endOfMonth);
};

export const setCookieUntilEndOfGivenMonth = (key: CookieKey, val: CookieValue, month: number): void => {
    let year = new Date().getFullYear();
    const currentMonth = new Date().getMonth();

    if (month <= currentMonth) year++;

    month = Math.max(1, Math.min(12, month));
    const lastDayOfMonth = new Date(year, month, 0, 23, 59, 59);

    setCookie(key, val, lastDayOfMonth);
};

export const setCookieForOneYear = (key: CookieKey, val: CookieValue): void => {
    const now = new Date();
    const oneYearFromNow = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate(), 23, 59, 59);

    setCookie(key, val, oneYearFromNow);
};
