import { Palette, Pickaxe } from 'lucide-react';

import { availableThemes, backgroundThemes } from '../../static/themes.ts';
import { notificationPositions } from '../../utils/page/notifications.ts';
import type { Tab } from '../content/miscellaneous/TabBar.tsx';

const tabIconClasses = 'h-5 w-5';

type SettingTabName = 'design' | 'funktionen';

export const settingTabsByName: Record<SettingTabName, Omit<Tab, 'title'>> = {
    design: { id: 0, icon: <Palette className={tabIconClasses} /> },
    funktionen: { id: 1, icon: <Pickaxe className={tabIconClasses} /> },
};

export const settingTabs: Tab[] = Object.entries(settingTabsByName).map(([name, tab]) => ({
    title: name,
    id: tab.id,
    icon: tab.icon,
}));

type SettingInput = 'SettingsToggle' | 'ColorPicker' | 'DropDownSelect';

export type SettingId =
    | 'darkMode'
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
        id: 'darkMode',
        name: 'Dark Mode',
        component: 'SettingsToggle',
        tabId: settingTabsByName.design.id,
    },
    {
        id: 'backgroundTheme',
        name: 'DarkMode Background Theme',
        component: 'DropDownSelect',
        options: Object.keys(backgroundThemes),
        tabId: settingTabsByName.design.id,
    },
    {
        id: 'countdownHours',
        name: 'Countdown Farbe für Stunden',
        component: 'ColorPicker',
        funcParamKey: 'hours',
        tabId: settingTabsByName.design.id,
    },
    {
        id: 'countdownMinutes',
        name: 'Countdown Farbe für Minuten',
        component: 'ColorPicker',
        funcParamKey: 'minutes',
        tabId: settingTabsByName.design.id,
    },
    {
        id: 'countdownSeconds',
        name: 'Countdown Farbe für Sekunden',
        component: 'ColorPicker',
        funcParamKey: 'seconds',
        tabId: settingTabsByName.design.id,
    },
    {
        id: 'lightModeTheme',
        name: 'LightMode Theme',
        component: 'DropDownSelect',
        funcParamKey: 'light',
        options: Object.keys(availableThemes),
        tabId: settingTabsByName.design.id,
    },
    {
        id: 'darkModeTheme',
        name: 'DarkMode Theme',
        component: 'DropDownSelect',
        funcParamKey: 'dark',
        options: Object.keys(availableThemes),
        tabId: settingTabsByName.design.id,
    },
    {
        id: 'notificationPosition',
        name: 'Benachrichtigungsposition',
        component: 'DropDownSelect',
        options: Object.keys(notificationPositions),
        tabId: settingTabsByName.design.id,
    },
    {
        id: 'displayShortcuts',
        name: 'Shortcuts anzeigen',
        component: 'SettingsToggle',
        tabId: settingTabsByName.design.id,
    },
    {
        id: 'overtimeAutomatic',
        name: 'Nach Arbeitsende automatisch erhöhen',
        component: 'SettingsToggle',
        tabId: settingTabsByName.funktionen.id,
    },
];
