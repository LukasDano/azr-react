import type { FC } from 'react';

import { BaseModal } from '../content/miscellaneous/BaseModal.tsx';

export type DefaultErrorBoundaryProps = {
    title: string;
    description: string;
};

export const ModalErrorBoundary: FC<DefaultErrorBoundaryProps> = ({ title, description }) => {
    return (
        <BaseModal isOpen={true} onClose={() => globalThis.location.reload()} modalTitle={title} size={'xl'}>
            <p className="text-red-600 text-sm leading-relaxed dark:text-red-200">{description}</p>
        </BaseModal>
    );
};
