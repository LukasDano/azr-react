import type { FC } from "react";

import { Listbox, ListboxButton, ListboxOption, ListboxOptions } from "@headlessui/react";
import { ChevronsUpDown } from "lucide-react";
import { useContext } from "react";

import type { SettingContextValues } from "../../context/SettingContext.tsx";

import { getThemeClasses } from "../../../utils/themes.ts";
import { SettingContext } from "../../context/SettingContext.tsx";

type HeaderDropDownSelectProps = {
    items: string[];
    selectedItem: string;
    onChange: (val: string) => void;
    minWidth?: number;
};

export const HeaderDropDownSelect: FC<HeaderDropDownSelectProps> = ({ items, selectedItem, onChange, minWidth }) => {
    const { colorTheme } = useContext<SettingContextValues>(SettingContext);

    return (
        <div className={"w-fit shrink-0"} style={{ minWidth: minWidth ? `${minWidth}px` : "150px" }}>
            <Listbox value={selectedItem} onChange={onChange}>
                <div className={"relative"}>
                    <ListboxButton
                        className={
                            "relative w-full cursor-pointer rounded-lg border bg-white py-2 pr-10 pl-3 text-left shadow-md focus:ring-2 focus:ring-blue-500 focus:outline-none sm:text-sm dark:border-gray-600 dark:bg-gray-600 dark:text-white dark:shadow-gray-700"
                        }
                    >
                        <span className={"block truncate"}>{selectedItem}</span>
                        <span className={"pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"}>
                            <ChevronsUpDown className={"h-5 w-5 text-gray-400"} />
                        </span>
                    </ListboxButton>

                    <ListboxOptions
                        className={
                            "absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm dark:bg-gray-500"
                        }
                    >
                        {items.map((item) => (
                            <ListboxOption
                                key={item}
                                value={item}
                                className={({ focus }) =>
                                    `relative flex cursor-pointer items-center justify-center px-4 py-2 select-none ${
                                        focus ? getThemeClasses(colorTheme) : "text-gray-900 dark:text-gray-100"
                                    }`
                                }
                            >
                                {({ selected }) => (
                                    <span
                                        className={`block w-full truncate text-center ${
                                            selected ? "font-medium" : "font-normal"
                                        }`}
                                    >
                                        {item}
                                    </span>
                                )}
                            </ListboxOption>
                        ))}
                    </ListboxOptions>
                </div>
            </Listbox>
        </div>
    );
};
