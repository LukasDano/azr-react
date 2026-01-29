import { type FC, useState } from 'react';
import Select, { type SingleValue } from 'react-select';
import makeAnimated from 'react-select/animated';

type MultipleValueSelectorProps = {
    name: string;
    description?: string;
    defaultOption: string;
    options: string[];
    onChange: (newOptions: SingleValue<string>) => void;
};

export const DropDownSelect: FC<MultipleValueSelectorProps> = ({
    name,
    description = '',
    defaultOption,
    options,
    onChange,
}) => {
    const [selectedOption, setSelectedOption] = useState<SingleValue<string>>(defaultOption);

    const animatedComponents = makeAnimated();

    const handleChange = (selectedOption: SingleValue<string>) => {
        setSelectedOption(selectedOption);
        onChange(selectedOption);
    };

    const generateOptions = () => {
        return options.map((opt) => {
            return {
                value: opt,
                label: opt,
            };
        });
    };

    return (
        <div className={'flex justify-between mb-3'}>
            <div className={'mr-6 content-center'}>
                <span className={'font-medium text-gray-900 dark:text-gray-100'}>{name}</span>
                <span className={'font-light text-gray-900 dark:text-gray-200 block max-w-[20vw]'}>{description}</span>
            </div>
            <div className={'inline-flex items-center cursor-pointer ms-auto'}>
                <Select
                    className={'w-46'}
                    classNames={{
                        control: () => 'bg-gray-50 border-gray-300 text-gray-900 min-w-full',
                        menu: () => 'bg-gray-50 border-gray-300 text-gray-900 min-w-full',
                        multiValue: () => 'dark:bg-gray-300 dark:text-gray-700 min-w-full',
                    }}
                    styles={{
                        option: (base, state) => ({
                            ...base,
                            backgroundColor: state.isFocused ? '#D1D5DBFF' : '',
                            color: state.isFocused ? '#374151FF' : '',
                        }),
                    }}
                    closeMenuOnSelect={true}
                    menuPosition="fixed"
                    components={animatedComponents}
                    value={{ value: selectedOption, label: selectedOption }}
                    isMulti={false}
                    options={generateOptions()}
                    placeholder={'Select ...'}
                    onChange={(val) => handleChange(val?.label as string)}
                    noOptionsMessage={() => 'No selectable options'}
                    aria-label={name}
                    datatest-id={name}
                />
            </div>
        </div>
    );
};
