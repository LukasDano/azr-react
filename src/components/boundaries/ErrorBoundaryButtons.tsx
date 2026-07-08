import type { ReactNode } from "react";

import { History, MailPlus, RotateCcw } from "lucide-react";

import { FromFunctionButton } from "../library/BaseButton";

export const ReloadPageButton = (): ReactNode => (
    <FromFunctionButton onClick={() => globalThis.location.reload()} icon={<RotateCcw />} tooltip={"Reload"} />
);

export const CreateIssueButton = (): ReactNode => (
    <FromFunctionButton
        onClick={() => open("https://github.com/LukasDano/azr-react/issues", "_blank")}
        icon={<MailPlus />}
        tooltip={"Please create a new issue"}
    />
);

export const UseTheOldVersionButton = (): ReactNode => (
    <FromFunctionButton
        onClick={() => open("https://lukasdano.github.io/arbeitszeitrechner/")}
        icon={<History />}
        tooltip={"Use the old version"}
    />
);
