import { CalendarDays, ClockFading, HouseWifi } from 'lucide-react';
import { type FC, useContext } from 'react';
import { MdOutlineResetTv } from 'react-icons/md';

import { SettingContext, type SettingContextValues } from '../../context/SettingContext';
import { HeaderButton } from './HeaderButton';

type ActionHeaderProps = {
    currentStatsAction: () => void;
    resetAction: () => void;
    openWeekTimeAction: () => void;
    openFlexOfficeAction: () => void;
};

export const ActionHeader: FC<ActionHeaderProps> = ({
    currentStatsAction,
    resetAction,
    openWeekTimeAction,
    openFlexOfficeAction,
}) => {
    const { showShortcuts } = useContext<SettingContextValues>(SettingContext);

    return (
        <nav
            className={`bg-zinc-600 dark:bg-gray-700 border-slate-500 dark:border-slate-900
                p-2 border-b flex justify-center sticky top-0 z-39 shadow-sm rounded-b-xl`}
        >
            <div className="flex items-center gap-5 flex-wrap justify-center">
                <HeaderButton
                    icon={<CalendarDays className={'w-6 h-6'} />}
                    tooltip={`Wochenzeitrechner öffnen ${showShortcuts ? '[alt + w]' : ''}`}
                    onClick={openWeekTimeAction}
                />
                <HeaderButton
                    icon={<HouseWifi className={'w-6 h-6'} />}
                    tooltip={`Flexofficerechner ${showShortcuts ? '[alt + h]' : ''}`}
                    onClick={openFlexOfficeAction}
                />
                <HeaderButton
                    icon={<ClockFading className={'w-6 h-6'} />}
                    tooltip={`Werte wenn jetzt ausgetragen wird ${showShortcuts ? '[alt + c]' : ''}`}
                    onClick={currentStatsAction}
                />
                <HeaderButton
                    icon={<MdOutlineResetTv className={'w-6 h-6'} />}
                    tooltip={`Eingaben zurücksetzen ${showShortcuts ? '[F1]' : ''}`}
                    onClick={resetAction}
                />
            </div>
        </nav>
    );
};
