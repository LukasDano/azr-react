import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FC } from 'react';
import { useContext, useState } from 'react';
import { MdHelpOutline } from 'react-icons/md';
import { PiGearDuotone } from 'react-icons/pi';

import { ActionHeader } from './ActionHeader';
import { HeaderButton } from './HeaderButton';
import { HeaderDropDownSelect } from './HeaderDropDownSelect.tsx';
import {
    defaultBreakTime,
    defaultWorkTime,
    defaultWorkTimeForSixHourMode,
    emptyTimeValue,
} from '../../../static/defaultValues';
import { getBackgroundTheme } from '../../../static/themes.ts';
import { parseTimeToString } from '../../../utils/typeUtilities/time';
import { AppContext, type AppContextValues } from '../../context/AppContext';
import { SettingContext, type SettingContextValues } from '../../context/SettingContext';

type HeaderProps = {
    openSettings: () => void;
    openWeekTime: () => void;
    openFlexOffice: () => void;
    resetAction: () => void;
    currentStatsAction: () => void;
};

export const Header: FC<HeaderProps> = ({
    openSettings,
    openWeekTime,
    openFlexOffice,
    resetAction,
    currentStatsAction,
}) => {
    const { showShortcuts, backgroundTheme } = useContext<SettingContextValues>(SettingContext);
    const { updateBreakTime, workTime, updateWorkTime } = useContext<AppContextValues>(AppContext);

    const [actionHeaderOpen, setActionHeaderOpen] = useState<boolean>(false);

    const availableWorkTimes = [defaultWorkTime, defaultWorkTimeForSixHourMode].map(parseTimeToString);

    const handleWorkTimeModeChange = (workTimeStr: string): void => {
        if (workTimeStr === '06:00') {
            updateWorkTime(defaultWorkTimeForSixHourMode);
            updateBreakTime(emptyTimeValue);
        } else {
            updateWorkTime(defaultWorkTime);
            updateBreakTime(defaultBreakTime);
        }
    };

    const openGitHubIssues = (): void => {
        open('https://github.com/LukasDano/azr-react/issues', '_blank');
    };

    return (
        <>
            <nav
                className={`sticky top-0 z-40 flex items-center justify-between border-slate-300 border-b bg-zinc-700 p-4 shadow ${getBackgroundTheme(backgroundTheme).headerBg}`}
            >
                <h1 className="font-bold text-4xl text-white">Arbeitszeitrechner</h1>

                <div className="flex flex-wrap items-center justify-end gap-6">
                    <HeaderDropDownSelect
                        selectedItem={parseTimeToString(workTime)}
                        items={availableWorkTimes}
                        onChange={(val) => handleWorkTimeModeChange(val)}
                    />
                    <HeaderButton
                        icon={<MdHelpOutline className={'h-6 w-6'} />}
                        tooltip={'Problem melden'}
                        onClick={openGitHubIssues}
                    />
                    <HeaderButton
                        icon={<PiGearDuotone className={'h-6 w-6'} />}
                        tooltip={`Einstellungen ${showShortcuts ? '[alt + i]' : ''}`}
                        onClick={openSettings}
                    />
                    <HeaderButton
                        icon={
                            actionHeaderOpen ? (
                                <ChevronUp className={'h-6 w-6'} />
                            ) : (
                                <ChevronDown className={'h-6 w-6'} />
                            )
                        }
                        tooltip={'Zusätzliche Funktionen'}
                        onClick={() => setActionHeaderOpen(!actionHeaderOpen)}
                    />
                </div>
            </nav>
            {actionHeaderOpen && (
                <ActionHeader
                    currentStatsAction={currentStatsAction}
                    resetAction={resetAction}
                    openWeekTimeAction={openWeekTime}
                    openFlexOfficeAction={openFlexOffice}
                />
            )}
        </>
    );
};
