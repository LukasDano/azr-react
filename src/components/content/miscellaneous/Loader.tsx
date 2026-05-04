import { useContext } from 'react';
import { ClockLoader } from 'react-spinners';

import type { ColorTheme, ThemeName } from '../../../static/themes.ts';
import { SettingContext, type SettingContextValues } from '../../context/SettingContext.tsx';

export const Loader = () => {
    const { darkModeActive, colorTheme } = useContext<SettingContextValues>(SettingContext);

    const getColorForTheme = (): string => {
        const themeColors: Record<ThemeName, ColorTheme> = {
            cyan: { light: '#22d3ee', dark: '#0891b2' },
            sky: { light: '#38bdf8', dark: '#0284c7' },
            emerald: { light: '#34d399', dark: '#059669' },
            lime: { light: '#a3e635', dark: '#65a30d' },
            teal: { light: '#2dd4bf', dark: '#0d9488' },
            slate: { light: '#94a3b8', dark: '#475569' },
            green: { light: '#4ade80', dark: '#16a34a' },
            blue: { light: '#60a5fa', dark: '#2563eb' },
            violet: { light: '#a78bfa', dark: '#7c3aed' },
            amber: { light: '#fbbf24', dark: '#d97706' },
            rose: { light: '#fb7185', dark: '#e11d48' },
            indigo: { light: '#818cf8', dark: '#4f46e5' },
            orange: { light: '#fb923c', dark: '#ea580c' },
            pink: { light: '#f472b6', dark: '#db2777' },
            purple: { light: '#c084fc', dark: '#9333ea' },
            yellow: { light: '#facc15', dark: '#ca8a04' },
        };

        const theme = darkModeActive ? colorTheme.dark : colorTheme.light;
        return themeColors[theme as ThemeName][darkModeActive ? 'dark' : 'light'];
    };

    return (
        <div className="flex min-h-screen flex-col items-center justify-center">
            <ClockLoader color={getColorForTheme()} size={40} />
        </div>
    );
};
