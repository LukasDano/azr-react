import type { ErrorInfo, ReactNode } from 'react';
import { Component } from 'react';

import { ModalErrorBoundary } from './ModalErrorBoundary.tsx';

type CaughtError = {
    name: string;
    msg: string;
};

type ErrorBoundaryProps = {
    fallbackText?: string;
    fallbackNode?: (err: CaughtError) => ReactNode;
    children: ReactNode;
};

type ErrorBoundaryState = {
    hasError: boolean;
    errName: string;
    errMsg: string;
};

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
    static defaultErrText =
        '\n\nFirst try to reload the page, but if this error keeps appearing please create a ticket for it.' +
        '\nIn the meantime feel free use the old version of the app.';

    state: ErrorBoundaryState = {
        hasError: false,
        errName: '',
        errMsg: ErrorBoundary.defaultErrText,
    };

    static getDerivedStateFromError(err: Error): ErrorBoundaryState {
        const errMsg = `${err.message} ${ErrorBoundary.defaultErrText}`;
        return { hasError: true, errName: err.name, errMsg: errMsg };
    }

    componentDidCatch(error: Error, errInf: ErrorInfo): void {
        console.error('ErrorBoundary caught', error);
        console.error('Info', errInf);
    }

    render(): ReactNode {
        if (this.state.hasError) {
            if (this.props.fallbackNode)
                return this.props.fallbackNode({
                    name: this.state.errName,
                    msg: this.state.errMsg,
                });

            if (this.props.fallbackText) return this.props.fallbackText;

            return <ModalErrorBoundary title={this.state.errName} description={this.state.errMsg} />;
        }

        return this.props.children;
    }
}
