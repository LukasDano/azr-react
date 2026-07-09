import type { FC, ReactElement } from "react";

import { useContext, useMemo } from "react";
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
} from "react-spinners";

import type { SettingContextValues } from "../context/SettingContext";

import { getColorForTheme } from "../../utils/utils.ts";
import { SettingContext } from "../context/SettingContext";

type LoaderIcon = "bounce" | "climbing" | "clock" | "fade" | "grid" | "hash" | "ring" | "pulse" | "scale" | "puff";

type LoaderProps = {
    loaderIcon?: LoaderIcon;
    loaderSize?: number | null;
    useFullHeight?: boolean;
};

export const Loader: FC<LoaderProps> = ({ loaderIcon = "clock", loaderSize = null, useFullHeight = true }) => {
    const { darkModeActive, colorTheme } = useContext<SettingContextValues>(SettingContext);

    const loader = useMemo<ReactElement>(() => {
        const color = getColorForTheme(darkModeActive, colorTheme);

        const loaders: Record<LoaderIcon, ReactElement> = {
            bounce: <BounceLoader color={color} size={loaderSize ?? 75} />,
            climbing: <ClimbingBoxLoader color={color} size={loaderSize ?? 25} />,
            clock: <ClockLoader color={color} size={loaderSize ?? 50} />,
            fade: <FadeLoader color={color} />,
            grid: <GridLoader color={color} size={loaderSize ?? 30} />,
            hash: <HashLoader color={color} size={loaderSize ?? 75} />,
            pulse: <PulseLoader color={color} size={loaderSize ?? 30} />,
            ring: <RingLoader color={color} size={loaderSize ?? 80} />,
            scale: <ScaleLoader color={color} />,
            puff: <PuffLoader color={color} size={loaderSize ?? 100} />
        };

        return loaders[loaderIcon];
    }, [darkModeActive, colorTheme, loaderSize, loaderIcon]);

    return (
        <div className={`flex ${useFullHeight ? "min-h-screen" : ""} flex-col items-center justify-center`}>
            {loader}
        </div>
    );
};
