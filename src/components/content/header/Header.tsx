import { ChevronDown, ChevronUp } from 'lucide-react';
import type { FC } from 'react';
import { useContext, useState } from 'react';
import { MdHelpOutline } from 'react-icons/md';
import { PiGearDuotone } from 'react-icons/pi';

import {
    defaultBreakTime,
    defaultWorkTime,
    defaultWorkTimeForSixHourMode,
    emptyTimeValue,
} from '../../../static/defaultValues';
import { parseTimeToString } from '../../../utils/typeUtilities/time';
import { AppContext, type AppContextValues } from '../../context/AppContext';
import { SettingContext, type SettingContextValues } from '../../context/SettingContext';
import { ActionHeader } from './ActionHeader';
import { HeaderButton } from './HeaderButton';
import { HeaderDropDownSelect } from './HeaderDropDownSelect.tsx';

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
    const { showShortcuts } = useContext<SettingContextValues>(SettingContext);
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
                className={`bg-zinc-700 dark:bg-gray-800 border-slate-300 dark:border-slate-900
                p-4 border-b flex items-center justify-between sticky top-0 shadow z-40`}
            >
                <h1 className="text-4xl font-bold text-white">Arbeitszeitrechner</h1>

                <div className="flex items-center gap-6 flex-wrap justify-end">
                    <HeaderDropDownSelect
                        selectedItem={parseTimeToString(workTime)}
                        items={availableWorkTimes}
                        onChange={(val) => handleWorkTimeModeChange(val)}
                    />
                    <HeaderButton
                        icon={<MdHelpOutline className={'w-6 h-6'} />}
                        tooltip={'Problem melden'}
                        onClick={openGitHubIssues}
                    />
                    <HeaderButton
                        icon={<PiGearDuotone className={'w-6 h-6'} />}
                        tooltip={`Einstellungen ${showShortcuts ? '[alt + i]' : ''}`}
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
