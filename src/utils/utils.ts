import type { ColorTheme, ThemeColors, ThemeName } from "./themes.ts";

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

export const getColorForTheme = (darkModeActive: boolean, colorTheme: ColorTheme): string => {
    const themeColors: Record<ThemeName, ThemeColors> = {
        cyan: { light: "#22d3ee", dark: "#0891b2" },
        sky: { light: "#38bdf8", dark: "#0284c7" },
        emerald: { light: "#34d399", dark: "#059669" },
        lime: { light: "#a3e635", dark: "#65a30d" },
        teal: { light: "#2dd4bf", dark: "#0d9488" },
        slate: { light: "#94a3b8", dark: "#475569" },
        green: { light: "#4ade80", dark: "#16a34a" },
        blue: { light: "#60a5fa", dark: "#2563eb" },
        violet: { light: "#a78bfa", dark: "#7c3aed" },
        amber: { light: "#fbbf24", dark: "#d97706" },
        rose: { light: "#fb7185", dark: "#e11d48" },
        indigo: { light: "#818cf8", dark: "#4f46e5" },
        orange: { light: "#fb923c", dark: "#ea580c" },
        pink: { light: "#f472b6", dark: "#db2777" },
        purple: { light: "#c084fc", dark: "#9333ea" },
        yellow: { light: "#facc15", dark: "#ca8a04" },
        red: { light: "#ef4444", dark: "#b91c1c" },
        fuchsia: { light: "#d946ef", dark: "#c026d3" }
    };

    const theme = darkModeActive ? colorTheme.dark : colorTheme.light;
    return themeColors[theme][darkModeActive ? "dark" : "light"];
};
