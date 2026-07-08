import type { ChangeEvent, FC } from "react";

import { useState } from "react";
import { FaRegSave } from "react-icons/fa";

import { sendNotification } from "../../../utils/notifications.ts";
import { BaseButton } from "../../content/miscellaneous/BaseButton";

type SettingsInputValue = string | number;

type SettingsInputProps = {
    onSubmit: (value: SettingsInputValue) => void;
    defaultValue: SettingsInputValue;
    type: "text" | "number";
    settingName: string;
    description?: string;
    max?: number;
    min?: number;
    onlyValues?: SettingsInputValue[];
    useStringAsColor?: boolean;
};

export const SettingsInput: FC<SettingsInputProps> = ({
    onSubmit,
    defaultValue,
    type,
    settingName,
    description,
    onlyValues,
    min,
    max,
    useStringAsColor = false
}) => {
    const [value, setValue] = useState<SettingsInputValue>(defaultValue);

    const handleChange = (evt: ChangeEvent<HTMLInputElement>): void => {
        if (type === "text") setValue(evt.currentTarget.value);
        else setValue(Number(evt.currentTarget.value));
    };

    const handleSave = (): void => {
        if (onlyValues && !onlyValues.includes(value))
            sendNotification({ lvl: "WARN", msg: `Dieser Wert wird für ${settingName} nicht unterstützt` });
        else {
            onSubmit(value);
            sendNotification({ lvl: "INFO", msg: `Änderung and ${settingName} wurde gespeichert.` });
        }
    };

    return (
        <div className={"flex flex-col gap-y-3"}>
            <div className={"flex items-center justify-between"}>
                <div className={"flex flex-col"}>
                    <span className={"font-medium text-gray-900 dark:text-gray-100"}>{settingName}</span>
                    <span className={"text-sm text-gray-500 dark:text-gray-300"}>{description}</span>
                </div>

                <form className={"flex items-center gap-2"}>
                    <input
                        type={type}
                        value={value}
                        onChange={handleChange}
                        min={min}
                        max={max}
                        className={
                            "rounded-lg border border-gray-300 bg-gray-100 px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
                        }
                        style={{ color: useStringAsColor ? (value as string) : "" }}
                        aria-label={settingName}
                    />
                    {defaultValue !== value && (
                        <BaseButton
                            icon={<FaRegSave className={"h-5 w-5"} />}
                            tooltip={"Änderung speichern"}
                            onClick={handleSave}
                        />
                    )}
                </form>
            </div>
        </div>
    );
};
