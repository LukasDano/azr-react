import type { FC, ReactNode } from "react";

import Tippy from "@tippyjs/react";
import { useContext } from "react";

import type { SettingContextValues } from "../../context/SettingContext.tsx";

import { getThemeClasses } from "../../../static/themes.ts";
import { SettingContext } from "../../context/SettingContext.tsx";

export type Tab = {
    icon: ReactNode;
    title: string;
    id: number;
};

type TabBarProps = {
    tabs: Tab[];
    activeTabId: number;
    onTabChange: (id: number) => void;
};

export const TabBar: FC<TabBarProps> = ({ tabs, activeTabId, onTabChange }) => {
    const { colorTheme } = useContext<SettingContextValues>(SettingContext);

    const activeIndex = tabs.findIndex((tab) => tab.id === activeTabId);
    const tabCount = tabs.length;

    return (
        <div className={"max-w-3xl px-8 sm:px-0"}>
            <div className={"sm:w-7/12"}>
                <div
                    role={"tablist"}
                    aria-label={"tabs"}
                    className={
                        "relative flex h-12 w-105 items-center overflow-hidden rounded-full border border-white/20 bg-gray-600/30 px-1 shadow-2xl shadow-black/20 backdrop-blur-xl transition dark:bg-gray-200/20"
                    }
                >
                    <div
                        className={`absolute top-1/2 h-11 -translate-y-1/2 rounded-full shadow-md transition-all duration-200 ease-in-out ${getThemeClasses(colorTheme)}`}
                        style={{
                            left: `${activeIndex * (100 / tabCount)}%`,
                            width: `${100 / tabCount}%`
                        }}
                    />
                    {tabs.map((tab) => (
                        <TabButton
                            key={tab.id}
                            tab={tab}
                            active={tab.id === activeTabId}
                            onClick={() => onTabChange(tab.id)}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

type TabButtonProps = {
    tab: Tab;
    active: boolean;
    onClick: () => void;
};

const TabButton: FC<TabButtonProps> = ({ tab, active, onClick }) => {
    return (
        <Tippy content={tab.title}>
            <button
                role={"tab"}
                aria-selected={active}
                aria-controls={`panel-${tab.id}`}
                id={`tab-${tab.id}`}
                tabIndex={active ? 0 : -1}
                className={
                    "z-10 flex h-full min-w-0 flex-1 items-center justify-center text-xs font-medium transition-colors focus:outline-none"
                }
                onClick={onClick}
            >
                <span
                    className={`truncate text-xs transition-colors ${active ? "font-semibold text-gray-900" : "text-gray-400 hover:text-white"}`}
                >
                    {tab.icon}
                </span>
            </button>
        </Tippy>
    );
};
