import { getCookie, setCookieForOneYear } from './cookieManager';
import type { Time } from '../../static/importantTypes';
import { getMonthNumberFromMonthString } from '../flexOfficeUtility';

export type FlexOfficeCookieKeys = 'offDays' | 'flexHours' | 'flexMins';

export const setFlexOfficeCookie = (month: string, offDays: number, flexTime: Time): void => {
    const flexOfficeCookieList = getCookie('flexOffice') as Record<string, number>[];

    const updatedCookieValue: Record<FlexOfficeCookieKeys, number> = {
        offDays: offDays,
        flexHours: flexTime[0],
        flexMins: flexTime[1],
    };

    const monthNum = getMonthNumberFromMonthString(month) as number;
    flexOfficeCookieList[monthNum] = updatedCookieValue;

    setCookieForOneYear('flexOffice', flexOfficeCookieList);
};

export const getMonthValueOfFlexOfficeCookie = (month: string): Record<FlexOfficeCookieKeys, number> => {
    const flexOfficeCookieList = getCookie('flexOffice') as Record<string, number>[];
    const monthNum = getMonthNumberFromMonthString(month) as number;

    if (flexOfficeCookieList.length <= monthNum)
        return {
            offDays: 0,
            flexHours: 0,
            flexMins: 0,
        };

    return flexOfficeCookieList[monthNum];
};
