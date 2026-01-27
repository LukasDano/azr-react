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
                className="flex flex-row items-center justify-between p-3 mb-2 cursor-pointer
                          bg-gray-50 dark:bg-gray-800 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700
                          transition-all duration-200 w-full"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex flex-row items-baseline">
                    <span className="text-lg mr-3">{icon}</span>
                    <span className="text-lg font-bold text-gray-900 dark:text-gray-100">{title}</span>
                </div>

                <div className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    <Play className={'w-5 h-5 rotate-90'} />
                </div>
            </button>

            <div
                className={`overflow-hidden transition-all duration-300 ease-in-out
                ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="p-4 pt-0 space-y-3">{children}</div>
            </div>

            {!isOpen && <hr className="border-t border-gray-200 dark:border-gray-600 my-6" />}
        </div>
    );
};
