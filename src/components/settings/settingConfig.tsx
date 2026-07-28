import { Palette, Pickaxe } from "lucide-react";

import type { Tab } from "../library/TabBar.tsx";

const tabIconClasses = "h-5 w-5";

type SettingTabName = "Design" | "Funktionen";

export const settingTabsByName: Record<SettingTabName, Omit<Tab, "title">> = {
    Design: { id: 0, icon: <Palette className={tabIconClasses} /> },
    Funktionen: { id: 1, icon: <Pickaxe className={tabIconClasses} /> }
};

export const settingTabs: Tab[] = Object.entries(settingTabsByName).map(([name, tab]) => ({
    title: name,
    id: tab.id,
    icon: tab.icon
}));
