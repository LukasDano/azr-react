import type { CountdownUnit } from "../components/content/countdown/CountdownElement.tsx";

export type CountdownColors = Record<CountdownUnit, string>;

export const defaultCountdownTheme: CountdownColors = {
    days: "#1abc9c",
    hours: "#2980b9",
    minutes: "#8e44ad",
    seconds: "#f39c13"
};

export type ColorTheme = Record<ThemeType, ThemeName>;

export type ThemeType = "light" | "dark";
export type ThemeColors = Record<ThemeType, string>;

export type ThemeName =
    | "cyan"
    | "sky"
    | "emerald"
    | "lime"
    | "teal"
    | "slate"
    | "green"
    | "blue"
    | "violet"
    | "amber"
    | "rose"
    | "indigo"
    | "orange"
    | "pink"
    | "purple"
    | "red"
    | "fuchsia"
    | "yellow";

export const availableThemes: Record<ThemeName, ThemeColors> = {
    cyan: { light: "bg-cyan-400 hover:bg-cyan-500", dark: "dark:bg-cyan-600 dark:hover:bg-cyan-700" },
    sky: { light: "bg-sky-400 hover:bg-sky-500", dark: "dark:bg-sky-600 dark:hover:bg-sky-700" },
    emerald: { light: "bg-emerald-400 hover:bg-emerald-500", dark: "dark:bg-emerald-600 dark:hover:bg-emerald-700" },
    lime: { light: "bg-lime-400 hover:bg-lime-500", dark: "dark:bg-lime-600 dark:hover:bg-lime-700" },
    teal: { light: "bg-teal-400 hover:bg-teal-500", dark: "dark:bg-teal-600 dark:hover:bg-teal-700" },
    slate: { light: "bg-slate-400 hover:bg-slate-500", dark: "dark:bg-slate-600 dark:hover:bg-slate-700" },
    green: { light: "bg-green-400 hover:bg-green-500", dark: "dark:bg-green-600 dark:hover:bg-green-700" },
    blue: { light: "bg-blue-400 hover:bg-blue-500", dark: "dark:bg-blue-600 dark:hover:bg-blue-700" },
    violet: { light: "bg-violet-400 hover:bg-violet-500", dark: "dark:bg-violet-600 dark:hover:bg-violet-700" },
    amber: { light: "bg-amber-400 hover:bg-amber-500", dark: "dark:bg-amber-600 dark:hover:bg-amber-700" },
    rose: { light: "bg-rose-400 hover:bg-rose-500", dark: "dark:bg-rose-600 dark:hover:bg-rose-700" },
    indigo: { light: "bg-indigo-400 hover:bg-indigo-500", dark: "dark:bg-indigo-600 dark:hover:bg-indigo-700" },
    orange: { light: "bg-orange-400 hover:bg-orange-500", dark: "dark:bg-orange-600 dark:hover:bg-orange-700" },
    pink: { light: "bg-pink-400 hover:bg-pink-500", dark: "dark:bg-pink-600 dark:hover:bg-pink-700" },
    purple: { light: "bg-purple-400 hover:bg-purple-500", dark: "dark:bg-purple-600 dark:hover:bg-purple-700" },
    red: { light: "bg-red-500 hover:bg-red-600", dark: "dark:bg-red-700 dark:hover:bg-red-800" },
    fuchsia: { light: "bg-fuchsia-400 hover:bg-fuchsia-500", dark: "dark:bg-fuchsia-600 dark:hover:bg-fuchsia-700" },
    yellow: { light: "bg-yellow-400 hover:bg-yellow-500", dark: "dark:bg-yellow-600 dark:hover:bg-yellow-700" }
};

export const defaultColorTheme: Record<ThemeType, ThemeName> = {
    light: "cyan",
    dark: "indigo"
};

export const getThemeClasses = (theme: ColorTheme): string =>
    `${availableThemes[theme.light].light} ${availableThemes[theme.dark].dark}`;
