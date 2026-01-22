import type { CountdownUnit } from '../components/content/Countdown.tsx';

export const defaultCountdownTheme: Record<CountdownUnit, string> = {
    days: '#1abc9c',
    hours: '#2980b9',
    minutes: '#8e44ad',
    seconds: '#f39c13',
};

export const themeColorClasses = ' bg-sky-400 dark:bg-purple-500 hover:bg-sky-500 dark:hover:bg-purple-600';
