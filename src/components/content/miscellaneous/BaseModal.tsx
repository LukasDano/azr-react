import { useHotkey } from '@tanstack/react-hotkeys';
import { type FC, type ReactNode, useContext } from 'react';
import { IoClose } from 'react-icons/io5';

import { getBackgroundTheme } from '../../../static/themes.ts';
import { SettingContext, type SettingContextValues } from '../../context/SettingContext.tsx';

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'xl2' | 'xl3' | 'full';

type BaseModalProps = {
    isOpen: boolean;
    onClose: () => void;
    children: ReactNode;
    modalTitle: string;
    modalHeader?: ReactNode;
    size?: ModalSize;
};

export const BaseModal: FC<BaseModalProps> = ({ modalTitle, isOpen, onClose, children, modalHeader, size = 'md' }) => {
    const { backgroundTheme } = useContext<SettingContextValues>(SettingContext);

    useHotkey({ key: 'Escape' }, onClose, { requireReset: true, preventDefault: true, eventType: 'keyup' });

    if (!isOpen) return null;

    const sizeClasses: Record<ModalSize, string> = {
        sm: 'max-w-md max-h-[60vh]',
        md: 'max-w-xl max-h-[70vh]',
        lg: 'max-w-3xl max-h-[80vh]',
        xl: 'max-w-5xl max-h-[85vh]',
        xl2: 'max-w-6xl min-h-[80vh] max-h-[90vh]',
        xl3: 'max-w-6xl min-h-[80vh] max-h-[90vh]',
        full: 'w-full h-full',
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-3 py-2 text-white backdrop-blur-sm transition-opacity duration-300"
            onClick={onClose}
        >
            <div
                className={`relative w-full rounded-lg bg-white p-6 text-black shadow-lg ${getBackgroundTheme(backgroundTheme).modalBg} dark:text-white ${sizeClasses[size]} flex flex-col`}
                onClick={(evt) => evt.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 cursor-pointer text-2xl text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100"
                    aria-label="Close modal"
                >
                    <IoClose />
                </button>

                {modalHeader || <h2 className="mb-4 font-semibold text-xl">{modalTitle}</h2>}

                {children}
            </div>
        </div>
    );
};
