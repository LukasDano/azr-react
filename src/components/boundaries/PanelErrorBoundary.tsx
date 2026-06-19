import type { FC } from 'react';

import type { DefaultErrorBoundaryProps } from './ModalErrorBoundary.tsx';

import { CreateIssueButton, ReloadPageButton, UseTheOldVersionButton } from './ErrorBoundaryButtons.tsx';

export const PanelErrorBoundary: FC<DefaultErrorBoundaryProps> = ({ title, description }) => {
    return (
        <div className={'flex items-center justify-center px-4'}>
            <div
                className={
                    'w-full max-w-sm rounded-xl border border-red-500 bg-red-100 p-6 shadow dark:border-red-700 dark:bg-red-900'
                }
            >
                <div className={'space-y-3 text-left'}>
                    <h2 className={'text-lg font-semibold text-red-700 dark:text-red-300'}>{`Error: ${title}`}</h2>

                    <p className={'text-sm leading-relaxed whitespace-pre-line text-red-600 dark:text-red-200'}>
                        {description}
                    </p>
                </div>

                <div className={'mt-6 flex w-full gap-2'}>
                    <ReloadPageButton />
                    <CreateIssueButton />
                    <UseTheOldVersionButton />
                </div>
            </div>
        </div>
    );
};
