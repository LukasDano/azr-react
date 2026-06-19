import type { FC, ReactNode } from 'react';

import { useContext } from 'react';
import {
    BounceLoader,
    ClimbingBoxLoader,
    ClockLoader,
    FadeLoader,
    GridLoader,
    HashLoader,
    PuffLoader,
    PulseLoader,
    RingLoader,
    ScaleLoader
} from 'react-spinners';

import type { ThemeColors, ThemeName } from '../../../static/themes.ts';
import type { SettingContextValues } from '../../context/SettingContext.tsx';

import { SettingContext } from '../../context/SettingContext.tsx';

type LoaderIcon = 'bounce' | 'climbing' | 'clock' | 'fade' | 'gird' | 'hash' | 'ring' | 'pulse' | 'scale' | 'puff';

type LoaderProps = {
    loaderIcon?: LoaderIcon;
    loaderSize?: number;
};

export const Loader: FC<LoaderProps> = ({ loaderIcon = 'clock', loaderSize = null }) => {
    const { darkModeActive, colorTheme } = useContext<SettingContextValues>(SettingContext);

    const getColorForTheme = (): string => {
        const themeColors: Record<ThemeName, ThemeColors> = {
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
            red: { light: '#ef4444', dark: '#b91c1c' },
            fuchsia: { light: '#d946ef', dark: '#c026d3' }
        };

        const theme = darkModeActive ? colorTheme.dark : colorTheme.light;
        return themeColors[theme][darkModeActive ? 'dark' : 'light'];
    };

    const getLoader = (): ReactNode => {
        const color = getColorForTheme();

        const loaders: Record<LoaderIcon, ReactNode> = {
            bounce: <BounceLoader color={color} size={loaderSize ?? 75} />,
            climbing: <ClimbingBoxLoader color={color} size={loaderSize ?? 25} />,
            clock: <ClockLoader color={color} size={loaderSize ?? 50} />,
            fade: <FadeLoader color={color} />,
            gird: <GridLoader color={color} size={loaderSize ?? 30} />,
            hash: <HashLoader color={color} size={loaderSize ?? 75} />,
            pulse: <PulseLoader color={color} size={loaderSize ?? 30} />,
            ring: <RingLoader color={color} size={loaderSize ?? 80} />,
            scale: <ScaleLoader color={color} />,
            puff: <PuffLoader color={color} size={loaderSize ?? 100} />
        };

        return loaders[loaderIcon];
    };

    return <div className={'flex min-h-screen flex-col items-center justify-center'}>{getLoader()}</div>;
};
