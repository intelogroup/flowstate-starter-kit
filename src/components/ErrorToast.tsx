
import { useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { AlertTriangle, Wifi, Shield, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorToastProps {
  type: 'network' | 'auth' | 'validation' | 'general';
  message: string;
  onRetry?: () => void;
  duration?: number;
}

export const showErrorToast = ({ type, message, onRetry, duration = 8000 }: ErrorToastProps) => {
  const getIcon = () => {
    switch (type) {
      case 'network': return <Wifi className="w-4 h-4" />;
      case 'auth': return <Shield className="w-4 h-4" />;
      default: return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getTitle = () => {
    switch (type) {
      case 'network': return 'Connection Error';
      case 'auth': return 'Authentication Error';
      case 'validation': return 'Validation Error';
      default: return 'Error';
    }
  };

  toast({
    variant: "destructive",
    title: getTitle(),
    description: message,
    duration,
    action: onRetry ? (
      <Button variant="outline" size="sm" onClick={onRetry}>
        <RefreshCw className="w-3 h-3 mr-1" />
        Retry
      </Button>
    ) : undefined,
  });
};

// Predefined error toast functions
export const errorToasts = {
  network: (onRetry?: () => void) => showErrorToast({
    type: 'network',
    message: 'Could not connect to our servers. Please check your internet connection and try again.',
    onRetry,
  }),

  auth: (onRetry?: () => void) => showErrorToast({
    type: 'auth',
    message: 'Your session has expired. Please log in again to continue.',
    onRetry,
  }),

  loadFlows: (onRetry?: () => void) => showErrorToast({
    type: 'general',
    message: 'Could not load your flows. Please try again or check your connection.',
    onRetry,
  }),

  saveFlow: (onRetry?: () => void) => showErrorToast({
    type: 'general',
    message: 'Failed to save your flow. Your changes may not be preserved.',
    onRetry,
  }),

  deleteFlow: () => showErrorToast({
    type: 'general',
    message: 'Could not delete the flow. Please try again.',
  }),

  validation: (field: string) => showErrorToast({
    type: 'validation',
    message: `Please check the ${field} field and try again.`,
    duration: 5000,
  }),
};
