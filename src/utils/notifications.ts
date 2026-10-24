import type { CSSProperties } from "react";

import { toast } from "react-toastify";

type NotificationLevel = "SUCCESS" | "INFO" | "WARN" | "ERROR";

type NotificationParams = {
    /**
     * Level of the notification. (Default is `INFO`)
     */
    lvl?: NotificationLevel;

    /**
     * The notification text
     */
    msg: string;

    /**
     * Optional parameter, by default it will close after 5000ms / 5sec).
     * `number`: ms that it will take for the toast to close
     * `false`: won't close automatically
     */
    autoClose?: false | number;

    /**
     * Custom styling attributes for the toast (optional)
     */
    css?: CSSProperties;
};

/**
 * Send a notification to give the user some kind of feedback.
 *
 * _There are default styles for the notification levels, but it's also possible to overwrite them and apply custom styles._
 *
 * @param anonym an anonym object that contains the different parameter values and is used to enable named arguments
 */
export const sendNotification = ({ lvl = "INFO", msg, autoClose = 5000, css = {} }: NotificationParams): void => {
    switch (lvl) {
        case "SUCCESS":
            sendSuccessNotification({ msg, autoClose, css });
            break;
        case "INFO":
            sendInfoNotification({ msg, autoClose, css });
            break;
        case "WARN":
            sendWarnNotification({ msg, autoClose, css });
            break;
        case "ERROR":
            sendErrorNotification({ msg, autoClose, css });
            break;
        default:
            sendWarnNotification({ msg: "Invalid notification level" });
    }
};

const sendSuccessNotification = ({ msg, autoClose = 5000, css = {} }: Omit<NotificationParams, "lvl">): void => {
    toast.success(msg, { theme: "colored", autoClose: autoClose, style: { ...getColorsCSS("SUCCESS"), ...css } });
};

const sendInfoNotification = ({ msg, autoClose = 5000, css = {} }: Omit<NotificationParams, "lvl">): void => {
    toast.info(msg, { theme: "colored", autoClose: autoClose, style: { ...getColorsCSS("INFO"), ...css } });
};

const sendWarnNotification = ({ msg, autoClose = 5000, css = {} }: Omit<NotificationParams, "lvl">): void => {
    toast.warn(msg, { theme: "colored", autoClose: autoClose, style: { ...getColorsCSS("WARN"), ...css } });
};

const sendErrorNotification = ({ msg, autoClose = 5000, css = {} }: Omit<NotificationParams, "lvl">): void => {
    toast.error(msg, { theme: "colored", autoClose: autoClose, style: { ...getColorsCSS("ERROR"), ...css } });
};

const isDarkModeActive = (): boolean => {
    const div = document.getElementById("azr-react-app");
    return div?.classList.contains("dark") ?? false;
};

const getColorsCSS = (lvl: NotificationLevel): CSSProperties => {
    const theme = isDarkModeActive() ? darkColors[lvl] : lightColors[lvl];

    return {
        background: theme.bg,
        borderColor: theme.border,
        color: theme.text
    };
};

type NotificationTheme = {
    bg: string;
    border: string;
    text: string;
};

const lightColors: Record<NotificationLevel, NotificationTheme> = {
    SUCCESS: {
        bg: "hsl(143, 85%, 96%)",
        border: "hsl(145, 92%, 87%)",
        text: "hsl(140, 100%, 27%)"
    },
    INFO: {
        bg: "hsl(208, 100%, 97%)",
        border: "hsl(221, 91%, 93%)",
        text: "hsl(210, 92%, 45%)"
    },
    WARN: {
        bg: "hsl(49, 100%, 97%)",
        border: "hsl(49, 91%, 84%)",
        text: "hsl(31, 92%, 45%)"
    },
    ERROR: {
        bg: "hsl(359, 100%, 97%)",
        border: "hsl(359, 100%, 94%)",
        text: "hsl(360, 100%, 45%)"
    }
};

const darkColors: Record<NotificationLevel, NotificationTheme> = {
    SUCCESS: {
        bg: "hsl(150, 100%, 6%)",
        border: "hsl(147, 100%, 12%)",
        text: "hsl(150, 86%, 65%)"
    },
    INFO: {
        bg: "hsl(215, 100%, 6%)",
        border: "hsl(223, 43%, 17%)",
        text: "hsl(216, 87%, 65%)"
    },
    WARN: {
        bg: "hsl(64, 100%, 6%)",
        border: "hsl(60, 100%, 9%)",
        text: "hsl(46, 87%, 65%)"
    },
    ERROR: {
        bg: "hsl(358, 76%, 10%)",
        border: "hsl(357, 89%, 16%)",
        text: "hsl(358, 100%, 81%)"
    }
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
