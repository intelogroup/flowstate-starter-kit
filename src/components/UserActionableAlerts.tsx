
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info, CheckCircle, X, RefreshCw, ExternalLink } from "lucide-react";

interface ActionableAlertProps {
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  actions?: {
    primary?: {
      label: string;
      onClick: () => void;
    };
    secondary?: {
      label: string;
      onClick: () => void;
    };
  };
  onDismiss?: () => void;
}

export const ActionableAlert = ({ 
  type, 
  title, 
  message, 
  actions, 
  onDismiss 
}: ActionableAlertProps) => {
  const getIcon = () => {
    switch (type) {
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <AlertTriangle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    return type === 'error' ? 'destructive' : 'default';
  };

  return (
    <Alert variant={getVariant()} className={
      type === 'success' ? 'border-green-200 bg-green-50 dark:bg-green-950' :
      type === 'warning' ? 'border-yellow-200 bg-yellow-50 dark:bg-yellow-950' :
      type === 'info' ? 'border-blue-200 bg-blue-50 dark:bg-blue-950' : ''
    }>
      {getIcon()}
      <div className="flex-1">
        <AlertTitle className="flex items-center justify-between">
          {title}
          {onDismiss && (
            <Button variant="ghost" size="sm" onClick={onDismiss} className="h-6 w-6 p-0">
              <X className="h-3 w-3" />
            </Button>
          )}
        </AlertTitle>
        <AlertDescription>
          <p className="mb-3">{message}</p>
          {actions && (
            <div className="flex gap-2">
              {actions.primary && (
                <Button 
                  size="sm" 
                  onClick={actions.primary.onClick}
                  variant={type === 'error' ? 'destructive' : 'default'}
                >
                  {actions.primary.label}
                </Button>
              )}
              {actions.secondary && (
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={actions.secondary.onClick}
                >
                  {actions.secondary.label}
                </Button>
              )}
            </div>
          )}
        </AlertDescription>
      </div>
    </Alert>
  );
};

// Predefined actionable alerts with clear user guidance
export const ValidationErrorAlert = ({ 
  field, 
  message, 
  onFix 
}: { 
  field: string; 
  message: string; 
  onFix?: () => void; 
}) => (
  <ActionableAlert
    type="error"
    title={`${field} Error`}
    message={`${message} Please correct this field and try again.`}
    actions={onFix ? {
      primary: {
        label: "Fix Now",
        onClick: onFix
      }
    } : undefined}
  />
);

export const ConnectionFailedAlert = ({ 
  serviceName, 
  onRetry, 
  onReconnect 
}: { 
  serviceName: string; 
  onRetry: () => void; 
  onReconnect: () => void; 
}) => (
  <ActionableAlert
    type="error"
    title="Connection Failed"
    message={`Unable to connect to ${serviceName}. This may be due to network issues or expired authentication. Try reconnecting your account.`}
    actions={{
      primary: {
        label: "Reconnect Account",
        onClick: onReconnect
      },
      secondary: {
        label: "Retry Connection",
        onClick: onRetry
      }
    }}
  />
);

export const EmailTakenAlert = ({ 
  onTryDifferent, 
  onLogin 
}: { 
  onTryDifferent: () => void; 
  onLogin: () => void; 
}) => (
  <ActionableAlert
    type="error"
    title="Email Already Exists"
    message="This email address is already registered. Please try a different email or log in to your existing account."
    actions={{
      primary: {
        label: "Try Different Email",
        onClick: onTryDifferent
      },
      secondary: {
        label: "Log In Instead",
        onClick: onLogin
      }
    }}
  />
);

export const QuotaExceededAlert = ({ 
  currentUsage, 
  limit, 
  onUpgrade, 
  onViewUsage 
}: { 
  currentUsage: number; 
  limit: number; 
  onUpgrade: () => void; 
  onViewUsage: () => void; 
}) => (
  <ActionableAlert
    type="warning"
    title="Usage Limit Reached"
    message={`You've used ${currentUsage} of ${limit} monthly executions. Upgrade your plan to continue automating or wait until next month for your limit to reset.`}
    actions={{
      primary: {
        label: "Upgrade Plan",
        onClick: onUpgrade
      },
      secondary: {
        label: "View Usage Details",
        onClick: onViewUsage
      }
    }}
  />
);

export const SuccessWithActionAlert = ({ 
  title, 
  message, 
  actionLabel, 
  onAction 
}: { 
  title: string; 
  message: string; 
  actionLabel: string; 
  onAction: () => void; 
}) => (
  <ActionableAlert
    type="success"
    title={title}
    message={message}
    actions={{
      primary: {
        label: actionLabel,
        onClick: onAction
      }
    }}
  />
);
