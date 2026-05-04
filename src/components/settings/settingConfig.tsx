import { Palette, Pickaxe } from 'lucide-react';

import type { Tab } from '../content/miscellaneous/TabBar.tsx';

const tabIconClasses = 'h-5 w-5';

export const settingTabs: Tab[] = [
    { title: 'Design', id: 0, icon: <Palette className={tabIconClasses} /> },
    { title: 'Funktionen', id: 1, icon: <Pickaxe className={tabIconClasses} /> },
];
