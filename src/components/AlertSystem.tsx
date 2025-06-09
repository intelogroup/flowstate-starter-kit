
import { useState, createContext, useContext, ReactNode } from "react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, CheckCircle, AlertTriangle, Info, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlertMessage {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  persistent?: boolean;
  actions?: {
    label: string;
    onClick: () => void;
    variant?: 'default' | 'destructive' | 'outline';
  }[];
}

interface AlertContextType {
  alerts: AlertMessage[];
  addAlert: (alert: Omit<AlertMessage, 'id'>) => void;
  removeAlert: (id: string) => void;
  clearAlerts: () => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const useAlerts = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error('useAlerts must be used within an AlertProvider');
  }
  return context;
};

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider = ({ children }: AlertProviderProps) => {
  const [alerts, setAlerts] = useState<AlertMessage[]>([]);

  const addAlert = (alert: Omit<AlertMessage, 'id'>) => {
    const id = Date.now().toString();
    const newAlert = { ...alert, id };
    setAlerts(prev => [newAlert, ...prev]);

    // Auto-remove non-persistent alerts after 5 seconds
    if (!alert.persistent) {
      setTimeout(() => {
        removeAlert(id);
      }, 5000);
    }
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  const clearAlerts = () => {
    setAlerts([]);
  };

  return (
    <AlertContext.Provider value={{ alerts, addAlert, removeAlert, clearAlerts }}>
      {children}
      <GlobalAlertContainer />
    </AlertContext.Provider>
  );
};

const GlobalAlertContainer = () => {
  const { alerts, removeAlert } = useAlerts();

  if (alerts.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-md">
      {alerts.map(alert => (
        <AlertCard key={alert.id} alert={alert} onDismiss={() => removeAlert(alert.id)} />
      ))}
    </div>
  );
};

interface AlertCardProps {
  alert: AlertMessage;
  onDismiss: () => void;
}

const AlertCard = ({ alert, onDismiss }: AlertCardProps) => {
  const getIcon = () => {
    switch (alert.type) {
      case 'success': return <CheckCircle className="h-4 w-4" />;
      case 'error': return <AlertCircle className="h-4 w-4" />;
      case 'warning': return <AlertTriangle className="h-4 w-4" />;
      default: return <Info className="h-4 w-4" />;
    }
  };

  const getVariant = () => {
    return alert.type === 'error' ? 'destructive' : 'default';
  };

  return (
    <Alert variant={getVariant()} className={cn(
      "shadow-lg border-l-4",
      alert.type === 'success' && "border-l-green-500 bg-green-50 dark:bg-green-950",
      alert.type === 'warning' && "border-l-yellow-500 bg-yellow-50 dark:bg-yellow-950",
      alert.type === 'info' && "border-l-blue-500 bg-blue-50 dark:bg-blue-950"
    )}>
      {getIcon()}
      <div className="flex-1">
        <AlertTitle className="flex items-center justify-between">
          {alert.title}
          <Button
            variant="ghost"
            size="sm"
            onClick={onDismiss}
            className="h-6 w-6 p-0"
          >
            <X className="h-3 w-3" />
          </Button>
        </AlertTitle>
        <AlertDescription className="mt-1">
          {alert.message}
          {alert.actions && alert.actions.length > 0 && (
            <div className="flex gap-2 mt-3">
              {alert.actions.map((action, index) => (
                <Button
                  key={index}
                  variant={action.variant || "outline"}
                  size="sm"
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </AlertDescription>
      </div>
    </Alert>
  );
};

// Predefined alert helpers
export const alertHelpers = {
  showSuccess: (title: string, message: string, actions?: AlertMessage['actions']) => ({
    type: 'success' as const,
    title,
    message,
    actions
  }),

  showError: (title: string, message: string, actions?: AlertMessage['actions']) => ({
    type: 'error' as const,
    title,
    message,
    persistent: true,
    actions
  }),

  showWarning: (title: string, message: string, actions?: AlertMessage['actions']) => ({
    type: 'warning' as const,
    title,
    message,
    actions
  }),

  showInfo: (title: string, message: string, actions?: AlertMessage['actions']) => ({
    type: 'info' as const,
    title,
    message,
    actions
  })
};
