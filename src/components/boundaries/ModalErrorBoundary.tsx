import type { FC } from "react";

import { BaseModal } from "../content/miscellaneous/BaseModal.tsx";
import { CreateIssueButton, UseTheOldVersionButton } from "./ErrorBoundaryButtons.tsx";

export type DefaultErrorBoundaryProps = {
    title: string;
    description: string;
};

export const ModalErrorBoundary: FC<DefaultErrorBoundaryProps> = ({ title, description }) => {
    return (
        <BaseModal isOpen onClose={() => globalThis.location.reload()} modalTitle={title} size={"xl"}>
            <p className={"text-sm leading-relaxed whitespace-pre-line dark:text-red-200"}>{description}</p>

            <div className={"mt-6 flex w-full gap-2"}>
                <CreateIssueButton />
                <UseTheOldVersionButton />
            </div>
        </BaseModal>
    );
};
