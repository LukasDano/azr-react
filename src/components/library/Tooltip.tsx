import type { FC, ReactElement } from "react";

import Tippy from "@tippyjs/react";

type TooltipAnimations = "fade" | "perspective" | "scale" | "shift-toward" | "shift-away";

type TooltipProps = {
    tooltip: string;
    children: ReactElement;
    disabled?: boolean;
    animation?: TooltipAnimations;
    inertia?: boolean;
};

export const Tooltip: FC<TooltipProps> = ({
    tooltip,
    children,
    disabled = false,
    animation = "fade",
    inertia = false
}) => {
    return (
        <Tippy content={tooltip} disabled={disabled} animation={animation} inertia={inertia}>
            {children}
        </Tippy>
    );
};
