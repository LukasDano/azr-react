import { Play } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { useState } from 'react';

type SettingsGroupProps = {
    title: string;
    icon: ReactNode;
    children: ReactNode;
    defaultOpen?: boolean;
};

export const SettingsGroup: FC<SettingsGroupProps> = ({ title, icon, children, defaultOpen = false }) => {
    const [isOpen, setIsOpen] = useState<boolean>(defaultOpen);

    return (
        <div className="w-full">
            <button
                className="z-10 mb-2 flex w-full cursor-pointer flex-row items-center justify-between rounded-lg bg-gray-50 p-3 transition-all duration-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-row items-baseline">
                    <span className="mr-3 text-lg">{icon}</span>
                    <span className="font-bold text-gray-900 text-lg dark:text-gray-100">{title}</span>
                </div>

                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <Play className={'h-5 w-5 rotate-90'} />
                </div>
            </button>

            <div
                className={`transition-all duration-300 ease-in-out ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="space-y-3 p-4 pt-0">{children}</div>
            </div>

            {!isOpen && <hr className="my-6 border-gray-200 border-t dark:border-gray-600" />}
        </div>
    );
};
