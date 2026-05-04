import type { FC } from 'react';

import { CreateIssueButton, ReloadPageButton, UseTheOldVersionButton } from './ErrorBoundaryButtons.tsx';
import type { DefaultErrorBoundaryProps } from './ModalErrorBoundary.tsx';

export const PanelErrorBoundary: FC<DefaultErrorBoundaryProps> = ({ title, description }) => {
    return (
        <div className="flex items-center justify-center px-4">
            <div className="w-full max-w-sm rounded-xl border border-red-500 bg-red-100 p-6 shadow dark:border-red-700 dark:bg-red-900">
                <div className="space-y-3 text-left">
                    <h2 className="font-semibold text-lg text-red-700 dark:text-red-300">{`Error: ${title}`}</h2>

                    <p className="whitespace-pre-line text-red-600 text-sm leading-relaxed dark:text-red-200">
                        {description}
                    </p>
                </div>

                <div className="mt-6 flex w-full gap-2">
                    <ReloadPageButton />
                    <CreateIssueButton />
                    <UseTheOldVersionButton />
                </div>
            </div>
        </div>
    );
};
