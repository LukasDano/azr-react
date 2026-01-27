import { ClockFading } from 'lucide-react';
import type { FC } from 'react';
import { MdOutlineResetTv } from 'react-icons/md';

import { HeaderButton } from './HeaderButton';

type ActionHeaderProps = {
    currentStatsAction: () => void;
    resetAction: () => void;
};

export const ActionHeader: FC<ActionHeaderProps> = ({ currentStatsAction, resetAction }) => {
    return (
        <nav
            className={`bg-zinc-600 dark:bg-gray-700 border-slate-500 dark:border-slate-900
                p-2 border-b flex justify-center sticky top-0 z-40 shadow-sm rounded-b-xl`}
        >
            <div className="flex items-center gap-5 flex-wrap justify-center">
                <HeaderButton
                    icon={<ClockFading className={'w-6 h-6'} />}
                    tooltip={'Werte wenn jetzt ausgetragen wird'}
                    onClick={currentStatsAction}
                />
                <HeaderButton
                    icon={<MdOutlineResetTv className={'w-6 h-6'} />}
                    tooltip={'Eingaben zurücksetzen [F1]'}
                    onClick={resetAction}
                />
            </div>
        </nav>
    );
};
