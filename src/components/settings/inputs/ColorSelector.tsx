import type { FC } from 'react';
import { useEffect, useState } from 'react';
import type { ColorResult } from '@uiw/react-color';
import { Chrome, ChromeInputType } from '@uiw/react-color';

type ColorPickerProps = {
    color?: string;
    onColorChange: (color: string) => void;
    label?: string;
    description?: string;
};

export const ColorPicker: FC<ColorPickerProps> = ({
    color: initialColor = '#aaa',
    onColorChange,
    label,
    description,
}) => {
    const [open, setOpen] = useState(false);
    const [tempColor, setTempColor] = useState(initialColor);
    const [currentColor, setCurrentColor] = useState(initialColor);

    const handleChange = (result: ColorResult): void => {
        setTempColor(result.hex);
    };

    const handleConfirm = (): void => {
        setCurrentColor(tempColor);
        onColorChange(tempColor);
        setOpen(false);
    };

    const handleClose = (): void => {
        setTempColor(currentColor);
        setOpen(false);
    };

    useEffect(() => {
        const handleKey = (evt: KeyboardEvent): void => {
            if (!open) return;
            if (evt.key === 'Escape') handleClose();
            if (evt.key === 'Enter') handleConfirm();
        };
        globalThis.addEventListener('keydown', handleKey);
        return () => globalThis.removeEventListener('keydown', handleKey);
    }, [open, tempColor]);

    return (
        <div className="flex items-center justify-between gap-3">
            <div className="flex flex-col">
                {label && <span className="font-medium text-gray-900 dark:text-gray-100">{label}</span>}
                {description && <span className="text-sm text-gray-500 dark:text-gray-300">{description}</span>}
            </div>

            <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 rounded-md text-white text-sm font-medium transition shadow-md hover:opacity-90"
                style={{ backgroundColor: currentColor, minWidth: '80px' }}
                aria-label={label}
            >
                {currentColor}
            </button>

            {open && (
                <div
                    onClick={handleClose}
                    className="fixed inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm z-50"
                >
                    <div
                        className="bg-white p-6 rounded-xl shadow-xl w-80 relative flex flex-col items-center text-center"
                        onClick={(evt) => evt.stopPropagation()}
                    >
                        <Chrome color={tempColor} onChange={handleChange} inputType={ChromeInputType.HEXA} />

                        <div className="mt-6 flex justify-center gap-3 w-full">
                            <button
                                onClick={handleClose}
                                className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 text-gray-800"
                            >
                                Abbrechen
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="px-3 py-1.5 rounded-md bg-blue-600 text-white hover:bg-blue-700"
                            >
                                Bestätigen
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};
