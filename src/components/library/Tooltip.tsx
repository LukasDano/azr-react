import type { FC, ReactNode } from "react";

import { useFloating, useHover, useFocus, useDismiss, useInteractions, offset, flip, shift } from "@floating-ui/react";
import { useCallback, useState } from "react";

type TooltipProps = {
    tooltip: ReactNode;
    children: ReactNode;
    disabled?: boolean;
};

export const Tooltip: FC<TooltipProps> = ({ tooltip, children, disabled = false }) => {
    const [open, setOpen] = useState(false);

    const { refs, floatingStyles, context } = useFloating({
        open: disabled ? false : open,
        onOpenChange: setOpen,
        placement: "top",
        middleware: [offset(5), flip(), shift()]
    });

    const { getReferenceProps, getFloatingProps } = useInteractions([
        useHover(context),
        useFocus(context),
        useDismiss(context)
    ]);

    const setReference = useCallback(
        (node: HTMLElement | null) => {
            refs.setReference(node);
        },
        [refs]
    );

    const setFloating = useCallback(
        (node: HTMLElement | null) => {
            refs.setFloating(node);
        },
        [refs]
    );

    return (
        <>
            <span ref={setReference} {...getReferenceProps()}>
                {children}
            </span>

            {open && !disabled && (
                <div
                    ref={setFloating}
                    style={floatingStyles}
                    {...getFloatingProps()}
                    className={"min-w-fit rounded bg-gray-900 px-2 py-1 text-sm text-zinc-300"}
                    data-testid={"tooltip"}
                >
                    {tooltip}
                </div>
            )}
        </>
    );
};
