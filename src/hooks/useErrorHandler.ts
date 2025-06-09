
import { useCallback } from 'react';
import { errorToasts } from '@/components/ErrorToast';

interface ErrorHandlerConfig {
  showToast?: boolean;
  onRetry?: () => void;
  fallbackMessage?: string;
}

export const useErrorHandler = () => {
  const handleError = useCallback((
    error: Error | string,
    config: ErrorHandlerConfig = {}
  ) => {
    const { showToast = true, onRetry, fallbackMessage = 'An unexpected error occurred' } = config;
    
    const errorMessage = typeof error === 'string' ? error : error.message;
    
    // Determine error type based on message content
    if (errorMessage.toLowerCase().includes('network') || 
        errorMessage.toLowerCase().includes('connection') ||
        errorMessage.toLowerCase().includes('fetch')) {
      if (showToast) errorToasts.network(onRetry);
      return 'network';
    }
    
    if (errorMessage.toLowerCase().includes('auth') ||
        errorMessage.toLowerCase().includes('unauthorized') ||
        errorMessage.toLowerCase().includes('token')) {
      if (showToast) errorToasts.auth(onRetry);
      return 'auth';
    }
    
    if (errorMessage.toLowerCase().includes('validation') ||
        errorMessage.toLowerCase().includes('invalid')) {
      // Don't show toast for validation errors - they should be inline
      return 'validation';
    }
    
    // Generic error
    if (showToast) {
      errorToasts.loadFlows(onRetry);
    }
    
    return 'general';
  }, []);

  const handleNetworkError = useCallback((onRetry?: () => void) => {
    errorToasts.network(onRetry);
  }, []);

  const handleAuthError = useCallback((onRetry?: () => void) => {
    errorToasts.auth(onRetry);
  }, []);

  const handleValidationError = useCallback((field: string) => {
    errorToasts.validation(field);
  }, []);

  return {
    handleError,
    handleNetworkError,
    handleAuthError,
    handleValidationError,
  };
};
