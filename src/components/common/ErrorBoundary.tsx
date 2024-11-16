import React from 'react';
import { Fallback } from './Fallback';

type Props = {
  fallback?: React.ReactNode;
  children: React.ReactNode;
};
type State = {
  hasError: boolean;
  error: any;
};

class ErrorBoundary extends React.Component<Props, State> {
  state = {
    hasError: false,
    error: null,
  };

  alertError(error: any) {
    console.log(error);
    window.alert('오류가 발생했습니다.');
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error: error };
  }

  componentDidCatch(error: any) {
    this.alertError(error);
  }

  componentDidUpdate(previousProps: Props) {
    if (previousProps.children === this.props.children) {
      return;
    }

    this.setState({ hasError: false, error: null });
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;

    return hasError ? <Fallback error={error} /> : children;
  }
}

export default ErrorBoundary;
