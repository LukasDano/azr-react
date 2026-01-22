import type { FC } from 'react';
import { IoClose } from 'react-icons/io5';

import { Settings } from './Settings';

type SettingsModalProps = {
    isOpen: boolean;
    onClose: () => void;
};

export const SettingsModal: FC<SettingsModalProps> = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') onClose();
    });

    return (
        <div
            className="
            fixed inset-0 flex items-center justify-center z-50
             bg-black/50 backdrop-blur-sm text-white px-3 py-2
             transition-opacity duration-300"
            onKeyDown={(evt) => {
                if (evt.key === 'Escape') onClose();
            }}
        >
            <div
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-full max-w-2xl p-6 relative text-black dark:text-white"
                onClick={(evt) => evt.stopPropagation()}
                onKeyDown={(evt) => evt.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-600 dark:text-gray-400 dark:hover:text-gray-100 hover:text-gray-900 text-2xl cursor-pointer"
                    aria-label="Close modal"
                >
                    <IoClose />
                </button>
                <h2 className="text-xl font-semibold mb-4">Settings</h2>
                <Settings />
            </div>
        </div>
    );
};
