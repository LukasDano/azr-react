import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./components/App.tsx";
import { ErrorBoundary } from "./components/boundaries/ErrorBoundary.tsx";
import { AppContextProvider } from "./components/context/app/AppContextProvider.tsx";
import "./index.css";
import { SettingContextProvider } from "./components/context/setting/SettingContextProvider.tsx";
import { getPackageInfos } from "./utils/utils.ts";

const queryClient = new QueryClient();

document.addEventListener("DOMContentLoaded", () => {
    const isInDevMode = import.meta.env.DEV;
    const packageInfos = getPackageInfos();
    const mode = import.meta.env.MODE;

    console.info(`${packageInfos.projectName} v${packageInfos.version} [${mode}]`);

    const currentTitle = document.title;
    document.title = isInDevMode ? `💻 ${packageInfos.projectName}` : currentTitle;
});

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ErrorBoundary>
                <AppContextProvider>
                    <SettingContextProvider>
                        <App />
                    </SettingContextProvider>
                </AppContextProvider>
            </ErrorBoundary>
        </QueryClientProvider>
    </StrictMode>
);
