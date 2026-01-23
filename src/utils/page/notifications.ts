import { toast } from 'sonner';

export const sendSuccessMessage = (msg: string, desc?: string) => {
    if (desc) toast.success(msg, { description: desc });
    else toast.success(msg);
};

export const sendErrorMessage = (msg: string, desc?: string) => {
    if (desc) toast.error(msg, { description: desc });
    else toast.error(msg);
};

export const sendInfoMessage = (msg: string, desc?: string) => {
    if (desc) toast.info(msg, { description: desc });
    else toast.info(msg);
};

export const sendWarnMessage = (msg: string, desc?: string) => {
    if (desc) toast.warning(msg, { description: desc });
    else toast.warning(msg);
};
