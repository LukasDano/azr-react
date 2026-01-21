export const parseStringToRoundedNumber = (numAsStr: string, digits: number = 0): number => {
    const num = Number.parseInt(numAsStr, 10);
    return Number.parseInt(num.toFixed(digits), 10);
};

export const roundNumber = (num: number, digits: number = 0): number => {
    return Number.parseInt(num.toFixed(digits), 10);
};

export const formatNumber = (num: number): string => {
    if (num < 10 && num >= 0) return '0' + num.toString();
    return num.toString();
};
