import type { FC } from 'react';

import { CreateIssueButton, UseTheOldVersionButton } from './ErrorBoundaryButtons.tsx';
import { BaseModal } from '../content/miscellaneous/BaseModal.tsx';

export type DefaultErrorBoundaryProps = {
    title: string;
    description: string;
};

export const ModalErrorBoundary: FC<DefaultErrorBoundaryProps> = ({ title, description }) => {
    return (
        <BaseModal isOpen={true} onClose={() => globalThis.location.reload()} modalTitle={title} size={'xl'}>
            <p className="whitespace-pre-line text-sm leading-relaxed dark:text-red-200">{description}</p>

            <div className="mt-6 flex w-full gap-2">
                <CreateIssueButton />
                <UseTheOldVersionButton />
            </div>
        </BaseModal>
    );
};
