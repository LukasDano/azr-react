import { CalendarDays, ClockFading, HouseWifi } from 'lucide-react';
import { type FC, useContext } from 'react';
import { MdOutlineResetTv } from 'react-icons/md';

import { HeaderButton } from './HeaderButton';
import { getBackgroundTheme } from '../../../static/themes.ts';
import { SettingContext, type SettingContextValues } from '../../context/SettingContext';

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
    const { showShortcuts, backgroundTheme } = useContext<SettingContextValues>(SettingContext);

    return (
        <nav
            className={`sticky top-0 z-39 flex justify-center rounded-b-xl border-slate-500 border-b bg-zinc-600 p-2 shadow-sm ${getBackgroundTheme(backgroundTheme).actionHeaderBg}`}
        >
            <div className="flex flex-wrap items-center justify-center gap-5">
                <HeaderButton
                    icon={<CalendarDays className={'h-6 w-6'} />}
                    tooltip={`Wochenzeitrechner öffnen ${showShortcuts ? '[alt + w]' : ''}`}
                    onClick={openWeekTimeAction}
                />
                <HeaderButton
                    icon={<HouseWifi className={'h-6 w-6'} />}
                    tooltip={`Flexofficerechner ${showShortcuts ? '[alt + h]' : ''}`}
                    onClick={openFlexOfficeAction}
                />
                <HeaderButton
                    icon={<ClockFading className={'h-6 w-6'} />}
                    tooltip={`Werte wenn jetzt ausgetragen wird ${showShortcuts ? '[alt + c]' : ''}`}
                    onClick={currentStatsAction}
                />
                <HeaderButton
                    icon={<MdOutlineResetTv className={'h-6 w-6'} />}
                    tooltip={`Eingaben zurücksetzen ${showShortcuts ? '[F1]' : ''}`}
                    onClick={resetAction}
                />
            </div>
        </nav>
    );
};
