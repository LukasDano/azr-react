import type { CountdownUnit } from '../components/content/countdown/CountdownElement.tsx';

export type CountdownColors = Record<CountdownUnit, string>;

export const defaultCountdownTheme: CountdownColors = {
    days: '#1abc9c',
    hours: '#2980b9',
    minutes: '#8e44ad',
    seconds: '#f39c13',
};

export type ThemeType = 'light' | 'dark';
export type ColorTheme = Record<ThemeType, string>;

export type LightThemeName = 'cyan' | 'sky' | 'emerald' | 'ocean' | 'lime' | 'teal' | 'slate' | 'green' | 'blue';

export const availableLightThemes: Record<string, string> = {
    cyan: 'bg-cyan-400 hover:bg-cyan-500',
    sky: 'bg-sky-400 hover:bg-sky-500',
    emerald: 'bg-emerald-400 hover:bg-emerald-500',
    ocean: 'bg-cyan-400 hover:bg-cyan-500',
    lime: 'bg-lime-400 hover:bg-lime-500',
    teal: 'bg-teal-400 hover:bg-teal-500',
    slate: 'bg-slate-400 hover:bg-slate-500',
    green: 'bg-green-400 hover:bg-green-500',
    blue: 'bg-blue-400 hover:bg-blue-500',
};

export type DarkThemeName = 'violet' | 'amber' | 'rose' | 'indigo' | 'orange' | 'pink' | 'purple' | 'yellow';

export const availableDarkThemes: Record<string, string> = {
    violet: 'dark:bg-violet-500 hover:dark:bg-violet-600',
    amber: 'dark:bg-amber-500 hover:dark:bg-amber-600',
    rose: 'dark:bg-rose-500 hover:dark:bg-rose-600',
    indigo: 'dark:bg-indigo-500 hover:dark:bg-indigo-600',
    orange: 'dark:bg-orange-500 hover:dark:bg-orange-600',
    pink: 'dark:bg-pink-500 hover:dark:bg-pink-600',
    purple: 'dark:bg-purple-500 hover:dark:bg-purple-600',
    yellow: 'dark:bg-yellow-500 hover:dark:bg-yellow-600',
};

export const defaultColorTheme: ColorTheme = {
    light: availableLightThemes.sky,
    dark: availableDarkThemes.violet,
};
