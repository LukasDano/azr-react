export const getPercent = (val: number, max: number): number => (val / max) * 100;

export type CountdownTime = {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
};

type CountdownElementConfig = {
    value: number;
    max: number;
    key: keyof CountdownTime;
};

export const createCountdownElements = (time: CountdownTime): CountdownElementConfig[] => [
    { value: time.days, max: 99, key: "days" },
    { value: time.hours, max: 24, key: "hours" },
    { value: time.minutes, max: 60, key: "minutes" },
    { value: time.seconds, max: 60, key: "seconds" }
];
