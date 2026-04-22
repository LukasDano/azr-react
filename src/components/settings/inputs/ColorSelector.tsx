import type { ColorResult } from '@uiw/react-color';
import { Chrome, ChromeInputType } from '@uiw/react-color';
import type { FC } from 'react';
import { useEffect, useState } from 'react';

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
                {description && <span className="text-gray-500 text-sm dark:text-gray-300">{description}</span>}
            </div>

            <button
                onClick={() => setOpen(true)}
                className="rounded-md px-4 py-2 font-medium text-sm text-white shadow-md transition hover:opacity-90"
                style={{ backgroundColor: currentColor, minWidth: '80px' }}
                aria-label={label}
            >
                {currentColor}
            </button>

            {open && (
                <div
                    onClick={handleClose}
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm"
                >
                    <div
                        className="relative flex w-80 flex-col items-center rounded-xl bg-white p-6 text-center shadow-xl"
                        onClick={(evt) => evt.stopPropagation()}
                    >
                        <Chrome color={tempColor} onChange={handleChange} inputType={ChromeInputType.HEXA} />

                        <div className="mt-6 flex w-full justify-center gap-3">
                            <button
                                onClick={handleClose}
                                className="rounded-md bg-gray-100 px-3 py-1.5 text-gray-800 hover:bg-gray-200"
                            >
                                Abbrechen
                            </button>
                            <button
                                onClick={handleConfirm}
                                className="rounded-md bg-blue-600 px-3 py-1.5 text-white hover:bg-blue-700"
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
