import type { CountdownUnit } from '../components/content/miscellaneous/CountdownElement.tsx';

export type CountdownColors = Record<CountdownUnit, string>;

export const defaultCountdownTheme: CountdownColors = {
    days: '#1abc9c',
    hours: '#2980b9',
    minutes: '#8e44ad',
    seconds: '#f39c13',
};

type Theme = 'light' | 'dark';
type ColorTheme = Record<Theme, string>;
export type ThemeName =
    | 'skyViolet'
    | 'emeraldAmber'
    | 'oceanRose'
    | 'limeIndigo'
    | 'tealOrange'
    | 'slatePink'
    | 'greenPurple'
    | 'blueYellow';

export const availableThemes: Record<string, ColorTheme> = {
    skyViolet: {
        light: 'bg-sky-400 hover:bg-sky-500',
        dark: 'dark:bg-violet-500 hover:dark:bg-violet-600',
    },
    emeraldAmber: {
        light: 'bg-emerald-400 hover:bg-emerald-500',
        dark: 'dark:bg-amber-500 hover:dark:bg-amber-600',
    },
    oceanRose: {
        light: 'bg-cyan-400 hover:bg-cyan-500',
        dark: 'dark:bg-rose-500 hover:dark:bg-rose-600',
    },
    limeIndigo: {
        light: 'bg-lime-400 hover:bg-lime-500',
        dark: 'dark:bg-indigo-500 hover:dark:bg-indigo-600',
    },
    tealOrange: {
        light: 'bg-teal-400 hover:bg-teal-500',
        dark: 'dark:bg-orange-500 hover:dark:bg-orange-600',
    },
    slatePink: {
        light: 'bg-slate-400 hover:bg-slate-500',
        dark: 'dark:bg-pink-500 hover:dark:bg-pink-600',
    },
    greenPurple: {
        light: 'bg-green-400 hover:bg-green-500',
        dark: 'dark:bg-purple-500 hover:dark:bg-purple-600',
    },
    blueYellow: {
        light: 'bg-blue-400 hover:bg-blue-500',
        dark: 'dark:bg-yellow-500 hover:dark:bg-yellow-600',
    },
};
