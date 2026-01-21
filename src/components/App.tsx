import { Toaster } from 'sonner';

import { Content } from './main/Content';

export const App = () => {
    return (
        <>
            <Toaster position="bottom-right" closeButton={true} richColors={true} theme={'dark'} />
            <Content />
        </>
    );
};
