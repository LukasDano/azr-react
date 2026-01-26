import type { CountdownUnit } from '../components/content/Countdown.tsx';

export type CountdownColors = Record<CountdownUnit, string>;

export const defaultCountdownTheme: CountdownColors = {
    days: '#1abc9c',
    hours: '#2980b9',
    minutes: '#8e44ad',
    seconds: '#f39c13',
};

export const themeColorClasses = ' bg-sky-400 dark:bg-violet-500 hover:bg-sky-500 dark:hover:bg-violet-600';
