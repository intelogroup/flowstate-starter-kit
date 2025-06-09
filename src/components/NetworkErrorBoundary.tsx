
import { Component, ReactNode } from 'react';
import { CriticalErrorPage } from './ErrorStates';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class NetworkErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: any) {
    console.error('Network Error Boundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <CriticalErrorPage
          title="Connection Error"
          message="We're having trouble connecting to our servers. Please check your internet connection and try again."
          onRetry={() => {
            this.setState({ hasError: false });
            window.location.reload();
          }}
          onHelp={() => {
            // Navigate to help page or show help modal
            window.open('/help', '_blank');
          }}
        />
      );
    }

    return this.props.children;
  }
}
