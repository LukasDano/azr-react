import type { FC } from "react";
import type { SingleValue } from "react-select";

import { useEffect, useState } from "react";
import Select from "react-select";
import makeAnimated from "react-select/animated";

import type { SelectOption } from "./MultipleValueSelector.tsx";

type SingleValueSelectorProps = {
    name?: string;
    description?: string;
    defaultOption: string;
    options: string[];
    onChange: (newOptions: SingleValue<string>) => void;
    useBottomMargin?: boolean;
};

export const SingleValueSelector: FC<SingleValueSelectorProps> = ({
    name,
    description = "",
    defaultOption,
    options,
    onChange,
    useBottomMargin = false
}) => {
    const [selectedOption, setSelectedOption] = useState<SingleValue<string>>(defaultOption);
    const animatedComponents = makeAnimated();

    useEffect(() => {
        setSelectedOption(defaultOption);
    }, [defaultOption]);

    const handleChange = (selectedOption: SingleValue<string>): void => {
        setSelectedOption(selectedOption);
        onChange(selectedOption);
    };

    const generateOptions = (): Omit<SelectOption, "selected">[] => {
        return options.map((opt) => ({
            value: opt,
            label: opt
        }));
    };

    return (
        <div className={`${useBottomMargin ? "mb-3" : ""} flex flex-col`}>
            {name && (
                <label className={"mb-2"}>
                    <span className={"block font-medium text-gray-900 dark:text-gray-100"}>{name}</span>
                    {description && (
                        <span className={"block max-w-[20vw] font-light text-gray-900 dark:text-gray-200"}>
                            {description}
                        </span>
                    )}
                </label>
            )}

            <Select
                className={"w-full"}
                classNames={{
                    control: () => "bg-gray-50 border-gray-300 text-gray-900",
                    menu: () => "bg-gray-50 border-gray-300 text-gray-900",
                    multiValue: () => "dark:bg-gray-300 dark:text-gray-700"
                }}
                styles={{
                    option: (base, state) => ({
                        ...base,
                        backgroundColor: state.isFocused ? "#D1D5DBFF" : "",
                        color: state.isFocused ? "#374151FF" : ""
                    })
                }}
                closeMenuOnSelect={true}
                menuPosition={"fixed"}
                components={animatedComponents}
                value={{ value: selectedOption, label: selectedOption }}
                isMulti={false}
                options={generateOptions()}
                placeholder={"Select ..."}
                onChange={(val) => handleChange(val?.label as string)}
                noOptionsMessage={() => "No selectable options"}
                aria-label={name}
                datatest-id={name}
            />
        </div>
    );
};
