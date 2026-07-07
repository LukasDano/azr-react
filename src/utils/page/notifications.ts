import { toast } from "sonner";

export const sendSuccessMessage = (msg: string, desc?: string): void => {
    if (desc) toast.success(msg, { description: desc });
    else toast.success(msg);
};

export const sendErrorMessage = (msg: string, desc?: string): void => {
    if (desc) toast.error(msg, { description: desc });
    else toast.error(msg);
};

export const sendInfoMessage = (msg: string, desc?: string): void => {
    if (desc) toast.info(msg, { description: desc });
    else toast.info(msg);
};

export const sendWarnMessage = (msg: string, desc?: string): void => {
    if (desc) toast.warning(msg, { description: desc });
    else toast.warning(msg);
};

export type ToastPosition = "topLeft" | "topRight" | "bottomLeft" | "bottomRight" | "topCenter" | "bottomCenter";
type ToastPositionClass = "top-left" | "top-right" | "bottom-left" | "bottom-right" | "top-center" | "bottom-center";

export const notificationPositions: Record<ToastPosition, ToastPositionClass> = {
    topLeft: "top-left",
    topRight: "top-right",
    bottomLeft: "bottom-left",
    bottomRight: "bottom-right",
    topCenter: "top-center",
    bottomCenter: "bottom-center"
};
