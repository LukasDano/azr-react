import type { FC, ReactElement } from "react";

import { useContext, useMemo } from "react";
import {
    BeatLoader,
    BounceLoader,
    CircleLoader,
    ClimbingBoxLoader,
    ClipLoader,
    ClockLoader,
    FadeLoader,
    GridLoader,
    HashLoader,
    MoonLoader,
    PropagateLoader,
    PuffLoader,
    PulseLoader,
    RingLoader,
    RiseLoader,
    RotateLoader,
    ScaleLoader,
    SquareLoader
} from "react-spinners";

import type { SettingContextValues } from "../context/setting/SettingContext.tsx";

import { getColorForTheme } from "../../utils/utils.ts";
import { SettingContext } from "../context/setting/SettingContext.tsx";

export type LoaderIcon =
    | "bounce"
    | "climbing"
    | "clock"
    | "fade"
    | "grid"
    | "hash"
    | "ring"
    | "pulse"
    | "scale"
    | "puff"
    | "rotate"
    | "propagate"
    | "rise"
    | "moon"
    | "clip"
    | "beat"
    | "square"
    | "circle";

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
            puff: <PuffLoader color={color} size={loaderSize ?? 100} />,
            rotate: <RotateLoader color={color} size={loaderSize ?? 30} />,
            propagate: <PropagateLoader color={color} size={loaderSize ?? 35} />,
            rise: <RiseLoader color={color} size={loaderSize ?? 25} />,
            moon: <MoonLoader color={color} size={loaderSize ?? 50} />,
            clip: <ClipLoader color={color} size={loaderSize ?? 50} />,
            beat: <BeatLoader color={color} size={loaderSize ?? 35} />,
            square: <SquareLoader color={color} size={loaderSize ?? 50} />,
            circle: <CircleLoader color={color} size={loaderSize ?? 75} />
        };

        return loaders[loaderIcon];
    }, [darkModeActive, colorTheme, loaderSize, loaderIcon]);

    return (
        <div className={`flex ${useFullHeight ? "min-h-screen" : ""} flex-col items-center justify-center`}>
            {loader}
        </div>
    );
};
