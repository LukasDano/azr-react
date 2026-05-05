import { Palette, Pickaxe } from 'lucide-react';

import { availableThemes, backgroundThemes } from '../../static/themes.ts';
import { notificationPositions } from '../../utils/page/notifications.ts';
import type { Tab } from '../content/miscellaneous/TabBar.tsx';

const tabIconClasses = 'h-5 w-5';

type SettingTabName = 'Design' | 'Funktionen';

export const settingTabsByName: Record<SettingTabName, Omit<Tab, 'title'>> = {
    Design: { id: 0, icon: <Palette className={tabIconClasses} /> },
    Funktionen: { id: 1, icon: <Pickaxe className={tabIconClasses} /> },
};

export const settingTabs: Tab[] = Object.entries(settingTabsByName).map(([name, tab]) => ({
    title: name,
    id: tab.id,
    icon: tab.icon,
}));

type SettingInput = 'SettingsToggle' | 'ColorPicker' | 'DropDownSelect';

export type SettingId =
    | 'countdownHours'
    | 'countdownMinutes'
    | 'countdownSeconds'
    | 'backgroundTheme'
    | 'lightModeTheme'
    | 'darkModeTheme'
    | 'notificationPosition'
    | 'displayShortcuts'
    | 'overtimeAutomatic';

type Setting = {
    id: SettingId;
    name: string;
    component: SettingInput;
    funcParamKey?: string;
    options?: string[];
    tabId: number;
};

export const settingsConfig: Setting[] = [
    {
        id: 'backgroundTheme',
        name: 'Website Theme',
        component: 'DropDownSelect',
        options: ['light', ...Object.keys(backgroundThemes)],
        tabId: settingTabsByName.Design.id,
    },
    {
        id: 'countdownHours',
        name: 'Countdown Farbe für Stunden',
        component: 'ColorPicker',
        funcParamKey: 'hours',
        tabId: settingTabsByName.Design.id,
    },
    {
        id: 'countdownMinutes',
        name: 'Countdown Farbe für Minuten',
        component: 'ColorPicker',
        funcParamKey: 'minutes',
        tabId: settingTabsByName.Design.id,
    },
    {
        id: 'countdownSeconds',
        name: 'Countdown Farbe für Sekunden',
        component: 'ColorPicker',
        funcParamKey: 'seconds',
        tabId: settingTabsByName.Design.id,
    },
    {
        id: 'lightModeTheme',
        name: 'LightMode Theme',
        component: 'DropDownSelect',
        funcParamKey: 'light',
        options: Object.keys(availableThemes),
        tabId: settingTabsByName.Design.id,
    },
    {
        id: 'darkModeTheme',
        name: 'DarkMode Theme',
        component: 'DropDownSelect',
        funcParamKey: 'dark',
        options: Object.keys(availableThemes),
        tabId: settingTabsByName.Design.id,
    },
    {
        id: 'notificationPosition',
        name: 'Benachrichtigungsposition',
        component: 'DropDownSelect',
        options: Object.keys(notificationPositions),
        tabId: settingTabsByName.Design.id,
    },
    {
        id: 'displayShortcuts',
        name: 'Shortcuts anzeigen',
        component: 'SettingsToggle',
        tabId: settingTabsByName.Funktionen.id,
    },
    {
        id: 'overtimeAutomatic',
        name: 'Nach Arbeitsende automatisch erhöhen',
        component: 'SettingsToggle',
        tabId: settingTabsByName.Funktionen.id,
    },
];
