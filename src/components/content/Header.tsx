import Tippy from '@tippyjs/react';
import { ClockFading } from 'lucide-react';
import type { FC, ReactNode } from 'react';
import { MdHelpOutline, MdOutlineResetTv } from 'react-icons/md';
import { PiGearDuotone } from 'react-icons/pi';

import { themeColorClasses } from '../../static/themes';

type HeaderProps = {
    openSettings: () => void;
    resetAction: () => void;
    currentStatsAction: () => void;
};

export const Header: FC<HeaderProps> = ({ openSettings, resetAction, currentStatsAction }) => {
    const openGitHubIssues = (): void => {
        open('https://github.com/LukasDano/azr-react/issues', '_blank');
    };

    return (
        <nav
            className={`bg-zinc-700 dark:bg-gray-800 border-slate-300 dark:border-slate-900
                p-4 border-b flex items-center justify-between sticky top-0 z-50 shadow`}
        >
            <h1 className="text-4xl font-bold text-white">Arbeitszeitrechner</h1>

            <div className="flex items-center gap-6 flex-wrap justify-end">
                <HeaderButton
                    icon={<ClockFading className={'w-6 h-6'} />}
                    tooltip={'Zeigt die Werte an, wenn jetzt die Arbeit beendet wird'}
                    onClick={currentStatsAction}
                />
                <HeaderButton
                    icon={<MdOutlineResetTv className={'w-6 h-6'} />}
                    tooltip={'Eingaben zurücksetzen [F1]'}
                    onClick={resetAction}
                />
                <HeaderButton
                    icon={<MdHelpOutline className={'w-6 h-6'} />}
                    tooltip={'Problem melden'}
                    onClick={openGitHubIssues}
                />
                <HeaderButton
                    icon={<PiGearDuotone className={'w-6 h-6'} />}
                    tooltip={'Einstellungen'}
                    onClick={openSettings}
                />
            </div>
        </nav>
    );
};

type HeaderButtonProps = {
    onClick: () => void;
    icon: ReactNode;
    tooltip: string;
};

const HeaderButton: FC<HeaderButtonProps> = ({ icon, onClick, tooltip }) => {
    return (
        <Tippy content={tooltip}>
            <button
                className={'flex items-center gap-2 px-4 py-2 rounded-lg shadow transition' + themeColorClasses}
                onClick={onClick}
            >
                {icon}
            </button>
        </Tippy>
    );
};
