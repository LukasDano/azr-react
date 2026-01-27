import { ChevronDown, ChevronUp } from 'lucide-react';
import { type FC, useState } from 'react';
import { MdHelpOutline } from 'react-icons/md';
import { PiGearDuotone } from 'react-icons/pi';

import { ActionHeader } from './ActionHeader';
import { HeaderButton } from './HeaderButton';

type HeaderProps = {
    openSettings: () => void;
    resetAction: () => void;
    currentStatsAction: () => void;
};

export const Header: FC<HeaderProps> = ({ openSettings, resetAction, currentStatsAction }) => {
    const [actionHeaderOpen, setActionHeaderOpen] = useState<boolean>(false);

    const openGitHubIssues = (): void => {
        open('https://github.com/LukasDano/azr-react/issues', '_blank');
    };

    return (
        <>
            <nav
                className={`bg-zinc-700 dark:bg-gray-800 border-slate-300 dark:border-slate-900
                p-4 border-b flex items-center justify-between sticky top-0 shadow z-40`}
            >
                <h1 className="text-4xl font-bold text-white">Arbeitszeitrechner</h1>

                <div className="flex items-center gap-6 flex-wrap justify-end">
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
                    <HeaderButton
                        icon={
                            actionHeaderOpen ? (
                                <ChevronUp className={'w-6 h-6'} />
                            ) : (
                                <ChevronDown className={'w-6 h-6'} />
                            )
                        }
                        tooltip={'Zusätzliche Funktionen'}
                        onClick={() => setActionHeaderOpen(!actionHeaderOpen)}
                    />
                </div>
            </nav>
            {actionHeaderOpen && <ActionHeader currentStatsAction={currentStatsAction} resetAction={resetAction} />}
        </>
    );
};
