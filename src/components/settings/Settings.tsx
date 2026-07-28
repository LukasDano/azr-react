import type { FC } from "react";

import { lazy, Suspense, useContext, useMemo, useState } from "react";

import type { PackageInfos } from "../../utils/utils.ts";
import type { SettingContextValues } from "../context/setting/SettingContext.tsx";

import { getBackgroundTheme } from "../../utils/themes.ts";
import { getPackageInfos } from "../../utils/utils.ts";
import { SettingContext } from "../context/setting/SettingContext.tsx";
import { Loader } from "../library/Loader.tsx";
import { TabBar } from "../library/TabBar.tsx";
import { settingTabs, settingTabsByName } from "./settingConfig.tsx";

const DesignSettings = lazy(() => import("./DesignSettings.tsx"));
const FunctionSettings = lazy(() => import("./FunctionSettings.tsx"));

export const Settings: FC = () => {
    const { backgroundTheme } = useContext<SettingContextValues>(SettingContext);

    const [activeTabId, setActiveTabId] = useState<number>(settingTabsByName.Design.id);

    const packageInfos = useMemo<PackageInfos>(getPackageInfos, []);

    const settingsContainerClasses = useMemo(
        () => `flex flex-col rounded-2xl bg-gray-200 p-4 shadow-sm ${getBackgroundTheme(backgroundTheme).settingsBg}`,
        [backgroundTheme]
    );

    return (
        <div className={"flex h-full w-full flex-col gap-4 overflow-auto p-4"}>
            <div className={"flex w-full justify-center"}>
                <TabBar tabs={settingTabs} activeTabId={activeTabId} onTabChange={setActiveTabId} />
            </div>

            <div className={`gap-4 ${settingsContainerClasses}`}>
                {settingTabsByName.Design.id === activeTabId && (
                    <Suspense fallback={<Loader loaderIcon={"fade"} />}>
                        <DesignSettings />
                    </Suspense>
                )}

                {settingTabsByName.Funktionen.id === activeTabId && (
                    <Suspense fallback={<Loader loaderIcon={"fade"} />}>
                        <FunctionSettings />
                    </Suspense>
                )}
            </div>

            <div className={settingsContainerClasses}>
                <div className={"flex flex-col items-center"}>
                    <span className={"text-xl font-bold text-gray-900 dark:text-gray-100"}>
                        {packageInfos.projectName}
                    </span>
                    {Object.entries(packageInfos)
                        .filter(([key]) => key !== "projectName")
                        .map(([key, val]) => (
                            <span className={"text-sm text-gray-500 dark:text-gray-300"}>
                                {`${key.toLocaleUpperCase()}: ${val}`}
                            </span>
                        ))}
                </div>
            </div>
        </div>
    );
};
