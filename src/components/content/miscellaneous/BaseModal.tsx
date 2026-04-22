import type { FC, ReactNode } from 'react';
import { IoClose } from 'react-icons/io5';

type BaseModalProps = {
    modalTitle: string;
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
};

export const BaseModal: FC<BaseModalProps> = ({ modalTitle, isOpen, onClose, children }) => {
    if (!isOpen) return null;

    document.addEventListener('keydown', (evt) => {
        if (evt.key === 'Escape') onClose();
    });

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 py-2 text-white backdrop-blur-sm transition-opacity duration-300"
            onKeyDown={(evt) => {
                if (evt.key === 'Escape') onClose();
            }}
        >
            <div
                className="relative w-full max-w-2xl rounded-lg bg-white p-6 text-black shadow-lg dark:bg-gray-800 dark:text-white"
                onClick={(evt) => evt.stopPropagation()}
                onKeyDown={(evt) => evt.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    aria-label="Close modal"
                >
                    <IoClose />
                </button>
                <h2 className="mb-4 font-semibold text-xl">{modalTitle}</h2>
                <div className={'max-h-150'}>{children}</div>
            </div>
        </div>
    );
};
