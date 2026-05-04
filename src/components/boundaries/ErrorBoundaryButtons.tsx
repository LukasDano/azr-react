import { History, MailPlus, RotateCcw } from 'lucide-react';

import { FromFunctionButton } from '../content/miscellaneous/BaseButton.tsx';

export const ReloadPageButton = () => (
    <FromFunctionButton onClick={() => globalThis.location.reload()} icon={<RotateCcw />} tooltip={'Reload'} />
);

export const CreateIssueButton = () => (
    <FromFunctionButton
        onClick={() => open('https://github.com/LukasDano/azr-react/issues', '_blank')}
        icon={<MailPlus />}
        tooltip={'Please create a new issue'}
    />
);

export const UseTheOldVersionButton = () => (
    <FromFunctionButton
        onClick={() => open('https://lukasdano.github.io/arbeitszeitrechner/')}
        icon={<History />}
        tooltip={'Use the old version'}
    />
);
